import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, registerScroll } from "@/lib/motion";

const PHASES = ["Land", "Capital", "Execution", "Opportunity Built"];

/**
 * Signature scroll sequence: a land outline resolves into a site plan,
 * then into a building structure, while the phase label advances.
 */
export function BlueprintAnimation() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.querySelectorAll<HTMLElement>("[data-phase='3']").forEach((node) => {
        node.style.opacity = "1";
      });
      el.querySelectorAll<SVGRectElement>("[data-group='mass'] rect").forEach((node) => {
        node.style.opacity = "1";
        node.style.transform = "scaleY(1)";
      });
      el.querySelectorAll<SVGLineElement>("[data-group='grid'] line").forEach((node) => {
        node.style.opacity = "1";
      });
      return;
    }

    registerScroll();

    const ctx = gsap.context(() => {
      const draw = gsap.utils.toArray<SVGPathElement>("[data-draw]");
      draw.forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=260%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to("[data-group='grid'] line", { opacity: 1, duration: 0.4, stagger: 0.02 })
        .to("[data-group='land'] [data-draw]", { strokeDashoffset: 0, duration: 1 }, 0.2)
        .to("[data-phase='0']", { opacity: 1, duration: 0.3 }, 0.2)
        .to("[data-phase='0']", { opacity: 0, duration: 0.3 }, 1.2)
        .to("[data-group='plan'] [data-draw]", { strokeDashoffset: 0, duration: 1, stagger: 0.08 }, 1.2)
        .to("[data-phase='1']", { opacity: 1, duration: 0.3 }, 1.3)
        .to("[data-phase='1']", { opacity: 0, duration: 0.3 }, 2.3)
        .to("[data-group='mass'] rect", { opacity: 1, scaleY: 1, duration: 0.8, stagger: 0.1 }, 2.3)
        .to("[data-phase='2']", { opacity: 1, duration: 0.3 }, 2.4)
        .to("[data-phase='2']", { opacity: 0, duration: 0.3 }, 3.4)
        .to("[data-group='mass'] rect", { fillOpacity: 1, duration: 0.5 }, 3.4)
        .to("[data-phase='3']", { opacity: 1, duration: 0.4 }, 3.5);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section aria-labelledby="blueprint-heading" className="bg-charcoal text-charcoal-foreground">
      <div ref={root} className="relative flex min-h-[100svh] items-center overflow-hidden">
        <div className="shell grid w-full min-w-0 gap-10 py-16 md:grid-cols-12 md:items-center">
          <div className="min-w-0 md:col-span-4">
            <p className="label-mono text-charcoal-foreground/60">The Development Blueprint</p>
            <h2 id="blueprint-heading" className="display-lg mt-6">
              From land
              <br />
              to legacy.
            </h2>
            <div className="relative mt-10 h-16">
              {PHASES.map((phase, i) => (
                <span
                  key={phase}
                  data-phase={i}
                  className="display-md absolute inset-0 text-accent-bright opacity-0"
                >
                  {phase}
                </span>
              ))}
            </div>
          </div>

          <div className="min-w-0 md:col-span-8">
            <svg
              viewBox="0 0 800 500"
              className="h-auto w-full"
              role="img"
              aria-label="A land outline resolving into a site plan and then a building massing"
            >
              <g data-group="grid" stroke="currentColor" strokeWidth="0.5" opacity="0.35">
                {Array.from({ length: 13 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 66.6} y1="0" x2={i * 66.6} y2="500" opacity="0" />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 71.4} x2="800" y2={i * 71.4} opacity="0" />
                ))}
              </g>

              <g data-group="land" fill="none" stroke="currentColor" strokeWidth="2">
                <path data-draw d="M60 420 L120 130 L470 90 L690 200 L640 430 Z" />
              </g>

              <g data-group="plan" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.85">
                <path data-draw d="M140 380 L600 340" />
                <path data-draw d="M170 170 L170 400" />
                <path data-draw d="M300 140 L300 400" />
                <path data-draw d="M430 120 L430 400" />
                <path data-draw d="M560 160 L560 400" />
              </g>

              <g data-group="mass">
                {[
                  { x: 175, y: 250, w: 110, h: 130 },
                  { x: 305, y: 200, w: 110, h: 180 },
                  { x: 435, y: 160, w: 110, h: 215 },
                ].map((r) => (
                  <rect
                    key={r.x}
                    x={r.x}
                    y={r.y}
                    width={r.w}
                    height={r.h}
                    fill="currentColor"
                    fillOpacity="0.12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    opacity="0"
                    style={{ transformOrigin: `${r.x}px ${r.y + r.h}px`, transform: "scaleY(0.2)" }}
                  />
                ))}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
