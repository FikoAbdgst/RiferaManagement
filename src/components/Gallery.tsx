// src/components/Gallery.tsx
"use client"

import Image from "next/image"
import { useState, useEffect, useCallback, useRef } from "react"

const galleryItems = [
  {
    id: 1,
    src: "/galleries/carryme1.webp",
    alt: "Gallery 1",
    aspectRatio: "2/3",
  },
  {
    id: 2,
    src: "/galleries/carryme2.webp",
    alt: "Gallery 2",
    aspectRatio: "1/1",
  },
  {
    id: 3,
    src: "/galleries/carryme3.webp",
    alt: "Gallery 3",
    aspectRatio: "3/4",
  },
  {
    id: 4,
    src: "/galleries/carryme4.webp",
    alt: "Gallery 4",
    aspectRatio: "1/1",
  },
  {
    id: 5,
    src: "/galleries/carryme6.webp",
    alt: "Gallery 5",
    aspectRatio: "9/16",
  },
  {
    id: 6,
    src: "/galleries/carryme5.webp",
    alt: "Gallery 6",
    aspectRatio: "1/1",
  },
  {
    id: 7,
    src: "/galleries/carryme7.webp",
    alt: "Gallery 7",
    aspectRatio: "2/3",
  },
  {
    id: 8,
    src: "/galleries/carryme8.webp",
    alt: "Gallery 8",
    aspectRatio: "4/5",
  },
  {
    id: 9,
    src: "/galleries/carryme9.webp",
    alt: "Gallery 9",
    aspectRatio: "1/1",
  },
  {
    id: 10,
    src: "/galleries/carryme10.webp",
    alt: "Gallery 10",
    aspectRatio: "3/4",
  },
  {
    id: 11,
    src: "/galleries/carryme11.webp",
    alt: "Gallery 11",
    aspectRatio: "9/16",
  },
  {
    id: 12,
    src: "/galleries/carryme12.webp",
    alt: "Gallery 12",
    aspectRatio: "4/3",
  },
  {
    id: 13,
    src: "/galleries/carryme13.webp",
    alt: "Gallery 13",
    aspectRatio: "2/3",
  },
  {
    id: 14,
    src: "/galleries/carryme14.webp",
    alt: "Gallery 14",
    aspectRatio: "1/1",
  },
  {
    id: 15,
    src: "/galleries/carryme15.webp",
    alt: "Gallery 15",
    aspectRatio: "4/3",
  },
]

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // ── Touch swipe state ──
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const isDragging = useRef(false)

  const openModal = (index: number) => setActiveIndex(index)
  const closeModal = () => setActiveIndex(null)

  const goPrev = useCallback(() => {
    if (activeIndex === null) return
    setActiveIndex(
      (activeIndex - 1 + galleryItems.length) % galleryItems.length,
    )
  }, [activeIndex])

  const goNext = useCallback(() => {
    if (activeIndex === null) return
    setActiveIndex((activeIndex + 1) % galleryItems.length)
  }, [activeIndex])

  // Keyboard + scroll lock
  useEffect(() => {
    if (activeIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal()
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [activeIndex, goPrev, goNext])

  // ── Touch handlers ──
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    isDragging.current = false
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const deltaX = Math.abs(e.touches[0].clientX - touchStartX.current)
    const deltaY = Math.abs(e.touches[0].clientY - touchStartY.current)
    // Jika gerakan horizontal lebih dominan, anggap swipe horizontal
    if (deltaX > deltaY && deltaX > 8) {
      isDragging.current = true
      e.stopPropagation() // cegah backdrop close terpicu
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    const deltaY = Math.abs(
      e.changedTouches[0].clientY - (touchStartY.current ?? 0),
    )

    const SWIPE_THRESHOLD = 50 // minimum px untuk dianggap swipe

    if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(deltaX) > deltaY) {
      if (deltaX < 0)
        goNext() // swipe kiri → next
      else goPrev() // swipe kanan → prev
    } else if (!isDragging.current) {
      // Bukan swipe, tap biasa → tutup modal (jika tap di backdrop)
    }

    touchStartX.current = null
    touchStartY.current = null
    isDragging.current = false
  }

  const activeItem = activeIndex !== null ? galleryItems[activeIndex] : null

  return (
    <section className="gallery-section" id="gallery">
      <style>{`
        .gallery-section {
          background: #FDF0F5;
          padding: 72px 0;
        }
        .gallery-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .gallery-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 900;
          color: #1a1a1a;
          margin: 14px 0 8px;
          line-height: 1.1;
        }
        .gallery-heading span { color: #8B5CF6; }
        .gallery-sub {
          font-size: 13px;
          color: #888;
          margin-top: 8px;
        }

        /* ── MASONRY ── */
        .masonry-grid {
          columns: 4;
          column-gap: 14px;
        }
        .masonry-item {
          break-inside: avoid;
          margin-bottom: 14px;
          border-radius: 18px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          display: block;
        }
        .masonry-img-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: block;
        }
        .masonry-img-wrapper img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(.4,0,.2,1);
          display: block;
        }
        .masonry-item:hover .masonry-img-wrapper img { transform: scale(1.06); }
        .masonry-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(139,92,246,0.45) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .masonry-item:hover .masonry-overlay { opacity: 1; }
        .masonry-zoom-hint {
          position: absolute;
          bottom: 12px;
          right: 14px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.3s, transform 0.3s;
          z-index: 2;
          font-size: 14px;
        }
        .masonry-item:hover .masonry-zoom-hint { opacity: 1; transform: scale(1); }

        /* ── MODAL BACKDROP ── */
        .gallery-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(10, 6, 20, 0.88);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: backdropIn 0.25s ease;
          touch-action: pan-y; /* izinkan vertical scroll tapi kita handle horizontal */
        }
        @keyframes backdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── MODAL BOX ── */
        .gallery-modal {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: modalIn 0.28s cubic-bezier(.4,0,.2,1);
          user-select: none;
          -webkit-user-select: none;
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.93); }
          to   { opacity: 1; transform: scale(1); }
        }
        .gallery-modal-img-wrapper {
          position: relative;
          max-width: 80vw;
          max-height: 85vh;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.55);
          pointer-events: none; /* biar touch event naik ke backdrop */
        }
        .gallery-modal-img-wrapper img {
          display: block;
          max-width: 80vw;
          max-height: 85vh;
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 20px;
          pointer-events: none;
          -webkit-user-drag: none;
        }

        /* ── SWIPE HINT (mobile only) ── */
        .swipe-hint {
          position: fixed;
          bottom: 96px;
          left: 50%;
          transform: translateX(-50%);
          display: none;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.5px;
          z-index: 1010;
          pointer-events: none;
        }
        .swipe-hint-arrow { font-size: 14px; }

        /* ── CLOSE BUTTON ── */
        .modal-close {
          position: fixed;
          top: 20px;
          right: 24px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          border: 1.5px solid rgba(255,255,255,0.22);
          color: white;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, transform 0.2s;
          z-index: 1010;
          line-height: 1;
        }
        .modal-close:hover { background: rgba(255,255,255,0.22); transform: scale(1.08); }

        /* ── NAV ARROWS ── */
        .modal-arrow {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          border: 1.5px solid rgba(255,255,255,0.22);
          color: white;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, transform 0.2s;
          z-index: 1010;
        }
        .modal-arrow:hover { background: rgba(255,255,255,0.24); transform: translateY(-50%) scale(1.08); }
        .modal-arrow.prev { left: 20px; }
        .modal-arrow.next { right: 20px; }

        /* ── COUNTER ── */
        .modal-counter {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 999px;
          padding: 6px 18px;
          font-size: 12px;
          font-weight: 700;
          color: rgba(255,255,255,0.7);
          letter-spacing: 1px;
          z-index: 1010;
        }

        /* ── DOT INDICATORS ── */
        .modal-dots {
          position: fixed;
          bottom: 60px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 1010;
        }
        .modal-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          transition: background 0.2s, transform 0.2s;
          cursor: pointer;
        }
        .modal-dot.active { background: #8B5CF6; transform: scale(1.4); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .masonry-grid { columns: 3; }
        }
        @media (max-width: 768px) {
          .masonry-grid { columns: 2; column-gap: 10px; }
          .masonry-item { margin-bottom: 10px; border-radius: 12px; }
          .modal-arrow { width: 40px; height: 40px; font-size: 16px; }
          .modal-arrow.prev { left: 10px; }
          .modal-arrow.next { right: 10px; }
          .gallery-modal-img-wrapper img { max-width: 92vw; }
        }
        @media (max-width: 480px) {
          .masonry-grid { columns: 2; column-gap: 8px; }
          .masonry-item { margin-bottom: 8px; border-radius: 10px; }
          /* Sembunyikan panah di mobile, gunakan swipe */
          .modal-arrow { display: none; }
          /* Tampilkan swipe hint di mobile */
          .swipe-hint { display: flex; }
          .gallery-modal-img-wrapper img { max-width: 96vw; max-height: 80vh; }
        }
      `}</style>

      <div className="container">
        <div className="gallery-header">
          <span className="section-tag">Gallery</span>
          <h2 className="gallery-heading">
            Karya <span>Terbaik</span> Kami
          </h2>
          <p className="gallery-sub">
            Momen dan konten pilihan dari para kreator kami.
          </p>
        </div>

        {/* ── MASONRY GRID ── */}
        <div className="masonry-grid">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className="masonry-item"
              onClick={() => openModal(index)}
            >
              <div
                className="masonry-img-wrapper"
                style={{ aspectRatio: item.aspectRatio }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
              <div className="masonry-overlay" />
              <div className="masonry-zoom-hint">🔍</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MODAL ── */}
      {activeItem && (
        <div
          className="gallery-modal-backdrop"
          onClick={closeModal}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close */}
          <button
            className="modal-close"
            onClick={closeModal}
            aria-label="Tutup"
          >
            ✕
          </button>

          {/* Prev arrow (desktop) */}
          <button
            className="modal-arrow prev"
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
            aria-label="Sebelumnya"
          >
            ‹
          </button>

          {/* Image — stopPropagation agar klik gambar tidak tutup modal */}
          <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
            <div className="gallery-modal-img-wrapper">
              <Image
                key={activeItem.id}
                src={activeItem.src}
                alt={activeItem.alt}
                width={1200}
                height={1200}
                style={{
                  maxWidth: "80vw",
                  maxHeight: "85vh",
                  width: "auto",
                  height: "auto",
                }}
                priority
              />
            </div>
          </div>

          {/* Next arrow (desktop) */}
          <button
            className="modal-arrow next"
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            aria-label="Berikutnya"
          >
            ›
          </button>

          {/* Swipe hint — hanya tampil di mobile */}
          <div className="swipe-hint">
            <span className="swipe-hint-arrow">←</span>
            Geser untuk navigasi
            <span className="swipe-hint-arrow">→</span>
          </div>

          {/* Dot indicators */}
          <div className="modal-dots" onClick={(e) => e.stopPropagation()}>
            {galleryItems.map((_, i) => (
              <div
                key={i}
                className={`modal-dot ${i === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="modal-counter">
            {(activeIndex ?? 0) + 1} / {galleryItems.length}
          </div>
        </div>
      )}
    </section>
  )
}
