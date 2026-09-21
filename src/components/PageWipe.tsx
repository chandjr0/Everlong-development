import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { gsap, prefersReducedMotion } from "@/lib/motion";

export function PageWipe() {
  const ref = useRef<HTMLDivElement | null>(null);
  const status = useRouterState({ select: (s) => s.status });
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const first = useRef(true);
  const prevStatus = useRef(status);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      prevStatus.current = status;
      return;
    }
    const el = ref.current;
    if (!el || prefersReducedMotion()) {
      prevStatus.current = status;
      return;
    }

    gsap.killTweensOf(el);

    if (status === "pending") {
      gsap.fromTo(
        el,
        { scaleY: 0, transformOrigin: "bottom" },
        { scaleY: 1, duration: 0.28, ease: "power3.inOut" },
      );
    } else if (prevStatus.current === "pending") {
      gsap.to(el, { scaleY: 0, transformOrigin: "top", duration: 0.42, ease: "power3.inOut" });
    } else {
      gsap.fromTo(
        el,
        { scaleY: 1, transformOrigin: "top" },
        { scaleY: 0, transformOrigin: "bottom", duration: 0.5, ease: "power4.inOut" },
      );
    }

    prevStatus.current = status;
  }, [status, pathname]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] origin-bottom scale-y-0 bg-charcoal"
    />
  );
}
