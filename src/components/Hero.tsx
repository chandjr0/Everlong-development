import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero-land.jpg";
import { Picture } from "@/components/Picture";
import { gsap, prefersReducedMotion } from "@/lib/motion";

export function Hero() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from("[data-hero='mark']", { opacity: 0, y: 12, duration: 0.35 })
        .from("[data-hero='rule']", { scaleX: 0, transformOrigin: "left", duration: 0.4, stagger: 0.05 }, 0.1)
        .from("[data-hero='image']", { clipPath: "inset(100% 0% 0% 0%)", duration: 0.7 }, 0.1)
        .from("[data-hero='line']", { yPercent: 110, duration: 0.55, stagger: 0.06 }, 0.2)
        .from("[data-hero='meta']", { opacity: 0, duration: 0.35 }, 0.45)
        .fromTo("[data-hero='coords']", { opacity: 0 }, { opacity: 1, duration: 0.25 }, 0.3)
        .to("[data-hero='coords']", { opacity: 0.55, duration: 0.3 }, 0.8);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative min-h-[92svh] overflow-hidden bg-charcoal text-charcoal-foreground">
      <div data-hero="image" className="absolute inset-0">
        <Picture
          src={heroImage}
          alt="Aerial view of an undeveloped land parcel at the edge of a city"
          width={1920}
          height={1280}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          sizes="100vw"
          pictureClassName="absolute inset-0 h-full w-full"
          className="h-full w-full object-cover opacity-55"
        />
      </div>
      <div className="absolute inset-0 bg-charcoal/45" aria-hidden="true" />
      <div
        className="absolute inset-0 hidden md:block"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(245,243,238,0.10) 0 1px, transparent 1px calc(100%/12))",
        }}
      />

      <div className="shell relative flex min-h-[92svh] flex-col justify-between py-10 md:py-14">
        <div className="flex items-start justify-between gap-6">
          <p data-hero="mark" className="label-mono">
            Everlong Development
          </p>
          <p data-hero="coords" className="data-mono hidden text-charcoal-foreground/70 md:block">
            LAT 00.0000 / LON 00.0000 — SITE INDEX 001
          </p>
        </div>

        <div className="mt-16">
          <p data-hero="mark" className="label-mono text-charcoal-foreground/70">
            Real Estate Development
          </p>
          <div data-hero="rule" className="mt-4 h-px w-full bg-charcoal-foreground/25" />
          <h1 className="display-xl mt-8">
            {["Building", "Opportunity", "From Complexity."].map((line) => (
              <span key={line} className="block overflow-hidden">
                <span data-hero="line" className="block">
                  {line}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <div data-hero="meta" className="mt-16 grid gap-8 md:grid-cols-12 md:items-end">
          <p className="body-copy max-w-[46ch] text-charcoal-foreground/80 md:col-span-6">
            Turning land, capital and development challenges into executable real estate
            opportunities.
          </p>
          <div className="flex flex-wrap gap-4 md:col-span-6 md:justify-end">
            <Link to="/projects" className="btn-brut btn-invert" data-cursor="view">
              <span>View Projects</span>
            </Link>
            <Link to="/contact" className="btn-brut btn-invert" data-cursor="open">
              <span>Start a Discussion</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
