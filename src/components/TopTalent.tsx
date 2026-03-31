// src/components/TopTalent.tsx
export default function TopTalent() {
  const talents = [
    { handle: "najwas.s", platform: ["ig"], emoji: "👩‍💼" },
    { handle: "tasyameng\ntasyaameng", platform: ["ig", "tt"], emoji: "🧕" },
    { handle: "laporpaksayalapar", platform: ["tt"], emoji: "☕" },
    {
      handle: "larasanjanii\nhelloladybull",
      platform: ["ig", "tt"],
      emoji: "💁‍♀️",
    },
    { handle: "corrifebriyani", platform: ["ig"], emoji: "🍷" },
    {
      handle: "foodventurebndung_\nridwan.maulanaa_",
      platform: ["ig", "tt"],
      emoji: "🍜",
    },
    { handle: "maylanimelaney", platform: ["ig"], emoji: "🎸" },
    { handle: "rismaputria", platform: ["ig"], emoji: "🌿" },
    { handle: "firman.agstn", platform: ["tt"], emoji: "😎" },
    { handle: "adikjajan", platform: ["ig"], emoji: "🧕" },
  ]

  return (
    <section className="top-talent-section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div className="section-tag">Top Talent</div>
        </div>
        <div className="talent-grid">
          {talents.map((t, i) => (
            <div className="tcard" key={i}>
              <div className="tphoto">{t.emoji}</div>
              <div className="thandle">
                {t.handle.split("\n").map((l, j) => (
                  <div key={j}>{l}</div>
                ))}
              </div>
              <div className="tplatforms">
                {t.platform.includes("ig") && (
                  <div className="tplat ig">IG</div>
                )}
                {t.platform.includes("tt") && (
                  <div className="tplat tt">TT</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
