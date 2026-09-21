import { createFileRoute } from "@tanstack/react-router";
import { ProjectRow } from "@/components/ProjectRow";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";
import { keywordsFor, pageHead } from "@/lib/seo";

const title = "Projects — Everlong Development";
const description =
  "Land assembly, masterplan studies and serviced land positions developed by Everlong Development.";

export const Route = createFileRoute("/projects/")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/projects",
      keywords: keywordsFor(
        "development projects",
        "land assembly",
        "masterplan",
        "serviced land",
        "mixed-use infill",
      ),
    }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <>
      <section className="shell pb-8 pt-20 md:pt-28">
        <Reveal>
          <p className="label-mono text-muted-foreground">Projects / Index</p>
          <h1 className="display-xl mt-6">Positions</h1>
        </Reveal>
        <Reveal className="mt-8 grid gap-6 md:grid-cols-12" delay={0.05}>
          <p className="body-copy max-w-[54ch] text-muted-foreground md:col-span-6">
            Each entry is a development position, not a listing. Records below are structured
            placeholders held ready for verified project data.
          </p>
          <p className="data-mono text-muted-foreground md:col-span-6 md:text-right">
            {projects.length} records / Planning / Development / Opportunity
          </p>
        </Reveal>
      </section>

      <section className="shell pb-16" aria-labelledby="projects-index-heading">
        <h2 id="projects-index-heading" className="sr-only">
          Project records
        </h2>
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} heading="h3" />
        ))}
      </section>

      <CTASection lines={["Have a site", "worth testing?"]} />
    </>
  );
}
