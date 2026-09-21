import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { Timeline } from "@/components/Timeline";
import { BlueprintAnimation } from "@/components/BlueprintAnimation";
import { ProjectRow } from "@/components/ProjectRow";
import { CTASection } from "@/components/CTASection";
import { Picture } from "@/components/Picture";
import { projects } from "@/data/projects";
import { insights } from "@/data/insights";
import { company, founder, philosophy, approachPillars } from "@/data/company";
import founderImage from "@/assets/founder.jpg";
import heroWebp from "@/assets/hero-land.webp";
import { keywordsFor, pageHead } from "@/lib/seo";

const title = "Everlong Development — Land, Capital, Execution";
const description =
  "Everlong Development identifies land opportunities, manages development complexity and delivers executable real estate outcomes.";

export const Route = createFileRoute("/")({
  head: () => {
    const head = pageHead({
      title,
      description,
      path: "/",
      keywords: keywordsFor(
        "land opportunities",
        "development complexity",
        "executable real estate",
        "from land to legacy",
      ),
    });
    return {
      ...head,
      links: [
        ...head.links,
        { rel: "preload", as: "image", href: heroWebp, type: "image/webp" },
      ],
    };
  },
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />

      {/* Positioning */}
      <section className="shell py-20 md:py-32" aria-labelledby="positioning-heading">
        <SectionHead label="Positioning" title={<span id="positioning-heading">Land.<br />Capital.<br />Execution.</span>}>
          {company.positioning}
        </SectionHead>
      </section>

      {/* Philosophy */}
      <section className="bg-surface" aria-labelledby="philosophy-heading">
        <div className="shell py-20 md:py-28">
          <h2 id="philosophy-heading" className="label-mono text-muted-foreground">
            Development Philosophy
          </h2>
          <div className="mt-10 border-t border-border">
            {philosophy.map((item) => (
              <Reveal key={item.label}>
                <div className="row-hover grid items-baseline gap-4 border-b border-border py-8 md:grid-cols-12">
                  <h3 className="display-md md:col-span-4">{item.label}</h3>
                  <p className="body-copy max-w-[56ch] text-muted-foreground md:col-span-8">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="shell py-20 md:py-28" aria-labelledby="work-heading">
        <SectionHead label="Selected Work" title={<span id="work-heading">Positions<br />in progress.</span>}>
          A working record of assembly, entitlement and delivery. Placeholder entries until verified
          project data is released.
        </SectionHead>
        <div className="mt-14">
          {projects.slice(0, 2).map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>
        <Reveal className="mt-10">
          <Link to="/projects" className="btn-brut btn-outline" data-cursor="view">
            <span>All Projects</span>
          </Link>
        </Reveal>
      </section>

      {/* Signature scroll sequence */}
      <BlueprintAnimation />

      {/* Process */}
      <section className="shell py-20 md:py-28" aria-labelledby="process-heading">
        <SectionHead label="Process" title={<span id="process-heading">How we<br />execute.</span>}>
          Seven stages, one accountable line from first look at a site to a stabilised asset.
        </SectionHead>
        <Timeline />
      </section>

      {/* Investment approach */}
      <section className="bg-charcoal text-charcoal-foreground" aria-labelledby="investment-heading">
        <div className="shell py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="min-w-0 md:col-span-5">
              <p className="label-mono text-charcoal-foreground/60">Investment Approach</p>
              <h2 id="investment-heading" className="display-lg mt-6">
                Complexity,
                <br />
                simplified.
              </h2>
              <Link to="/approach" className="btn-brut btn-invert mt-10" data-cursor="explore">
                <span>Read the Approach</span>
              </Link>
            </Reveal>
            <div className="min-w-0 md:col-span-7">
              {approachPillars.map((pillar) => (
                <Reveal key={pillar.title}>
                  <div className="border-t border-charcoal-foreground/20 py-6 transition-colors duration-300 hover:border-charcoal-foreground/45">
                    <h3 className="text-lg font-bold uppercase tracking-tight">{pillar.title}</h3>
                    <p className="body-copy mt-3 max-w-[56ch] text-charcoal-foreground/70">
                      {pillar.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="shell py-20 md:py-28" aria-labelledby="founder-heading">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal className="img-zoom min-w-0 md:col-span-5">
            <Picture
              src={founderImage}
              alt={`Professional portrait of ${founder.name}, ${founder.role} of Everlong Development`}
              width={1200}
              height={1200}
              loading="lazy"
              sizes="(min-width: 768px) 40vw, 100vw"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </Reveal>
          <Reveal className="min-w-0 md:col-span-7" delay={0.05}>
            <p className="label-mono text-muted-foreground">Founder</p>
            <h2 id="founder-heading" className="display-md mt-6">
              {founder.name}
            </h2>
            <p className="data-mono mt-2 text-muted-foreground">{founder.role}</p>
            <p className="body-copy mt-8 max-w-[54ch] text-muted-foreground">{founder.bio[0]}</p>
            <Link to="/company" className="btn-brut btn-outline mt-8" data-cursor="explore">
              <span>The Company</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Insights */}
      <section className="bg-surface" aria-labelledby="insights-heading">
        <div className="shell py-20 md:py-28">
          <SectionHead label="Insights" title={<span id="insights-heading">Notes on<br />development.</span>} />
          <div className="mt-12 border-t border-border">
            {insights.slice(0, 3).map((post) => (
              <Reveal key={post.id}>
                <Link
                  to="/insights"
                  className="row-hover grid items-baseline gap-3 border-b border-border py-6 md:grid-cols-12"
                  data-cursor="explore"
                >
                  <time className="data-mono text-muted-foreground md:col-span-2" dateTime={post.date.replace(".", "-")}>
                    {post.date}
                  </time>
                  <h3 className="text-xl font-bold uppercase tracking-tight md:col-span-6">
                    {post.title}
                  </h3>
                  <span className="data-mono text-muted-foreground md:col-span-4 md:text-right">
                    {post.category}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
