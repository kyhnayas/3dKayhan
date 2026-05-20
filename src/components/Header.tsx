"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X, Sun, Moon } from "lucide-react";

interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      // Mobilde menü aç-kapat sırasında scroll olursa menüyü kapat
      setIsMobileMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menü dışında tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        // Menu button'a tıklanmış mı kontrol et
        const menuButton = document.querySelector('[aria-label="Menu"]');
        if (menuButton && !menuButton.contains(event.target as Node)) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: "GİRİŞ", href: "/#home" },
    { label: "PROJELER", href: "/#projects" },
    { label: "HAKKIMDA", href: "/#me" },
    { label: "İLETİŞİM", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? theme === "dark"
            ? "py-4 bg-[#030712]/80 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/25"
            : "py-4 bg-white/85 backdrop-blur-md border-b border-slate-200/60 shadow-md shadow-slate-200/10"
          : "py-6 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left Side: Logo */}
        <a href="/#home" className="flex items-center gap-2 group">
          <Image
            src={
              theme === "dark" ? "/assets/logo-dark.svg" : "/assets/logo.svg"
            }
            alt="3D Kayhan Logo"
            width={140}
            height={36}
            className="h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105"
            style={{ width: "auto" }}
            priority
          />
        </a>

        {/* Center: Desktop Navigation with custom Mockup separators | */}
        <nav className="hidden md:flex items-center">
          {navItems.map((item, index) => (
            <div key={item.label} className="flex items-center">
              <a
                href={item.href}
                className={`font-bebas text-lg tracking-wider transition-colors duration-300 relative py-1 group ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-brand-cyan"
                    : "text-slate-600 hover:text-black"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    theme === "dark" ? "bg-brand-cyan" : "bg-black"
                  }`}
                />
              </a>
              {index < navItems.length - 1 && (
                <span
                  className={`mx-5 text-sm select-none ${
                    theme === "dark" ? "text-white/10" : "text-slate-300"
                  }`}
                >
                  |
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* Right Side: Social Icons & Theme Switcher */}
        <div className="hidden md:flex items-center gap-6">
          {/* Social Icons */}
          <div className="flex items-center gap-4.5">
            <a
              href="https://instagram.com/kyhnayas"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-300 hover:scale-115 ${
                theme === "dark"
                  ? "text-gray-400 hover:text-brand-cyan"
                  : "text-slate-600 hover:text-black"
              }`}
              aria-label="Instagram"
            >
              <svg
                className="w-5 h-5"
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
              className={`transition-all duration-300 hover:scale-115 ${
                theme === "dark"
                  ? "text-gray-400 hover:text-brand-cyan"
                  : "text-slate-600 hover:text-black"
              }`}
              aria-label="Facebook"
            >
              <svg
                className="w-5 h-5"
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
              className={`transition-all duration-300 hover:scale-115 ${
                theme === "dark"
                  ? "text-gray-400 hover:text-brand-cyan"
                  : "text-slate-600 hover:text-black"
              }`}
              aria-label="YouTube"
            >
              <svg
                className="w-5 h-5"
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
            className={`h-5 w-[1px] ${theme === "dark" ? "bg-white/10" : "bg-slate-200"}`}
          />

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 ${
              theme === "dark"
                ? "bg-white/5 text-brand-cyan hover:bg-white/10 border border-white/5"
                : "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200"
            }`}
            aria-label="Temayı Değiştir"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile Action Area */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-1.5 rounded-full cursor-pointer transition-all duration-300 ${
              theme === "dark"
                ? "bg-white/5 text-brand-cyan"
                : "bg-slate-100 text-slate-800"
            }`}
            aria-label="Temayı Değiştir"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`transition-colors ${
              theme === "dark"
                ? "text-gray-400 hover:text-brand-cyan"
                : "text-slate-600 hover:text-black"
            }`}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          className={`md:hidden fixed left-0 right-0 top-20 z-50 flex flex-col justify-start py-8 px-6 border-b transition-all duration-500 max-h-[calc(100vh-80px)] overflow-y-auto ${
            theme === "dark"
              ? "bg-[#030712]/98 backdrop-blur-lg border-white/5"
              : "bg-white/98 backdrop-blur-lg border-slate-200"
          }`}
        >
          <nav className="flex flex-col gap-6 text-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-bebas text-3xl tracking-widest transition-colors ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-brand-cyan"
                    : "text-slate-700 hover:text-black"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex justify-center gap-8 border-t pt-8 border-white/5">
            <a
              href="https://instagram.com/kyhnayas"
              target="_blank"
              rel="noopener noreferrer"
              className={
                theme === "dark"
                  ? "text-gray-400 hover:text-brand-cyan"
                  : "text-slate-600 hover:text-black"
              }
              aria-label="Instagram"
            >
              <svg
                className="w-6 h-6"
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
              className={
                theme === "dark"
                  ? "text-gray-400 hover:text-brand-cyan"
                  : "text-slate-600 hover:text-black"
              }
              aria-label="Facebook"
            >
              <svg
                className="w-6 h-6"
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
              className={
                theme === "dark"
                  ? "text-gray-400 hover:text-brand-cyan"
                  : "text-slate-600 hover:text-black"
              }
              aria-label="YouTube"
            >
              <svg
                className="w-6 h-6"
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
        </div>
      )}
    </header>
  );
}
