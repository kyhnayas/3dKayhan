"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/projects";

interface HeroAccordionProps {
  projects: Project[];
  theme: "light" | "dark";
}

export default function HeroAccordion({ projects, theme }: HeroAccordionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // YENİ EKLENDİ: Videoların en-boy oranlarını (aspect ratio) takip edecek state
  const [aspectRatios, setAspectRatios] = useState<Record<number, number>>({});

  // Adapt to screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Control autoplay state on accordion expansion
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      const targetIndex = isMobile ? activeIndex : hoveredIndex;
      const isExpanded = isMobile
        ? activeIndex === index
        : hoveredIndex === index || (hoveredIndex === null && index === 0);

      if (isExpanded) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [hoveredIndex, activeIndex, isMobile]);

  const activeDesktopIndex = hoveredIndex !== null ? hoveredIndex : 0;

  // Mockup category name mapping helper
  const getVerticalLabel = (category: string) => {
    const upperCat = category.toUpperCase();
    if (upperCat.includes("ARCH")) return "ARCHITECTURE";
    if (upperCat.includes("PROD")) return "Product";
    if (upperCat.includes("AD")) return "Ads.";
    if (upperCat.includes("ANIM")) return "ANIMATION";
    return category;
  };

  return (
    <section
      id="home"
      className={`relative h-screen w-full overflow-hidden transition-colors duration-500 flex flex-col justify-end ${
        theme === "dark" ? "bg-[#030712]" : "bg-white"
      }`}
    >
      {/* Background Decorative Grid */}
      <div
        className={`absolute inset-0 [background-size:24px_24px] opacity-15 pointer-events-none z-10 ${
          theme === "dark"
            ? "bg-[radial-gradient(#1f2937_1px,transparent_1px)]"
            : "bg-[radial-gradient(#e2e8f0_1px,transparent_1px)]"
        }`}
      />

      {/* Slices Container with high-end top/bottom gradient masking */}
      <div
        className={`absolute inset-x-0 transition-all duration-500 flex ${
          isMobile
            ? "top-16 bottom-16 flex-col py-6"
            : "top-28 bottom-24 flex-row px-12 gap-0.5"
        }`}
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        {projects.map((project, index) => {
          const isExpanded = isMobile
            ? activeIndex === index
            : activeDesktopIndex === index;

          // YENİ EKLENDİ: Videonun yatay mı dikey mi olduğunu algıla
          const videoRatio = aspectRatios[index] || 1.77; // Varsayılan 16:9 yatay
          const isVertical = videoRatio < 1; // Genişlik yüksekliğe göre küçükse dikeydir

          // YENİ EKLENDİ: Dinamik "flex" genişliği hesaplaması
          // Dikey ise (flex: 2.2) daha dar bir alanda açılır, Yatay ise (flex: 4.5) genişler.
          const expandedFlexDesktop = isVertical ? 2.2 : 4.5;
          const expandedFlexMobile = isVertical ? 2.2 : 3.5;
          const targetFlex = isExpanded
            ? isMobile
              ? expandedFlexMobile
              : expandedFlexDesktop
            : 1;

          return (
            <motion.div
              key={project.slug}
              onClick={() => isMobile && setActiveIndex(index)}
              onMouseEnter={() => !isMobile && setHoveredIndex(index)}
              onMouseLeave={() => !isMobile && setHoveredIndex(null)}
              className={`relative overflow-hidden cursor-pointer flex flex-col justify-end transition-colors duration-500 ${
                isMobile
                  ? theme === "dark"
                    ? "border-b border-white/5 last:border-b-0"
                    : "border-b border-slate-100 last:border-b-0"
                  : theme === "dark"
                    ? "border-r border-white/5 last:border-r-0"
                    : "border-r border-slate-200/60 last:border-r-0"
              }`}
              initial={{ flex: 1 }}
              animate={{
                flex: targetFlex, // Burada dinamik oranı atıyoruz
              }}
              transition={{
                type: "spring",
                stiffness: 110,
                damping: 22,
                mass: 0.85,
              }}
            >
              {/* Media Thumbnail */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
                style={{ backgroundImage: `url('${project.image}')` }}
              />

              {/* Autoplaying Video */}
              {project.video && (
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={project.video}
                  muted
                  loop
                  playsInline
                  // YENİ EKLENDİ: Video yüklendiğinde boyut oranını okuyup state'e kaydediyoruz
                  onLoadedMetadata={(e) => {
                    const video = e.currentTarget;
                    setAspectRatios((prev) => ({
                      ...prev,
                      [index]: video.videoWidth / video.videoHeight,
                    }));
                  }}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    isExpanded ? "opacity-100" : "opacity-0"
                  }`}
                  poster={project.image}
                />
              )}

              {/* Shading overlay for text legibility */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-500 z-10 ${
                  isExpanded ? "opacity-80" : "opacity-45"
                }`}
              />

              {/* DÜZELTİLEN KISIM: Kategori Başlığı Alanı */}
              <motion.div
                className={`absolute inset-0 flex flex-col z-30 pointer-events-none ${
                  isMobile ? "justify-center" : "justify-end pb-16 md:pb-24"
                }`}
                animate={{
                  alignItems: isExpanded
                    ? isMobile
                      ? "center"
                      : "flex-end"
                    : "center",
                  paddingRight: isExpanded
                    ? isMobile
                      ? "0px"
                      : "48px"
                    : "0px",
                }}
                transition={{
                  type: "spring",
                  stiffness: 110,
                  damping: 22,
                }}
              >
                <motion.span
                  style={
                    isMobile
                      ? {} // Mobilde stil yok (Normal yatay yazılır)
                      : {
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                        }
                  }
                  className={`font-bebas text-white font-bold select-none whitespace-nowrap tracking-wider drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)] ${
                    isMobile ? "text-4xl" : "text-6xl md:text-8xl"
                  }`}
                  animate={{
                    scale: isExpanded ? 0.9 : 1,
                    opacity: isExpanded && isMobile ? 0 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 18,
                  }}
                >
                  {isMobile
                    ? project.category.toUpperCase()
                    : getVerticalLabel(project.category)}
                </motion.span>
              </motion.div>
              
              {/* Expanded details container (Left side) */}
              <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end z-20 select-none">
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      // YENİ EKLENDİ: Dikey açıldığında alan daralacağı için yazı alanını (max-w) dinamik olarak esnetiyoruz
                      className={`flex flex-col gap-2.5 text-left pb-4 md:pb-8 ${
                        isVertical
                          ? "max-w-[95%] md:max-w-[85%]"
                          : "max-w-[75%] md:max-w-[65%]"
                      }`}
                    >
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] font-mono tracking-widest text-brand-cyan glass px-2.5 py-1 rounded-sm border border-brand-cyan/25">
                          {project.category}
                        </span>
                        {project.client && (
                          <span className="text-[9px] font-mono text-gray-300 uppercase bg-black/40 px-2 py-1 rounded-sm border border-white/5">
                            {project.client}
                          </span>
                        )}
                      </div>

                      {/* Main Title */}
                      <h3 className="font-bebas text-4xl md:text-6xl font-bold tracking-wider text-white leading-none">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-200 font-sans text-xs md:text-sm font-light leading-relaxed max-w-lg line-clamp-3">
                        {project.description || project.subtitle}
                      </p>

                      {/* Client / Tools Details */}
                      {project.software && (
                        <div className="flex items-center gap-2.5 mt-2 text-[10px] font-mono text-brand-cyan/80">
                          <span>USED TOOLS:</span>
                          <span className="text-white bg-white/5 border border-white/5 px-2 py-0.5 rounded-sm">
                            {project.software}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Indicator */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-1 opacity-50 transition-colors duration-500 ${
          theme === "dark" ? "text-gray-400" : "text-slate-600"
        }`}
      >
        <span className="text-[9px] tracking-[0.25em] font-mono uppercase">
          AŞAĞI KAYDIR
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className={`w-1 h-2 rounded-full ${theme === "dark" ? "bg-brand-cyan" : "bg-black"}`}
        />
      </div>
    </section>
  );
}
