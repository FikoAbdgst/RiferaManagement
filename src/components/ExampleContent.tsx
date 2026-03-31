// src/components/ExampleContent.tsx
export default function ExampleContent() {
  const contentItems = [
    { emoji: "🍲", label: "Buruan Uyut", bg: "c1", link: "DMaHGAFJyaR" },
    { emoji: "🛼", label: "Klandestine Space", bg: "c2", link: "DMcslBkREPs" },
    { emoji: "🌸", label: "Outdoor Café", bg: "c3", link: "DMRcRSnzTlf" },
    { emoji: "🪴", label: "Garden Resto", bg: "c4", link: "DMRcRSnzTlf" },
  ]

  return (
    <section className="content-section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div className="section-tag">Example Content</div>
        </div>
        <div className="phones-row">
          {contentItems.map((c, i) => (
            <div key={i}>
              <div className="cphone">
                <div className="cphone-screen">
                  <div className={`cphone-bg ${c.bg}`} />
                  <div className="cphone-emoji">{c.emoji}</div>
                  <div className="play-ring">
                    <div className="play-tri" />
                  </div>
                  <div className="cphone-label">{c.label}</div>
                </div>
              </div>
              <div className="cphone-link">instagram.com/reel/{c.link}/</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
