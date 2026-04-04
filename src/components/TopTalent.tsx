import talent1 from "../assets/talent1.png"
import talent2 from "../assets/talent2.png"
import talent3 from "../assets/talent3.png"
import talent4 from "../assets/talent4.png"
import talent5 from "../assets/talent5.png"
import talent6 from "../assets/talent6.png"
import talent7 from "../assets/talent7.png"
import talent8 from "../assets/talent8.png"
import talent9 from "../assets/talent9.png"
import talent10 from "../assets/talent10.png"
import Image from "next/image"

// src/components/TopTalent.tsx

export default function TopTalent() {
  const talents = [
    { handle: "najwas.s", platform: ["ig"], image: talent1 },
    { handle: "tasyameng\ntasyaameng", platform: ["ig", "tt"], image: talent2 },
    { handle: "laporpaksayalapar", platform: ["tt"], image: talent3 },
    {
      handle: "larasanjanii\nhelloladybull",
      platform: ["ig", "tt"],
      image: talent4,
    },
    { handle: "corrifebriyani", platform: ["ig"], image: talent5 },
    {
      handle: "foodventurebndung_\nridwan.maulanaa_",
      platform: ["ig", "tt"],
      image: talent6,
    },
    { handle: "maylanimelaney", platform: ["ig"], image: talent7 },
    { handle: "rismaputria", platform: ["ig"], image: talent8 },
    { handle: "firman.agstn", platform: ["tt"], image: talent9 },
    { handle: "adikjajan", platform: ["ig"], image: talent10 },
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
              <div className="tphoto">
                <Image
                  src={t.image}
                  alt={t.handle}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
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
