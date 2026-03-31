// src/components/Services.tsx
import Image from "next/image"
import fnbImg from "../assets/creation1.jpg"
import lifeImg from "../assets/creation2.jpg"
import beautyImg from "../assets/creation3.jpg"

export default function Services() {
  const services = [
    {
      title: "F&B Reviewer",
      desc: "Review restoran, kafe, dan kuliner Bandung & sekitarnya",
      cls: "fnb",
      img: fnbImg,
    },
    {
      title: "Life Style & Recreation",
      desc: "Gaya hidup, aktivitas, hiburan, dan rekreasi keluarga",
      cls: "life",
      img: lifeImg,
    },
    {
      title: "Beauty & Fashion",
      desc: "Kecantikan, skincare, makeup, dan fashion terkini",
      cls: "beauty",
      img: beautyImg,
    },
  ]

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="services-header">
          <div className="section-tag">Content Creation</div>
          <p className="services-sub">
            Talenta kami berpengalaman di tiga niche utama yang paling relevan
            di pasar Indonesia saat ini.
          </p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="scard" key={i}>
              <div className={`scard-img ${s.cls}`}>
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="scard-body">
                <div className="scard-title">{s.title}</div>
                <div className="scard-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
