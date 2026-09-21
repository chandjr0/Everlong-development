import { Link } from "@tanstack/react-router";
import { primaryNav, contactNav } from "@/data/navigation";
import { company } from "@/data/company";

export function Footer() {
  return (
    <footer className="bg-charcoal text-charcoal-foreground" aria-labelledby="footer-heading">
      <div className="shell py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="min-w-0 md:col-span-7">
            <p className="label-mono text-muted">From land to legacy</p>
            <div className="mt-6 flex items-start gap-4">
              <img
                src="/logo.svg"
                alt=""
                width={40}
                height={40}
                className="mt-1 h-10 w-10 shrink-0 opacity-90"
                decoding="async"
              />
              <h2 id="footer-heading" className="footer-brand display-md max-w-[14ch]">
                Everlong Development
              </h2>
            </div>
          </div>
          <nav className="min-w-0 md:col-span-3" aria-label="Footer">
            <p className="label-mono text-muted">Index</p>
            <ul className="mt-6 space-y-3">
              {[...primaryNav, contactNav].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="nav-link text-charcoal-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="min-w-0 md:col-span-2">
            <p className="label-mono text-muted">Contact</p>
            <ul className="mt-6 space-y-3 data-mono">
              <li>
                <a href={`mailto:${company.email}`} className="nav-link">
                  Email
                </a>
              </li>
              <li>
                <a
                  href={company.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-charcoal-foreground/20 pt-6 data-mono text-muted md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Everlong Development</span>
          <span>Real Estate Development / Land / Capital / Execution</span>
        </div>
      </div>
    </footer>
  );
}
