// src/components/Collaboration.tsx
export default function Collaboration() {
  const collabs = [
    "Sir Loin\nBeef House",
    "boja",
    "Hiroshi\nUdon",
    "Piqnic\nBBQ",
    "Salt\nBread",
    "Bodas\nBistro Bar",
    "Olivier\nCookies",
    "Kalika\nCafé & Co",
    "Buruan\nUyut",
    "Kedai\nBabah A Hui",
    "Cozy\nCube Coffee",
    "Sistik\nAmbu Wi",
    "Sunpride",
    "Noom\nVibes",
    "Toko Bakmie\nPilar",
    "Ramela",
    "Grand\nCordela Hotel",
    "Lalita\nDelicates",
  ]

  return (
    <section className="collab-section" id="collab">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div className="section-tag">Our Collaboration</div>
        </div>
        <div className="collab-grid">
          {collabs.map((name, i) => (
            <div className="collab-item" key={i}>
              {name.split("\n").map((l, j) => (
                <div key={j}>{l}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
