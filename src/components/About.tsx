// src/components/About.tsx
"use client"
import Image from "next/image"
import heroine1 from "../assets/teteh1.png"
import heroine2 from "../assets/teteh2.png"

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-inner">
          <div className="about-text">
            <div className="about-eyebrow">Tentang Kami</div>
            <h2 className="about-heading">
              Mengelola &amp;
              <br />
              Mengembangkan
              <br />
              Talenta Digital
            </h2>
            <p className="about-para">
              Kami dari <strong>Rifera Management</strong> — sebuah manajemen
              yang bergerak di bidang pengelolaan dan pengembangan talenta
              digital, khususnya <strong>Key Opinion Leader (KOL)</strong>,
              Influencer, dan Content Creator di berbagai platform media sosial
              seperti Instagram, TikTok, YouTube, dan lainnya.
            </p>
            <p className="about-para">
              Manajemen kami menaungi sejumlah KOL dengan berbagai bidang
              seperti <strong>F&amp;B, kecantikan</strong>, dan{" "}
              <strong>life style</strong>.
            </p>
          </div>
          <div className="about-cards">
            <div className="polaroid">
              <div className="polaroid-img">
                <Image
                  src={heroine1}
                  alt="Content Creator"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="polaroid-cap">Content Creator</div>
            </div>
            <div className="polaroid">
              <div className="polaroid-img">
                <Image
                  src={heroine2}
                  alt="KOL Bandung"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="polaroid-cap">KOL Bandung</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
