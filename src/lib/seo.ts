import { company, founder } from "@/data/company";
import { projects } from "@/data/projects";

export const SITE_URL = "https://everlongdevelopment.com";
export const SITE_NAME = company.name;
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const FOUNDER_OG_IMAGE = `${SITE_URL}/og-founder.jpg`;
export const LOGO_URL = `${SITE_URL}/logo.png`;

export const DEFAULT_KEYWORDS = [
  "Everlong Development",
  "real estate development",
  "land development",
  "land assembly",
  "capital structure",
  "entitlement",
  "feasibility",
  "mixed-use development",
  "execution",
  founder.name,
].join(", ");

const SEGMENT_LABELS: Record<string, string> = {
  projects: "Projects",
  approach: "Approach",
  company: "Company",
  insights: "Insights",
  contact: "Contact",
};

type JsonLd = Record<string, unknown>;

type PageHeadInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  image?: string;
  noindex?: boolean;
  type?: "website" | "article";
  canonical?: boolean;
  jsonLd?: JsonLd | JsonLd[];
};

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path}`;
}

export function keywordsFor(...extra: string[]) {
  return [DEFAULT_KEYWORDS, ...extra].join(", ");
}

export function jsonLdScript(data: JsonLd) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data),
  };
}

export function webPageJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };
}

export function breadcrumbJsonLd(path: string, title: string) {
  const crumbs: { name: string; path: string }[] = [{ name: SITE_NAME, path: "/" }];

  if (path !== "/") {
    const parts = path.split("/").filter(Boolean);
    let acc = "";
    parts.forEach((part, index) => {
      acc += `/${part}`;
      const isLast = index === parts.length - 1;
      crumbs.push({
        name: isLast ? title.replace(` — ${SITE_NAME}`, "") : (SEGMENT_LABELS[part] ?? part),
        path: acc,
      });
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function pageHead({
  title,
  description,
  path,
  keywords = DEFAULT_KEYWORDS,
  image = OG_IMAGE,
  noindex = false,
  type = "website",
  canonical = true,
  jsonLd,
}: PageHeadInput) {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);
  const extra = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const structured = noindex
    ? extra
    : [webPageJsonLd({ title, description, path }), breadcrumbJsonLd(path, title), ...extra];

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { name: "author", content: SITE_NAME },
      {
        name: "robots",
        content: noindex
          ? "noindex, nofollow"
          : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "googlebot", content: noindex ? "noindex, nofollow" : "index, follow" },
      { name: "bingbot", content: noindex ? "noindex, nofollow" : "index, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: type },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: ogImage },
      { property: "og:image:secure_url", content: ogImage },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: title },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
      { name: "twitter:image:alt", content: title },
      { name: "twitter:url", content: url },
    ],
    links: canonical ? [{ rel: "canonical", href: url }] : [],
    scripts: structured.map(jsonLdScript),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        legalName: SITE_NAME,
        url: SITE_URL,
        logo: LOGO_URL,
        image: OG_IMAGE,
        email: company.email,
        description: company.positioning,
        slogan: company.tagline,
        sameAs: [company.linkedin],
        founder: {
          "@type": "Person",
          name: founder.name,
          jobTitle: founder.role,
          image: FOUNDER_OG_IMAGE,
          url: `${SITE_URL}/company`,
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: company.email,
          url: `${SITE_URL}/contact`,
          availableLanguage: "English",
        },
        areaServed: "US",
        knowsAbout: [
          "Real estate development",
          "Land assembly",
          "Capital structuring",
          "Entitlement",
          "Project execution",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: company.intro,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-US",
      },
    ],
  };
}

export const sitemapPaths = [
  "/",
  "/projects",
  ...projects.map((project) => `/projects/${project.slug}`),
  "/approach",
  "/company",
  "/insights",
  "/contact",
];
