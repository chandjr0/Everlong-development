export type NavItem = { label: string; to: string };

export const primaryNav: NavItem[] = [
  { label: "Projects", to: "/projects" },
  { label: "Approach", to: "/approach" },
  { label: "Company", to: "/company" },
  { label: "Insights", to: "/insights" },
];

export const contactNav: NavItem = { label: "Contact", to: "/contact" };
