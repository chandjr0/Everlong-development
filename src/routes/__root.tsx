import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { PageWipe } from "@/components/PageWipe";
import { SkipLink } from "@/components/SkipLink";
import { NavProgress } from "@/components/NavProgress";
import { organizationJsonLd, SITE_NAME } from "@/lib/seo";

function NotFoundComponent() {
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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70svh] items-center bg-background">
      <div className="shell">
        <p className="label-mono text-muted-foreground">Error</p>
        <h1 className="display-md mt-6">This page didn't load.</h1>
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-brut btn-solid"
          >
            <span>Try again</span>
          </button>
          <a href="/" className="btn-brut btn-outline">
            <span>Go home</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: `${SITE_NAME} — Real Estate Development` },
      {
        name: "description",
        content:
          "Everlong Development turns land, capital and development complexity into executable real estate opportunities.",
      },
      { name: "author", content: SITE_NAME },
      { name: "theme-color", content: "#F5F3EE" },
      { name: "msapplication-TileColor", content: "#163A2D" },
      { name: "color-scheme", content: "light" },
      { name: "format-detection", content: "telephone=no" },
      { name: "application-name", content: SITE_NAME },
      { name: "apple-mobile-web-app-title", content: SITE_NAME },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "referrer", content: "strict-origin-when-cross-origin" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preload", href: "/fonts/space-grotesk-latin.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/ibm-plex-mono-500-latin.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "mask-icon", href: "/favicon.svg", color: "#3E6A4F" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationJsonLd()),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const firstNav = useRef(true);

  useEffect(() => {
    if (firstNav.current) {
      firstNav.current = false;
      return;
    }
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <SkipLink />
      <NavProgress />
      <PageWipe />
      <Cursor />
      <Header />
      <main id="main" tabIndex={-1}>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
