import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion, registerScroll } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
};

export function Reveal({ children, as: Tag = "div", className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    registerScroll();
    el.style.willChange = "opacity, transform";
    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onComplete: () => {
          el.style.willChange = "auto";
        },
      });
    });
    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag ref={ref as never} className={`reveal-init ${className}`}>
      {children}
    </Tag>
  );
}
