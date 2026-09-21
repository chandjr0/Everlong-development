import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { company } from "@/data/company";
import { keywordsFor, pageHead } from "@/lib/seo";

const title = "Contact — Everlong Development";
const description =
  "Discuss a land opportunity, capital position or development partnership with Everlong Development.";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/contact",
      keywords: keywordsFor(
        "contact Everlong Development",
        "land opportunity",
        "development partnership",
        "capital position",
      ),
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="shell py-20 md:py-28">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="min-w-0 md:col-span-5">
          <Reveal>
            <p className="label-mono text-muted-foreground">Contact</p>
            <h1 className="display-lg mt-6">
              Let's build
              <br />
              what comes next.
            </h1>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="body-copy mt-8 max-w-[44ch] text-muted-foreground">
              Bring a site, a position or a problem. Tell us what stage it is at and what is
              unresolved.
            </p>
            <dl className="mt-10 border-t border-border data-mono">
              <div className="flex justify-between gap-4 border-b border-border py-3">
                <dt className="text-muted-foreground">Email</dt>
                <dd className="min-w-0 break-all">
                  <a href={`mailto:${company.email}`} className="nav-link">
                    {company.email}
                  </a>
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-border py-3">
                <dt className="text-muted-foreground">LinkedIn</dt>
                <dd>
                  <a
                    href={company.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link"
                  >
                    Everlong Development
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal className="min-w-0 md:col-span-7" delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
