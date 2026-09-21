import { Link } from "@tanstack/react-router";
import type { Project } from "@/data/projects";
import { Picture } from "@/components/Picture";
import { Reveal } from "./Reveal";

export function ProjectRow({
  project,
  index,
  heading = "h3",
}: {
  project: Project;
  index: number;
  heading?: "h2" | "h3";
}) {
  const flip = index % 2 === 1;
  const Heading = heading;
  const coverAlt = project.images[0]?.alt ?? project.title;

  return (
    <article className="border-t border-border py-10 md:py-16">
      <Reveal className="grid min-w-0 items-center gap-8 md:grid-cols-12">
        <Link
          to="/projects/$slug"
          params={{ slug: project.slug }}
          className={`img-zoom group block md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}
          data-cursor="open"
          aria-label={`${project.title} — project detail`}
        >
          <Picture
            src={project.cover}
            alt={coverAlt}
            width={1600}
            height={1100}
            loading="lazy"
            sizes="(min-width: 768px) 58vw, 100vw"
            className="aspect-[16/10] w-full object-cover"
          />
        </Link>

        <div className={`min-w-0 md:col-span-5 ${flip ? "md:order-1 md:col-start-1 md:row-start-1" : ""}`}>
          <div className="flex items-center justify-between data-mono text-muted-foreground">
            <span>{project.id}</span>
            <span>{project.status}</span>
          </div>
          <Heading className="display-md mt-4">{project.title}</Heading>
          <dl className="mt-6 grid grid-cols-2 gap-y-3 data-mono">
            <dt className="text-muted-foreground">Location</dt>
            <dd>{project.location}</dd>
            <dt className="text-muted-foreground">Type</dt>
            <dd>{project.type}</dd>
            <dt className="text-muted-foreground">Year</dt>
            <dd>{project.year}</dd>
          </dl>
          <p className="body-copy mt-6 max-w-[46ch] text-muted-foreground">{project.description}</p>
          <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className="btn-brut btn-outline mt-8"
            data-cursor="open"
          >
            <span>Open Project</span>
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
