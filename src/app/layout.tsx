// src/app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Menautkan ke variabel CSS yang dipakai di globals.css
})

export const metadata: Metadata = {
  title: "Rifera Management | KOL & Influencer Agency",
  description:
    "Rifera Management adalah agensi pengelola dan pengembangan talenta digital di Bandung, khusus Key Opinion Leader (KOL), Influencer, dan Content Creator di Instagram, TikTok, dan YouTube.",
  keywords: [
    "KOL Agency",
    "Influencer Management",
    "Content Creator Bandung",
    "Rifera Management",
    "Endorsement",
  ],
  // Anda bisa menambahkan OpenGraph di sini untuk SEO Media Sosial nanti
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      {/* Tailwind v4 otomatis mengenali font-sans melalui variabel --font-inter */}
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  )
}
