// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Menautkan ke variabel CSS yang dipakai di globals.css
});

export const metadata: Metadata = {
  title: "Rifera Management | Agency Talent & KOL Specialist Bandung",
  description:
    "Rifera Management: Agency Talent & KOL Specialist di Bandung. Melayani Endorsement, PP, Photoshoot, Campaign, Brand Ambassador, dan Visit profesional di area Bandung.",
  keywords: [
    "Agency Talent Bandung",
    "KOL Specialist Bandung",
    "Model Management Bandung",
    "Influencer Bandung",
    "Content Creator Bandung",
    "Rifera Management",
    "Endorsement Bandung",
    "Jasa Photoshoot Bandung",
  ],
  // Anda bisa menambahkan OpenGraph di sini untuk SEO Media Sosial nanti

  openGraph: {
    title: "Rifera Management | Agency Talent & KOL Specialist Bandung",
    description:
      "Partner Social Media Marketing & Management Talent Profesional di Bandung.",
    url: "https://riferamanagement.com",
    siteName: "Rifera Management Bandung",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rifera Management Bandung - Talent Agency",
      },
    ],
  },

  //Canonical URL
  alternates: {
    canonical: "https://riferamanagement.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      {/* Tailwind v4 otomatis mengenali font-sans melalui variabel --font-inter */}
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
