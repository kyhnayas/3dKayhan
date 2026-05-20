"use client";

import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";

interface FooterProps {
  theme: "light" | "dark";
}

export default function Footer({ theme }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`relative z-20 overflow-hidden transition-colors duration-500 border-t ${
        theme === "dark"
          ? "bg-[#070b19] border-white/5"
          : "bg-[#f9fafb] border-slate-200"
      }`}
    >
      {/* Visual Accent Top Line */}
      <div
        className={`h-[2px] w-full opacity-60 ${
          theme === "dark"
            ? "bg-gradient-to-r from-transparent via-brand-cyan to-transparent"
            : "bg-black"
        }`}
      />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          {/* Column 1: Brand details (col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#home" className="inline-block">
              <Image
                src={
                  theme === "dark"
                    ? "/assets/logo-dark.svg"
                    : "/assets/logo.svg"
                }
                alt="3D Kayhan Logo"
                width={140}
                height={36}
                className="h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                priority
              />
            </a>
            <p
              className={`text-sm font-light leading-relaxed max-w-sm transition-colors duration-500 ${
                theme === "dark" ? "text-gray-400" : "text-slate-600"
              }`}
            >
              Blender ile üst düzey fotogerçekçi 3D mimari renderlar, ürün
              tasarımları ve video animasyonları; Next.js ile yüksek
              performanslı, SEO uyumlu web uygulamaları üretiyorum.
            </p>
          </div>

          {/* Column 2: Quick Links (col-span-2) */}
          <div className="lg:col-span-2 lg:ml-8 space-y-4">
            <h4
              className={`font-bebas text-lg tracking-widest font-bold ${
                theme === "dark" ? "text-brand-cyan" : "text-black"
              }`}
            >
              NAVİGASYON
            </h4>
            <ul
              className={`space-y-2.5 text-sm font-light transition-colors duration-500 ${
                theme === "dark" ? "text-gray-400" : "text-slate-600"
              }`}
            >
              <li>
                <a
                  href="#home"
                  className={`hover:underline transition-colors ${
                    theme === "dark" ? "hover:text-white" : "hover:text-black"
                  }`}
                >
                  Giriş
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className={`hover:underline transition-colors ${
                    theme === "dark" ? "hover:text-white" : "hover:text-black"
                  }`}
                >
                  Projeler
                </a>
              </li>
              <li>
                <a
                  href="#me"
                  className={`hover:underline transition-colors ${
                    theme === "dark" ? "hover:text-white" : "hover:text-black"
                  }`}
                >
                  Hakkımda
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`hover:underline transition-colors ${
                    theme === "dark" ? "hover:text-white" : "hover:text-black"
                  }`}
                >
                  İletişim
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact details (col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4
              className={`font-bebas text-lg tracking-widest font-bold ${
                theme === "dark" ? "text-brand-cyan" : "text-black"
              }`}
            >
              İLETİŞİM BİLGİLERİ
            </h4>
            <ul
              className={`space-y-3 text-sm font-light transition-colors duration-500 ${
                theme === "dark" ? "text-gray-400" : "text-slate-600"
              }`}
            >
              <li className="flex items-center gap-2.5">
                <Mail
                  size={14}
                  className={
                    theme === "dark" ? "text-brand-purple" : "text-black"
                  }
                />
                <a
                  href="mailto:3d@kayhanayas.com"
                  className={`transition-colors ${
                    theme === "dark" ? "hover:text-white" : "hover:text-black"
                  }`}
                >
                  3d@kayhanayas.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone
                  size={14}
                  className={
                    theme === "dark" ? "text-brand-purple" : "text-black"
                  }
                />
                <a
                  href="tel:+905333278184"
                  className={`transition-colors ${
                    theme === "dark" ? "hover:text-white" : "hover:text-black"
                  }`}
                >
                  +90 533 327 81 84
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin
                  size={14}
                  className={
                    theme === "dark"
                      ? "text-brand-purple mt-0.5"
                      : "text-black mt-0.5"
                  }
                />
                <span className="leading-snug">
                  Adapazarı, Sakarya, Çark Caddesi
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Accounts (col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4
              className={`font-bebas text-lg tracking-widest font-bold ${
                theme === "dark" ? "text-brand-cyan" : "text-black"
              }`}
            >
              SOSYAL MEDYA
            </h4>
            <p
              className={`text-xs font-mono ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}
            >
              @kyhnayas
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/kyhnayas"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all duration-300 border ${
                  theme === "dark"
                    ? "glass border-white/5 text-gray-400 hover:text-brand-cyan hover:scale-110"
                    : "bg-slate-100 border-slate-200 text-slate-600 hover:text-black hover:bg-slate-200 hover:scale-110"
                }`}
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://facebook.com/kyhnayas"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all duration-300 border ${
                  theme === "dark"
                    ? "glass border-white/5 text-gray-400 hover:text-brand-cyan hover:scale-110"
                    : "bg-slate-100 border-slate-200 text-slate-600 hover:text-black hover:bg-slate-200 hover:scale-110"
                }`}
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://youtube.com/@kyhnayas"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all duration-300 border ${
                  theme === "dark"
                    ? "glass border-white/5 text-gray-400 hover:text-brand-cyan hover:scale-110"
                    : "bg-slate-100 border-slate-200 text-slate-600 hover:text-black hover:bg-slate-200 hover:scale-110"
                }`}
                aria-label="YouTube"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19c1.71.46 8.59.46 8.59.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
            <span
              className={`text-[10px] block font-mono hover:underline cursor-pointer transition-colors duration-500 ${
                theme === "dark" ? "text-gray-500" : "text-slate-400"
              }`}
            >
              3d.kayhanayas.com
            </span>
          </div>
        </div>

        {/* Sub-Footer Divider */}
        <div
          className={`mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono transition-colors duration-500 ${
            theme === "dark"
              ? "border-white/5 text-gray-500"
              : "border-slate-200 text-slate-400"
          }`}
        >
          <div>
            &copy; {new Date().getFullYear()} KAYHAN AYAS. TÜM HAKLARI SAKLIDIR.
          </div>

          <button
            onClick={handleScrollToTop}
            className={`px-4 py-2 rounded-sm flex items-center gap-1.5 transition-all duration-300 group shadow-md cursor-pointer border ${
              theme === "dark"
                ? "glass border-white/5 text-gray-400 hover:text-brand-cyan hover:border-brand-cyan/30"
                : "bg-white border-slate-200 text-slate-600 hover:text-black hover:bg-slate-50"
            }`}
          >
            YUKARI DÖN{" "}
            <ArrowUp
              size={12}
              className="transition-transform duration-300 group-hover:-translate-y-1"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
