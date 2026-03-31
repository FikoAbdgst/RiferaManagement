// src/components/Together.tsx
export default function Together() {
  const benefits = [
    {
      emoji: "🤝",
      title: "Approach talent to join my team",
      desc: "Kami rekrut & kelola talenta terbaik sesuai kebutuhan brand Anda.",
    },
    {
      emoji: "📱",
      title: "Make a content as the brief",
      desc: "Konten dibuat sesuai brief, on-brand, dan tepat sasaran.",
    },
    {
      emoji: "🐷",
      title: "Get benefit for client",
      desc: "Visibilitas meningkat, engagement nyata, ROI terukur.",
    },
  ]

  return (
    <section className="together-section">
      <div className="container">
        <div className="together-inner">
          <div className="together-left">
            <div className="section-tag">What Can We Do Together</div>
            <div className="together-big">
              Kolaborasi
              <br />
              <span>nyata</span>,<br />
              hasil terukur.
            </div>
          </div>
          <div className="together-right">
            {benefits.map((t, i) => (
              <div className="tw-card" key={i}>
                <div className="tw-icon">{t.emoji}</div>
                <div>
                  <div className="tw-title">{t.title}</div>
                  <div className="tw-desc">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
