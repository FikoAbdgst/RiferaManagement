"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";

const collabs = [
  { name: "Asaan Kopi", src: "/logos/asaan_kopi.webp" },
  { name: "Babah Ahui", src: "/logos/babah_ahui.webp" },
  { name: "Bakmie 96", src: "/logos/bakmie96.webp" },
  { name: "Bodas Bistrobar", src: "/logos/bodas_bistrobar.webp" },
  { name: "Boja", src: "/logos/boja.webp" },
  { name: "Buruan Uyut", src: "/logos/buruan_uyut.webp" },
  { name: "Carry Me", src: "/logos/carryme.webp" },
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

const SWAP_INTERVAL = 3000;
const FADE_DURATION = 600;

const LAYOUTS = {
  mobile: { cols: 3, rows: 3 }, // 9 slot
  tablet: { cols: 4, rows: 2 }, // 8 slot
  desktop: { cols: 9, rows: 1 }, // 9 slot
};

function getLayout() {
  if (typeof window === "undefined") return LAYOUTS.desktop;
  if (window.innerWidth >= 1024) return LAYOUTS.desktop;
  if (window.innerWidth >= 640) return LAYOUTS.tablet;
  return LAYOUTS.mobile;
}

function distributeIntoSlots(items: typeof collabs, slots: number) {
  const result: (typeof collabs)[] = Array.from({ length: slots }, () => []);
  items.forEach((item, i) => result[i % slots].push(item));
  return result;
}

// ─── Single slot/cell ───
function LogoSlot({
  logos,
  tick,
  fading,
  startIndex = 0,
  isMobile, // Props baru untuk mendeteksi mode mobile
  onHover,
  onLeave,
}: {
  logos: typeof collabs;
  tick: number;
  fading: boolean;
  startIndex?: number;
  isMobile: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const index = (startIndex + tick) % logos.length;
  const logo = logos[index];
  const shouldFade = fading && !hovered;

  return (
    <div
      className="flex flex-col items-center justify-center h-20 w-full cursor-pointer relative"
      onMouseEnter={() => {
        setHovered(true);
        onHover();
      }}
      onMouseLeave={() => {
        setHovered(false);
        onLeave();
      }}
    >
      <div
        className="relative w-[72px] h-[44px] sm:w-[90px] sm:h-[54px] lg:w-[100px] lg:h-[60px]"
        style={{
          // Jika mobile, opacity selalu 1. Jika desktop, opacity 0.5 lalu 1 saat hover.
          opacity: hovered ? 1 : shouldFade ? 0 : isMobile ? 1 : 0.5,
          transform: shouldFade
            ? "translateY(6px) scale(0.97)"
            : "translateY(0px) scale(1)",
          // Jika mobile atau sedang di-hover, warna penuh. Jika tidak, grayscale.
          filter: isMobile || hovered ? "grayscale(0%)" : "grayscale(100%)",
          transition: `opacity ${FADE_DURATION}ms ease, transform ${FADE_DURATION}ms ease, filter 300ms ease`,
        }}
        title={logo.name}
      >
        <Image
          src={logo.src}
          alt={`Collaboration: ${logo.name}`}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 72px, (max-width: 1024px) 90px, 100px"
        />
      </div>

      {/* Tooltip — hidden on mobile */}
      <div
        className="hidden sm:block absolute bottom-[-12px] text-[10px] font-medium text-gray-500 text-center whitespace-nowrap"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0px)" : "translateY(4px)",
          transition: "opacity 250ms ease, transform 250ms ease",
          pointerEvents: "none",
        }}
      >
        {logo.name}
      </div>
    </div>
  );
}

// ─── Main Component ───
export default function Collaboration() {
  const [tick, setTick] = useState(0);
  const [fading, setFading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [layout, setLayout] = useState(LAYOUTS.desktop);

  const isPausedRef = useRef(isPaused);
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const update = () => setLayout(getLayout());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalSlots = layout.cols * layout.rows;

  const slots = useMemo(
    () => distributeIntoSlots(collabs, totalSlots),
    [totalSlots],
  );

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      setFading(true);
      setTimeout(() => {
        setTick((prev) => prev + 1);
        setFading(false);
      }, FADE_DURATION);
    }, SWAP_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const gridClass =
    {
      3: "grid-cols-3",
      4: "grid-cols-4",
      9: "grid-cols-9",
    }[layout.cols] ?? "grid-cols-9";

  // Deteksi apakah sedang dalam mode mobile (menggunakan referensi kolom = 3)
  const isMobileView = layout.cols === 3;

  return (
    <section className="py-20 bg-white" id="collab">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
            Our Collaboration
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
            Trusted by 30+ Leading Brands
          </h2>
        </div>

        <div
          className={`grid ${gridClass} gap-x-2 gap-y-4 mx-auto max-w-[960px]`}
        >
          {slots.map((slotLogos, i) => (
            <LogoSlot
              key={i}
              logos={slotLogos}
              tick={tick}
              fading={fading}
              startIndex={i}
              isMobile={isMobileView} // Melempar state isMobile ke LogoSlot
              onHover={pause}
              onLeave={resume}
            />
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-12">
          and many more local brands we&apos;re proud to work with.
        </p>
      </div>
    </section>
  );
}
