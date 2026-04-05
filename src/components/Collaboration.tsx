"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState, useMemo } from "react"

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
]

const COLUMN_COUNT = 9
const SWAP_INTERVAL = 3000
const FADE_DURATION = 600

// Helper diletakkan di luar komponen
function distributeIntoColumns(items: typeof collabs, cols: number) {
  const columns: (typeof collabs)[] = Array.from({ length: cols }, () => [])
  items.forEach((item, i) => columns[i % cols].push(item))
  return columns
}

// ─── Single column ───
function LogoColumn({
  logos,
  tick,
  fading,
  startIndex = 0,
  onHover,
  onLeave,
}: {
  logos: typeof collabs
  tick: number
  fading: boolean
  startIndex?: number
  onHover: () => void
  onLeave: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const index = (startIndex + tick) % logos.length
  const logo = logos[index]

  const shouldFade = fading && !hovered

  return (
    <div
      className="flex flex-col items-center justify-center h-20 w-full cursor-pointer relative"
      onMouseEnter={() => {
        setHovered(true)
        onHover()
      }}
      onMouseLeave={() => {
        setHovered(false)
        onLeave()
      }}
    >
      <div
        className="relative w-[100px] h-[60px]"
        style={{
          opacity: hovered ? 1 : shouldFade ? 0 : 0.5,
          transform: shouldFade
            ? "translateY(6px) scale(0.97)"
            : "translateY(0px) scale(1)",
          filter: hovered ? "grayscale(0%)" : "grayscale(100%)",
          transition: `opacity ${FADE_DURATION}ms ease, transform ${FADE_DURATION}ms ease, filter 300ms ease`,
        }}
        title={logo.name}
      >
        <Image
          src={logo.src}
          alt={`Collaboration: ${logo.name}`}
          fill
          className="object-contain"
          sizes="100px"
        />
      </div>

      <div
        className="absolute bottom-[-10px] text-[10px] font-medium text-gray-500 text-center whitespace-nowrap"
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
  )
}

// ─── Main Component ───
export default function Collaboration() {
  const [tick, setTick] = useState(0)
  const [fading, setFading] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const isPausedRef = useRef(isPaused)

  // FIX: Sinkronkan Ref di dalam useEffect, bukan saat render
  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  // Gunakan useMemo agar distribusi logo tidak dihitung ulang setiap detik
  const columns = useMemo(
    () => distributeIntoColumns(collabs, COLUMN_COUNT),
    [],
  )

  const pause = useCallback(() => setIsPaused(true), [])
  const resume = useCallback(() => setIsPaused(false), [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPausedRef.current) return

      setFading(true)
      setTimeout(() => {
        setTick((prev) => prev + 1)
        setFading(false)
      }, FADE_DURATION)
    }, SWAP_INTERVAL)

    return () => clearInterval(interval)
  }, [])

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
          className="relative grid gap-4 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${COLUMN_COUNT}, 1fr)`,
            maxWidth: "1000px",
          }}
        >
          {columns.map((colLogos, i) => (
            <LogoColumn
              key={i}
              logos={colLogos}
              tick={tick}
              fading={fading}
              startIndex={i}
              onHover={pause}
              onLeave={resume}
            />
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-10">
          and many more local brands we&apos;re proud to work with.
        </p>
      </div>
    </section>
  )
}
