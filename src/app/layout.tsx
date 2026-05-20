import type { Metadata } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kayhan Ayas | 3D Art Director & Developer",
  description: "Art Direktörlük, 3D iç mekan görselleştirme, Blender mimari render ve ürün animasyonları ile Next.js web geliştirme portfolyosu. Sakarya ve İstanbul başta olmak üzere tüm Türkiye'ye profesyonel hizmet.",
  icons: {
    icon: "/favicon.png",
  },
  keywords: ["3D Art Director", "3D Görselleştirme", "Blender Render", "Mekan Görselleştirme", "Ürün Animasyonu", "Next.js Geliştirici", "Kayhan Ayas", "Sakarya 3D Tasarım"],
  authors: [{ name: "Kayhan Ayas" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${bebasNeue.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#030712] text-[#f3f4f6] font-sans flex flex-col selection:bg-brand-cyan/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
