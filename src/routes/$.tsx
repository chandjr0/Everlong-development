import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/$")({
  head: () =>
    pageHead({
      title: "Page not found — Everlong Development",
      description: "The page you requested does not exist.",
      path: "/",
      noindex: true,
      canonical: false,
    }),
  component: CatchAll,
});

function CatchAll() {
  return (
    <div className="flex min-h-[70svh] items-center bg-background">
      <div className="shell">
        <p className="label-mono text-muted-foreground">Error 404</p>
        <h1 className="display-lg mt-6">Nothing built here.</h1>
        <p className="body-copy mt-6 max-w-[46ch] text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-brut btn-solid mt-10">
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
