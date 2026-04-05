// src/components/About.tsx
"use client"
import Image from "next/image"
import heroine1 from "../assets/content_creator.webp"
import heroine2 from "../assets/kol_bandung.webp"

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-inner">
          <div className="about-text">
            <div className="about-eyebrow">Tentang Kami</div>
            {/* Headline dengan kata kunci utama */}
            <h2 className="about-heading">
              Rifera Management:
              <br />
              Agency Talent &amp;
              <br />
              KOL Specialist Bandung
            </h2>

            {/* Paragraf 1 dengan keyword strategis */}
            <p className="about-para">
              <strong>Rifera Management</strong> hadir sebagai{" "}
              <strong>Agency Talent Bandung</strong> yang berfokus pada
              pengelolaan dan pengembangan talenta digital profesional. Kami
              menjembatani kolaborasi antara brand dengan para{" "}
              <strong>KOL Specialist</strong>, Influencer, dan Content Creator
              berbakat untuk menciptakan kampanye marketing yang berdampak luas
              di Instagram, TikTok, dan YouTube.
            </p>

            {/* Paragraf 2 mengenai layanan dan kredibilitas */}
            <p className="about-para">
              Sebagai <strong>Model Management</strong>terpercaya, kami menaungi
              talenta di bidang F&amp;B, kecantikan, dan lifestyle. Kami
              melayani kebutuhan <strong>Endorsement</strong>,{" "}
              <strong>Paid Promote (PP)</strong>, hingga penyediaan{" "}
              <strong>Brand Ambassador (BA)</strong> dan{" "}
              <strong>Jasa Photoshoot</strong> profesional di area Bandung dan
              sekitarnya.
            </p>
          </div>

          <div className="about-cards">
            <div className="polaroid">
              <div className="polaroid-img">
                <Image
                  src={heroine1}
                  alt="Talent Agency Bandung - Rifera Management" // Alt text SEO
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
                  alt="KOL Specialist Bandung - Rifera Management" // Alt text SEO
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
