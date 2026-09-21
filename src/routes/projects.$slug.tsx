import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { Picture } from "@/components/Picture";
import { getProject } from "@/data/projects";
import { keywordsFor, pageHead, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return pageHead({
        title: "Project not found — Everlong Development",
        description: "This project record does not exist.",
        path: "/projects",
        noindex: true,
      });
    }
    return pageHead({
      title: `${loaderData.project.title} — Everlong Development`,
      description: loaderData.project.description,
      path: `/projects/${loaderData.project.slug}`,
      keywords: keywordsFor(
        loaderData.project.title,
        loaderData.project.type,
        loaderData.project.status,
        loaderData.project.location,
      ),
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: loaderData.project.title,
        description: loaderData.project.description,
        url: `${SITE_URL}/projects/${loaderData.project.slug}`,
        creator: { "@id": `${SITE_URL}/#organization` },
        about: [loaderData.project.type, loaderData.project.status],
      },
    });
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectDetail,
});

function ProjectNotFound() {
  return (
    <div className="shell py-28">
      <p className="label-mono text-muted-foreground">Error 404</p>
      <h1 className="display-lg mt-6">No such record.</h1>
      <Link to="/projects" className="btn-brut btn-solid mt-10">
        <span>All Projects</span>
      </Link>
    </div>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData();

  return (
    <>
      <section className="relative overflow-hidden bg-charcoal text-charcoal-foreground">
        <Picture
          src={project.cover}
          alt={project.images[0]?.alt ?? project.title}
          width={1600}
          height={1100}
          fetchPriority="high"
          sizes="100vw"
          pictureClassName="absolute inset-0 h-full w-full"
          className="h-full w-full object-cover opacity-45"
        />
        <div className="shell relative flex min-h-[70svh] flex-col justify-end py-16">
          <p className="label-mono text-charcoal-foreground/70">
            {project.id} / {project.status}
          </p>
          <h1 className="display-lg mt-6">{project.title}</h1>
          <p className="data-mono mt-6 text-charcoal-foreground/80">
            {project.location} — {project.coordinates}
          </p>
        </div>
      </section>

      <section className="shell py-16 md:py-24">
        <dl className="grid gap-y-6 border-y border-border py-8 data-mono md:grid-cols-4">
          <div>
            <dt className="label-mono text-muted-foreground">Development type</dt>
            <dd className="mt-2">{project.type}</dd>
          </div>
          <div>
            <dt className="label-mono text-muted-foreground">Status</dt>
            <dd className="mt-2">{project.status}</dd>
          </div>
          <div>
            <dt className="label-mono text-muted-foreground">Year</dt>
            <dd className="mt-2">{project.year}</dd>
          </div>
          <div>
            <dt className="label-mono text-muted-foreground">Location</dt>
            <dd className="mt-2">{project.location}</dd>
          </div>
        </dl>

        <div className="mt-16 grid gap-10 md:grid-cols-12">
          {[
            { label: "Overview", body: project.overview },
            { label: "Opportunity", body: project.opportunity },
            { label: "Process", body: project.process },
            { label: "Outcome", body: project.outcome },
          ].map((block) => (
            <Reveal key={block.label} className="grid min-w-0 gap-4 md:col-span-12 md:grid-cols-12">
              <h2 className="display-md md:col-span-4">{block.label}</h2>
              <p className="body-copy max-w-[60ch] text-muted-foreground md:col-span-8">
                {block.body}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-12">
          <div className="min-w-0 md:col-span-6">
            <h2 className="label-mono text-muted-foreground">Facts</h2>
            <dl className="mt-6 border-t border-border">
              {project.facts.map((f) => (
                <div key={f.label} className="flex justify-between gap-4 border-b border-border py-3 data-mono">
                  <dt className="text-muted-foreground">{f.label}</dt>
                  <dd className="text-right">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="min-w-0 md:col-span-6">
            <h2 className="label-mono text-muted-foreground">Timeline</h2>
            <dl className="mt-6 border-t border-border">
              {project.timeline.map((t) => (
                <div key={t.phase} className="flex justify-between gap-4 border-b border-border py-3 data-mono">
                  <dt>{t.phase}</dt>
                  <dd className="text-muted-foreground">{t.period}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="shell pb-20" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading" className="label-mono text-muted-foreground">
          Gallery
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {project.images.map((img) => (
            <Reveal key={img.src} className="img-zoom">
              <Picture
                src={img.src}
                alt={img.alt}
                width={1600}
                height={1100}
                loading="lazy"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection lines={["Let's build", "what comes next."]} />
    </>
  );
}
