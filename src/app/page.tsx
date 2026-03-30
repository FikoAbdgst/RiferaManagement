"use client"

import Image from "next/image"
import heroImg from "../assets/image.png"
import heroine1 from "../assets/teteh1.png"
import heroine2 from "../assets/teteh2.png"
import fnbImg from "../assets/creation1.jpg"
import lifeImg from "../assets/creation2.jpg"
import beautyImg from "../assets/creation3.jpg"
import { useState, useEffect, useRef } from "react"

const PURPLE = "#8B5CF6"
const LIGHT_PINK = "#FDF0F5"
const PINK_MID = "#FAE3EE"
const WHITE = "#FFFFFF"
const DARK = "#1a1a1a"
const MUTED = "#888"

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:wght@700;900&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Nunito', sans-serif; background: ${LIGHT_PINK}; color: ${DARK}; overflow-x: hidden; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(253,240,245,0.88); backdrop-filter: blur(14px);
    padding: 14px 40px; display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid rgba(139,92,246,0.12);
  }
  .nav-logo { font-size: 17px; font-weight: 900; color: ${PURPLE}; text-transform: uppercase; letter-spacing: -0.5px; }
  .nav-links { display: flex; gap: 28px; }
  .nav-links a { font-size: 12px; font-weight: 700; color: ${MUTED}; text-decoration: none; text-transform: uppercase; letter-spacing: 0.6px; transition: color 0.2s; }
  .nav-links a:hover { color: ${PURPLE}; }

  .container { max-width: 1100px; margin: 0 auto; padding: 0 36px; }

  /* SECTION TAG */
  .section-tag {
    display: inline-block; background: ${WHITE}; border: 2px solid ${DARK};
    border-radius: 999px; padding: 9px 26px; font-size: 17px; font-weight: 900;
    color: ${PURPLE}; text-transform: uppercase; letter-spacing: 1px;
    box-shadow: 3px 3px 0 ${DARK};
  }

  /* ─── 1. HERO ─── full-height, phone left + text right */
  .hero {
    min-height: 100vh; display: flex; align-items: center; padding-top: 80px;
    background: ${LIGHT_PINK}; position: relative; overflow: hidden;
  }
  .hero-blob { position: absolute; border-radius: 50%; pointer-events: none; }
  .hero-blob-1 { width: 260px; height: 260px; background: ${PURPLE}; opacity: 0.07; top: -80px; left: -100px; }
  .hero-blob-2 { width: 340px; height: 340px; border: 3px solid ${PURPLE}; opacity: 0.18; bottom: -60px; right: -80px; }
  .hero-star { position: absolute; top: 90px; left: 52px; font-size: 44px; color: ${PURPLE}; opacity: 0.65; }
  .hero-inner { display: flex; align-items: center; gap: 64px; flex-wrap: wrap; justify-content: center; position: relative; z-index: 2; }
  .hero-phone {
    width: 230px; flex-shrink: 0; background: #111; border-radius: 40px; padding: 11px;
    box-shadow: 0 36px 80px rgba(139,92,246,0.22);
  }
  .hero-phone-screen { background: ${WHITE}; border-radius: 30px; height: 470px; overflow: hidden; position: relative; }
  .phone-notch { position: absolute; top: 8px; left: 50%; transform: translateX(-50%); width: 76px; height: 18px; background: #111; border-radius: 12px; z-index: 10; }
  .phone-header { padding: 30px 12px 8px; display: flex; align-items: center; gap: 8px; }
  .phone-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, ${PURPLE}, #ec4899); display: flex; align-items: center; justify-content: center; color: white; font-size: 11px; font-weight: 900; flex-shrink: 0; }
  .phone-name { font-size: 11px; font-weight: 800; color: #111; }
  .phone-bio-text { font-size: 8px; color: #666; line-height: 1.4; }
  .phone-stats { display: flex; gap: 10px; padding: 0 12px 8px; }
  .pstat { text-align: center; }
  .pstat-n { font-size: 11px; font-weight: 800; }
  .pstat-l { font-size: 8px; color: #888; }
  .phone-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; }
  .phone-cell { aspect-ratio: 1; background: linear-gradient(135deg, #fce7f3, #e9d5ff); display: flex; align-items: center; justify-content: center; font-size: 18px; }
  .hero-text { flex: 1; min-width: 280px; }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(54px, 7.5vw, 92px); font-weight: 900; color: ${PURPLE};
    line-height: 0.93; text-transform: uppercase; letter-spacing: -2px; margin-bottom: 20px;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: ${WHITE}; border: 2px solid ${PURPLE}; border-radius: 999px;
    padding: 8px 20px; font-size: 14px; font-weight: 800; color: ${PURPLE};
    text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 22px;
  }
  .ig-ring { width: 18px; height: 18px; border-radius: 50%; background: linear-gradient(135deg, #f97316, #ec4899, #8b5cf6); }
  .hero-desc { font-size: 15px; color: #555; line-height: 1.75; max-width: 420px; margin-bottom: 28px; }
  .hero-cta {
    background: ${PURPLE}; color: ${WHITE}; border: none; cursor: pointer;
    padding: 14px 34px; border-radius: 999px; font-family: 'Nunito', sans-serif;
    font-weight: 800; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;
    box-shadow: 0 8px 30px rgba(139,92,246,0.32); transition: transform 0.2s, box-shadow 0.2s;
  }
  .hero-cta:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(139,92,246,0.42); }

  /* ─── 2. ABOUT ─── dark full-width banner */
  .about-section { background: ${DARK}; padding: 80px 0; }
  .about-inner { display: flex; align-items: center; gap: 60px; flex-wrap: wrap; }
  .about-text { flex: 1; min-width: 280px; }
  .about-eyebrow { font-size: 12px; font-weight: 800; color: ${PURPLE}; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 14px; }
  .about-heading { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 44px); font-weight: 900; color: ${WHITE}; line-height: 1.15; margin-bottom: 20px; }
  .about-para { font-size: 15px; color: #bbb; line-height: 1.8; margin-bottom: 14px; }
  .about-para strong { color: ${WHITE}; }
  .about-cards { display: flex; gap: 14px; flex-shrink: 0; }
  .polaroid { background: ${WHITE}; padding: 10px 10px 28px; box-shadow: 5px 5px 0 rgba(139,92,246,0.4); flex: 1; min-width: 120px; }
  .polaroid:first-child { transform: rotate(-3deg) translateY(10px); }
  .polaroid:last-child { transform: rotate(2.5deg); }
  .polaroid-img { width: 100%; aspect-ratio: 1; background: #e9d5ff; display: flex; align-items: center; justify-content: center; font-size: 34px; margin-bottom: 6px; }
  .polaroid-cap { font-size: 10px; text-align: center; color: #888; }

  /* ─── 3. STATS ROW ─── full-bleed pink strip, 3 big numbers */
  .stats-strip { background: ${PINK_MID}; padding: 56px 0; }
  .stats-inner { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; }
  .stat-block { text-align: center; padding: 0 20px; border-right: 1px solid rgba(139,92,246,0.2); }
  .stat-block:last-child { border-right: none; }
  .stat-number { font-family: 'Playfair Display', serif; font-size: clamp(36px,5vw,40px); font-weight: 900; color: ${PURPLE}; line-height: 1; margin-bottom: 6px; }
  .stat-label { font-size: 12px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 1px; }

  /* ─── 4. CONTENT CREATION ─── white bg, horizontal scroll feel, 3 tall cards */
  .services-section { background: ${WHITE}; padding: 80px 0; }
  .services-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 48px; flex-wrap: wrap; gap: 16px; }
  .services-sub { font-size: 14px; color: ${MUTED}; max-width: 340px; line-height: 1.6; }
  .services-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
  .scard { 
    border-radius: 24px; 
    overflow: hidden; /* Ini yang membuat sudutnya membulat */
    transition: transform 0.22s; 
    position: relative; 
    /* Tambahkan baris ini untuk memaksa border-radius memotong isinya di beberapa browser */
    transform: translateZ(0); 
  }
  .scard:hover { transform: translateY(-6px); }
  .scard-img { width: 100%; aspect-ratio: 3/4; position: relative; overflow: hidden; }
  .scard-img.fnb { background: linear-gradient(160deg, #fef3c7, #fde68a); }
  .scard-img.life { background: linear-gradient(160deg, #ddd6fe, #c4b5fd); }
  .scard-img.beauty { background: linear-gradient(160deg, #fce7f3, #fbcfe8); }
  .scard-body { 
    padding: 18px 20px; 
    background: ${LIGHT_PINK}; 
    border-bottom-left-radius: 24px; /* Samakan dengan border-radius .scard */
    border-bottom-right-radius: 24px; /* Samakan dengan border-radius .scard */
  }
  .scard-title { font-size: 15px; font-weight: 800; color: ${DARK}; margin-bottom: 4px; }
  .scard-desc { font-size: 12px; color: ${MUTED}; }

  /* ─── 5. WHAT WE DO ─── split layout: big text left + 3 stacked pills right */
  .together-section { background: ${LIGHT_PINK}; padding: 80px 0; }
  .together-inner { display: flex; align-items: center; gap: 64px; flex-wrap: wrap; }
  .together-left { flex: 1; min-width: 260px; }
  .together-big { font-family: 'Playfair Display', serif; font-size: clamp(32px,4.5vw,52px); font-weight: 900; color: ${DARK}; line-height: 1.1; margin: 16px 0 8px; }
  .together-big span { color: ${PURPLE}; }
  .together-right { flex: 1; min-width: 280px; display: flex; flex-direction: column; gap: 16px; }
  .tw-card {
    background: ${WHITE}; border-radius: 20px; padding: 20px 24px;
    display: flex; align-items: center; gap: 18px;
    box-shadow: 0 2px 12px rgba(139,92,246,0.08); transition: transform 0.2s;
  }
  .tw-card:hover { transform: translateX(6px); }
  .tw-icon { font-size: 32px; flex-shrink: 0; }
  .tw-title { font-size: 14px; font-weight: 800; color: ${DARK}; margin-bottom: 3px; }
  .tw-desc { font-size: 12px; color: ${MUTED}; }

  /* ─── 6. TALENT PROFILE ─── dark bg, chart + stat chips */
  .talent-section { background: ${DARK}; padding: 80px 0; }
  .talent-section .section-tag { background: #2a2a2a; border-color: ${PURPLE}; box-shadow: 3px 3px 0 ${PURPLE}; }
  .talent-charts { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin: 40px 0 32px; }
  .chart-title { font-size: 15px; font-weight: 800; color: ${WHITE}; margin-bottom: 16px; text-align: center; }
  .bar-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  .bar-label { font-size: 11px; font-weight: 700; color: #aaa; min-width: 54px; text-align: right; }
  .bar-track { flex: 1; background: #2d2d2d; border-radius: 999px; height: 30px; overflow: hidden; }
  .bar-fill {
    height: 100%; background: linear-gradient(90deg, #a855f7, ${PURPLE});
    border-radius: 999px; display: flex; align-items: center;
    padding-left: 10px; font-size: 10px; font-weight: 700; color: white;
    transition: width 1.1s cubic-bezier(.4,0,.2,1);
  }
  .talent-chips { display: flex; gap: 14px; flex-wrap: wrap; }
  .talent-chip { flex: 1; min-width: 180px; background: #242424; border: 1px solid #3d3d3d; border-radius: 14px; padding: 14px 18px; }
  .talent-chip strong { color: ${PURPLE}; font-size: 16px; display: block; margin-bottom: 3px; }
  .talent-chip span { font-size: 11px; color: #888; }

  /* ─── 7. TOP TALENT ─── white bg, polaroid grid */
  .top-talent-section { background: ${WHITE}; padding: 80px 0; }
  .talent-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 18px; }
  .tcard { background: ${LIGHT_PINK}; border: 2px solid ${DARK}; padding: 8px 8px 12px; transform: rotate(-1deg); transition: transform 0.2s; cursor: default; }
  .tcard:nth-child(even) { transform: rotate(1deg); }
  .tcard:hover { transform: rotate(0) scale(1.05); z-index: 2; }
  .tphoto { width: 100%; aspect-ratio: 1; background: linear-gradient(135deg, #fce7f3, #e9d5ff); display: flex; align-items: center; justify-content: center; font-size: 30px; margin-bottom: 8px; }
  .thandle { font-size: 9px; font-weight: 700; color: ${DARK}; text-align: center; line-height: 1.4; }
  .tplatforms { display: flex; gap: 4px; justify-content: center; margin-top: 5px; }
  .tplat { width: 14px; height: 14px; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 8px; color: white; font-weight: 800; }
  .tplat.ig { background: linear-gradient(135deg, #f97316, #ec4899); }
  .tplat.tt { background: #111; }

  /* ─── 8. EXAMPLE CONTENT ─── pink bg, 4 phones in a row */
  .content-section { background: ${PINK_MID}; padding: 80px 0; }
  .phones-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
  .cphone { background: #111; border-radius: 26px; padding: 7px; }
  .cphone-screen { background: #1c1c1c; border-radius: 20px; aspect-ratio: 9/16; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; }
  .cphone-bg { position: absolute; inset: 0; opacity: 0.55; }
  .cphone-bg.c1 { background: linear-gradient(160deg, #fef3c7, #fde68a); }
  .cphone-bg.c2 { background: linear-gradient(160deg, #ddd6fe, #c4b5fd); }
  .cphone-bg.c3 { background: linear-gradient(160deg, #fce7f3, #fbcfe8); }
  .cphone-bg.c4 { background: linear-gradient(160deg, #d1fae5, #a7f3d0); }
  .cphone-emoji { font-size: 36px; position: relative; z-index: 1; }
  .play-ring { position: absolute; width: 38px; height: 38px; border-radius: 50%; background: rgba(255,255,255,0.82); display: flex; align-items: center; justify-content: center; }
  .play-tri { width: 0; height: 0; border-top: 7px solid transparent; border-bottom: 7px solid transparent; border-left: 13px solid ${PURPLE}; margin-left: 2px; }
  .cphone-label { position: absolute; bottom: 8px; left: 8px; right: 8px; font-size: 9px; font-weight: 700; color: white; }
  .cphone-link { font-size: 9px; color: ${PURPLE}; text-align: center; margin-top: 5px; text-decoration: underline; word-break: break-all; }

  /* ─── 9. COLLABORATION ─── white bg, 6-col logo grid */
  .collab-section { background: ${WHITE}; padding: 80px 0; }
  .collab-grid { display: grid; grid-template-columns: repeat(6,1fr); gap: 14px; }
  .collab-item {
    background: ${LIGHT_PINK}; border-radius: 16px; aspect-ratio: 1;
    display: flex; align-items: center; justify-content: center; flex-direction: column;
    font-size: 10px; font-weight: 800; text-align: center; padding: 8px; color: ${DARK};
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .collab-item:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(139,92,246,0.18); }

/* ─── 10. PRICING ─── modern cards */
  .pricing-section { background: ${DARK}; padding: 100px 0; }
  .pricing-section .section-tag { background: #2a2a2a; border-color: ${PURPLE}; box-shadow: 3px 3px 0 ${PURPLE}; color: white; }
  .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 900px; margin: 60px auto 0; align-items: stretch; }
  
  .pricing-card {
    background: #1a1a1a; border: 1px solid #333; border-radius: 24px;
    padding: 40px 32px; display: flex; flex-direction: column;
    transition: transform 0.3s ease, border-color 0.3s ease;
    position: relative; overflow: hidden;
  }
  .pricing-card:hover { transform: translateY(-8px); border-color: #555; }
  
  /* Highlight Card */
  .pricing-card.premium {
    background: linear-gradient(145deg, #2a164a, #1a0d2e);
    border-color: ${PURPLE};
    box-shadow: 0 20px 40px rgba(139,92,246,0.15);
    transform: scale(1.05); z-index: 2;
  }
  .pricing-card.premium:hover { transform: scale(1.05) translateY(-8px); border-color: #a855f7; }
  
  .pricing-badge {
    position: absolute; top: 16px; right: 16px; background: ${PURPLE}; color: white;
    font-size: 10px; font-weight: 800; padding: 4px 12px; border-radius: 999px; text-transform: uppercase;
  }
  
  .pricing-name { font-size: 18px; font-weight: 800; color: white; margin-bottom: 8px; }
  .pricing-price { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 900; color: ${PURPLE}; margin-bottom: 24px; line-height: 1; }
  .pricing-price span { font-family: 'Nunito', sans-serif; font-size: 14px; color: #888; font-weight: 600; }
  .pricing-card.premium .pricing-price { color: white; }
  .pricing-card.premium .pricing-price span { color: #a78bfa; }
  
  .pricing-features { list-style: none; margin-bottom: 32px; flex: 1; }
  .pricing-features li { font-size: 14px; color: #bbb; margin-bottom: 12px; display: flex; align-items: center; gap: 10px; }
  .pricing-features li::before { content: '✓'; color: ${PURPLE}; font-weight: 800; font-size: 16px; }
  .pricing-card.premium .pricing-features li::before { color: #e9d5ff; }
  
  .pricing-cta {
    width: 100%; padding: 14px; border-radius: 999px; font-weight: 800; font-size: 14px;
    text-align: center; cursor: pointer; transition: all 0.2s; border: none;
  }
  .pricing-cta.outline { background: transparent; color: white; border: 2px solid #444; }
  .pricing-cta.outline:hover { background: #333; border-color: #555; }
  .pricing-cta.filled { background: ${PURPLE}; color: white; box-shadow: 0 4px 14px rgba(139,92,246,0.4); }
  .pricing-cta.filled:hover { background: #7c3aed; }
  
  .pricing-note { text-align: center; margin-top: 40px; font-size: 13px; font-weight: 600; color: #888; }

  /* FOOTER */
  .footer { background: ${PURPLE}; color: white; text-align: center; padding: 40px 32px; }
  .footer-logo { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900; text-transform: uppercase; margin-bottom: 8px; }
  .footer-sub { font-size: 13px; opacity: 0.7; margin-bottom: 12px; }
  .footer-email { font-size: 14px; font-weight: 700; }
  .footer-socials { margin-top: 12px; font-size: 11px; opacity: 0.45; }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .nav-links { display: none; }
    .hero-inner { flex-direction: column; text-align: center; }
    .hero-title { font-size: 52px; }
    .about-inner { flex-direction: column; }
    .stats-inner { grid-template-columns: 1fr; }
    .stat-block { border-right: none; border-bottom: 1px solid rgba(139,92,246,0.2); padding: 20px 0; }
    .stat-block:last-child { border-bottom: none; }
    .services-grid { grid-template-columns: 1fr; }
    .together-inner { flex-direction: column; }
    .talent-charts { grid-template-columns: 1fr; }
    .talent-grid { grid-template-columns: repeat(2,1fr); }
    .phones-row { grid-template-columns: repeat(2,1fr); }
    .collab-grid { grid-template-columns: repeat(3,1fr); }
    .ppill.basic, .ppill.standar, .ppill.premium { width: 100%; align-self: stretch; }

    .pricing-grid { grid-template-columns: 1fr; max-width: 400px; gap: 32px; margin-top: 40px; }
    .pricing-card.premium { transform: scale(1); }
    .pricing-card.premium:hover { transform: translateY(-8px); }
  }
`

const talents = [
  { handle: "najwas.s", platform: ["ig"], emoji: "👩‍💼" },
  { handle: "tasyameng\ntasyaameng", platform: ["ig", "tt"], emoji: "🧕" },
  { handle: "laporpaksayalapar", platform: ["tt"], emoji: "☕" },
  {
    handle: "larasanjanii\nhelloladybull",
    platform: ["ig", "tt"],
    emoji: "💁‍♀️",
  },
  { handle: "corrifebriyani", platform: ["ig"], emoji: "🍷" },
  {
    handle: "foodventurebndung_\nridwan.maulanaa_",
    platform: ["ig", "tt"],
    emoji: "🍜",
  },
  { handle: "maylanimelaney", platform: ["ig"], emoji: "🎸" },
  { handle: "rismaputria", platform: ["ig"], emoji: "🌿" },
  { handle: "firman.agstn", platform: ["tt"], emoji: "😎" },
  { handle: "adikjajan", platform: ["ig"], emoji: "🧕" },
]

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

const contentItems = [
  { emoji: "🍲", label: "Buruan Uyut", bg: "c1", link: "DMaHGAFJyaR" },
  { emoji: "🛼", label: "Klandestine Space", bg: "c2", link: "DMcslBkREPs" },
  { emoji: "🌸", label: "Outdoor Café", bg: "c3", link: "DMRcRSnzTlf" },
  { emoji: "🪴", label: "Garden Resto", bg: "c4", link: "DMRcRSnzTlf" },
]

export default function Home() {
  const [barsVisible, setBarsVisible] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setBarsVisible(true)
      },
      { threshold: 0.25 },
    )
    if (chartRef.current) observer.observe(chartRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">Rifera Management</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#talent">Talent</a>
          <a href="#collab">Clients</a>
          <a href="#pricing">Pricing</a>
        </div>
      </nav>

      {/* 1. HERO — light pink, phone + text */}
      <section className="hero">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-star">✳</div>
        <div className="container">
          <div className="hero-inner">
            <div className="hero-phone">
              <div className="hero-phone-screen">
                <div className="phone-notch" />
                {/* Ubah src menjadi "/assets/image.png" 
                  Pastikan file gambar ada di direktori: public/assets/image.png 
                */}
                <Image
                  src={heroImg}
                  alt="Phone Mockup"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="hero-text">
              <h1 className="hero-title">
                Rifera
                <br />
                Management
              </h1>
              <div className="hero-badge">
                <div className="ig-ring" />
                @RIFERAMANAGEMENT
              </div>
              <p className="hero-desc">
                Agensi pengelolaan & pengembangan talenta digital khusus KOL,
                Influencer, dan Content Creator di Instagram, TikTok, dan
                YouTube. Berbasis di Bandung.
              </p>
              <button
                className="hero-cta"
                onClick={() =>
                  document
                    .getElementById("pricing")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Lihat Paket Harga →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT — dark, full bleed, split layout */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="about-inner">
            <div className="about-text">
              <div className="about-eyebrow">Tentang Kami</div>
              <h2 className="about-heading">
                Mengelola &amp;
                <br />
                Mengembangkan
                <br />
                Talenta Digital
              </h2>
              <p className="about-para">
                Kami dari <strong>Rifera Management</strong> — sebuah manajemen
                yang bergerak di bidang pengelolaan dan pengembangan talenta
                digital, khususnya <strong>Key Opinion Leader (KOL)</strong>,
                Influencer, dan Content Creator di berbagai platform media
                sosial seperti Instagram, TikTok, YouTube, dan lainnya.
              </p>
              <p className="about-para">
                Manajemen kami menaungi sejumlah KOL dengan berbagai bidang
                seperti <strong>F&amp;B, kecantikan</strong>, dan{" "}
                <strong>life style</strong>.
              </p>
            </div>
            <div className="about-cards">
              <div className="polaroid">
                <div className="polaroid-img">
                  <Image
                    src={heroine1}
                    alt="Phone Mockup"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="polaroid-cap">Content Creator</div>
              </div>
              <div className="polaroid">
                <div className="polaroid-img">
                  <Image
                    src={heroine2}
                    alt="Phone Mockup"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="polaroid-cap">KOL Bandung</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATS STRIP — mid-pink, 3 big numbers */}
      <div className="stats-strip">
        <div className="container">
          <div className="stats-inner">
            <div className="stat-block">
              <div className="stat-number tracking-widest">0.59–3.40%</div>
              <div className="stat-label">Engagement Rate</div>
            </div>
            <div className="stat-block">
              <div className="stat-number">50+</div>
              <div className="stat-label">Comments per Post</div>
            </div>
            <div className="stat-block">
              <div className="stat-number">35K</div>
              <div className="stat-label">Max Weekly Reach</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. CONTENT CREATION — white, tall cards portrait */}
      <section className="services-section" id="services">
        <div className="container">
          <div className="services-header">
            <div className="section-tag">Content Creation</div>
            <p className="services-sub">
              Talenta kami berpengalaman di tiga niche utama yang paling relevan
              di pasar Indonesia saat ini.
            </p>
          </div>
          <div className="services-grid">
            {[
              {
                title: "F&B Reviewer",
                desc: "Review restoran, kafe, dan kuliner Bandung & sekitarnya",
                cls: "fnb",
              },
              {
                title: "Life Style & Recreation",
                desc: "Gaya hidup, aktivitas, hiburan, dan rekreasi keluarga",
                cls: "life",
              },
              {
                title: "Beauty & Fashion",
                desc: "Kecantikan, skincare, makeup, dan fashion terkini",
                cls: "beauty",
              },
            ].map((s, i) => (
              <div className="scard" key={i}>
                <div className={`scard-img ${s.cls}`}>
                  <Image
                    src={
                      s.cls === "fnb"
                        ? fnbImg
                        : s.cls === "life"
                          ? lifeImg
                          : beautyImg
                    }
                    alt={`${s.title} Image`}
                    fill
                    style={{ objectFit: "cover" }} // Ini sudah benar
                  />
                </div>
                <div className="scard-body">
                  <div className="scard-title">{s.title}</div>
                  <div className="scard-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHAT WE DO TOGETHER — light pink, big text left + horizontal cards right */}
      <section className="together-section">
        <div className="container">
          <div className="together-inner">
            <div className="together-left">
              <div className="section-tag">What Can We Do Together</div>
              <div className="together-big">
                Kolaborasi
                <br />
                <span>nyata</span>,<br />
                hasil terukur.
              </div>
            </div>
            <div className="together-right">
              {[
                {
                  emoji: "🤝",
                  title: "Approach talent to join my team",
                  desc: "Kami rekrut & kelola talenta terbaik sesuai kebutuhan brand Anda.",
                },
                {
                  emoji: "📱",
                  title: "Make a content as the brief",
                  desc: "Konten dibuat sesuai brief, on-brand, dan tepat sasaran.",
                },
                {
                  emoji: "🐷",
                  title: "Get benefit for client",
                  desc: "Visibilitas meningkat, engagement nyata, ROI terukur.",
                },
              ].map((t, i) => (
                <div className="tw-card" key={i}>
                  <div className="tw-icon">{t.emoji}</div>
                  <div>
                    <div className="tw-title">{t.title}</div>
                    <div className="tw-desc">{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. TALENT PROFILE — dark, charts */}
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

      {/* 7. TOP TALENT — white, polaroid grid */}
      <section className="top-talent-section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="section-tag">Top Talent</div>
          </div>
          <div className="talent-grid">
            {talents.map((t, i) => (
              <div className="tcard" key={i}>
                <div className="tphoto">{t.emoji}</div>
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

      {/* 8. EXAMPLE CONTENT — mid-pink, 4 phones */}
      <section className="content-section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="section-tag">Example Content</div>
          </div>
          <div className="phones-row">
            {contentItems.map((c, i) => (
              <div key={i}>
                <div className="cphone">
                  <div className="cphone-screen">
                    <div className={`cphone-bg ${c.bg}`} />
                    <div className="cphone-emoji">{c.emoji}</div>
                    <div className="play-ring">
                      <div className="play-tri" />
                    </div>
                    <div className="cphone-label">{c.label}</div>
                  </div>
                </div>
                <div className="cphone-link">instagram.com/reel/{c.link}/</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. COLLABORATION — white, 6-col grid */}
      <section className="collab-section" id="collab">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
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

      {/* 10. PRICING — modern cards */}
      <section className="pricing-section" id="pricing">
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <div className="section-tag">Pricelist</div>
          </div>

          <div className="pricing-grid">
            {/* Basic Card */}
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

            {/* Premium Card (Highlighted) */}
            <div className="pricing-card premium">
              <div className="pricing-badge">Best Value</div>
              <div className="pricing-name">Premium ✨</div>
              <div className="pricing-price">Rp 1.65M</div>
              <ul className="pricing-features">
                <li style={{ color: "white" }}>30 Talent KOL</li>
                <li style={{ color: "white" }}>Prioritas Pemilihan Talent</li>
                <li style={{ color: "white" }}>Briefing & Monitoring</li>
                <li style={{ color: "white" }}>Advanced Reporting + Insight</li>
              </ul>
              <button className="pricing-cta filled">Pilih Premium</button>
            </div>

            {/* Standar Card */}
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

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">Rifera Management</div>
        <div className="footer-sub">
          KOL & Influencer Agency · Bandung, Indonesia
        </div>
        <div className="footer-email">📧 riferamanagement@gmail.com</div>
        <div className="footer-socials">
          Instagram: @riferamanagement · TikTok: @rifera.management
        </div>
      </footer>
    </>
  )
}
