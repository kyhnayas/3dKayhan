"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/projects";
import { Play, Tag, HardDrive } from "lucide-react";

interface ProjectGalleryProps {
  projects: Project[];
  theme: "light" | "dark";
}

export default function ProjectGallery({
  projects,
  theme,
}: ProjectGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = [
    "ALL",
    "ARCHITECTURE",
    "PRODUCT",
    "ADVERTISEMENT",
    "ANIMATION",
  ];

  const filteredProjects =
    selectedCategory === "ALL"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  // Split categories for active mockup bold-box highlight
  const getCategorySplit = (cat: string) => {
    if (cat === "ALL") return { prefix: "ALL", suffix: "" };
    if (cat === "ARCHITECTURE") return { prefix: "ARCH", suffix: "ITECTURE" };
    if (cat === "PRODUCT") return { prefix: "PROD", suffix: "UCT" };
    if (cat === "ADVERTISEMENT") return { prefix: "ADVERT", suffix: "ISMENT" };
    if (cat === "ANIMATION") return { prefix: "ANIM", suffix: "ATION" };
    return { prefix: cat, suffix: "" };
  };

  return (
    <section
      id="projects"
      className={`py-24 px-6 relative z-20 transition-colors duration-500 ${
        theme === "dark" ? "bg-[#030712]" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col mb-8">
          <span
            className={`text-xs uppercase font-mono tracking-[0.3em] ${
              theme === "dark" ? "text-brand-cyan" : "text-black font-semibold"
            }`}
          >
            PORTFOLYO
          </span>
          <h2
            className={`font-bebas text-5xl md:text-7xl font-bold tracking-tight mt-2 ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            SEÇKİN ÇALIŞMALAR
          </h2>
        </div>

        {/* Mockup Categories Filter Bar with top-bottom borders */}
        <div
          className={`border-y py-4 flex flex-wrap items-center gap-6 md:gap-10 transition-colors duration-500 mb-12 ${
            theme === "dark" ? "border-white/10" : "border-slate-200"
          }`}
        >
          {/* Static Label on Left */}
          <div
            className={`font-bebas text-md md:text-lg tracking-wider px-3 py-1 font-bold ${
              theme === "dark" ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            CATAGORIES
          </div>

          {/* Interactive Categories */}
          <div className="flex flex-wrap items-center gap-x-6 md:gap-x-10 gap-y-3">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              const { prefix, suffix } = getCategorySplit(category);

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="font-bebas text-lg md:text-xl tracking-wider flex items-center transition-all duration-300 group cursor-pointer"
                >
                  {isActive ? (
                    <div className="flex items-center">
                      <span
                        className={`px-2 py-0.5 font-bold ${
                          theme === "dark"
                            ? "bg-brand-cyan text-black"
                            : "bg-black text-white"
                        }`}
                      >
                        {prefix}
                      </span>
                      {suffix && (
                        <span
                          className={`ml-1 font-bold ${
                            theme === "dark" ? "text-white" : "text-black"
                          }`}
                        >
                          {suffix}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span
                      className={`transition-colors duration-300 uppercase ${
                        theme === "dark"
                          ? "text-gray-400 hover:text-white"
                          : "text-slate-500 hover:text-black"
                      }`}
                    >
                      {category === "ADVERTISEMENT" ? "ADVERTISMENT" : category}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} theme={theme} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div
            className={`text-center py-20 rounded-sm border ${
              theme === "dark"
                ? "glass border-white/5"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <p
              className={
                theme === "dark"
                  ? "text-gray-400 text-lg"
                  : "text-slate-500 text-lg"
              }
            >
              Bu kategoride henüz bir proje bulunmuyor.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* Sub-Component: Project Card with Autoplay Video on Hover */
function ProjectCard({
  project,
  theme,
}: {
  project: Project;
  theme: "light" | "dark";
}) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      onClick={() => router.push(`/projects/${project.slug}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative group aspect-square md:aspect-[16/10] w-full overflow-hidden rounded-sm cursor-pointer shadow-lg transition-all duration-500 border ${
        theme === "dark"
          ? "bg-gray-950 border-white/5 shadow-black/40"
          : "bg-slate-100 border-slate-200/80 shadow-slate-200/10"
      }`}
    >
      {/* Background Image Thumbnail */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url('${project.image}')` }}
      />

      {/* Autoplaying Background Video */}
      {project.video && (
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? "opacity-100 scale-105" : "opacity-0"
          }`}
          poster={project.image}
        />
      )}

      {/* Dark Vignette Overlay (always elegant dark for readability of text labels) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 z-10 transition-opacity duration-300 opacity-75 group-hover:opacity-85" />

      {/* Hover Light Reflection Effect */}
      <span className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/0 via-brand-cyan/5 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Card Content Overlay */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-20">
        {/* Top Badge: Category */}
        <div className="flex justify-between items-start">
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] bg-black/65 backdrop-blur-md text-brand-cyan border border-brand-cyan/20 px-3 py-1 rounded-sm">
            {project.category}
          </span>
          <span className="text-gray-300 text-xs font-mono">
            {project.date.split("-")[0]}
          </span>
        </div>

        {/* Bottom Details */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bebas text-3xl md:text-4xl font-bold tracking-wider text-white transition-colors duration-300 group-hover:text-brand-cyan">
            {project.title}
          </h3>
          <p className="text-xs md:text-sm text-gray-200 line-clamp-2 max-w-md font-light leading-relaxed">
            {project.description || project.subtitle}
          </p>

          {/* Software/Client Tags */}
          <div className="h-0 opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 transition-all duration-500 flex items-center gap-4 mt-3 pt-3 border-t border-white/10 text-[10px] md:text-xs font-mono text-gray-300">
            {project.client && (
              <span className="flex items-center gap-1">
                <Tag size={10} className="text-brand-cyan" /> {project.client}
              </span>
            )}
            {project.software && (
              <span className="flex items-center gap-1">
                <HardDrive size={10} className="text-brand-cyan" />{" "}
                {project.software}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
