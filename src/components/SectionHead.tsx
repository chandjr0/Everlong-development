import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHead({
  label,
  title,
  children,
}: {
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="grid min-w-0 gap-8 md:grid-cols-12">
      <Reveal className="min-w-0 md:col-span-2">
        <p className="label-mono text-muted-foreground">{label}</p>
      </Reveal>
      <Reveal className="min-w-0 md:col-span-6" delay={0.05}>
        <h2 className="display-lg">{title}</h2>
      </Reveal>
      {children ? (
        <Reveal className="flex min-w-0 items-end md:col-span-4" delay={0.1}>
          <div className="body-copy max-w-[46ch] text-muted-foreground">{children}</div>
        </Reveal>
      ) : null}
    </div>
  );
}
