// src/components/Collaboration.tsx
import Image from "next/image";

export default function Collaboration() {
  const collabs = [
    { name: "Asaan Kopi", src: "/logos/asaan_kopi.webp" },
    { name: "Babah Ahui", src: "/logos/babah_ahui.webp" },
    { name: "Bakmie 96", src: "/logos/bakmie96.webp" },
    { name: "Bodas Bistrobar", src: "/logos/bodas_bistrobar.webp" },
    { name: "Boja", src: "/logos/boja.webp" },
    { name: "Buruan Uyut", src: "/logos/buruan_uyut.webp" },
    { name: "Carry Me", src: "/logos/carry_me.webp" },
    { name: "Cozy Cube Coffee", src: "/logos/cozy_cube_coffee.webp" },
    { name: "Emina", src: "/logos/emina.webp" },
    { name: "Fixed Wedding", src: "/logos/fixed_wedding.webp" },
    { name: "Grand Cordela", src: "/logos/grand_cordela.webp" },
    { name: "Haji Wong", src: "/logos/haji_wong.webp" },
    { name: "Hiroshi Udon", src: "/logos/hiroshi_udon.webp" },
    { name: "HSK Secret", src: "/logos/hsk_secret.webp" },
    { name: "Kalika Cafe", src: "/logos/kalika_cafe.webp" },
    { name: "Klandestin Space", src: "/logos/klandestin_space.webp" },
    { name: "Lalita Delicates", src: "/logos/lalita_delicates.webp" },
    { name: "Mie Widyatama", src: "/logos/mie_widyatama.webp" },
    { name: "Noid Coffee", src: "/logos/noid_coffee.webp" },
    { name: "Noom Icecream", src: "/logos/noom_icecream.webp" },
    { name: "Olivier Cookies", src: "/logos/olivier_cookies.webp" },
    { name: "Pine Valley", src: "/logos/pine_valley.webp" },
    { name: "Piqnic BBQ", src: "/logos/piqnic_bbq.webp" },
    { name: "Ramela Resto", src: "/logos/ramela_resto.webp" },
    { name: "Salt Bread", src: "/logos/salt_bread.webp" },
    { name: "Sirloin Beef House", src: "/logos/sirloin_beefhouse.webp" },
    { name: "Sistik Ambu Wi", src: "/logos/sistik_ambu_wi.webp" },
    { name: "Sunpride", src: "/logos/sunpride.webp" },
    { name: "Think Ocean", src: "/logos/think_ocean.webp" },
    { name: "Toko Bakmie Pilar", src: "/logos/toko_bakmie_pilar.webp" },
    { name: "ULBI", src: "/logos/ulbi.webp" },
    { name: "Yamcha", src: "/logos/yamcha.webp" },
    { name: "Yup", src: "/logos/yup.webp" },
  ];

  // Duplicate list agar animasi marquee tidak putus
  const marqueeItems = [...collabs, ...collabs];

  return (
    <section className="py-20 overflow-hidden bg-white" id="collab">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
            Our Collaboration
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
            Trusted by 30+ Leading Brands
          </h2>
        </div>

        {/* Marquee Container */}
        <div className="relative flex overflow-x-hidden">
          <div className="flex animate-marquee whitespace-nowrap items-center">
            {marqueeItems.map((item, i) => (
              <div
                key={i}
                className="mx-12 flex-shrink-0 w-[140px] grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              >
                <Image
                  src={item.src}
                  alt={`Rifera Management Collaboration: ${item.name}`} // SEO Alt Text
                  width={140}
                  height={70}
                  className="object-contain pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
