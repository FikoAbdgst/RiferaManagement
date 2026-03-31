// src/components/Pricing.tsx
export default function Pricing() {
  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <div className="section-tag">Pricelist</div>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-name">Basic</div>
            <div className="pricing-price">Rp 800K</div>
            <ul className="pricing-features">
              <li>10 Talent KOL</li>
              <li>Briefing & Monitoring</li>
              <li>Standar Reporting</li>
            </ul>
            <button className="pricing-cta outline">Pilih Basic</button>
          </div>
          <div className="pricing-card premium">
            <div className="pricing-badge">Best Value</div>
            <div className="pricing-name">Premium ✨</div>
            <div className="pricing-price">Rp 1.65M</div>
            <ul className="pricing-features">
              <li>30 Talent KOL</li>
              <li>Prioritas Pemilihan Talent</li>
              <li>Briefing & Monitoring</li>
              <li>Advanced Reporting + Insight</li>
            </ul>
            <button className="pricing-cta filled">Pilih Premium</button>
          </div>
          <div className="pricing-card">
            <div className="pricing-name">Standar</div>
            <div className="pricing-price">Rp 1.25M</div>
            <ul className="pricing-features">
              <li>20 Talent KOL</li>
              <li>Briefing & Monitoring</li>
              <li>Standar Reporting</li>
            </ul>
            <button className="pricing-cta outline">Pilih Standar</button>
          </div>
        </div>
        <p className="pricing-note">
          Noted: You can custom the talent by followers (by ratecard).
          <br />
          Harga dapat menyesuaikan dengan spesifikasi campaign.
        </p>
      </div>
    </section>
  )
}
