import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

export function NavProgress() {
  const isPending = useRouterState({ select: (s) => s.status === "pending" });
  const [phase, setPhase] = useState<"idle" | "load" | "done">("idle");
  const [ready, setReady] = useState(false);
  const wasPending = useRef(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (isPending) {
      wasPending.current = true;
      setPhase("load");
      return;
    }
    if (!wasPending.current) return;
    wasPending.current = false;
    setPhase("done");
    const timeout = window.setTimeout(() => setPhase("idle"), 420);
    return () => window.clearTimeout(timeout);
  }, [isPending, ready]);

  const scale = phase === "idle" ? "scale-x-0" : phase === "load" ? "scale-x-[0.72]" : "scale-x-100";
  const opacity = phase === "idle" ? "opacity-0" : "opacity-100";

  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-[80] h-[2px] overflow-hidden"
      style={{ top: "env(safe-area-inset-top, 0px)" }}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="sr-only">{ready && isPending ? "Loading page" : "\u00a0"}</span>
      <div className={`nav-progress h-full bg-primary ${scale} ${opacity}`} />
    </div>
  );
}
