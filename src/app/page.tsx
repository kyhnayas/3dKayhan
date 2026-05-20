import PortfolioContainer from "@/components/PortfolioContainer";
import { getAllProjects, getHeroAccordionProjects } from "@/lib/projects";

// Next.js static generation optimization
export const revalidate = 3600; // Revalidate every hour

export default function Home() {
  // Read Markdown project data server-side
  const allProjects = getAllProjects();
  const heroProjects = getHeroAccordionProjects();

  return (
    <PortfolioContainer projects={allProjects} heroProjects={heroProjects} />
  );
}

