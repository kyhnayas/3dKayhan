"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface ContactFormProps {
  theme: "light" | "dark";
}

export default function ContactForm({ theme }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setStatusMsg(
        "Lütfen gerekli tüm alanları (Ad, E-posta, Mesaj) doldurunuz.",
      );
      return;
    }

    setStatus("loading");
    setStatusMsg("Mesajınız gönderiliyor...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setStatusMsg(data.message || "Mesajınız başarıyla iletildi!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setStatusMsg(data.error || "Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setStatusMsg(
        "Sunucu ile bağlantı kurulamadı. Lütfen internetinizi kontrol edin.",
      );
    }
  };

  const contactDetails = [
    {
      icon: (
        <Mail
          className={theme === "dark" ? "text-brand-cyan" : "text-black"}
          size={22}
        />
      ),
      label: "E-POSTA ADRESİ",
      value: "kyhnayas@gmail.com",
      href: "mailto:kyhnayas@gmail.com",
    },
    {
      icon: (
        <Phone
          className={theme === "dark" ? "text-brand-cyan" : "text-black"}
          size={22}
        />
      ),
      label: "TELEFON & WHATSAPP",
      value: "+90 533 327 81 84",
      href: "https://wa.me/905333278184",
    },
    {
      icon: (
        <MapPin
          className={theme === "dark" ? "text-brand-cyan" : "text-black"}
          size={22}
        />
      ),
      label: "OFİS ADRESİ",
      value: "Adapazarı, Sakarya, Çark Caddesi",
      href: "https://maps.google.com/?q=Adapazari,Sakarya",
    },
  ];

  return (
    <section
      id="contact"
      className={`py-24 px-6 relative z-20 transition-colors duration-500 ${
        theme === "dark" ? "bg-[#030712]" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-16">
          <span
            className={`text-xs uppercase font-mono tracking-[0.3em] ${
              theme === "dark" ? "text-brand-cyan" : "text-black font-semibold"
            }`}
          >
            İLETİŞİM
          </span>
          <h2
            className={`font-bebas text-5xl md:text-7xl font-bold tracking-tight mt-2 ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            BİRLİKTE ÜRETELİM
          </h2>
          <p
            className={`mt-2 text-sm md:text-base font-light max-w-lg ${
              theme === "dark" ? "text-gray-400" : "text-slate-600"
            }`}
          >
            3D görselleştirme, animasyon veya Next.js projeleriniz için mesaj
            bırakın, vizyonunuzu gerçeğe dönüştürelim.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              {contactDetails.map((detail, idx) => (
                <a
                  key={idx}
                  href={detail.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-6 rounded-sm flex items-start gap-4 hover:border-brand-cyan/30 transition-all duration-300 shadow-lg group border ${
                    theme === "dark"
                      ? "glass border-white/5 hover:bg-brand-cyan/5 shadow-black/20"
                      : "bg-white border-slate-200 hover:bg-slate-50 shadow-slate-200/5"
                  }`}
                >
                  <div
                    className={`p-3 rounded-sm transition-transform duration-300 group-hover:scale-110 ${
                      theme === "dark" ? "bg-white/5" : "bg-slate-100"
                    }`}
                  >
                    {detail.icon}
                  </div>
                  <div>
                    <span
                      className={`text-[10px] font-mono tracking-widest font-bold ${
                        theme === "dark" ? "text-brand-cyan" : "text-slate-500"
                      }`}
                    >
                      {detail.label}
                    </span>
                    <p
                      className={`text-base md:text-lg font-light mt-1 transition-colors duration-300 ${
                        theme === "dark"
                          ? "text-white group-hover:text-brand-cyan"
                          : "text-slate-800 group-hover:text-black"
                      }`}
                    >
                      {detail.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Aesthetic Quote */}
            <div
              className={`hidden lg:block p-8 rounded-sm border-l-4 transition-colors duration-500 ${
                theme === "dark"
                  ? "glass border-l-brand-cyan bg-[#070b19]/60"
                  : "bg-slate-50 border-l-black border-y border-r border-slate-200"
              }`}
            >
              <p
                className={`font-sans italic text-sm leading-relaxed ${
                  theme === "dark" ? "text-gray-400" : "text-slate-600"
                }`}
              >
                "Tasarım sadece nasıl göründüğü veya hissettirdiği değildir.
                Tasarım, nasıl çalıştığıdır. 3D'nin gücünü Next.js hızıyla
                birleştirerek etkileyici dijital deneyimler tasarlıyorum."
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className={`p-8 md:p-10 rounded-sm shadow-xl space-y-6 relative overflow-hidden transition-all duration-500 border ${
                theme === "dark"
                  ? "glass border-white/5 shadow-black/40"
                  : "bg-white border-slate-200 shadow-slate-200/10"
              }`}
            >
              <span
                className={`absolute bottom-0 right-0 w-32 h-32 rounded-full filter blur-2xl pointer-events-none ${
                  theme === "dark" ? "bg-brand-purple/5" : "bg-slate-100/50"
                }`}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className={`text-[10px] font-mono tracking-widest uppercase font-semibold ${
                      theme === "dark" ? "text-gray-400" : "text-slate-600"
                    }`}
                  >
                    AD SOYAD *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Adınızı giriniz"
                    className={`w-full border rounded-sm px-4 py-3 text-sm placeholder-gray-500 focus:outline-none transition-all duration-300 shadow-inner ${
                      theme === "dark"
                        ? "bg-[#070b19] border-white/10 focus:border-brand-cyan/60 text-white"
                        : "bg-slate-50 border-slate-200 focus:border-black text-slate-900"
                    }`}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className={`text-[10px] font-mono tracking-widest uppercase font-semibold ${
                      theme === "dark" ? "text-gray-400" : "text-slate-600"
                    }`}
                  >
                    E-POSTA *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="E-posta adresinizi giriniz"
                    className={`w-full border rounded-sm px-4 py-3 text-sm placeholder-gray-500 focus:outline-none transition-all duration-300 shadow-inner ${
                      theme === "dark"
                        ? "bg-[#070b19] border-white/10 focus:border-brand-cyan/60 text-white"
                        : "bg-slate-50 border-slate-200 focus:border-black text-slate-900"
                    }`}
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className={`text-[10px] font-mono tracking-widest uppercase font-semibold ${
                    theme === "dark" ? "text-gray-400" : "text-slate-600"
                  }`}
                >
                  KONU
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Mesajınızın konusunu yazınız"
                  className={`w-full border rounded-sm px-4 py-3 text-sm placeholder-gray-500 focus:outline-none transition-all duration-300 shadow-inner ${
                    theme === "dark"
                      ? "bg-[#070b19] border-white/10 focus:border-brand-cyan/60 text-white"
                      : "bg-slate-50 border-slate-200 focus:border-black text-slate-900"
                  }`}
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className={`text-[10px] font-mono tracking-widest uppercase font-semibold ${
                    theme === "dark" ? "text-gray-400" : "text-slate-600"
                  }`}
                >
                  MESAJINIZ *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Detaylı mesajınızı buraya yazınız..."
                  className={`w-full border rounded-sm px-4 py-3 text-sm placeholder-gray-500 focus:outline-none transition-all duration-300 shadow-inner resize-none ${
                    theme === "dark"
                      ? "bg-[#070b19] border-white/10 focus:border-brand-cyan/60 text-white"
                      : "bg-slate-50 border-slate-200 focus:border-black text-slate-900"
                  }`}
                />
              </div>

              {/* Status Message Display */}
              {statusMsg && (
                <div
                  className={`flex items-start gap-2.5 p-4 rounded-sm text-xs md:text-sm font-mono border ${
                    status === "success"
                      ? theme === "dark"
                        ? "bg-green-950/20 text-green-400 border-green-900/30"
                        : "bg-green-50 text-green-700 border-green-200"
                      : status === "error"
                        ? theme === "dark"
                          ? "bg-red-950/20 text-red-400 border-red-900/30"
                          : "bg-red-50 text-red-700 border-red-200"
                        : theme === "dark"
                          ? "bg-blue-950/20 text-blue-400 border-blue-900/30"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                  }`}
                >
                  {status === "success" ? (
                    <CheckCircle2 size={16} className="mt-0.5" />
                  ) : (
                    <AlertCircle size={16} className="mt-0.5" />
                  )}
                  <span>{statusMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className={`font-bebas text-lg md:text-xl tracking-wider w-full py-4 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  status === "loading"
                    ? theme === "dark"
                      ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300"
                    : theme === "dark"
                      ? "bg-brand-cyan hover:bg-brand-cyan/90 text-black shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]"
                      : "bg-black hover:bg-black/90 text-white shadow-md shadow-slate-200/10"
                }`}
              >
                {status === "loading" ? (
                  <>GÖNDERİLİYOR...</>
                ) : (
                  <>
                    MESAJI GÖNDER <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
