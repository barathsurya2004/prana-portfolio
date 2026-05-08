import { useState, useEffect } from "react";
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
};

// ─── SCOPED STYLES ────────────────────────────────────────────────────────────
function LocalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

      .miu .fu {
        opacity: 0; transform: translateY(28px);
        transition: opacity 0.85s ease, transform 0.85s cubic-bezier(0.16,1,0.3,1);
      }
      .miu .fu.d1 { transition-delay: 0.08s; }
      .miu .fu.d2 { transition-delay: 0.16s; }
      .miu .fu.d3 { transition-delay: 0.24s; }
      .miu .fu.d4 { transition-delay: 0.32s; }
      .miu .fu.vis { opacity: 1; transform: none; }

      @keyframes lspin { to { transform: rotate(360deg); } }
      @keyframes lup   { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
      @keyframes lbar  { to { transform: scaleX(1); } }
      @keyframes rot   { to { transform: translateY(-50%) rotate(360deg); } }

      .miu .visual-img-wrap { overflow: hidden; }
      .miu .visual-img-wrap img {
        width:100%; display:block; object-fit:cover;
        transition: transform 0.7s cubic-bezier(0.16,1,0.3,1);
      }
      .miu .visual-img-wrap:hover img { transform: scale(1.025); }

      /* Room card */
      .miu .room-card { transition: background 0.28s; }
      .miu .room-card:hover { background: ${C.creamDark} !important; }
      .miu .room-card:hover .room-num { color: ${C.terra} !important; }

      /* Process Book CTA */
      .miu .pb-cta {
        display: inline-flex; align-items: center; gap: 0.75rem;
        padding: 0.85rem 2rem;
        border: 1px solid ${C.terra};
        color: ${C.terra};
        font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase;
        text-decoration: none; transition: all 0.25s;
        background: transparent;
      }
      .miu .pb-cta:hover {
        background: ${C.terra}; color: ${C.cream};
      }

      /* Next project */
      .miu .next-proj-wrap:hover .np-arrow-inner { border-color:${C.terra}; background:${C.terra}; transform:rotate(-45deg); }
      .miu .next-proj-wrap:hover { background: #1a1a1a; }

      @media (prefers-reduced-motion: reduce) {
        .miu .fu { opacity:1 !important; transform:none !important; }
      }
      @media (max-width: 900px) {
        .miu .two-col { grid-template-columns: 1fr !important; gap: 3rem !important; }
      }
      @media (max-width: 768px) {
        .miu .hero-footer-grid { grid-template-columns: 1fr 1fr !important; }
        .miu .proj-title { font-size: clamp(2.8rem,10vw,5rem) !important; }
        .miu .rooms-grid { grid-template-columns: 1fr 1fr !important; }
        .miu .app-features { grid-template-columns: 1fr 1fr !important; }
      }
      @media (max-width: 540px) {
        .miu .rooms-grid { grid-template-columns: 1fr !important; }
        .miu .app-features { grid-template-columns: 1fr !important; }
        .miu .stat-row { grid-template-columns: 1fr 1fr !important; }
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
    document.querySelectorAll(".miu .fu").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── LOADER ───────────────────────────────────────────────────────────────────
function Loader() {
  const [gone, setGone] = useState(false);
  const [fading, setFading] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => { setFading(true); setTimeout(() => setGone(true), 900); }, 1800);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 10000, background: C.ink,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      opacity: fading ? 0 : 1, transform: fading ? "translateY(-8px)" : "none",
      transition: "opacity 0.9s cubic-bezier(0.76,0,0.24,1), transform 0.9s cubic-bezier(0.76,0,0.24,1)",
      pointerEvents: fading ? "none" : "all",
    }} role="status" aria-label="Loading Miu Miu case study">
      <div style={{
        position: "absolute",
        width: "clamp(160px,32vw,320px)", height: "clamp(160px,32vw,320px)",
        borderRadius: "50%", border: "1px solid rgba(196,98,58,0.15)",
        animation: "lspin 14s linear infinite",
      }} aria-hidden="true" />
      <p style={{
        fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.6rem,5vw,3.5rem)",
        fontWeight: 300, color: C.cream, letterSpacing: "0.05em", textAlign: "center",
        position: "relative", zIndex: 1, animation: "lup 0.9s cubic-bezier(0.16,1,0.3,1) both",
      }} aria-hidden="true">Miu Miu</p>
      <p style={{
        fontFamily: '"Cormorant Garamond",serif', fontStyle: "italic",
        fontSize: "clamp(0.9rem,2vw,1.2rem)", color: "rgba(196,98,58,0.7)",
        letterSpacing: "0.06em", textAlign: "center",
        position: "relative", zIndex: 1, marginTop: "0.2rem",
        animation: "lup 0.9s cubic-bezier(0.16,1,0.3,1) 0.08s both",
      }} aria-hidden="true">Private Worlds</p>
      <p style={{
        fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase",
        color: "rgba(242,235,217,0.35)", marginTop: "1rem",
        position: "relative", zIndex: 1,
        animation: "lup 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s both",
      }}>Case Study 01 · Pranahita Reddy</p>
      <div style={{
        width: "clamp(100px,20vw,200px)", height: 1,
        background: "rgba(242,235,217,0.1)", marginTop: "2rem",
        position: "relative", zIndex: 1, overflow: "hidden",
      }} aria-hidden="true">
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(90deg, ${C.terra}, ${C.gold})`,
          transform: "scaleX(0)", transformOrigin: "left",
          animation: "lbar 1.6s cubic-bezier(0.4,0,0.2,1) 0.2s forwards",
        }} />
      </div>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  return <SelectedWorksNav accentColor={C.terra} current="01" />;
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 300); return () => clearTimeout(t); }, []);

  const fade = (delay = 0) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "none" : "translateY(28px)",
    transition: `opacity 0.85s ease ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <header aria-labelledby="heroTitle" style={{
      height: "100svh", minHeight: 0, background: C.ink,
      display: "grid", gridTemplateRows: "1fr auto",
      padding: "0 2.5rem", position: "relative", overflow: "hidden", boxSizing: "border-box",
    }}>
      {/* Grid lines */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {[16.66, 33.33, 50, 66.66, 83.33].map((pct, i) => (
          <span key={i} style={{ position: "absolute", top: 0, bottom: 0, width: 1, left: `${pct}%`, background: i === 2 ? "rgba(196,98,58,0.07)" : "rgba(242,235,217,0.04)" }} />
        ))}
      </div>

      {/* Decorative circle */}
      <div aria-hidden="true" style={{
        position: "absolute", right: "-8%", top: "50%",
        width: "clamp(320px,45vw,680px)", height: "clamp(320px,45vw,680px)",
        borderRadius: "50%", border: "1px solid rgba(196,98,58,0.12)",
        animation: "rot 90s linear infinite", pointerEvents: "none", transform: "translateY(-50%)",
      }} />

      {/* Main content */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: "3rem", paddingTop: "4rem", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", ...fade(0) }}>
          <div style={{ width: 40, height: 1, background: C.terra }} aria-hidden="true" />
          <span style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(242,235,217,0.45)" }}>
            Case Study 01 · LXMT 740 · SCAD · 2026
          </span>
        </div>

        <h1 id="heroTitle" className="proj-title" style={{
          fontFamily: '"Cormorant Garamond",serif',
          fontSize: "clamp(2.8rem,7.5vw,7.5rem)",
          fontWeight: 300, lineHeight: 0.9, letterSpacing: "-0.025em", color: C.cream,
          ...fade(0.08),
        }}>
          Miu Miu<br />
          <em style={{ fontStyle: "italic", color: C.terra }}>Private</em><br />
          Worlds
        </h1>

        <p style={{
          fontFamily: '"Cormorant Garamond",serif',
          fontSize: "clamp(1rem,1.8vw,1.35rem)", fontWeight: 300, fontStyle: "italic",
          color: "rgba(242,235,217,0.5)", marginTop: "1.25rem", maxWidth: "48ch", lineHeight: 1.55,
          ...fade(0.16),
        }}>
          A life-sized dollhouse pop-up and companion app that translates Miu Miu's playful, subversive femininity into a fully immersive retail installation.
        </p>
      </div>

      {/* Footer bar */}
      <div className="hero-footer-grid" style={{
        display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem",
        padding: "1.25rem 0", borderTop: "1px solid rgba(242,235,217,0.08)",
        position: "relative", zIndex: 1, ...fade(0.24),
      }}>
        {[
          ["Brand", "Miu Miu / Prada Group"],
          ["Discipline", "Experiential Retail · App Design"],
          ["Context", "SCAD · LXMT 740 · 2026"],
          ["Deliverables", "Pop-Up Concept + Mobile App"],
        ].map(([label, value]) => (
          <div key={label}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,235,217,0.3)", marginBottom: "0.3rem" }}>{label}</div>
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "0.95rem", color: "rgba(242,235,217,0.8)" }}>{value}</div>
          </div>
        ))}
      </div>
    </header>
  );
}

// ─── STATS BAND ───────────────────────────────────────────────────────────────
function Stats() {
  return (
    <div style={{ padding: "3.5rem 2.5rem", background: C.cream }}>
      <div className="fu stat-row" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(13,13,13,0.08)" }}>
        {[
          ["4", "Immersive rooms"],
          ["1", "Companion app"],
          ["Gen Z", "Primary audience"],
          ["Phygital", "Core strategy"],
        ].map(([val, lbl]) => (
          <div key={lbl} style={{ padding: "1.6rem 1.5rem", background: C.cream }}>
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "2.6rem", fontWeight: 300, color: C.terra, lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.sage, marginTop: "0.3rem" }}>{lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CONCEPT ──────────────────────────────────────────────────────────────────
function Concept() {
  return (
    <section style={{ padding: "6rem 2.5rem", background: C.mist }} aria-labelledby="conceptHead">
      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>

        {/* Left */}
        <div>
          <div className="fu" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.terra, display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            The Concept
            <span style={{ flex: 1, height: 1, background: "rgba(196,98,58,0.25)", maxWidth: 80 }} />
          </div>
          <h2 id="conceptHead" className="fu d1" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300, lineHeight: 1.05, color: C.ink, marginBottom: "1.5rem" }}>
            Miu Miu Maison:<br />The Giant Dollhouse.
          </h2>
          <blockquote className="fu d2" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.2rem,2.2vw,1.8rem)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.45, borderLeft: `2px solid ${C.terra}`, paddingLeft: "1.5rem", color: C.ink, margin: "0 0 1.5rem" }}>
            "Visitors don't shop — they step inside someone's very private world."
          </blockquote>
        </div>

        {/* Right */}
        <div>
          <p className="fu d2" style={{ fontSize: "0.92rem", lineHeight: 1.85, color: C.inkMid, marginBottom: "1.25rem" }}>
            Contemporary luxury consumers increasingly seek participation and identity formation over product ownership alone. <em style={{ color: C.ink }}>Miu Miu Maison</em> responds to this by transforming the pop-up store into a life-sized dollhouse — a theatrical installation where fashion is presented as part of a living narrative rather than displayed on a rack.
          </p>
          <p className="fu d3" style={{ fontSize: "0.92rem", lineHeight: 1.85, color: C.inkMid, marginBottom: "1.25rem" }}>
            Visitors move through a series of stylized rooms — Bedroom, Living Room, Study, and Dressing Room — each designed around a distinct Miu Miu aesthetic world. Oversized objects, pastel interiors, vintage furniture, and sculptural displays create the illusion of stepping inside a giant dollhouse, where products exist as collectible objects within a domestic narrative.
          </p>
          <p className="fu d4" style={{ fontSize: "0.92rem", lineHeight: 1.85, color: C.inkMid }}>
            A companion mobile app extends the experience digitally — before, during, and after the visit — creating a fully phygital brand encounter.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── THE ROOMS ────────────────────────────────────────────────────────────────
const rooms = [
  {
    num: "01", name: "The Bedroom",
    tagline: "A fashion sanctuary",
    desc: "Blush pink velvet, boucle textures, layered furnishings. Garments displayed on freestanding racks and wardrobe niches in lacquered pastel panels — as if belonging to the room's imagined resident.",
    palette: ["#F0D6D6", "#E8C8B0", "#D4B8A0"],
  },
  {
    num: "02", name: "The Living Room",
    tagline: "The social heart of the house",
    desc: "Tufted pastel pink sofa, sculptural boucle chairs, layered patterned rugs. Display niches in warm wood and deep red lacquer present garments as part of the domestic storybook.",
    palette: ["#E8D4C0", "#D4C0A8", "#C8A890"],
  },
  {
    num: "03", name: "The Study",
    tagline: "A personal library of fashion",
    desc: "Terracotta walls and dark wood shelving. Handbags sit beside books and ceramics — suggesting the personality of an imagined collector who sees fashion and knowledge as the same thing.",
    palette: ["#C4623A", "#8B4A2A", "#E8DFC8"],
  },
  {
    num: "04", name: "The Dressing Room",
    tagline: "The interactive fashion core",
    desc: "Large curved mirrors, lacquered display units, velvet-lined drawers. Soft pinks and warm neutrals transform the act of trying on clothing into a theatrical, intimate experience.",
    palette: ["#F2C0B0", "#E8A898", "#D49080"],
  },
];

function Rooms() {
  return (
    <section style={{ padding: "6rem 2.5rem", background: C.cream }} aria-labelledby="roomsHead">
      <div className="fu" style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: `1px solid rgba(13,13,13,0.1)`, paddingBottom: "1.5rem" }}>
        <div>
          <div style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.terra, marginBottom: "0.5rem" }}>The Installation</div>
          <h2 id="roomsHead" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 300, color: C.ink, lineHeight: 1.05 }}>Four rooms.<br />Four worlds.</h2>
        </div>
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "5rem", fontWeight: 300, color: "rgba(13,13,13,0.05)", lineHeight: 1 }} aria-hidden="true">04</div>
      </div>

      <div className="rooms-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(13,13,13,0.08)" }}>
        {rooms.map((room) => <RoomCard key={room.num} room={room} />)}
      </div>
    </section>
  );
}

function RoomCard({ room }: { room: typeof rooms[0] }) {
  const [h, setH] = useState(false);
  return (
    <div
      className="fu room-card"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: h ? C.creamDark : C.mist, padding: "2rem 1.75rem", transition: "background 0.28s" }}
    >
      {/* Palette swatches */}
      <div style={{ display: "flex", gap: 3, marginBottom: "1.25rem" }}>
        {room.palette.map((col) => (
          <div key={col} style={{ width: 18, height: 18, borderRadius: "50%", background: col, border: "1px solid rgba(13,13,13,0.08)" }} aria-hidden="true" />
        ))}
      </div>

      <div className="room-num" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "2.4rem", fontWeight: 300, color: h ? C.terra : "rgba(13,13,13,0.08)", lineHeight: 1, marginBottom: "0.6rem", transition: "color 0.28s" }}>{room.num}</div>
      <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.2rem", fontWeight: 400, color: C.ink, marginBottom: "0.25rem" }}>{room.name}</div>
      <div style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.terra, marginBottom: "0.9rem" }}>{room.tagline}</div>
      <p style={{ fontSize: "0.81rem", color: C.inkMid, lineHeight: 1.7 }}>{room.desc}</p>
    </div>
  );
}

// ─── THE APP ──────────────────────────────────────────────────────────────────
const appFeatures = [
  { icon: "◎", head: "Dollhouse Map", body: "An interactive floor plan mirroring the physical pop-up. Tap a room to enter its digital world." },
  { icon: "❀", head: "Room Exploration", body: "Each room is a curated digital environment with products, styling details, and narrative themes." },
  { icon: "◈", head: "Doll Closet", body: "A personal wishlist — save pieces discovered during the visit and revisit them anytime." },
  { icon: "◻", head: "Visit Booking", body: "Reserve a time slot directly in the app. Manages visitor flow while reinforcing exclusivity." },
];

function TheApp() {
  return (
    <section style={{ padding: "6rem 2.5rem", background: C.ink, color: C.cream }} aria-labelledby="appHead">
      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>

        {/* Left */}
        <div>
          <div className="fu" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.terra, display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            Digital Companion
            <span style={{ flex: 1, height: 1, background: "rgba(196,98,58,0.25)", maxWidth: 80 }} />
          </div>
          <h2 id="appHead" className="fu d1" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300, lineHeight: 1.05, color: C.cream, marginBottom: "1.5rem" }}>
            The Dollhouse<br />Experience App.
          </h2>
          <p className="fu d2" style={{ fontSize: "0.92rem", lineHeight: 1.85, color: "rgba(242,235,217,0.65)", marginBottom: "1.25rem" }}>
            The physical pop-up is temporary and location-specific. The app ensures the narrative lives beyond it — letting anyone explore the Private Worlds concept digitally, and giving visitors a way to continue engaging with the brand long after they leave.
          </p>
          <p className="fu d3" style={{ fontSize: "0.92rem", lineHeight: 1.85, color: "rgba(242,235,217,0.65)" }}>
            Rather than a transactional shopping platform, the app functions as a storytelling extension: an interactive dollhouse map, room-by-room discovery, and a personal curated closet of saved pieces.
          </p>

          {/* Prototype links */}
          <div className="fu d4" style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,235,217,0.3)", marginBottom: "0.25rem" }}>Live Prototypes</div>
            {[
              ["Prototype with Comments", "https://xd.adobe.com/view/04fcc653-3e38-43a6-8311-0fcc9f2795b1-51af/"],
              ["User Testing Prototype", "https://xd.adobe.com/view/1b83ae0f-bced-49f3-a62f-b110f52c5479-4ed0/?fullscreen&hints=off"],
            ].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: "0.6rem",
                fontSize: "0.72rem", color: "rgba(242,235,217,0.5)", textDecoration: "none",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = C.terra}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(242,235,217,0.5)"}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                  <path d="M2 8L8 2M8 2H4M8 2v4" />
                </svg>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Right — feature grid */}
        <div>
          <div className="fu d1 app-features" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(242,235,217,0.06)" }}>
            {appFeatures.map(({ icon, head, body }) => (
              <div key={head} style={{ padding: "1.75rem 1.5rem", background: "rgba(13,13,13,0.3)" }}>
                <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.6rem", color: C.terra, marginBottom: "0.75rem" }} aria-hidden="true">{icon}</div>
                <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1rem", fontWeight: 400, color: C.cream, marginBottom: "0.4rem" }}>{head}</div>
                <p style={{ fontSize: "0.8rem", color: "rgba(242,235,217,0.55)", lineHeight: 1.7 }}>{body}</p>
              </div>
            ))}
          </div>

          {/* Target audience note */}
          <div className="fu d2" style={{ marginTop: 1, padding: "1.5rem", background: "rgba(196,98,58,0.08)", borderLeft: `2px solid rgba(196,98,58,0.4)` }}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.terra, marginBottom: "0.5rem" }}>Target Audience</div>
            <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1rem", fontStyle: "italic", color: "rgba(242,235,217,0.7)", lineHeight: 1.5 }}>
              Gen Z and younger millennials, 18–35, who expect fluid movement between digital and physical brand experiences — and value storytelling as much as the product itself.
            </p>
          </div>
        </div>
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
        The complete strategy, spatial design,<br />floor plans, renders, and app wireframes<br />live in the process book.
      </h2>
      <p className="fu d2" style={{ fontSize: "0.88rem", color: C.sage, maxWidth: "42ch", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
        29 pages covering brand analysis, PESTLE, location strategy, spatial renders, and full app wireframes from wireframe to prototype.
      </p>
      <div className="fu d3">
        <a
          href="https://drive.google.com/file/d/1dZ1sOijLNeW7fLjUGWQvC0LsKMyF9dhQ/view?usp=drive_link"
          target="_blank" rel="noopener noreferrer"
          className="pb-cta"
          aria-label="View Miu Miu Private Worlds process book (PDF)"
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
    <Link to="/works/guerlain" aria-label="Next case study: Guerlain Shalimar"
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
          Guerlain <em style={{ fontStyle: "italic", color: C.gold }}>"Shalimar"</em><br />Reimagined
        </div>
      </div>
      <div className="np-arrow-inner" style={{
        width: 56, height: 56, borderRadius: "50%",
        border: `1px solid ${h ? C.terra : "rgba(242,235,217,0.15)"}`,
        background: h ? C.terra : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        transform: h ? "rotate(-45deg)" : "none",
        transition: "border-color 0.2s, background 0.2s, transform 0.3s",
      }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={h ? "white" : "rgba(242,235,217,0.5)"} strokeWidth="1.4" aria-hidden="true" style={{ transition: "stroke 0.2s" }}>
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
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => e.currentTarget.style.color = C.terra}
        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => e.currentTarget.style.color = "rgba(242,235,217,0.4)"}>
        ← Selected Works
      </Link>
      <span style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: "italic", fontSize: "0.8rem", color: "rgba(242,235,217,0.15)" }}>Case Study 01 of 03</span>
      <a href="mailto:pranahitareddy1411@gmail.com" style={{ color: "rgba(242,235,217,0.4)", textDecoration: "none" }}
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => e.currentTarget.style.color = C.terra}
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
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        position: "fixed", bottom: "2rem", right: "2rem", zIndex: 200,
        width: 42, height: 42, borderRadius: "50%",
        background: h ? C.terra : C.ink,
        border: `1px solid ${h ? C.terra : "rgba(242,235,217,0.15)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: show ? 1 : 0, pointerEvents: show ? "all" : "none",
        transition: "opacity 0.3s, background 0.2s, border-color 0.2s",
        cursor: "none",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" aria-hidden="true">
        <path d="M8 12V4M4 7l4-4 4 4" />
      </svg>
    </button>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function MiuMiu() {
  useFadeObserver();
  return (
    <div className="miu">
      <LocalStyles />
      <Loader />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Concept />
        <Rooms />
        <TheApp />
        <ProcessBookCTA />
      </main>
      <NextProject />
      <Footer />
      <BackToTop />
    </div>
  );
}