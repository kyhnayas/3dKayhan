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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://3dkayhan.com"
  ),
  title: "Kayhan Ayas | 3D Art Director & Web Developer | Portfolio",
  description:
    "Profesyonel 3D Art Direktörlük, Blender mimari renderları, ürün animasyonları ve Next.js web geliştirme. Sakarya, İstanbul ve tüm Türkiye'ye hizmet.",
  keywords: [
    "3D Art Director",
    "Blender Render",
    "3D Görselleştirme",
    "İç Mekan Tasarımı",
    "Ürün Animasyonu",
    "Mimari Görselleştirme",
    "Next.js Developer",
    "Kayhan Ayas",
    "Sakarya 3D",
    "İstanbul 3D Tasarım",
    "3D Modelleme",
    "Reklamcılık",
    "Endüstriyel Tasarım",
  ],
  authors: [
    {
      name: "Kayhan Ayas",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://3dkayhan.com",
    },
  ],
  creator: "Kayhan Ayas",
  publisher: "Kayhan Ayas",
  formatDetection: {
    email: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://3dkayhan.com",
    siteName: "Kayhan Ayas - 3D Art Director & Developer",
    title: "Kayhan Ayas | 3D Art Director & Web Developer",
    description:
      "Profesyonel 3D Art Direktörlük, Blender mimari renderları, ürün animasyonları ve Next.js web geliştirme.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kayhan Ayas 3D Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kayhan Ayas | 3D Art Director & Web Developer",
    description:
      "Profesyonel 3D Art Direktörlük, Blender mimari renderları ve web geliştirme.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://3dkayhan.com",
  },
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
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Kayhan Ayas",
              url: "https://3dkayhan.com",
              image: "https://3dkayhan.com/images/profile.png",
              jobTitle: "3D Art Director & Web Developer",
              sameAs: [
                "https://instagram.com/kyhnayas",
                "https://facebook.com/kyhnayas",
                "https://youtube.com/@kyhnayas",
              ],
              description:
                "Profesyonel 3D Art Direktörlük, Blender mimari renderları, ürün animasyonları ve Next.js web geliştirme.",
              skills: [
                "3D Modelleme",
                "Blender",
                "Mimari Görselleştirme",
                "Ürün Animasyonu",
                "Next.js",
                "Web Development",
                "React",
                "TypeScript",
              ],
            }),
          }}
        />

        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Kayhan Ayas - 3D Art Director",
              url: "https://3dkayhan.com",
              image: "https://3dkayhan.com/images/og-image.png",
              description:
                "Profesyonel 3D Art Direktörlük, Blender mimari renderları ve web geliştirme hizmetleri.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "TR",
                addressRegion: "Sakarya",
              },
              sameAs: [
                "https://instagram.com/kyhnayas",
                "https://facebook.com/kyhnayas",
                "https://youtube.com/@kyhnayas",
              ],
              email: "contact@3dkayhan.com",
            }),
          }}
        />

        {/* Performance optimizations */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#030712" />
        <link rel="canonical" href="https://3dkayhan.com" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="3D Kayhan" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <body className="min-h-full bg-[#030712] text-[#f3f4f6] font-sans flex flex-col selection:bg-brand-cyan/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
