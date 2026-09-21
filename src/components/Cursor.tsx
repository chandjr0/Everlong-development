import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

export function Cursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("has-custom-cursor");

    let raf = 0;
    let x = 0;
    let y = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const node = e.target as HTMLElement | null;
      const overField = node?.closest?.("input, textarea, select, [contenteditable='true']");
      const target = node?.closest?.("[data-cursor]") as HTMLElement | null;
      const next = overField ? null : (target?.dataset["cursor"] ?? null);
      setLabel((prev) => (prev === next ? prev : next));
      setVisible(!overField);
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
      }
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms" }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        {label ? (
          <span className="label-mono bg-primary px-3 py-1.5 text-primary-foreground">{label}</span>
        ) : (
          <span className="block h-2 w-2 bg-charcoal" />
        )}
      </div>
    </div>
  );
}
