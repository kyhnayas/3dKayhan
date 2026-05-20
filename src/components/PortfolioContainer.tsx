"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroAccordion from "@/components/HeroAccordion";
import ProjectGallery from "@/components/ProjectGallery";
import Me from "@/components/Me";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { Project } from "@/lib/projects";

interface PortfolioContainerProps {
  projects: Project[];
  heroProjects: Project[];
}

export default function PortfolioContainer({ projects, heroProjects }: PortfolioContainerProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Sync theme with localStorage & system preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div 
      className={`min-h-screen flex flex-col transition-colors duration-500 selection:bg-brand-cyan/30 ${
        theme === "dark" 
          ? "bg-[#030712] text-gray-100" 
          : "bg-white text-slate-900"
      }`}
    >
      {/* Header receives theme state and toggle controller */}
      <Header theme={theme} toggleTheme={toggleTheme} />
      
      <main className="flex-grow">
        {/* All components styled conditionally based on active theme */}
        <HeroAccordion projects={heroProjects} theme={theme} />
        
        <ProjectGallery projects={projects} theme={theme} />
        
        <Me theme={theme} />
        
        <ContactForm theme={theme} />
      </main>
      
      <Footer theme={theme} />
    </div>
  );
}
