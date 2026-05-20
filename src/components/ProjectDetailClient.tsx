"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Project } from "@/lib/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Tag, HardDrive, Calendar } from "lucide-react";

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({
  project,
}: ProjectDetailClientProps) {
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
      {/* Header with theme support */}
      <Header theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          {/* Hero Section with Image/Video */}
          <section className="space-y-6">
            {project.video ? (
              <video
                src={project.video}
                controls
                playsInline
                poster={project.image}
                className={`w-full aspect-video object-cover rounded-sm border shadow-2xl shadow-brand-cyan/20 transition-colors duration-500 ${
                  theme === "dark" ? "border-white/10" : "border-slate-200/80"
                }`}
              />
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className={`w-full aspect-video object-cover rounded-sm border shadow-2xl shadow-brand-cyan/20 transition-colors duration-500 ${
                  theme === "dark" ? "border-white/10" : "border-slate-200/80"
                }`}
              />
            )}

            {/* Project Title & Metadata */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`text-xs font-mono uppercase tracking-[0.3em] border px-3 py-1 rounded-sm transition-colors duration-500 ${
                    theme === "dark"
                      ? "bg-brand-cyan/10 border-brand-cyan/30 text-brand-cyan"
                      : "bg-black/10 border-black/30 text-black"
                  }`}
                >
                  {project.category}
                </span>
                <span
                  className={`text-xs font-mono flex items-center gap-1 transition-colors duration-500 ${
                    theme === "dark" ? "text-gray-400" : "text-slate-500"
                  }`}
                >
                  <Calendar size={14} />
                  {new Date(project.date).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <h1
                className={`font-bebas text-5xl md:text-6xl font-bold tracking-wider transition-colors duration-500 ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                {project.title}
              </h1>

              <p
                className={`text-lg leading-relaxed max-w-3xl transition-colors duration-500 ${
                  theme === "dark" ? "text-gray-300" : "text-slate-600"
                }`}
              >
                {project.subtitle}
              </p>

              {/* Project Details Grid */}
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t transition-colors duration-500 ${
                  theme === "dark" ? "border-white/10" : "border-slate-200"
                }`}
              >
                {project.client && (
                  <div className="space-y-2">
                    <span
                      className={`text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors duration-500 ${
                        theme === "dark" ? "text-gray-400" : "text-slate-500"
                      }`}
                    >
                      <Tag size={14} className="text-brand-cyan" />
                      Müşteri
                    </span>
                    <p
                      className={`text-base font-medium transition-colors duration-500 ${
                        theme === "dark" ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {project.client}
                    </p>
                  </div>
                )}

                {project.software && (
                  <div className="space-y-2">
                    <span
                      className={`text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors duration-500 ${
                        theme === "dark" ? "text-gray-400" : "text-slate-500"
                      }`}
                    >
                      <HardDrive size={14} className="text-brand-cyan" />
                      Yazılım
                    </span>
                    <p
                      className={`text-base font-medium transition-colors duration-500 ${
                        theme === "dark" ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {project.software}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Project Content */}
          <section
            className={`space-y-6 leading-relaxed transition-colors duration-500 ${
              theme === "dark" ? "text-gray-200" : "text-slate-700"
            }`}
          >
            <div
              className="space-y-4"
              dangerouslySetInnerHTML={{ __html: project.contentHtml }}
            />
          </section>

          {/* Navigation to Other Projects */}
          <section
            className={`pt-12 border-t transition-colors duration-500 ${
              theme === "dark" ? "border-white/10" : "border-slate-200"
            }`}
          >
            <Link
              href="/#projects"
              className={`inline-flex items-center gap-2 px-6 py-3 font-bebas text-lg tracking-wider rounded-sm transition-colors duration-300 font-bold ${
                theme === "dark"
                  ? "bg-brand-cyan text-black hover:bg-cyan-300"
                  : "bg-black text-white hover:bg-slate-800"
              }`}
            >
              <ArrowLeft size={20} />
              Diğer Projeleri Gör
            </Link>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer theme={theme} />
    </div>
  );
}
