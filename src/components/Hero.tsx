// src/components/Hero.tsx
"use client"
import Image from "next/image"
import heroImg from "../assets/image.png"

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-star">✳</div>
      <div className="container">
        <div className="hero-inner">
          <div className="hero-phone">
            <div className="hero-phone-screen">
              <Image
                src={heroImg}
                alt="Rifera Management Instagram"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="hero-text">
            <h1 className="hero-title">
              Rifera
              <br />
              Management
            </h1>
            <div className="hero-badge">
              <div className="ig-ring" />
              @RIFERAMANAGEMENT
            </div>
            <p className="hero-desc">
              Agensi pengelolaan & pengembangan talenta digital khusus KOL,
              Influencer, dan Content Creator di Instagram, TikTok, dan YouTube.
              Berbasis di Bandung.
            </p>
            <button
              className="hero-cta"
              onClick={() =>
                document
                  .getElementById("pricing")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Lihat Paket Harga →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
