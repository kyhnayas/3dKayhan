"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function NotFound() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 transition-colors duration-500 ${
        theme === "dark" ? "bg-[#030712] text-white" : "bg-white text-slate-900"
      }`}
    >
      <div className="text-center space-y-8">
        <div>
          <h1 className="font-bebas text-9xl md:text-[150px] font-bold tracking-wider text-brand-cyan">
            404
          </h1>
          <p
            className={`text-xl md:text-2xl font-semibold mt-4 ${
              theme === "dark" ? "text-gray-300" : "text-slate-600"
            }`}
          >
            Sayfa Bulunamadı
          </p>
        </div>

        <p
          className={`text-base md:text-lg max-w-md mx-auto leading-relaxed ${
            theme === "dark" ? "text-gray-400" : "text-slate-500"
          }`}
        >
          Aradığınız sayfa mevcut değil. Lütfen ana sayfaya dönüp arama yapınız.
        </p>

        <Link
          href="/"
          className={`inline-flex items-center gap-2 px-8 py-3 font-bebas text-lg tracking-wider rounded-sm transition-colors duration-300 font-bold ${
            theme === "dark"
              ? "bg-brand-cyan text-black hover:bg-cyan-300"
              : "bg-black text-white hover:bg-slate-800"
          }`}
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
