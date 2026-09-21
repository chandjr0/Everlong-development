import projectOne from "@/assets/project-01.jpg";
import projectTwo from "@/assets/project-02.jpg";
import projectThree from "@/assets/project-03.jpg";
import planImage from "@/assets/process-plan.jpg";

export type ProjectStatus = "Planning" | "Development" | "Completed" | "Opportunity";

export type Project = {
  id: string;
  title: string;
  slug: string;
  location: string;
  coordinates: string;
  type: string;
  status: ProjectStatus;
  year: string;
  description: string;
  overview: string;
  opportunity: string;
  process: string;
  outcome: string;
  cover: string;
  images: { src: string; alt: string }[];
  facts: { label: string; value: string }[];
  timeline: { phase: string; period: string }[];
};

/**
 * Placeholder development records. Structure is production-ready:
 * replace the entries below with verified project data.
 */
export const projects: Project[] = [
  {
    id: "EVL-001",
    title: "Corridor Block",
    slug: "corridor-block",
    location: "Placeholder — Metro North",
    coordinates: "00.0000° N / 00.0000° W",
    type: "Mixed-use infill",
    status: "Development",
    year: "2026",
    description:
      "A constrained urban block assembled from three separate titles and repositioned for mid-rise residential above ground-floor commercial.",
    overview:
      "Three adjoining parcels, each individually undevelopable, consolidated into a single position with a coherent frontage and servicing strategy.",
    opportunity:
      "Fragmented ownership and an outdated zoning overlay held the block below its permitted density for over a decade.",
    process:
      "Assembly negotiated in sequence rather than in parallel, with entitlement work started before the final parcel closed to compress the approvals timeline.",
    outcome:
      "A consented mid-rise scheme with a delivery programme structured around phased capital draws.",
    cover: projectOne,
    images: [
      { src: projectOne, alt: "Concrete structural frame under construction" },
      { src: planImage, alt: "Architectural site plan drawing with drafting tools" },
    ],
    facts: [
      { label: "Site area", value: "Placeholder" },
      { label: "Program", value: "Residential / Commercial" },
      { label: "Structure", value: "Cast-in-place concrete" },
      { label: "Phase", value: "Construction" },
    ],
    timeline: [
      { phase: "Assembly", period: "Phase 01" },
      { phase: "Entitlement", period: "Phase 02" },
      { phase: "Construction", period: "Phase 03" },
    ],
  },
  {
    id: "EVL-002",
    title: "Quarter Study",
    slug: "quarter-study",
    location: "Placeholder — Inner Ring",
    coordinates: "00.0000° N / 00.0000° W",
    type: "Masterplan study",
    status: "Planning",
    year: "2026",
    description:
      "A block-scale massing study testing how far density can be pushed before servicing cost overtakes the value it creates.",
    overview:
      "A planning-stage exercise in yield discipline: five massing options modelled against the same infrastructure and cost base.",
    opportunity:
      "Existing frontage patterns allowed a materially better plan without exceeding permitted height.",
    process:
      "Physical and digital massing tested in parallel, with each option carried through to a costed feasibility rather than stopping at form.",
    outcome:
      "A preferred option carried forward to pre-application, with two alternates retained as fallback positions.",
    cover: projectTwo,
    images: [
      { src: projectTwo, alt: "Grey chipboard architectural massing model of an urban block" },
      { src: planImage, alt: "Architectural site plan drawing with drafting tools" },
    ],
    facts: [
      { label: "Scope", value: "Feasibility" },
      { label: "Options tested", value: "Five" },
      { label: "Output", value: "Preferred massing" },
      { label: "Phase", value: "Pre-application" },
    ],
    timeline: [
      { phase: "Analysis", period: "Phase 01" },
      { phase: "Massing", period: "Phase 02" },
      { phase: "Pre-application", period: "Phase 03" },
    ],
  },
  {
    id: "EVL-003",
    title: "Treeline Parcel",
    slug: "treeline-parcel",
    location: "Placeholder — Outer Corridor",
    coordinates: "00.0000° N / 00.0000° W",
    type: "Serviced land",
    status: "Opportunity",
    year: "2027",
    description:
      "A staked and partially serviced parcel held for phased release, with servicing capacity confirmed ahead of any design commitment.",
    overview:
      "Raw land with an unusually clean title position and a servicing route already in place along the northern boundary.",
    opportunity:
      "The parcel is priced as raw land while carrying most of the infrastructure needed to move directly to entitlement.",
    process:
      "Survey, environmental screening and capacity confirmation completed before the position was taken.",
    outcome:
      "Held as a live opportunity pending capital pairing and a defined end use.",
    cover: projectThree,
    images: [
      { src: projectThree, alt: "Empty gravel development parcel with survey stakes and treeline" },
    ],
    facts: [
      { label: "Condition", value: "Cleared and staked" },
      { label: "Servicing", value: "Confirmed to boundary" },
      { label: "Title", value: "Unencumbered" },
      { label: "Phase", value: "Held" },
    ],
    timeline: [
      { phase: "Diligence", period: "Phase 01" },
      { phase: "Capital pairing", period: "Phase 02" },
      { phase: "Entitlement", period: "Phase 03" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
