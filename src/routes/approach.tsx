import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Timeline } from "@/components/Timeline";
import { CTASection } from "@/components/CTASection";
import { Picture } from "@/components/Picture";
import { approachPillars } from "@/data/company";
import planImage from "@/assets/process-plan.jpg";
import { keywordsFor, pageHead } from "@/lib/seo";

const title = "Approach — Everlong Development";
const description =
  "How Everlong Development evaluates land, risk, capital and execution before a development position is taken.";

export const Route = createFileRoute("/approach")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/approach",
      keywords: keywordsFor(
        "development approach",
        "land diligence",
        "risk position",
        "capital structure",
        "execution discipline",
      ),
    }),
  component: ApproachPage,
});

function ApproachPage() {
  return (
    <>
      <section className="shell pt-20 md:pt-28">
        <Reveal>
          <p className="label-mono text-muted-foreground">Approach</p>
          <h1 className="display-xl mt-6">
            Complexity,
            <br />
            simplified.
          </h1>
        </Reveal>
        <Reveal className="mt-10" delay={0.05}>
          <p className="body-copy max-w-[58ch] text-muted-foreground">
            Development risk is not removed. It is located, priced and assigned to whoever is best
            placed to carry it. Everything below describes how that work is done — not what it will
            return.
          </p>
        </Reveal>
      </section>

      <section className="shell py-16 md:py-24" aria-labelledby="pillars-heading">
        <h2 id="pillars-heading" className="sr-only">
          Approach pillars
        </h2>
        <Reveal>
          <div className="img-zoom">
            <Picture
              src={planImage}
              alt="Architectural site plan drawing with drafting tools"
              width={1600}
              height={1008}
              loading="lazy"
              sizes="100vw"
              className="aspect-[16/7] w-full object-cover"
            />
          </div>
        </Reveal>

        <div className="mt-16 border-t border-border">
          {approachPillars.map((pillar) => (
            <Reveal key={pillar.title}>
              <div className="row-hover grid items-baseline gap-4 border-b border-border py-8 md:grid-cols-12">
                <h3 className="display-md md:col-span-5">{pillar.title}</h3>
                <p className="body-copy max-w-[58ch] text-muted-foreground md:col-span-7">
                  {pillar.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface" aria-labelledby="sequence-heading">
        <div className="shell py-16 md:py-24">
          <h2 id="sequence-heading" className="label-mono text-muted-foreground">
            Execution Sequence
          </h2>
          <Timeline />
        </div>
      </section>

      <CTASection lines={["Test a position", "with us."]} />
    </>
  );
}
