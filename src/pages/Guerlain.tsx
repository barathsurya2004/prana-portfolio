import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SelectedWorksNav from "../components/SelectedWorksNav";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  cream: "#F2EBD9",
  creamDark: "#E8DFC8",
  mist: "#EAE3D3",
  ink: "#0D0D0D",
  inkMid: "#2A2A2A",
  terra: "#C4623A",
  gold: "#B8965A",
  sage: "#6B7C6E",
  amber: "#8B5E3C",
  amberSoft: "#C4907A",
  amberFade: "rgba(139,94,60,0.12)",
  indigo: "#2D2A4A",
};

// ─── LOCAL STYLES ─────────────────────────────────────────────────────────────
function LocalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

      .gr .fu {
        opacity: 0; transform: translateY(28px);
        transition: opacity 0.85s ease, transform 0.85s cubic-bezier(0.16,1,0.3,1);
      }
      .gr .fu.d1 { transition-delay: 0.08s; }
      .gr .fu.d2 { transition-delay: 0.16s; }
      .gr .fu.d3 { transition-delay: 0.24s; }
      .gr .fu.d4 { transition-delay: 0.32s; }
      .gr .fu.vis { opacity: 1; transform: none; }

      @keyframes lspin    { to { transform: rotate(360deg); } }
      @keyframes lspinRev { to { transform: rotate(-360deg); } }
      @keyframes lup      { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
      @keyframes lbar     { to { transform: scaleX(1); } }
      @keyframes rotOrbit { to { transform: translateY(-50%) rotate(360deg); } }
      @keyframes scentRise {
        0%   { opacity:0; transform:translateY(20px) scale(0.92); }
        60%  { opacity:1; }
        100% { opacity:0; transform:translateY(-40px) scale(1.04); }
      }
      @keyframes particleDrift {
        0%,100% { transform: translateY(0) scale(1); opacity:0; }
        30%     { opacity:1; }
        80%     { opacity:0.4; transform: translateY(-60px) scale(1.1); }
      }

      /* ── Video section ── */
      .gr .film-wrap {
        position: relative; overflow: hidden; background: ${C.indigo};
        cursor: pointer;
      }
      .gr .film-play-btn {
        position: absolute; inset:0; display:flex; align-items:center; justify-content:center;
        z-index: 3; transition: opacity 0.4s;
      }
      .gr .film-play-btn.hidden { opacity: 0; pointer-events: none; }
      .gr .film-overlay {
        position: absolute; inset:0;
        background: linear-gradient(to top, rgba(45,42,74,0.7) 0%, transparent 60%);
        pointer-events: none; z-index: 2;
        transition: opacity 0.4s;
      }
      .gr .film-overlay.hidden { opacity: 0; }
      .gr .play-circle {
        width: 80px; height: 80px; border-radius: 50%;
        border: 1px solid rgba(196,144,122,0.6);
        background: rgba(45,42,74,0.5);
        display: flex; align-items:center; justify-content:center;
        backdrop-filter: blur(4px);
        transition: transform 0.3s, background 0.3s, border-color 0.3s;
      }
      .gr .film-wrap:hover .play-circle {
        transform: scale(1.1);
        background: rgba(139,94,60,0.5);
        border-color: ${C.amberSoft};
      }

      /* ── Channel cards ── */
      .gr .channel-card { transition: background 0.28s; }
      .gr .channel-card:hover { background: ${C.creamDark} !important; }
      .gr .channel-card:hover .ch-icon { color: ${C.amber} !important; }

      /* ── Process Book CTA ── */
      .gr .pb-cta {
        display: inline-flex; align-items:center; gap: 0.75rem;
        padding: 0.85rem 2rem;
        border: 1px solid ${C.amber};
        color: ${C.amber};
        font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase;
        text-decoration: none; transition: all 0.25s; background: transparent;
      }
      .gr .pb-cta:hover { background: ${C.amber}; color: ${C.cream}; }

      /* ── Next project ── */
      .gr .next-proj-wrap:hover .np-arrow-inner { border-color:${C.amber}; background:${C.amber}; transform:rotate(-45deg); }
      .gr .next-proj-wrap:hover { background: #1a1a1a; }

      @media (prefers-reduced-motion: reduce) {
        .gr .fu { opacity:1 !important; transform:none !important; }
        .gr [style*="animation"] { animation: none !important; }
      }
      @media (max-width: 900px) {
        .gr .two-col { grid-template-columns: 1fr !important; gap:3rem !important; }
      }
      @media (max-width: 768px) {
        .gr section, .gr header { padding-left:1.5rem !important; padding-right:1.5rem !important; }
        .gr .hero-footer-grid { grid-template-columns: 1fr 1fr !important; }
        .gr .proj-title { font-size: clamp(2.8rem,10vw,5rem) !important; }
        .gr .channels-grid { grid-template-columns: 1fr 1fr !important; }
        .gr .stat-row { grid-template-columns: 1fr 1fr !important; }
        .gr .team-grid { grid-template-columns: 1fr 1fr !important; }
        .gr .film-section { padding: 4rem 2.5rem !important; }
        .gr .film-header { padding: 0 0 1.5rem !important; flex-direction: column !important; align-items: flex-start !important; gap: 1rem !important; }
        .gr .film-wrap { margin: 0 !important; }
        .gr .film-caption { padding: 1.25rem 0 2.5rem !important; }
      }
      @media (max-width: 480px) {
        .gr .channels-grid { grid-template-columns: 1fr !important; }
        .gr .team-grid { grid-template-columns: 1fr !important; }
        .gr .film-section { padding: 3rem 2rem !important; }
        .gr .film-header { padding-bottom: 1.25rem !important; }
        .gr .film-wrap { aspect-ratio: 4 / 3 !important; }
        .gr .film-caption { padding-bottom: 2rem !important; }
      }
    `}</style>
  );
}

// ─── FADE OBSERVER ────────────────────────────────────────────────────────────
function useFadeObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("vis"); io.unobserve(e.target); }
      }),
      { threshold: 0.10 }
    );
    document.querySelectorAll(".gr .fu").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── LOADER ───────────────────────────────────────────────────────────────────
function Loader() {
  const [gone, setGone] = useState(false);
  const [fading, setFading] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => { setFading(true); setTimeout(() => setGone(true), 900); }, 2000);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;
  const particles = [
    { left: "44%", delay: "0s", dur: "2.4s" },
    { left: "50%", delay: "0.4s", dur: "2.8s" },
    { left: "56%", delay: "0.8s", dur: "2.2s" },
  ];
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 10000, background: C.indigo,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      opacity: fading ? 0 : 1, transform: fading ? "translateY(-10px)" : "none",
      transition: "opacity 0.9s cubic-bezier(0.76,0,0.24,1), transform 0.9s cubic-bezier(0.76,0,0.24,1)",
      pointerEvents: fading ? "none" : "all",
    }} role="status" aria-label="Loading Guerlain Shalimar case study">
      <div aria-hidden="true" style={{ position: "absolute", width: "clamp(200px,38vw,380px)", height: "clamp(200px,38vw,380px)", borderRadius: "50%", border: "1px solid rgba(196,144,122,0.15)", animation: "lspin 20s linear infinite" }} />
      <div aria-hidden="true" style={{ position: "absolute", width: "clamp(120px,22vw,220px)", height: "clamp(120px,22vw,220px)", borderRadius: "50%", border: "1px solid rgba(184,150,90,0.10)", animation: "lspinRev 14s linear infinite" }} />
      {particles.map((p, i) => (
        <div key={i} aria-hidden="true" style={{ position: "absolute", bottom: "52%", left: p.left, width: 4, height: 4, borderRadius: "50%", background: C.amberSoft, opacity: 0, animation: `scentRise ${p.dur} ease-out ${p.delay} infinite` }} />
      ))}
      <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.6rem,5vw,3.5rem)", fontWeight: 300, color: C.cream, letterSpacing: "0.12em", position: "relative", zIndex: 1, animation: "lup 0.9s cubic-bezier(0.16,1,0.3,1) both" }} aria-hidden="true">Guerlain</p>
      <p style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: "italic", fontSize: "clamp(1rem,2.5vw,1.6rem)", color: C.amberSoft, letterSpacing: "0.06em", position: "relative", zIndex: 1, marginTop: "0.2rem", animation: "lup 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both" }} aria-hidden="true">Shalimar</p>
      <p style={{ fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(242,235,217,0.3)", marginTop: "1.25rem", position: "relative", zIndex: 1, animation: "lup 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}>Case Study 03 · Pranahita Reddy</p>
      <div style={{ width: "clamp(100px,20vw,200px)", height: 1, background: "rgba(242,235,217,0.08)", marginTop: "2.25rem", position: "relative", zIndex: 1, overflow: "hidden" }} aria-hidden="true">
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${C.amber}, ${C.amberSoft}, ${C.gold})`, transform: "scaleX(0)", transformOrigin: "left", animation: "lbar 1.8s cubic-bezier(0.4,0,0.2,1) 0.2s forwards" }} />
      </div>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  return <SelectedWorksNav accentColor={C.amber} current="03" />;
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 300); return () => clearTimeout(t); }, []);
  const fade = (delay = 0) => ({
    opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)",
    transition: `opacity 0.85s ease ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });
  const particles = [
    { left: "14%", bottom: "38%", delay: "0s", dur: "3.4s" },
    { left: "26%", bottom: "32%", delay: "0.7s", dur: "2.9s" },
    { left: "40%", bottom: "28%", delay: "1.3s", dur: "3.8s" },
    { left: "58%", bottom: "35%", delay: "0.4s", dur: "2.7s" },
    { left: "74%", bottom: "40%", delay: "1.0s", dur: "3.1s" },
  ];

  return (
    <header aria-labelledby="heroTitle" style={{
      height: "100svh", minHeight: 0, background: C.indigo,
      display: "grid", gridTemplateRows: "1fr auto",
      padding: "0 2.5rem", position: "relative", overflow: "hidden", boxSizing: "border-box",
    }}>
      {/* Amber glow */}
      <div aria-hidden="true" style={{ position: "absolute", left: "50%", bottom: "-10%", width: "clamp(400px,60vw,900px)", height: "clamp(400px,60vw,900px)", borderRadius: "50%", background: `radial-gradient(ellipse at center, rgba(139,94,60,0.2) 0%, rgba(196,144,122,0.07) 45%, transparent 70%)`, transform: "translateX(-50%)", pointerEvents: "none" }} />
      {/* Orbit ring */}
      <div aria-hidden="true" style={{ position: "absolute", right: "-8%", top: "50%", width: "clamp(320px,44vw,660px)", height: "clamp(320px,44vw,660px)", borderRadius: "50%", border: "1px solid rgba(196,144,122,0.09)", animation: "rotOrbit 120s linear infinite", pointerEvents: "none", transform: "translateY(-50%)" }}>
        <div style={{ position: "absolute", inset: 60, borderRadius: "50%", border: "1px solid rgba(184,150,90,0.06)" }} />
      </div>
      {/* Particles */}
      {particles.map((p, i) => (
        <div key={i} aria-hidden="true" style={{ position: "absolute", left: p.left, bottom: p.bottom, width: 3, height: 3, borderRadius: "50%", background: C.amberSoft, opacity: 0, animation: `particleDrift ${p.dur} ease-in-out ${p.delay} infinite`, pointerEvents: "none" }} />
      ))}

      {/* Content */}
      {/* <div className="hero-content" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "2rem", paddingTop: "7rem", position: "relative", zIndex: 1 }}> */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: "3rem", paddingTop: "4rem", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", ...fade(0) }}>
          <div style={{ width: 40, height: 1, background: C.amberSoft }} aria-hidden="true" />
          <span style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(242,235,217,0.4)" }}>
            Case Study 03 · LXMT 742 · SCAD · 2026
          </span>
        </div>

        <h1 id="heroTitle" className="proj-title" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(2.5rem,7vw,7.5rem)", fontWeight: 300, lineHeight: 0.9, letterSpacing: "-0.025em", color: C.cream, ...fade(0.08) }}>
          Guerlain<br />
          <em style={{ fontStyle: "italic", color: C.amberSoft }}>Shalimar</em><br />
          Campaign
        </h1>

        <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1rem,1.8vw,1.35rem)", fontWeight: 300, fontStyle: "italic", color: "rgba(242,235,217,0.5)", marginTop: "1.25rem", maxWidth: "50ch", lineHeight: 1.55, ...fade(0.16) }}>
          An advertising campaign that repositions one of the world's most iconic fragrances for a new generation — without changing the scent. Only the story.
        </p>

        {/* Tagline */}
        <div style={{ marginTop: "2rem", ...fade(0.22) }}>
          <span style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(0.9rem,1.6vw,1.2rem)", fontStyle: "italic", color: `rgba(196,144,122,0.7)`, letterSpacing: "0.06em" }}>
            "Shalimar — Where Love Becomes Eternal."
          </span>
        </div>
      </div>

      {/* Footer bar */}
      <div className="hero-footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem", padding: "1.25rem 0", borderTop: "1px solid rgba(242,235,217,0.07)", position: "relative", zIndex: 1, ...fade(0.28) }}>
        {[
          ["Brand", "Guerlain / LVMH"],
          ["Discipline", "Advertising · Campaign Film"],
          ["Context", "SCAD · LXMT 742 · 2026"],
          ["Role", "Research, Director & Process Book"],
        ].map(([label, value]) => (
          <div key={label}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,235,217,0.28)", marginBottom: "0.3rem" }}>{label}</div>
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "0.95rem", color: "rgba(242,235,217,0.75)" }}>{value}</div>
          </div>
        ))}
      </div>
    </header>
  );
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function Stats() {
  return (
    <div style={{ padding: "3.5rem 2.5rem", background: C.cream }}>
      <div className="fu stat-row" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(13,13,13,0.08)" }}>
        {[
          ["1828", "Year Guerlain was founded"],
          ["1925", "Shalimar's year of creation"],
          ["Gen Z", "Primary target audience"],
          ["4", "IMC channels executed"],
        ].map(([val, lbl]) => (
          <div key={lbl} style={{ padding: "1.6rem 1.5rem", background: C.cream }}>
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "2.6rem", fontWeight: 300, color: C.amber, lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.sage, marginTop: "0.3rem" }}>{lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CONCEPT ─────────────────────────────────────────────────────────────────
function Concept() {
  return (
    <section style={{ padding: "6rem 2.5rem", background: C.mist }} aria-labelledby="conceptHead">
      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
        <div>
          <div className="fu" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.amber, display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            The Concept
            <span style={{ flex: 1, height: 1, background: "rgba(139,94,60,0.2)", maxWidth: 80 }} />
          </div>
          <h2 id="conceptHead" className="fu d1" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300, lineHeight: 1.05, color: C.ink, marginBottom: "1.5rem" }}>
            Luxury you feel,<br />not perform.
          </h2>
          {/* Philosophy callout */}
          <div className="fu d2" style={{ padding: "1.5rem", background: C.amberFade, borderLeft: `2px solid ${C.amber}`, marginTop: "1rem" }}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.amber, marginBottom: "0.5rem" }}>Campaign Philosophy</div>
            <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.1rem", fontStyle: "italic", color: C.ink, lineHeight: 1.5 }}>
              "The campaign does not modernize the scent — it modernizes the delivery."
            </p>
          </div>
        </div>
        <div>
          <p className="fu d2" style={{ fontSize: "0.92rem", lineHeight: 1.85, color: C.inkMid, marginBottom: "1.25rem" }}>
            First introduced in 1925, Shalimar is one of the most historically significant fragrances in prestige perfumery. Yet heritage scents face a generational perception gap — younger consumers associate them with older demographics despite their cultural depth.
          </p>
          <p className="fu d3" style={{ fontSize: "0.92rem", lineHeight: 1.85, color: C.inkMid, marginBottom: "1.25rem" }}>
            This campaign addresses that gap through cinematic visuals, sensory storytelling, and a digitally-first media strategy. The result is a film that communicates Shalimar's themes of sensuality, mystery, and timeless love in a language that resonates with Gen Z and younger Millennial luxury consumers.
          </p>
          <p className="fu d4" style={{ fontSize: "0.92rem", lineHeight: 1.85, color: C.inkMid }}>
            Shalimar competes not on trend or loud visibility — but on emotional depth, sacred sensuality, and ritualised love. That positioning is an emotional monopoly no competitor fully occupies.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── THE FILM ─────────────────────────────────────────────────────────────────
// VIDEO EMBED COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
// Currently uses a YouTube embed placeholder.
// Replace `YOUTUBE_VIDEO_ID` with the actual ID from the ad video URL.
// e.g. if URL is https://youtu.be/dQw4w9WgXcQ → ID is dQw4w9WgXcQ
// If hosting on Vimeo, swap the iframe src to:
//   https://player.vimeo.com/video/YOUR_VIMEO_ID?autoplay=1&title=0&byline=0&portrait=0
// ─────────────────────────────────────────────────────────────────────────────
const YOUTUBE_VIDEO_ID: string = "9UACIxAb--E"; // ← paste your YouTube/Vimeo ID here

function TheFilm() {
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isPlaceholder = YOUTUBE_VIDEO_ID === "REPLACE_WITH_VIDEO_ID";

  const handlePlay = () => {
    if (isPlaceholder) return;
    setPlaying(true);
    // Force autoplay by re-setting src with autoplay param
    if (iframeRef.current) {
      iframeRef.current.src = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&color=white`;
    }
  };

  return (
    <section className="film-section" style={{ padding: "6rem 2.5rem", background: C.ink }} aria-labelledby="filmHead">
      {/* Section header */}
      <div className="film-header" style={{ padding: "0 0 2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div className="fu" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.amber, marginBottom: "0.75rem" }}>The Campaign Film</div>
          <h2 id="filmHead" className="fu d1" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 300, color: C.cream, lineHeight: 1.05 }}>
            Where Love<br />Becomes Eternal.
          </h2>
        </div>
        <p className="fu d2" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "0.88rem", fontStyle: "italic", color: "rgba(242,235,217,0.35)", maxWidth: "24ch", textAlign: "right", lineHeight: 1.6 }}>
          Shot, directed, and edited by the team at SCAD, 2026.
        </p>
      </div>

      {/* Video player */}
      <div className="fu film-wrap" onClick={handlePlay} style={{ margin: 0, aspectRatio: "16/9", position: "relative" }}>
        {/* Poster / thumbnail placeholder */}
        {!playing && (
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.indigo} 0%, #1a0f1e 50%, ${C.indigo} 100%)`, zIndex: 1 }}>
            {/* Decorative amber glow */}
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "50%", height: "50%", borderRadius: "50%", background: `radial-gradient(ellipse at center, rgba(139,94,60,0.3) 0%, transparent 70%)`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "1.5rem", left: "2rem", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(242,235,217,0.2)" }}>
              {isPlaceholder ? "Add your video ID to activate the player" : "Shalimar — Where Love Becomes Eternal · 2026"}
            </div>
          </div>
        )}

        {/* Gradient overlay */}
        <div className={`film-overlay ${playing ? "hidden" : ""}`} />

        {/* Play button */}
        <div className={`film-play-btn ${playing ? "hidden" : ""}`}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
            <div className="play-circle">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <polygon points="8,5 19,11 8,17" fill={C.amberSoft} />
              </svg>
            </div>
            <span style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,235,217,0.5)" }}>
              {isPlaceholder ? "Video coming soon" : "Watch the film"}
            </span>
          </div>
        </div>

        {/* Actual iframe — hidden until play clicked */}
        {!isPlaceholder && (
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1&color=white`}
            title="Guerlain Shalimar — Where Love Becomes Eternal"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", zIndex: playing ? 4 : 0, opacity: playing ? 1 : 0 }}
          />
        )}
      </div>

      {/* Narrative caption */}
      <div className="film-caption" style={{ padding: "2rem 0 0", display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: "1.5rem" }}>
        <p className="fu d2" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1rem", fontStyle: "italic", color: "rgba(242,235,217,0.4)", maxWidth: "60ch", lineHeight: 1.65 }}>
          Soft golden light. Powder slowly dispersing across a reflective surface. Sandalwood smoke drifting. A letter found between the pages of a book. "Meet me there." — The film translates Shalimar's olfactory world into image, texture, and silence.
        </p>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,235,217,0.2)", marginBottom: "0.4rem" }}>Director</div>
          <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "0.9rem", color: "rgba(242,235,217,0.5)" }}>Pranahita Reddy</div>
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,235,217,0.2)", marginBottom: "0.4rem", marginTop: "0.75rem" }}>Editor</div>
          <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "0.9rem", color: "rgba(242,235,217,0.5)" }}>Jada Williams</div>
        </div>
      </div>
    </section>
  );
}

// ─── CAMPAIGN CHANNELS ────────────────────────────────────────────────────────
const channels = [
  {
    icon: "◎",
    label: "Social Media",
    sub: "Instagram & TikTok",
    desc: "Short-form vertical clips isolating key sensory moments — drifting smoke, dispersing powder, the amber bottle in candlelight. Slow cinematic pacing that stands apart in fast-moving feeds.",
  },
  {
    icon: "◻",
    label: "Out-of-Home",
    sub: "Billboard & Mall",
    desc: "Minimalist compositions with the Shalimar bottle in warm golden light. Large-format placements in luxury districts — SoHo New York, Melrose Avenue LA. Restrained, unmistakable.",
  },
  {
    icon: "⬡",
    label: "Digital Advertising",
    sub: "Display & Streaming",
    desc: "Subtle animated banners on luxury editorial sites and streaming platforms. Drifting smoke and glowing particles — cinematic language adapted for the scroll, not the cinema.",
  },
  {
    icon: "❀",
    label: "Pop-Up Installation",
    sub: "Immersive Brand Space",
    desc: "Deep indigo tones, golden lighting, Art Deco elements. An immersive physical environment where the campaign narrative becomes a space visitors can enter and experience firsthand.",
  },
];

function Channels() {
  return (
    <section style={{ padding: "6rem 2.5rem", background: C.cream }} aria-labelledby="channelsHead">
      <div style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: `1px solid rgba(13,13,13,0.1)`, paddingBottom: "1.5rem" }}>
        <div>
          <div className="fu" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.amber, marginBottom: "0.5rem" }}>Campaign Execution</div>
          <h2 id="channelsHead" className="fu d1" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 300, color: C.ink, lineHeight: 1.05 }}>
            One story.<br />Four surfaces.
          </h2>
        </div>
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "5rem", fontWeight: 300, color: "rgba(13,13,13,0.05)", lineHeight: 1 }} aria-hidden="true">04</div>
      </div>

      <div className="channels-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(13,13,13,0.08)" }}>
        {channels.map((ch) => <ChannelCard key={ch.label} ch={ch} />)}
      </div>
    </section>
  );
}

function ChannelCard({ ch }: { ch: typeof channels[0] }) {
  const [h, setH] = useState(false);
  return (
    <div className="fu channel-card" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: h ? C.creamDark : C.mist, padding: "2rem 1.75rem", transition: "background 0.28s" }}>
      <div className="ch-icon" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.8rem", color: h ? C.amber : "rgba(13,13,13,0.15)", marginBottom: "1.25rem", transition: "color 0.28s" }} aria-hidden="true">{ch.icon}</div>
      <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.15rem", fontWeight: 400, color: C.ink, marginBottom: "0.2rem" }}>{ch.label}</div>
      <div style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.amber, marginBottom: "0.9rem" }}>{ch.sub}</div>
      <p style={{ fontSize: "0.81rem", color: C.inkMid, lineHeight: 1.7 }}>{ch.desc}</p>
    </div>
  );
}

// ─── TEAM ─────────────────────────────────────────────────────────────────────
const team = [
  { name: "Pranahita Reddy", role: "Research, Director & Process Book" },
  { name: "Jada Williams", role: "Video Editor" },
  { name: "Perry Pointer", role: "AI Generation & Research" },
  { name: "Radhika LNU", role: "Process Book Development" },
];

function Team() {
  return (
    <section style={{ padding: "5rem 2.5rem", background: C.ink, color: C.cream }} aria-labelledby="teamHead">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "1px solid rgba(242,235,217,0.07)", paddingBottom: "1.5rem", marginBottom: "2.5rem" }}>
        <div>
          <div className="fu" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.amber, marginBottom: "0.5rem" }}>Collaborators</div>
          <h2 id="teamHead" className="fu d1" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.6rem,3vw,2.5rem)", fontWeight: 300, color: C.cream, lineHeight: 1.1 }}>The team.</h2>
        </div>
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: "italic", fontSize: "0.8rem", color: "rgba(242,235,217,0.2)" }}>LXMT 742 · Prof. Michelle Ryan</div>
      </div>
      <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(242,235,217,0.04)" }}>
        {team.map((m) => (
          <div key={m.name} className="fu" style={{ padding: "1.75rem 1.5rem", background: "rgba(13,13,13,0.3)" }}>
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.1rem", fontWeight: 400, color: C.cream, marginBottom: "0.35rem" }}>{m.name}</div>
            <div style={{ fontSize: "0.68rem", color: "rgba(242,235,217,0.4)", lineHeight: 1.5 }}>{m.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PROCESS BOOK CTA ─────────────────────────────────────────────────────────
function ProcessBookCTA() {
  return (
    <section style={{ padding: "6rem 2.5rem", background: C.creamDark, textAlign: "center" }} aria-labelledby="pbHead">
      <div className="fu" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.sage, marginBottom: "1.25rem" }}>Full Documentation</div>
      <h2 id="pbHead" className="fu d1" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.75rem,3.5vw,3rem)", fontWeight: 300, color: C.ink, lineHeight: 1.1, marginBottom: "1rem" }}>
        The strategy, research, brand analysis,<br />IMC framework, and campaign visuals<br />live in the process book.
      </h2>
      <p className="fu d2" style={{ fontSize: "0.88rem", color: C.sage, maxWidth: "44ch", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
        47 pages covering SWOT, situational analysis, competitive benchmarking, IMC process, budget allocation, and the full campaign execution.
      </p>
      <div className="fu d3">
        <a
          href="https://drive.google.com/file/d/1zcxFhuZDHLhXPQukJ7F3NxmQPTu4rnXE/view?usp=drive_link"
          target="_blank" rel="noopener noreferrer"
          className="pb-cta"
          aria-label="View Guerlain Shalimar process book (PDF)"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M7 1v8M4 6l3 3 3-3M2 10v1a1 1 0 001 1h8a1 1 0 001-1v-1" />
          </svg>
          View Process Book
        </a>
      </div>
    </section>
  );
}

// ─── NEXT PROJECT ─────────────────────────────────────────────────────────────
function NextProject() {
  const [h, setH] = useState(false);
  return (
    <Link to="/works/loro-piana" aria-label="Next case study: Loro Piana Heritage Repositioning"
      className="next-proj-wrap"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        gap: "2rem", textDecoration: "none", padding: "5rem 2.5rem",
        background: h ? "#1a1a1a" : C.ink,
        borderTop: "1px solid rgba(242,235,217,0.06)",
        transition: "background 0.3s",
      }}>
      <div>
        <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(242,235,217,0.3)", marginBottom: "0.5rem" }}>Next Case Study</div>
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.6rem,3.5vw,3rem)", fontWeight: 300, color: C.cream, lineHeight: 1.05 }}>
          Loro Piana<br />
          <em style={{ fontStyle: "italic", color: C.gold }}>Heritage Repositioning</em>
        </div>
      </div>
      <div className="np-arrow-inner" style={{
        width: 56, height: 56, borderRadius: "50%",
        border: `1px solid ${h ? C.amber : "rgba(242,235,217,0.15)"}`,
        background: h ? C.amber : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        transform: h ? "rotate(-45deg)" : "none",
        transition: "border-color 0.2s, background 0.2s, transform 0.3s",
      }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
          stroke={h ? "white" : "rgba(242,235,217,0.5)"}
          strokeWidth="1.4" aria-hidden="true" style={{ transition: "stroke 0.2s" }}>
          <path d="M4 14L14 4M14 4H7M14 4v7" />
        </svg>
      </div>
    </Link>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer role="contentinfo" style={{
      background: C.ink, color: "rgba(242,235,217,0.25)",
      padding: "1.5rem 2.5rem", display: "flex", justifyContent: "space-between",
      alignItems: "center", borderTop: "1px solid rgba(242,235,217,0.05)",
      fontSize: "0.62rem", letterSpacing: "0.1em", flexWrap: "wrap", gap: "0.5rem",
    }}>
      <Link to="/#work" style={{ color: "rgba(242,235,217,0.4)", textDecoration: "none" }}
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => e.currentTarget.style.color = C.amber}
        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => e.currentTarget.style.color = "rgba(242,235,217,0.4)"}>
        ← Selected Works
      </Link>
      <span style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: "italic", fontSize: "0.8rem", color: "rgba(242,235,217,0.15)" }}>Case Study 03 of 04</span>
      <a href="mailto:pranahitareddy1411@gmail.com" style={{ color: "rgba(242,235,217,0.4)", textDecoration: "none" }}
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => e.currentTarget.style.color = C.amber}
        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => e.currentTarget.style.color = "rgba(242,235,217,0.4)"}>
        pranahitareddy1411@gmail.com
      </a>
    </footer>
  );
}

// ─── BACK TO TOP ──────────────────────────────────────────────────────────────
function BackToTop() {
  const [show, setShow] = useState(false);
  const [h, setH] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        position: "fixed", bottom: "2rem", right: "2rem", zIndex: 200,
        width: 42, height: 42, borderRadius: "50%",
        background: h ? C.amber : C.ink,
        border: `1px solid ${h ? C.amber : "rgba(242,235,217,0.15)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: show ? 1 : 0, pointerEvents: show ? "all" : "none",
        transition: "opacity 0.3s, background 0.2s, border-color 0.2s",
        cursor: "none",
      }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" aria-hidden="true">
        <path d="M8 12V4M4 7l4-4 4 4" />
      </svg>
    </button>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Guerlain() {
  useFadeObserver();
  return (
    <div className="gr">
      <LocalStyles />
      <Loader />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Concept />
        <TheFilm />
        <Channels />
        <Team />
        <ProcessBookCTA />
      </main>
      <NextProject />
      <Footer />
      <BackToTop />
    </div>
  );
}