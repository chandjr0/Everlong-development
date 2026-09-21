import founderJpg from "@/assets/founder.jpg";
import founderWebp from "@/assets/founder.webp";
import heroJpg from "@/assets/hero-land.jpg";
import heroWebp from "@/assets/hero-land.webp";
import planJpg from "@/assets/process-plan.jpg";
import planWebp from "@/assets/process-plan.webp";
import projectOneJpg from "@/assets/project-01.jpg";
import projectOneWebp from "@/assets/project-01.webp";
import projectTwoJpg from "@/assets/project-02.jpg";
import projectTwoWebp from "@/assets/project-02.webp";
import projectThreeJpg from "@/assets/project-03.jpg";
import projectThreeWebp from "@/assets/project-03.webp";

const webpBySrc: Record<string, string> = {
  [founderJpg]: founderWebp,
  [heroJpg]: heroWebp,
  [planJpg]: planWebp,
  [projectOneJpg]: projectOneWebp,
  [projectTwoJpg]: projectTwoWebp,
  [projectThreeJpg]: projectThreeWebp,
};

export function webpFor(src: string) {
  return webpBySrc[src];
}
