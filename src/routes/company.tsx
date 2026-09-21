import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { Picture } from "@/components/Picture";
import { company, founder, philosophy } from "@/data/company";
import founderImage from "@/assets/founder.jpg";
import { FOUNDER_OG_IMAGE, keywordsFor, pageHead, SITE_URL } from "@/lib/seo";

const title = "Company — Everlong Development";
const description =
  "Everlong Development is a real estate development company founded by Danny Morris, Principal and Founder.";

export const Route = createFileRoute("/company")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/company",
      image: FOUNDER_OG_IMAGE,
      keywords: keywordsFor(
        "Danny Morris",
        "Principal Founder",
        "real estate development company",
        "operating principles",
      ),
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Person",
        name: founder.name,
        jobTitle: founder.role,
        image: FOUNDER_OG_IMAGE,
        worksFor: { "@id": `${SITE_URL}/#organization` },
        url: `${SITE_URL}/company`,
      },
    }),
  component: CompanyPage,
});

function CompanyPage() {
  return (
    <>
      <section className="shell pt-20 md:pt-28">
        <Reveal>
          <p className="label-mono text-muted-foreground">Company</p>
          <h1 className="display-xl mt-6">
            Why Everlong
            <br />
            exists.
          </h1>
        </Reveal>
        <Reveal className="mt-10" delay={0.05}>
          <p className="body-copy max-w-[58ch] text-muted-foreground">
            Most land does not stall because it lacks demand. It stalls because nobody has resolved
            what it actually is. Everlong Development was built to do that work first, and to carry
            it through to something that can be financed and delivered.
          </p>
        </Reveal>
      </section>

      <section className="shell py-16 md:py-24" aria-labelledby="founder-heading">
        <div className="grid gap-10 md:grid-cols-12">
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
          <div className="min-w-0 md:col-span-7">
            <Reveal>
              <p className="label-mono text-muted-foreground">Founder</p>
              <h2 id="founder-heading" className="display-md mt-6">
                {founder.name}
              </h2>
              <p className="data-mono mt-2 text-muted-foreground">{founder.role}</p>
            </Reveal>
            {founder.bio.map((para, i) => (
              <Reveal key={i} delay={0.05 * (i + 1)}>
                <p className="body-copy mt-6 max-w-[58ch] text-muted-foreground">{para}</p>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <blockquote className="mt-10 border-l-2 border-primary pl-6">
                <p className="text-xl font-bold uppercase leading-[1.05] tracking-tight md:text-2xl">
                  {founder.philosophy}
                </p>
              </blockquote>
              <a
                href={company.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brut btn-outline mt-10"
                data-cursor="open"
              >
                <span>Company LinkedIn</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-charcoal text-charcoal-foreground" aria-labelledby="principles-heading">
        <div className="shell py-16 md:py-24">
          <h2 id="principles-heading" className="label-mono text-charcoal-foreground/60">
            Operating Principles
          </h2>
          <div className="mt-10 border-t border-charcoal-foreground/20">
            {philosophy.map((item) => (
              <Reveal key={item.label}>
                <div className="grid items-baseline gap-4 border-b border-charcoal-foreground/20 py-8 md:grid-cols-12">
                  <h3 className="display-md md:col-span-4">{item.label}</h3>
                  <p className="body-copy max-w-[56ch] text-charcoal-foreground/70 md:col-span-8">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection lines={["Let's build", "what comes next."]} />
    </>
  );
}
