import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { insights } from "@/data/insights";
import { keywordsFor, pageHead } from "@/lib/seo";

const title = "Insights — Everlong Development";
const description =
  "Writing on land opportunities, development strategy, capital structure and urban growth from Everlong Development.";

export const Route = createFileRoute("/insights")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/insights",
      keywords: keywordsFor(
        "development insights",
        "land strategy",
        "capital structure",
        "urban growth",
        "entitlement",
      ),
    }),
  component: InsightsPage,
});

function InsightsPage() {
  return (
    <>
      <section className="shell pt-20 md:pt-28">
        <Reveal>
          <p className="label-mono text-muted-foreground">Insights / Journal</p>
          <h1 className="display-xl mt-6">Field notes</h1>
        </Reveal>
        <Reveal className="mt-10" delay={0.05}>
          <p className="body-copy max-w-[54ch] text-muted-foreground">
            Short writing on how land, capital and approvals actually behave. Published irregularly,
            when there is something worth saying.
          </p>
        </Reveal>
      </section>

      <section className="shell py-16 md:py-24" aria-labelledby="journal-heading">
        <h2 id="journal-heading" className="sr-only">
          Journal entries
        </h2>
        <div className="border-t border-border">
          {insights.map((post) => (
            <Reveal key={post.id}>
              <article className="row-hover grid gap-4 border-b border-border py-10 md:grid-cols-12">
                <div className="data-mono text-muted-foreground md:col-span-2">
                  <time dateTime={post.date.replace(".", "-")}>{post.date}</time>
                  <p className="mt-1">{post.readTime}</p>
                </div>
                <div className="min-w-0 md:col-span-7">
                  <h3 className="text-2xl font-bold uppercase leading-[1.02] tracking-tight md:text-3xl">
                    {post.title}
                  </h3>
                  <p className="body-copy mt-4 max-w-[58ch] text-muted-foreground">{post.excerpt}</p>
                </div>
                <p className="data-mono text-muted-foreground md:col-span-3 md:text-right">
                  {post.category}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="data-mono mt-8 text-muted-foreground">
          Full articles are in preparation. Send the finished text and each entry becomes a
          standalone page.
        </p>
      </section>

      <CTASection lines={["Let's build", "what comes next."]} />
    </>
  );
}
