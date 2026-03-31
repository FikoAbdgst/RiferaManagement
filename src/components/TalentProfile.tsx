// src/components/TalentProfile.tsx
"use client"
import { useState, useEffect, useRef } from "react"

export default function TalentProfile() {
  const [barsVisible, setBarsVisible] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setBarsVisible(true)
      },
      { threshold: 0.2 },
    )
    if (chartRef.current) observer.observe(chartRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="talent-section" id="talent" ref={chartRef}>
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <div className="section-tag">Talent Profile</div>
        </div>
        <div className="talent-charts">
          <div>
            <div className="chart-title">Distribusi Usia</div>
            {[
              { label: "18–24", pct: 50 },
              { label: "25–34", pct: 85 },
              { label: "35–44", pct: 48 },
            ].map((r, i) => (
              <div className="bar-row" key={i}>
                <div className="bar-label">{r.label}</div>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: barsVisible ? `${r.pct}%` : "0%" }}
                  >
                    {r.pct}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="chart-title">Range Followers</div>
            {[
              { label: "1K–5K", pct: 96 },
              { label: "5K–10K", pct: 82 },
              { label: "10K–30K", pct: 64 },
            ].map((r, i) => (
              <div className="bar-row" key={i}>
                <div className="bar-label">{r.label}</div>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: barsVisible ? `${r.pct}%` : "0%" }}
                  >
                    {r.pct}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="talent-chips">
          <div className="talent-chip">
            <strong>0.59% – 3.40%</strong>
            <span>Engagement Rate</span>
          </div>
          <div className="talent-chip">
            <strong>50 (Rata-rata)</strong>
            <span>Comments Per Post</span>
          </div>
          <div className="talent-chip">
            <strong>10.483 – 35.432</strong>
            <span>Reach Interaction 7 Hari</span>
          </div>
        </div>
      </div>
    </section>
  )
}
