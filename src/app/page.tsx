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

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Nunito', sans-serif; background: ${LIGHT_PINK}; color: ${DARK}; overflow-x: hidden; }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    background: rgba(253,240,245,0.92); backdrop-filter: blur(14px);
    padding: 0 24px;
    border-bottom: 1px solid rgba(139,92,246,0.12);
  }
  .nav-inner {
    max-width: 1100px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between;
    height: 64px;
  }
  .nav-logo { font-size: 16px; font-weight: 900; color: ${PURPLE}; text-transform: uppercase; letter-spacing: -0.5px; }
  .nav-links { display: flex; gap: 24px; }
  .nav-links a { font-size: 12px; font-weight: 700; color: ${MUTED}; text-decoration: none; text-transform: uppercase; letter-spacing: 0.6px; transition: color 0.2s; }
  .nav-links a:hover { color: ${PURPLE}; }

  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
  .hamburger span { display: block; width: 24px; height: 2px; background: ${DARK}; border-radius: 2px; transition: all 0.3s; }
  .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
  .hamburger.open span:nth-child(2) { opacity: 0; }
  .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

  .mobile-menu {
    display: none; position: fixed; top: 64px; left: 0; right: 0; z-index: 199;
    background: rgba(253,240,245,0.97); backdrop-filter: blur(14px);
    padding: 8px 24px 20px; border-bottom: 1px solid rgba(139,92,246,0.12);
    flex-direction: column; gap: 0;
  }
  .mobile-menu.open { display: flex; }
  .mobile-menu a {
    font-size: 15px; font-weight: 700; color: ${DARK}; text-decoration: none;
    text-transform: uppercase; letter-spacing: 0.6px; padding: 14px 0;
    border-bottom: 1px solid rgba(139,92,246,0.08); transition: color 0.2s;
  }
  .mobile-menu a:last-child { border-bottom: none; }
  .mobile-menu a:hover { color: ${PURPLE}; }

  .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

  .section-tag {
    display: inline-block; background: ${WHITE}; border: 2px solid ${DARK};
    border-radius: 999px; padding: 8px 22px; font-size: 15px; font-weight: 900;
    color: ${PURPLE}; text-transform: uppercase; letter-spacing: 1px;
    box-shadow: 3px 3px 0 ${DARK};
  }

  /* ── 1. HERO ── */
  .hero {
    min-height: 100vh; display: flex; align-items: center; padding-top: 64px;
    background: ${LIGHT_PINK}; position: relative; overflow: hidden;
  }
  .hero-blob { position: absolute; border-radius: 50%; pointer-events: none; }
  .hero-blob-1 { width: 260px; height: 260px; background: ${PURPLE}; opacity: 0.07; top: -80px; left: -100px; }
  .hero-blob-2 { width: 340px; height: 340px; border: 3px solid ${PURPLE}; opacity: 0.18; bottom: -60px; right: -80px; }
  .hero-star { position: absolute; top: 90px; left: 40px; font-size: 40px; color: ${PURPLE}; opacity: 0.55; }
  .hero-inner { display: flex; align-items: center; gap: 56px; flex-wrap: wrap; justify-content: center; position: relative; z-index: 2; padding: 40px 0; }
  .hero-phone { width: 210px; flex-shrink: 0; background: #111; border-radius: 38px; padding: 10px; box-shadow: 0 32px 70px rgba(139,92,246,0.22); }
  .hero-phone-screen { border-radius: 28px; height: 440px; overflow: hidden; position: relative; background: ${WHITE}; }
  .hero-text { flex: 1; min-width: 260px; max-width: 500px; }
  .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(48px, 6.5vw, 88px); font-weight: 900; color: ${PURPLE}; line-height: 0.93; text-transform: uppercase; letter-spacing: -2px; margin-bottom: 18px; }
  .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: ${WHITE}; border: 2px solid ${PURPLE}; border-radius: 999px; padding: 7px 18px; font-size: 13px; font-weight: 800; color: ${PURPLE}; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 20px; }
  .ig-ring { width: 16px; height: 16px; border-radius: 50%; background: linear-gradient(135deg, #f97316, #ec4899, #8b5cf6); flex-shrink: 0; }
  .hero-desc { font-size: 14px; color: #555; line-height: 1.75; margin-bottom: 24px; }
  .hero-cta { background: ${PURPLE}; color: ${WHITE}; border: none; cursor: pointer; padding: 13px 30px; border-radius: 999px; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 8px 28px rgba(139,92,246,0.32); transition: transform 0.2s, box-shadow 0.2s; }
  .hero-cta:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(139,92,246,0.42); }

  /* ── 2. ABOUT ── */
  .about-section { background: ${DARK}; padding: 72px 0; }
  .about-inner { display: flex; align-items: center; gap: 56px; flex-wrap: wrap; }
  .about-text { flex: 1; min-width: 260px; }
  .about-eyebrow { font-size: 11px; font-weight: 800; color: ${PURPLE}; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px; }
  .about-heading { font-family: 'Playfair Display', serif; font-size: clamp(26px, 3.5vw, 42px); font-weight: 900; color: ${WHITE}; line-height: 1.15; margin-bottom: 18px; }
  .about-para { font-size: 14px; color: #bbb; line-height: 1.8; margin-bottom: 12px; }
  .about-para strong { color: ${WHITE}; }
  .about-cards { display: flex; gap: 14px; flex-shrink: 0; }
  .polaroid { background: ${WHITE}; padding: 9px 9px 26px; box-shadow: 5px 5px 0 rgba(139,92,246,0.4); width: 140px; }
  .polaroid:first-child { transform: rotate(-3deg) translateY(10px); }
  .polaroid:last-child { transform: rotate(2.5deg); }
  .polaroid-img { width: 100%; aspect-ratio: 1; background: #e9d5ff; position: relative; overflow: hidden; margin-bottom: 6px; }
  .polaroid-cap { font-size: 10px; text-align: center; color: #888; }

  /* ── 3. STATS ── */
  .stats-strip { background: ${PINK_MID}; padding: 52px 0; }
  .stats-inner { display: grid; grid-template-columns: repeat(3,1fr); }
  .stat-block { text-align: center; padding: 12px 16px; border-right: 1px solid rgba(139,92,246,0.2); }
  .stat-block:last-child { border-right: none; }
  .stat-number { font-family: 'Playfair Display', serif; font-size: clamp(24px,4vw,42px); font-weight: 900; color: ${PURPLE}; line-height: 1; margin-bottom: 6px; }
  .stat-label { font-size: 11px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 1px; }

  /* ── 4. SERVICES ── */
  .services-section { background: ${WHITE}; padding: 72px 0; }
  .services-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 40px; flex-wrap: wrap; gap: 16px; }
  .services-sub { font-size: 13px; color: ${MUTED}; max-width: 300px; line-height: 1.6; }
  .services-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
  .scard { border-radius: 22px; overflow: hidden; transition: transform 0.22s; transform: translateZ(0); }
  .scard:hover { transform: translateY(-6px); }
  .scard-img { width: 100%; aspect-ratio: 3/4; position: relative; overflow: hidden; }
  .scard-img.fnb { background: linear-gradient(160deg, #fef3c7, #fde68a); }
  .scard-img.life { background: linear-gradient(160deg, #ddd6fe, #c4b5fd); }
  .scard-img.beauty { background: linear-gradient(160deg, #fce7f3, #fbcfe8); }
  .scard-body { padding: 16px 18px; background: ${LIGHT_PINK}; }
  .scard-title { font-size: 14px; font-weight: 800; color: ${DARK}; margin-bottom: 3px; }
  .scard-desc { font-size: 12px; color: ${MUTED}; }

  /* ── 5. TOGETHER ── */
  .together-section { background: ${LIGHT_PINK}; padding: 72px 0; }
  .together-inner { display: flex; align-items: center; gap: 56px; flex-wrap: wrap; }
  .together-left { flex: 1; min-width: 240px; }
  .together-big { font-family: 'Playfair Display', serif; font-size: clamp(28px,4vw,50px); font-weight: 900; color: ${DARK}; line-height: 1.1; margin: 14px 0 6px; }
  .together-big span { color: ${PURPLE}; }
  .together-right { flex: 1; min-width: 260px; display: flex; flex-direction: column; gap: 14px; }
  .tw-card { background: ${WHITE}; border-radius: 18px; padding: 18px 22px; display: flex; align-items: flex-start; gap: 16px; box-shadow: 0 2px 10px rgba(139,92,246,0.07); transition: transform 0.2s; }
  .tw-card:hover { transform: translateX(4px); }
  .tw-icon { font-size: 28px; flex-shrink: 0; margin-top: 2px; }
  .tw-title { font-size: 13px; font-weight: 800; color: ${DARK}; margin-bottom: 2px; }
  .tw-desc { font-size: 12px; color: ${MUTED}; line-height: 1.5; }

  /* ── 6. TALENT PROFILE ── */
  .talent-section { background: ${DARK}; padding: 72px 0; }
  .talent-section .section-tag { background: #2a2a2a; border-color: ${PURPLE}; box-shadow: 3px 3px 0 ${PURPLE}; color: white; }
  .talent-charts { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin: 36px 0 28px; }
  .chart-title { font-size: 14px; font-weight: 800; color: ${WHITE}; margin-bottom: 14px; text-align: center; }
  .bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .bar-label { font-size: 10px; font-weight: 700; color: #aaa; min-width: 50px; text-align: right; }
  .bar-track { flex: 1; background: #2d2d2d; border-radius: 999px; height: 28px; overflow: hidden; }
  .bar-fill { height: 100%; background: linear-gradient(90deg, #a855f7, ${PURPLE}); border-radius: 999px; display: flex; align-items: center; padding-left: 10px; font-size: 10px; font-weight: 700; color: white; transition: width 1.1s cubic-bezier(.4,0,.2,1); }
  .talent-chips { display: flex; gap: 12px; flex-wrap: wrap; }
  .talent-chip { flex: 1; min-width: 160px; background: #242424; border: 1px solid #3d3d3d; border-radius: 12px; padding: 12px 16px; }
  .talent-chip strong { color: ${PURPLE}; font-size: 15px; display: block; margin-bottom: 2px; }
  .talent-chip span { font-size: 11px; color: #888; }

  /* ── 7. TOP TALENT ── */
  .top-talent-section { background: ${WHITE}; padding: 72px 0; }
  .talent-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 16px; }
  .tcard { background: ${LIGHT_PINK}; border: 2px solid ${DARK}; padding: 7px 7px 10px; transform: rotate(-1deg); transition: transform 0.2s; cursor: default; }
  .tcard:nth-child(even) { transform: rotate(1deg); }
  .tcard:hover { transform: rotate(0) scale(1.05); z-index: 2; }
  .tphoto { width: 100%; aspect-ratio: 1; background: linear-gradient(135deg, #fce7f3, #e9d5ff); display: flex; align-items: center; justify-content: center; font-size: 28px; margin-bottom: 7px; }
  .thandle { font-size: 9px; font-weight: 700; color: ${DARK}; text-align: center; line-height: 1.4; }
  .tplatforms { display: flex; gap: 4px; justify-content: center; margin-top: 5px; }
  .tplat { width: 14px; height: 14px; border-radius: 3px; display: flex; align-items: center; justify-content: center; font-size: 7px; color: white; font-weight: 800; }
  .tplat.ig { background: linear-gradient(135deg, #f97316, #ec4899); }
  .tplat.tt { background: #111; }

  /* ── 8. EXAMPLE CONTENT ── */
  .content-section { background: ${PINK_MID}; padding: 72px 0; }
  .phones-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
  .cphone { background: #111; border-radius: 24px; padding: 6px; }
  .cphone-screen { background: #1c1c1c; border-radius: 18px; aspect-ratio: 9/16; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; }
  .cphone-bg { position: absolute; inset: 0; opacity: 0.55; }
  .cphone-bg.c1 { background: linear-gradient(160deg, #fef3c7, #fde68a); }
  .cphone-bg.c2 { background: linear-gradient(160deg, #ddd6fe, #c4b5fd); }
  .cphone-bg.c3 { background: linear-gradient(160deg, #fce7f3, #fbcfe8); }
  .cphone-bg.c4 { background: linear-gradient(160deg, #d1fae5, #a7f3d0); }
  .cphone-emoji { font-size: 32px; position: relative; z-index: 1; }
  .play-ring { position: absolute; width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.82); display: flex; align-items: center; justify-content: center; }
  .play-tri { width: 0; height: 0; border-top: 6px solid transparent; border-bottom: 6px solid transparent; border-left: 11px solid ${PURPLE}; margin-left: 2px; }
  .cphone-label { position: absolute; bottom: 7px; left: 7px; right: 7px; font-size: 9px; font-weight: 700; color: white; }
  .cphone-link { font-size: 9px; color: ${PURPLE}; text-align: center; margin-top: 5px; text-decoration: underline; word-break: break-all; }

  /* ── 9. COLLABORATION ── */
  .collab-section { background: ${WHITE}; padding: 72px 0; }
  .collab-grid { display: grid; grid-template-columns: repeat(6,1fr); gap: 12px; }
  .collab-item { background: ${LIGHT_PINK}; border-radius: 14px; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; flex-direction: column; font-size: 10px; font-weight: 800; text-align: center; padding: 6px; color: ${DARK}; transition: transform 0.2s, box-shadow 0.2s; }
  .collab-item:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(139,92,246,0.15); }

  /* ── 10. PRICING ── */
  .pricing-section { background: ${DARK}; padding: 80px 0; }
  .pricing-section .section-tag { background: #2a2a2a; border-color: ${PURPLE}; box-shadow: 3px 3px 0 ${PURPLE}; color: white; }
  .pricing-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; max-width: 900px; margin: 52px auto 0; align-items: stretch; }
  .pricing-card { background: #1a1a1a; border: 1px solid #333; border-radius: 22px; padding: 36px 28px; display: flex; flex-direction: column; transition: transform 0.3s, border-color 0.3s; position: relative; overflow: hidden; }
  .pricing-card:hover { transform: translateY(-6px); border-color: #555; }
  .pricing-card.premium { background: linear-gradient(145deg, #2a164a, #1a0d2e); border-color: ${PURPLE}; box-shadow: 0 20px 40px rgba(139,92,246,0.15); transform: scale(1.04); z-index: 2; }
  .pricing-card.premium:hover { transform: scale(1.04) translateY(-6px); }
  .pricing-badge { position: absolute; top: 14px; right: 14px; background: ${PURPLE}; color: white; font-size: 9px; font-weight: 800; padding: 3px 10px; border-radius: 999px; text-transform: uppercase; }
  .pricing-name { font-size: 17px; font-weight: 800; color: white; margin-bottom: 6px; }
  .pricing-price { font-family: 'Playfair Display', serif; font-size: 34px; font-weight: 900; color: ${PURPLE}; margin-bottom: 22px; line-height: 1; }
  .pricing-card.premium .pricing-price { color: white; }
  .pricing-features { list-style: none; margin-bottom: 28px; flex: 1; }
  .pricing-features li { font-size: 13px; color: #bbb; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
  .pricing-features li::before { content: '✓'; color: ${PURPLE}; font-weight: 800; font-size: 14px; flex-shrink: 0; }
  .pricing-card.premium .pricing-features li { color: white; }
  .pricing-card.premium .pricing-features li::before { color: #e9d5ff; }
  .pricing-cta { width: 100%; padding: 13px; border-radius: 999px; font-weight: 800; font-size: 13px; text-align: center; cursor: pointer; transition: all 0.2s; border: none; font-family: 'Nunito', sans-serif; }
  .pricing-cta.outline { background: transparent; color: white; border: 2px solid #444; }
  .pricing-cta.outline:hover { background: #2a2a2a; border-color: #666; }
  .pricing-cta.filled { background: ${PURPLE}; color: white; box-shadow: 0 4px 14px rgba(139,92,246,0.35); }
  .pricing-cta.filled:hover { background: #7c3aed; }
  .pricing-note { text-align: center; margin-top: 36px; font-size: 12px; font-weight: 600; color: #666; line-height: 1.7; }

  /* FOOTER */
  .footer { background: ${PURPLE}; color: white; text-align: center; padding: 36px 24px; }
  .footer-logo { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 900; text-transform: uppercase; margin-bottom: 8px; }
  .footer-sub { font-size: 13px; opacity: 0.7; margin-bottom: 10px; }
  .footer-email { font-size: 14px; font-weight: 700; }
  .footer-socials { margin-top: 10px; font-size: 11px; opacity: 0.45; }

  /* ════ RESPONSIVE ════ */

  @media (max-width: 1024px) {
    .talent-grid { grid-template-columns: repeat(4,1fr); }
    .collab-grid { grid-template-columns: repeat(4,1fr); }
    .collab-item { aspect-ratio: auto; min-height: 80px; }
    .pricing-card.premium { transform: scale(1.02); }
    .pricing-card.premium:hover { transform: scale(1.02) translateY(-6px); }
  }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .hamburger { display: flex; }

    .hero-inner { flex-direction: column; text-align: center; gap: 32px; }
    .hero-phone { width: 180px; }
    .hero-phone-screen { height: 370px; }
    .hero-title { font-size: 52px; letter-spacing: -1.5px; }
    .hero-desc { max-width: 100%; }
    .hero-star { font-size: 28px; top: 72px; left: 20px; }

    .about-inner { flex-direction: column; gap: 32px; }
    .about-cards { justify-content: center; }

    .stats-inner { grid-template-columns: 1fr; }
    .stat-block { border-right: none; border-bottom: 1px solid rgba(139,92,246,0.2); padding: 20px 0; }
    .stat-block:last-child { border-bottom: none; }

    .services-header { flex-direction: column; }
    .services-sub { max-width: 100%; }
    .services-grid { grid-template-columns: 1fr; gap: 14px; }
    .scard-img { aspect-ratio: 16/9; }

    .together-inner { flex-direction: column; gap: 24px; }

    .talent-charts { grid-template-columns: 1fr; gap: 28px; }

    .talent-grid { grid-template-columns: repeat(2,1fr); gap: 10px; }

    .phones-row { grid-template-columns: repeat(2,1fr); gap: 12px; }

    .collab-grid { grid-template-columns: repeat(3,1fr); gap: 10px; }

    .pricing-grid { grid-template-columns: 1fr; max-width: 420px; margin-left: auto; margin-right: auto; gap: 16px; }
    .pricing-card.premium { transform: scale(1); order: -1; }
    .pricing-card.premium:hover { transform: translateY(-6px); }
  }

  @media (max-width: 480px) {
    .container { padding: 0 16px; }

    .hero-title { font-size: 40px; }
    .hero-phone { width: 160px; }
    .hero-phone-screen { height: 330px; }
    .hero-cta { padding: 12px 22px; font-size: 12px; }

    .section-tag { font-size: 13px; padding: 7px 16px; }

    .about-heading { font-size: 24px; }
    .about-cards { flex-direction: column; align-items: center; }
    .polaroid { width: 160px; }
    .polaroid:first-child { transform: rotate(-2deg); }
    .polaroid:last-child { transform: rotate(2deg); }

    .stat-number { font-size: 28px; }

    .together-big { font-size: 28px; }

    .talent-grid { grid-template-columns: repeat(2,1fr); }

    .collab-grid { grid-template-columns: repeat(2,1fr); }
    .collab-item { min-height: 72px; font-size: 9px; }

    .phones-row { grid-template-columns: repeat(2,1fr); gap: 8px; }

    .pricing-grid { max-width: 100%; }
    .pricing-card { padding: 28px 22px; }
    .pricing-price { font-size: 28px; }

    .footer-logo { font-size: 20px; }
  }

  @media (max-width: 360px) {
    .hero-title { font-size: 34px; }
    .hero-phone { width: 140px; }
    .hero-phone-screen { height: 290px; }
    .talent-grid { grid-template-columns: repeat(2,1fr); }
    .collab-grid { grid-template-columns: repeat(2,1fr); }
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

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#talent", label: "Talent" },
  { href: "#collab", label: "Clients" },
  { href: "#pricing", label: "Pricing" },
]

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
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
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo">Rifera Management</div>
          <div className="nav-links">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
      </div>

      {/* 1. HERO */}
      <section className="hero">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-star">✳</div>
        <div className="container">
          <div className="hero-inner">
            <div className="hero-phone">
              <div className="hero-phone-screen">
                <Image
                  src={heroImg}
                  alt="Rifera Management Instagram"
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

      {/* 2. ABOUT */}
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
                    alt="Content Creator"
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
                    alt="KOL Bandung"
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

      {/* 3. STATS */}
      <div className="stats-strip">
        <div className="container">
          <div className="stats-inner">
            <div className="stat-block">
              <div className="stat-number">0.59–3.40%</div>
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

      {/* 4. CONTENT CREATION */}
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
                img: fnbImg,
              },
              {
                title: "Life Style & Recreation",
                desc: "Gaya hidup, aktivitas, hiburan, dan rekreasi keluarga",
                cls: "life",
                img: lifeImg,
              },
              {
                title: "Beauty & Fashion",
                desc: "Kecantikan, skincare, makeup, dan fashion terkini",
                cls: "beauty",
                img: beautyImg,
              },
            ].map((s, i) => (
              <div className="scard" key={i}>
                <div className={`scard-img ${s.cls}`}>
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    style={{ objectFit: "cover" }}
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

      {/* 5. WHAT WE DO */}
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

      {/* 6. TALENT PROFILE */}
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

      {/* 7. TOP TALENT */}
      <section className="top-talent-section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 36 }}>
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

      {/* 8. EXAMPLE CONTENT */}
      <section className="content-section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 36 }}>
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

      {/* 9. COLLABORATION */}
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

      {/* 10. PRICING */}
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
