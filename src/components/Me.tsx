"use client";

import { motion } from "framer-motion";
import { User, ShieldCheck, Flame, Compass } from "lucide-react";

interface MeProps {
  theme: "light" | "dark";
}

export default function Me({ theme }: MeProps) {
  const skills = [
    "3D Art Direction",
    "3D İç Mekan Görselleştirme",
    "Blender & Cycles / EEVEE",
    "Fotogerçekçi Mimari Render",
    "Ürün Animasyonu & Simülasyonu",
    "Next.js & React Web Geliştirme",
    "Tailwind CSS & Tasarım Sistemleri",
    "SEO & Performans Optimizasyonu",
  ];

  const stats = [
    { value: "8+", label: "YILLIK DENEYİM", icon: <Flame size={20} className={theme === "dark" ? "text-brand-cyan" : "text-black"} /> },
    { value: "100+", label: "MUTLU MÜŞTERİ", icon: <ShieldCheck size={20} className={theme === "dark" ? "text-brand-cyan" : "text-black"} /> },
    { value: "150+", label: "TAMAMLANAN PROJE", icon: <Compass size={20} className={theme === "dark" ? "text-brand-cyan" : "text-black"} /> },
  ];

  return (
    <section 
      id="me" 
      className={`py-24 px-6 relative overflow-hidden transition-colors duration-500 border-y ${
        theme === "dark" 
          ? "bg-[#070b19] border-white/5" 
          : "bg-[#f9fafb] border-slate-200"
      }`}
    >
      {/* Background Decorative Gradient Ball */}
      <div className={`absolute right-0 bottom-0 w-96 h-96 rounded-full filter blur-[100px] pointer-events-none ${
        theme === "dark" ? "bg-brand-cyan/5" : "bg-slate-200/30"
      }`} />
      <div className={`absolute left-0 top-0 w-96 h-96 rounded-full filter blur-[100px] pointer-events-none ${
        theme === "dark" ? "bg-brand-purple/5" : "bg-slate-200/30"
      }`} />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading and Stats */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className={`text-xs uppercase font-mono tracking-[0.3em] flex items-center gap-2 ${
                theme === "dark" ? "text-brand-cyan" : "text-black font-semibold"
              }`}>
                <User size={12} /> ART DİREKTÖR & GELİŞTİRİCİ
              </span>
              <h2 className={`font-bebas text-5xl md:text-7xl font-bold tracking-tight mt-2 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}>
                KAYHAN AYAS
              </h2>
              <div className={`h-1 w-20 mt-4 ${
                theme === "dark" 
                  ? "bg-gradient-to-r from-brand-cyan to-brand-purple" 
                  : "bg-black"
              }`} />
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className={`p-4 rounded-sm flex flex-col items-center text-center gap-1.5 shadow-lg border transition-all duration-500 ${
                    theme === "dark"
                      ? "glass border-white/5 shadow-black/25"
                      : "bg-white border-slate-200 shadow-slate-200/10"
                  }`}
                >
                  {stat.icon}
                  <span className={`font-bebas text-3xl md:text-4xl font-bold tracking-wider ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}>{stat.value}</span>
                  <span className={`text-[9px] md:text-[10px] font-mono tracking-widest font-medium leading-none ${
                    theme === "dark" ? "text-gray-400" : "text-slate-500"
                  }`}>{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Biography and Skill Badges */}
          <div className="lg:col-span-7 space-y-8">
            <div className={`p-6 md:p-10 rounded-sm shadow-xl border relative transition-all duration-500 ${
              theme === "dark"
                ? "glass border-white/5 shadow-black/30"
                : "bg-white border-slate-200 shadow-slate-200/10"
            }`}>
              <span className={`absolute top-0 right-0 w-24 h-24 rounded-full filter blur-xl pointer-events-none ${
                theme === "dark" ? "bg-brand-cyan/5" : "bg-slate-100/50"
              }`} />
              
              {/* Biographical Statement */}
              <p className={`text-base md:text-lg font-light leading-relaxed mb-8 transition-colors duration-500 ${
                theme === "dark" ? "text-gray-300" : "text-slate-700"
              }`}>
                Art Direktörlük, 3D iç mekan görselleştirme ve modern web geliştirme alanlarında yılların verdiği deneyimle çalışıyorum. Sakarya merkezli olarak İstanbul dahil tüm Türkiye'ye hizmet veriyorum. Blender ile fotogerçekçi 3D görselleştirmeler, mimari renders ve ürün animasyonları üretiyorum. Next.js ile performanslı, SEO uyumlu kurumsal ve e-ticaret web siteleri geliştiriyorum.
              </p>

              {/* Expertises Title */}
              <h4 className={`text-xs uppercase font-mono tracking-[0.2em] mb-4 pb-2 border-b transition-colors duration-500 ${
                theme === "dark" ? "text-white/70 border-white/10" : "text-slate-600 border-slate-200"
              }`}>
                UZMANLIK ALANLARI
              </h4>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`text-xs font-mono transition-all duration-300 px-3 py-1.5 rounded-sm cursor-default border ${
                      theme === "dark"
                        ? "text-gray-300 bg-white/5 border-white/5 hover:border-brand-cyan/35 hover:bg-brand-cyan/5"
                        : "text-slate-700 bg-slate-50 border-slate-200 hover:border-black hover:bg-slate-100"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
