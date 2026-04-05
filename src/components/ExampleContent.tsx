"use client"

import { useState, useRef, useEffect } from "react"

type VideoItem = {
  videoSrc: string
  label: string
  bg: string
  link: string
}

type VideoCardProps = {
  item: VideoItem
  isPlaying: boolean
  onTogglePlay: () => void
}

const VideoCard = ({ item, isPlaying, onTogglePlay }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play()
    } else {
      videoRef.current?.pause()
    }
  }, [isPlaying])

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime
      const duration = videoRef.current.duration
      if (duration > 0) {
        setProgress((current / duration) * 100)
      }
    }
  }

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (videoRef.current && timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(1, clickX / rect.width))

      videoRef.current.currentTime = percentage * videoRef.current.duration
      setProgress(percentage * 100)
    }
  }

  return (
    <div>
      <div
        className="cphone"
        onClick={onTogglePlay}
        style={{ cursor: "pointer" }}
      >
        <div
          className="cphone-screen"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <div
            className={`cphone-bg ${item.bg}`}
            style={{ opacity: isPlaying ? 0 : 1, transition: "opacity 0.3s" }}
          />

          <video
            ref={videoRef}
            src={item.videoSrc}
            onTimeUpdate={handleTimeUpdate}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
            loop
            playsInline
          />

          {/* Tombol Play */}
          {!isPlaying && (
            <div
              className="play-ring"
              style={{
                position: "absolute",
                zIndex: 2,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="play-tri" />
            </div>
          )}

          {/* Floating Timeline — mengambang di bagian bawah, tidak menyatu */}
          <div
            ref={timelineRef}
            onClick={handleTimelineClick}
            style={{
              position: "absolute",
              zIndex: 3,
              bottom: "12px", // jarak dari bawah frame
              left: "12px", // margin kiri
              right: "12px", // margin kanan
              width: "calc(100% - 24px)",
              height: "12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Track abu-abu transparan */}
            <div
              style={{
                width: "100%",
                height: "4px",
                backgroundColor: "rgba(255, 255, 255, 0.35)",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              {/* Indikator progress */}
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  backgroundColor: "#fff",
                  borderRadius: "999px",
                  transition: "width 0.1s linear",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Label nama + link di bawah card */}
      <div style={{ textAlign: "center", marginTop: "12px" }}>
        <a
          href={`https://www.instagram.com/reel/${item.link}/`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "8px 20px",
            border: "2px solid #000",
            borderRadius: "999px",
            backgroundColor: "#fff",
            fontWeight: "bold",
            fontSize: "0.75rem",
            color: "#000",
            textDecoration: "none",
            cursor: "pointer",
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "translate(2px, 2px)"
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "translate(0, 0)"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          Lihat Selengkapnya →
        </a>
      </div>
    </div>
  )
}

export default function ExampleContent() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)

  const contentItems: VideoItem[] = [
    {
      videoSrc: "/videos/buruan_uyut.mp4",
      label: "Buruan Uyut",
      bg: "c1",
      link: "DL6jePvTBZT",
    },
    {
      videoSrc: "/videos/klandestine.mp4",
      label: "Klandestine Space",
      bg: "c2",
      link: "DMcslBkREPs",
    },
    {
      videoSrc: "/videos/outdoor_cafe.mp4",
      label: "Outdoor Café",
      bg: "c3",
      link: "DMRcRSnzTlf",
    },
    {
      videoSrc: "/videos/garden_resto.mp4",
      label: "Garden Resto",
      bg: "c4",
      link: "DNFAdNAyQRp",
    },
  ]

  return (
    <section className="content-section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div className="section-tag">Example Content</div>
        </div>
        <div className="phones-row">
          {contentItems.map((c, i) => (
            <VideoCard
              key={i}
              item={c}
              isPlaying={playingIndex === i}
              onTogglePlay={() => {
                setPlayingIndex(playingIndex === i ? null : i)
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
