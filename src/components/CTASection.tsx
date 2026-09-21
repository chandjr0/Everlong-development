import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

type Props = {
  lines?: string[];
  note?: string;
};

export function CTASection({
  lines = ["Let's build", "what comes next."],
  note = "Bring a site, a position or a problem. We will tell you what it actually is.",
}: Props) {
  return (
    <section className="bg-primary text-primary-foreground" aria-labelledby="cta-heading">
      <div className="shell py-20 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="min-w-0 md:col-span-8">
            <h2 id="cta-heading" className="display-lg">
              {lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>
          <Reveal className="flex min-w-0 flex-col justify-end gap-8 md:col-span-4" delay={0.1}>
            <p className="body-copy max-w-[42ch] text-primary-foreground/75">{note}</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-brut btn-invert" data-cursor="open">
                <span>Discuss an Opportunity</span>
              </Link>
              <Link to="/projects" className="btn-brut btn-invert" data-cursor="view">
                <span>View Projects</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
