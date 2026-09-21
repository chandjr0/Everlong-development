export type Insight = {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
};

export const insights: Insight[] = [
  {
    id: "INS-001",
    title: "The cost of unresolved complexity",
    slug: "cost-of-unresolved-complexity",
    category: "Development Strategy",
    date: "2026.03",
    readTime: "6 min",
    excerpt:
      "Most stalled sites are not badly located. They are badly understood. What a constraint actually costs when it is discovered late.",
  },
  {
    id: "INS-002",
    title: "Reading land before reading the market",
    slug: "reading-land-before-market",
    category: "Land",
    date: "2026.02",
    readTime: "5 min",
    excerpt:
      "Physical and legal condition sets the ceiling on any site. Market appetite only decides how close you get to it.",
  },
  {
    id: "INS-003",
    title: "Capital that matches the phase it funds",
    slug: "capital-matched-to-phase",
    category: "Investment",
    date: "2026.01",
    readTime: "7 min",
    excerpt:
      "Land, approvals and vertical construction carry different risk. Funding them on the same terms is how timelines break.",
  },
  {
    id: "INS-004",
    title: "Urban growth happens at the edges of the code",
    slug: "growth-at-the-edges-of-code",
    category: "Urban Growth",
    date: "2025.11",
    readTime: "5 min",
    excerpt:
      "The most useful density is rarely the most visible. Where overlays, frontage rules and servicing capacity quietly decide form.",
  },
];
