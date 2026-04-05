// src/components/TopTalent.tsx
import Image from "next/image";

// 1. Tentukan path ikon (di folder public/icons/)
const igIcon = "/icons/instagram.svg";
const ttIcon = "/icons/tiktok.svg";

export default function TopTalent() {
  const talents = [
    {
      handle: "najwas.s",
      platform: ["ig"],
      // 2. Gunakan path string ke gambar di public/talents/
      image: "/talents/najwas.s.webp",
      alt: "Foto Najwa S - Talent Rifera Management", // Alt text SEO
    },
    {
      handle: "tasyaameng", // Rapikan handle
      platform: ["ig", "tt"],
      image: "/talents/tasyaameng.webp",
      alt: "Foto Tasya Meng - Talent Rifera Management",
    },
    {
      handle: "laporpaksayalapar",
      platform: ["tt"],
      image: "/talents/laporpaksayalapar.webp",
      alt: "Foto Lapor Pak Saya Lapar - Talent Rifera Management",
    },
    {
      handle: "larasanjanii",
      platform: ["ig", "tt"],
      image: "/talents/larasanjanii.webp",
      alt: "Foto Laras Anjani - Talent Rifera Management",
    },
    {
      handle: "corrifebriyani",
      platform: ["ig"],
      image: "/talents/corrifebriyani.webp",
      alt: "Foto Corri Febriyani - Talent Rifera Management",
    },
    {
      handle: "ridwan.maulanaa",
      platform: ["ig", "tt"],
      image: "/talents/ridwan.maulanaa.webp",
      alt: "Foto Ridwan Maulana - Talent Rifera Management",
    },
    {
      handle: "maylanimelaney",
      platform: ["ig"],
      image: "/talents/maylanimelaney.webp",
      alt: "Foto Maylani Melaney - Talent Rifera Management",
    },
    {
      handle: "rismaputria",
      platform: ["ig"],
      image: "/talents/rismaputria.webp",
      alt: "Foto Risma Putria - Talent Rifera Management",
    },
    {
      handle: "firman.agstn",
      platform: ["tt"],
      image: "/talents/firman.agstn.webp",
      alt: "Foto Firman Agustin - Talent Rifera Management",
    },
    {
      handle: "adikjajan",
      platform: ["ig"],
      image: "/talents/adikjajan.webp",
      alt: "Foto Adik Jajan - Talent Rifera Management",
    },
  ];

  return (
    <section className="top-talent-section py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div className="section-tag inline-block px-3 py-1 text-sm font-medium bg-gray-100 rounded-full">
            Top Talent
          </div>
        </div>
        <div className="talent-grid grid grid-cols-2 md:grid-cols-5 gap-6">
          {talents.map((t, i) => (
            <div
              className="tcard bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-all"
              key={i}
            >
              <div className="tphoto relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
                {/* 3. Gunakan Image dengan path string */}
                <Image
                  src={t.image}
                  alt={t.alt}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="thandle text-center mb-3">
                <div className="font-semibold text-gray-900">@{t.handle}</div>
              </div>
              <div className="tplatforms flex justify-center gap-2">
                {/* 4. Ganti teks dengan ikon Image SVG */}
                {t.platform.includes("ig") && (
                  <div className="flex items-center justify-center">
                    <Image
                      src={igIcon}
                      alt="Instagram Logo"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                )}
                {t.platform.includes("tt") && (
                  <div className="flex items-center justify-center">
                    <Image
                      src={ttIcon}
                      alt="TikTok Logo"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
