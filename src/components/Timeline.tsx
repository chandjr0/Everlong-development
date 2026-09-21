import { processStages } from "@/data/company";
import { Reveal } from "./Reveal";

export function Timeline() {
  return (
    <ol className="mt-14 border-t border-border" aria-label="Development process">
      {processStages.map((stage, index) => (
        <Reveal
          key={stage.stage}
          as="li"
          className="row-hover group grid items-baseline gap-4 border-b border-border py-6 md:grid-cols-12 md:gap-8"
        >
          <span className="data-mono text-muted-foreground md:col-span-2">
            <span className="sr-only">Stage {index + 1}: </span>
            {stage.stage.slice(0, 3).toUpperCase()}
          </span>
          <h3 className="display-md md:col-span-4">{stage.stage}</h3>
          <p className="body-copy max-w-[52ch] text-muted-foreground md:col-span-6">{stage.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}
