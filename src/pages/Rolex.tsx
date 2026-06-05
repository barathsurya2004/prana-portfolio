import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SelectedWorksNav from "../components/SelectedWorksNav";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
// Shared palette — identical to every other case study file
// Rolex-specific additions: rxGreen (loader/hero), rxGold (accent)
const C = {
  cream: "#F2EBD9",
  creamDark: "#E8DFC8",
  mist: "#EAE3D3",
  ink: "#0D0D0D",
  inkMid: "#2A2A2A",
  terra: "#C4623A",
  gold: "#B8965A",
  sage: "#6B7C6E",
  // ── Rolex palette ──────────────────────────
  rxGreen: "#1A3828",              // deep forest — loader & hero bg
  rxGreenMid: "#243F30",             // mid green — used in dark section cards
  rxGold: "#BFA050",             // richer Rolex gold — all accent moments
  rxGoldSoft: "rgba(191,160,80,0.12)", // tint for callout boxes
  rxGoldLine: "rgba(191,160,80,0.2)",  // divider / rule tints
};

// ─── LOCAL STYLES ────────────────────────────────────────────────────────────
function LocalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

      /* ── Fade-up — same as all other pages ── */
      .rx .fu {
        opacity: 0; transform: translateY(28px);
        transition: opacity 0.85s ease, transform 0.85s cubic-bezier(0.16,1,0.3,1);
      }
      .rx .fu.d1 { transition-delay: 0.08s; }
      .rx .fu.d2 { transition-delay: 0.16s; }
      .rx .fu.d3 { transition-delay: 0.24s; }
      .rx .fu.d4 { transition-delay: 0.32s; }
      .rx .fu.vis { opacity: 1; transform: none; }

      /* ── Shared keyframes ── */
      @keyframes lspin     { to { transform: rotate(360deg); } }
      @keyframes lspinR    { to { transform: rotate(-360deg); } }
      @keyframes lup       { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
      @keyframes lbar      { to { transform: scaleX(1); } }

      /* ── Rolex-specific: crown ring orbit ── */
      @keyframes rxOrbit   { to { transform: translateY(-50%) rotate(360deg); } }
      @keyframes rxOrbitR  { to { transform: translateY(-50%) rotate(-360deg); } }

      /* ── Rolex-specific: tick pulse (references seconds hand) ── */
      @keyframes rxTick {
        0%, 100% { opacity: 0.04; }
        50%       { opacity: 0.10; }
      }
      .rx .rx-grid-line { animation: rxTick 5s ease-in-out infinite; }
      .rx .rx-grid-line:nth-child(2) { animation-delay: 1s; }
      .rx .rx-grid-line:nth-child(3) { animation-delay: 2s; }
      .rx .rx-grid-line:nth-child(4) { animation-delay: 3s; }

      /* ── Diagnosis cards ── */
      .rx .diag-card { transition: background 0.28s, transform 0.28s; }
      .rx .diag-card:hover { background: ${C.creamDark} !important; }
      .rx .diag-card:hover .diag-letter { color: ${C.rxGold} !important; }

      /* ── Strategy pillar items ── */
      .rx .pillar-item { transition: background 0.25s; }
      .rx .pillar-item:hover { background: rgba(191,160,80,0.06) !important; }

      /* ── Extension cards ── */
      .rx .ext-card { transition: background 0.28s; }
      .rx .ext-card:hover { background: rgba(191,160,80,0.06) !important; }

      /* ── Team row ── */
      .rx .team-row { transition: background 0.22s; }
      .rx .team-row:hover { background: ${C.creamDark} !important; }
      .rx .team-row.featured:hover { background: #1f1f1f !important; }

      /* ── Process book CTA — green bg, gold border button ── */
      .rx .pb-cta {
        display: inline-flex; align-items: center; gap: 0.75rem;
        padding: 0.85rem 2rem;
        border: 1px solid ${C.rxGold};
        color: ${C.rxGold};
        font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase;
        text-decoration: none; transition: all 0.25s; background: transparent;
      }
      .rx .pb-cta:hover { background: ${C.rxGold}; color: ${C.rxGreen}; }

      /* ── Next project ── */
      .rx .next-proj-wrap:hover .np-arrow-inner {
        border-color: ${C.rxGold}; background: ${C.rxGold}; transform: rotate(-45deg);
      }
      .rx .next-proj-wrap:hover { background: #111; }

      /* ── Responsive — same breakpoints as all other pages ── */
      @media (prefers-reduced-motion: reduce) {
        .rx .fu { opacity:1 !important; transform:none !important; }
        .rx [style*="animation"] { animation: none !important; }
      }
      @media (max-width: 900px) {
        .rx .two-col { grid-template-columns: 1fr !important; gap: 3rem !important; }
      }
      @media (max-width: 768px) {
        .rx section, .rx header { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
        .rx .hero-footer-grid { grid-template-columns: 1fr 1fr !important; }
        .rx .proj-title       { font-size: clamp(2.8rem,10vw,5rem) !important; }
        .rx .diag-grid        { grid-template-columns: 1fr !important; }
        .rx .stat-row         { grid-template-columns: 1fr 1fr !important; }
        .rx .framework-grid   { grid-template-columns: 1fr 1fr !important; }
      }
      @media (max-width: 480px) {
        .rx .diag-grid      { grid-template-columns: 1fr !important; }
        .rx .framework-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  );
}

// ─── FADE OBSERVER — identical pattern to all other pages ─────────────────────
function useFadeObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("vis"); io.unobserve(e.target); }
      }),
      { threshold: 0.10 }
    );
    document.querySelectorAll(".rx .fu").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── LOADER ──────────────────────────────────────────────────────────────────
// Green bg (rxGreen) — distinct from ink (MiuMiu, LP) and indigo (Guerlain)
// Two rings: outer rotates CW, inner CCW — references the bezel/rotor
function Loader() {
  const [gone, setGone] = useState(false);
  const [fading, setFading] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      setFading(true);
      setTimeout(() => setGone(true), 900);
    }, 1800);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 10000, background: C.rxGreen,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        opacity: fading ? 0 : 1, transform: fading ? "translateY(-8px)" : "none",
        transition: "opacity 0.9s cubic-bezier(0.76,0,0.24,1), transform 0.9s cubic-bezier(0.76,0,0.24,1)",
        pointerEvents: fading ? "none" : "all",
      }}
      role="status" aria-label="Loading Rolex case study"
    >
      {/* Outer ring — CW */}
      <div aria-hidden="true" style={{
        position: "absolute",
        width: "clamp(200px,38vw,380px)", height: "clamp(200px,38vw,380px)",
        borderRadius: "50%", border: `1px solid rgba(191,160,80,0.18)`,
        animation: "lspin 22s linear infinite",
      }} />
      {/* Middle ring — CCW */}
      <div aria-hidden="true" style={{
        position: "absolute",
        width: "clamp(130px,24vw,250px)", height: "clamp(130px,24vw,250px)",
        borderRadius: "50%", border: `1px solid rgba(191,160,80,0.10)`,
        animation: "lspinR 16s linear infinite",
      }} />
      {/* Inner ring — CW slow */}
      <div aria-hidden="true" style={{
        position: "absolute",
        width: "clamp(70px,13vw,140px)", height: "clamp(70px,13vw,140px)",
        borderRadius: "50%", border: `1px solid rgba(191,160,80,0.06)`,
        animation: "lspin 30s linear infinite",
      }} />

      <p style={{
        fontFamily: '"Cormorant Garamond",serif',
        fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 300,
        color: C.cream, letterSpacing: "0.14em",
        position: "relative", zIndex: 1,
        animation: "lup 0.9s cubic-bezier(0.16,1,0.3,1) both",
      }} aria-hidden="true">Rolex</p>

      <p style={{
        fontFamily: '"Cormorant Garamond",serif', fontStyle: "italic",
        fontSize: "clamp(0.9rem,2vw,1.2rem)", color: `rgba(191,160,80,0.7)`,
        letterSpacing: "0.06em", position: "relative", zIndex: 1, marginTop: "0.2rem",
        animation: "lup 0.9s cubic-bezier(0.16,1,0.3,1) 0.08s both",
      }} aria-hidden="true">Brand Equity Augmentation</p>

      <p style={{
        fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase",
        color: "rgba(242,235,217,0.3)", marginTop: "1rem",
        position: "relative", zIndex: 1,
        animation: "lup 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s both",
      }}>Case Study 04 · Pranahita Reddy</p>

      <div style={{
        width: "clamp(100px,20vw,200px)", height: 1,
        background: "rgba(242,235,217,0.08)", marginTop: "2rem",
        position: "relative", zIndex: 1, overflow: "hidden",
      }} aria-hidden="true">
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(90deg, ${C.rxGold}, ${C.gold}, ${C.rxGold})`,
          transform: "scaleX(0)", transformOrigin: "left",
          animation: "lbar 1.8s cubic-bezier(0.4,0,0.2,1) 0.2s forwards",
        }} />
      </div>
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
  return <SelectedWorksNav accentColor={C.rxGold} current="04" />;
}

// ─── HERO ────────────────────────────────────────────────────────────────────
// Rolex-specific: green bg, three rotating bezel rings (CW / CCW / CW),
// subtle vertical grid lines with gold center — references watch architecture
function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), 300);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay = 0) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "none" : "translateY(28px)",
    transition: `opacity 0.85s ease ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <header
      aria-labelledby="heroTitle"
      style={{
        height: "100svh", minHeight: 0, background: C.rxGreen,
        display: "grid", gridTemplateRows: "1fr auto",
        padding: "0 2.5rem", position: "relative", overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Vertical grid lines — tick reference */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {[16.66, 33.33, 50, 66.66, 83.33].map((pct, i) => (
          <span
            key={i}
            className="rx-grid-line"
            style={{
              position: "absolute", top: 0, bottom: 0, width: 1, left: `${pct}%`,
              background: i === 2
                ? `rgba(191,160,80,0.09)`
                : "rgba(242,235,217,0.03)",
            }}
          />
        ))}
      </div>

      {/* Three concentric bezel rings — outer CW, mid CCW, inner CW */}
      <div aria-hidden="true" style={{
        position: "absolute", right: "-8%", top: "50%",
        width: "clamp(340px,46vw,700px)", height: "clamp(340px,46vw,700px)",
        borderRadius: "50%", border: `1px solid rgba(191,160,80,0.10)`,
        animation: "rxOrbit 100s linear infinite",
        pointerEvents: "none", transform: "translateY(-50%)",
      }}>
        <div style={{
          position: "absolute", inset: 56, borderRadius: "50%",
          border: `1px solid rgba(191,160,80,0.07)`,
          animation: "rxOrbitR 60s linear infinite",
        }}>
          <div style={{
            position: "absolute", inset: 52, borderRadius: "50%",
            border: `1px solid rgba(191,160,80,0.04)`,
            animation: "rxOrbit 80s linear infinite",
          }} />
        </div>
      </div>

      {/* Main content */}
      <div style={{
        display: "flex", flexDirection: "column", justifyContent: "center",
        paddingBottom: "3rem", paddingTop: "4rem",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", ...fade(0) }}>
          <div style={{ width: 40, height: 1, background: C.rxGold }} aria-hidden="true" />
          <span style={{
            fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase",
            color: "rgba(242,235,217,0.45)",
          }}>
            Case Study 04 · LXMT 730: The Art of Luxury · SCAD · 2026
          </span>
        </div>

        <h1
          id="heroTitle"
          className="proj-title"
          style={{
            fontFamily: '"Cormorant Garamond",serif',
            fontSize: "clamp(2.8rem,7.5vw,7.5rem)",
            fontWeight: 300, lineHeight: 0.9,
            letterSpacing: "-0.025em", color: C.cream,
            ...fade(0.08),
          }}
        >
          Rolex<br />
          <em style={{ fontStyle: "italic", color: C.rxGold }}>Brand Equity</em><br />
          Augmentation
        </h1>

        <p style={{
          fontFamily: '"Cormorant Garamond",serif',
          fontSize: "clamp(1rem,1.8vw,1.35rem)", fontWeight: 300, fontStyle: "italic",
          color: "rgba(242,235,217,0.5)", marginTop: "1.25rem", maxWidth: "50ch", lineHeight: 1.55,
          ...fade(0.16),
        }}>
          A ten-year strategic plan that doesn't change what Rolex is — it deepens everything around it. Supply, distribution, secondary market, and two tightly controlled brand extensions.
        </p>
      </div>

      {/* Footer meta strip */}
      <div
        className="hero-footer-grid"
        style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem",
          padding: "1.25rem 0", borderTop: "1px solid rgba(242,235,217,0.08)",
          position: "relative", zIndex: 1, ...fade(0.24),
        }}
      >
        {[
          ["Brand", "Rolex SA"],
          ["Discipline", "Brand Equity · Market Strategy"],
          ["Context", "SCAD · LXMT 730 · 2026"],
          ["Format", "72-Page Process Book · Group Project"],
        ].map(([label, value]) => (
          <div key={label}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,235,217,0.28)", marginBottom: "0.3rem" }}>{label}</div>
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "0.95rem", color: "rgba(242,235,217,0.8)" }}>{value}</div>
          </div>
        ))}
      </div>
    </header>
  );
}

// ─── STATS — identical structure to all other pages ────────────────────────
function Stats() {
  return (
    <div style={{ padding: "3.5rem 2.5rem", background: C.cream }}>
      <div
        className="fu stat-row"
        style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(13,13,13,0.08)" }}
      >
        {[
          ["10", "Year strategic horizon"],
          ["72", "Page process book"],
          ["2", "Brand extensions proposed"],
          ["RCPO", "Secondary market sovereign"],
        ].map(([val, lbl]) => (
          <div key={lbl} style={{ padding: "1.6rem 1.5rem", background: C.cream }}>
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "2.6rem", fontWeight: 300, color: C.rxGold, lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.sage, marginTop: "0.3rem" }}>{lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── THE BRIEF — mist bg, two-col (same pattern as Concept in all pages) ──────
// Rolex-specific: left has a "Strategic Horizon" callout (like Guerlain's philosophy box)
function TheBrief() {
  return (
    <section style={{ padding: "6rem 2.5rem", background: C.mist }} aria-labelledby="briefHead">
      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>

        {/* Left */}
        <div>
          <div className="fu" style={{
            fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase",
            color: C.rxGold, display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem",
          }}>
            The Brief
            <span style={{ flex: 1, height: 1, background: C.rxGoldLine, maxWidth: 80 }} />
          </div>
          <h2 id="briefHead" className="fu d1" style={{
            fontFamily: '"Cormorant Garamond",serif',
            fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300, lineHeight: 1.05,
            color: C.ink, marginBottom: "1.5rem",
          }}>
            Preserving the myth.<br />Expanding the moat.
          </h2>

          {/* Callout — Rolex's strategic premise (same visual pattern as Guerlain's philosophy box) */}
          <div className="fu d2" style={{ padding: "1.5rem", background: C.rxGoldSoft, borderLeft: `2px solid ${C.rxGold}` }}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.rxGold, marginBottom: "0.5rem" }}>Strategic Premise</div>
            <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.1rem", fontStyle: "italic", color: C.ink, lineHeight: 1.5 }}>
              "A Crown for Every Achievement."<br />
              <span style={{ fontSize: "0.8rem", fontStyle: "normal", color: C.sage, letterSpacing: "0.04em" }}>Prof. Alessandro Cannata · LXMT 730</span>
            </p>
          </div>
        </div>

        {/* Right */}
        <div>
          <p className="fu d2" style={{ fontSize: "0.92rem", lineHeight: 1.85, color: C.inkMid, marginBottom: "1.25rem" }}>
            Rolex occupies an unparalleled position in the global luxury market — built on high brand awareness, rigorous vertical integration, and deep-rooted associations with achievement and precision. Yet the brand faces a set of modern structural challenges that, if unaddressed, risk eroding the very symbolic density that makes Rolex irreplaceable.
          </p>
          <p className="fu d3" style={{ fontSize: "0.92rem", lineHeight: 1.85, color: C.inkMid, marginBottom: "1.25rem" }}>
            The brief: develop a comprehensive ten-year strategic plan that augments brand equity — not by changing Rolex, but by{" "}
            <em style={{ color: C.ink }}>hardening everything around it</em>. Supply, distribution, secondary market, brand extensions, and sponsorship architecture were all treated as coordinated equity levers.
          </p>
          <p className="fu d4" style={{ fontSize: "0.92rem", lineHeight: 1.85, color: C.inkMid }}>
            Rolex does not compete with other watches. It competes with{" "}
            <em style={{ color: C.ink }}>the concept of achievement itself</em>. Every strategic decision had to honour that distinction — nothing could signal accessibility where the brand has always signalled arrival.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── DIAGNOSIS — cream bg, 3-card A/B/C grid ──────────────────────────────
// Rolex-specific variation: each card has a narrow top border strip in rxGold
// (references the coloured insert on the Rolex bezel — a subtle brand nod)
function Diagnosis() {
  const cards = [
    {
      letter: "A",
      title: "Grey Market Speculation",
      desc: "Highly desirable references — Submariner, GMT-Master II, Daytona — trade at 150–300% of retail on secondary platforms. Opportunistic buyers distort the allocation ecosystem and degrade the brand's symbolic hierarchy.",
    },
    {
      letter: "B",
      title: "Entry-Level Dilution Risk",
      desc: "Over-distributed entry-level models lower the barrier to brand membership without the aspirational tension that sustains desirability. Wide availability risks signalling accessibility over exclusivity.",
    },
    {
      letter: "C",
      title: "Secondary Market Sovereignty",
      desc: "Rolex has historically ceded control of the secondary market to third-party platforms. As pre-owned luxury grows faster than first-hand, this cession is both a revenue and a narrative loss.",
    },
  ];

  return (
    <section style={{ padding: "6rem 2.5rem", background: C.cream }} aria-labelledby="diagHead">
      <div style={{
        marginBottom: "3rem", display: "flex", justifyContent: "space-between",
        alignItems: "flex-end", borderBottom: "1px solid rgba(13,13,13,0.1)", paddingBottom: "1.5rem",
      }}>
        <div>
          <div className="fu" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.rxGold, marginBottom: "0.5rem" }}>
            Brand Diagnosis
          </div>
          <h2 id="diagHead" className="fu d1" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 300, color: C.ink, lineHeight: 1.05 }}>
            Three structural threats<br />to the crown.
          </h2>
        </div>
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "5rem", fontWeight: 300, color: "rgba(13,13,13,0.05)", lineHeight: 1 }} aria-hidden="true">03</div>
      </div>

      {/* Rolex-specific: top accent strip on each card (bezel insert nod) */}
      <div className="diag-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(13,13,13,0.08)" }}>
        {cards.map((card) => (
          <DiagCard key={card.letter} card={card} />
        ))}
      </div>
    </section>
  );
}

function DiagCard({ card }: { card: { letter: string; title: string; desc: string } }) {
  const [h, setH] = useState(false);
  return (
    <div
      className="fu diag-card"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: h ? C.creamDark : C.mist, position: "relative", overflow: "hidden" }}
    >
      {/* Rolex-specific: thin gold accent bar at top of each card */}
      <div style={{ height: 2, background: C.rxGold, opacity: h ? 1 : 0.35, transition: "opacity 0.28s" }} />
      <div style={{ padding: "2rem 1.75rem" }}>
        <div
          className="diag-letter"
          style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "3rem", fontWeight: 300, color: h ? C.rxGold : "rgba(13,13,13,0.07)", lineHeight: 1, marginBottom: "0.75rem", transition: "color 0.28s" }}
        >{card.letter}</div>
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.15rem", fontWeight: 400, color: C.ink, marginBottom: "0.6rem" }}>{card.title}</div>
        <p style={{ fontSize: "0.81rem", color: C.inkMid, lineHeight: 1.7 }}>{card.desc}</p>
      </div>
    </div>
  );
}

// ─── STRATEGY — ink bg, two-col ──────────────────────────────────────────────
// Left: 5 strategic moves (numbered, like TheApp's feature rows)
// Right: 4 analytical frameworks as a 2x2 grid (Rolex-specific — not seen in other pages)
function Strategy() {
  const pillars = [
    { n: "01", head: "Supply Contraction", body: "Phase out highly accessible entry-level references. Offset margin through price increases on core professional models. Fewer owners, more devotion per owner — eliminating the opportunistic buyer entirely." },
    { n: "02", head: "Invite-Only Allocation", body: "Transition primary allocations to an invite-only reward system tied to purchase history and AD relationship depth. The watch becomes a relationship milestone, restoring the social ritual of earning access to coveted references." },
    { n: "03", head: "RCPO Programme Expansion", body: "Scale the Rolex Certified Pre-Owned programme to gain total sovereignty over the secondary market. By controlling authentication, pricing, and presentation, Rolex reclaims the narrative of every watch — even after its first sale." },
    { n: "04", head: "Digital Product Passports", body: "Implement blockchain-linked records of each watch's provenance, service history, and ownership chain. Eliminates grey market opacity, deters speculation, and adds verifiable heritage that deepens the object's value over time." },
    { n: "05", head: "Deepened Sponsorship", body: "Refocus from broad exposure to curated private experiences within established territories — Wimbledon, equestrian sports. Fewer events, more emotional depth. The brand should be felt by loyalists, not seen by everyone." },
  ];

  const frameworks = [
    { code: "SWOT", head: "SWOT Analysis", body: "Strengths: brand mythology, vertical integration. Weaknesses: grey market vulnerability. Opportunities: RCPO scale, DPP sovereignty. Threats: counterfeiting, ultra-luxury independents." },
    { code: "AKR", head: "Aaker's Brand Equity", body: "Loyalty emerged as Rolex's deepest equity asset. Brand awareness and perceived quality are saturated — the invite-only allocation system is the lever to deepen loyalty further." },
    { code: "KPR", head: "Kapferer's Prism", body: "Physique (Oyster case, fluted bezel), personality (confident, understated), culture (Swiss precision), relationship (aspiration), reflection (the achiever), self-image (I earned this)." },
    { code: "TRB", head: "Tribal Marketing", body: "The waiting list as rite of passage, the AD relationship as initiation, the specific reference as tribal identifier. The strategy reinforces these rituals rather than commodifying them." },
  ];

  return (
    <section style={{ padding: "6rem 2.5rem", background: C.ink, color: C.cream }} aria-labelledby="stratHead">
      <div style={{
        marginBottom: "3rem", display: "flex", justifyContent: "space-between",
        alignItems: "flex-end", borderBottom: "1px solid rgba(242,235,217,0.07)", paddingBottom: "1.5rem",
      }}>
        <div>
          <div className="fu" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.rxGold, marginBottom: "0.5rem" }}>Strategic Framework</div>
          <h2 id="stratHead" className="fu d1" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 300, color: C.cream, lineHeight: 1.05 }}>
            Five moves.<br />One decade.
          </h2>
        </div>
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "5rem", fontWeight: 300, color: "rgba(242,235,217,0.04)", lineHeight: 1 }} aria-hidden="true">05</div>
      </div>

      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>

        {/* Left: 5 pillars — Rolex-specific: large serif number to the left, full-width item */}
        <div className="fu d1" style={{ display: "flex", flexDirection: "column", gap: 1, background: "rgba(242,235,217,0.04)" }}>
          {pillars.map((p) => (
            <div
              key={p.n}
              className="pillar-item"
              style={{ display: "grid", gridTemplateColumns: "3rem 1fr", gap: "1.25rem", padding: "1.5rem 1.25rem", background: "rgba(13,13,13,0.3)", alignItems: "start" }}
            >
              <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.5rem", fontWeight: 300, color: `rgba(191,160,80,0.45)`, lineHeight: 1, paddingTop: "0.1rem" }}>{p.n}</div>
              <div>
                <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.05rem", fontWeight: 400, color: C.cream, marginBottom: "0.35rem" }}>{p.head}</div>
                <p style={{ fontSize: "0.8rem", color: "rgba(242,235,217,0.55)", lineHeight: 1.7 }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: 4 frameworks — 2×2 grid (Rolex-specific layout, not in other pages) */}
        <div>
          <div style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(242,235,217,0.3)", marginBottom: "1.25rem" }}>Analytical Frameworks</div>
          <div className="fu d2 framework-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(242,235,217,0.05)" }}>
            {frameworks.map((f) => (
              <div key={f.code} style={{ padding: "1.75rem 1.5rem", background: "rgba(13,13,13,0.35)" }}>
                <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "0.72rem", letterSpacing: "0.18em", color: C.rxGold, marginBottom: "0.5rem" }}>{f.code}</div>
                <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1rem", fontWeight: 400, color: C.cream, marginBottom: "0.4rem" }}>{f.head}</div>
                <p style={{ fontSize: "0.78rem", color: "rgba(242,235,217,0.5)", lineHeight: 1.7 }}>{f.body}</p>
              </div>
            ))}
          </div>

          {/* Thesis callout — matches Guerlain/LP callout box pattern */}
          <div className="fu d3" style={{ marginTop: 1, padding: "1.5rem", background: C.rxGoldSoft, borderLeft: `2px solid rgba(191,160,80,0.5)` }}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.rxGold, marginBottom: "0.5rem" }}>Core Thesis</div>
            <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "0.95rem", fontStyle: "italic", color: "rgba(242,235,217,0.7)", lineHeight: 1.55 }}>
              "Rolex's scarcity is not a supply chain problem — it is the product. Make it more intentional, more sovereign, more symbolically coherent."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── BRAND EXTENSIONS — cream-dark bg, two-col ───────────────────────────────
// Same bg as LP's Consumer section. Rolex-specific: each extension as a card
// with a gold top-bar, matching the DiagCard variation above for internal consistency
function Extensions() {
  return (
    <section style={{ padding: "6rem 2.5rem", background: C.creamDark }} aria-labelledby="extHead">
      <div style={{
        marginBottom: "3rem", display: "flex", justifyContent: "space-between",
        alignItems: "flex-end", borderBottom: "1px solid rgba(13,13,13,0.1)", paddingBottom: "1.5rem",
      }}>
        <div>
          <div className="fu" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.rxGold, marginBottom: "0.5rem" }}>Brand Extensions</div>
          <h2 id="extHead" className="fu d1" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 300, color: C.ink, lineHeight: 1.05 }}>
            Two extensions.<br />Zero brand dilution.
          </h2>
        </div>
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "5rem", fontWeight: 300, color: "rgba(13,13,13,0.05)", lineHeight: 1 }} aria-hidden="true">02</div>
      </div>

      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>
        {[
          {
            num: "01",
            name: "Precision Espresso Grinder",
            tag: "Horology × Extraction",
            equity: "Espresso extraction shares Rolex's core obsessions: precision engineering, consistent repeatability, and the mastery of time — extraction time is measured in seconds. The grinder is a precision instrument, not a lifestyle product.",
            dist: "AD-exclusive. Limited annual production. €3,500+ — above entry-level, below professional series. A collector's object.",
            arch: "Under the Rolex name — no sub-brand. Manufactured in-house to the same tolerances as movement components. The crown without explanation.",
          },
          {
            num: "02",
            name: "Luxury Haberdashery Cufflinks",
            tag: "Wrist Sovereignty",
            equity: "Cufflinks occupy the same wrist-zone as the watch — worn in the same context, with the same codes of formal achievement. The Rolex crown on a cufflink is a statement of alignment, not an intrusion into a new category.",
            dist: "AD-exclusive. Gifted first to allocation-eligible clients — deepening the loyalty loop before general purchase. €800–€1,800. In-house precious metal finishing.",
            arch: "Strict production volume caps and pricing at core tier parity ensure the extension reads as premium — never as an accessible brand entry point.",
          },
        ].map((ext) => (
          <ExtCard key={ext.num} ext={ext} />
        ))}
      </div>
    </section>
  );
}

function ExtCard({ ext }: { ext: { num: string; name: string; tag: string; equity: string; dist: string; arch: string } }) {
  const [h, setH] = useState(false);
  return (
    <div
      className="ext-card"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: h ? "rgba(191,160,80,0.06)" : C.mist, overflow: "hidden" }}
    >
      {/* Gold top bar — matches DiagCard for internal Rolex consistency */}
      <div style={{ height: 2, background: C.rxGold, opacity: h ? 1 : 0.3, transition: "opacity 0.28s" }} />
      <div style={{ padding: "2rem 1.75rem" }}>
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "2.4rem", fontWeight: 300, color: "rgba(13,13,13,0.07)", lineHeight: 1, marginBottom: "0.5rem" }}>{ext.num}</div>
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.2rem", fontWeight: 400, color: C.ink, marginBottom: "0.2rem" }}>{ext.name}</div>
        <div style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.rxGold, marginBottom: "1.25rem" }}>{ext.tag}</div>

        {[
          ["Equity Logic", ext.equity],
          ["Distribution", ext.dist],
          ["Architecture", ext.arch],
        ].map(([label, text]) => (
          <div key={label} style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(13,13,13,0.07)" }}>
            <div style={{ fontSize: "0.57rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.sage, marginBottom: "0.35rem" }}>{label}</div>
            <p style={{ fontSize: "0.81rem", color: C.inkMid, lineHeight: 1.7 }}>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TEAM — cream bg, horizontal row list ──────────────────────────────────
// Rolex is a group project (5 members) — same section pattern as LP/Guerlain
// Rolex-specific: horizontal list format rather than card grid (referenced
// the "contributor" feel of a process book colophon)
const team = [
  { name: "Pranahita Reddy", role: "Brand Strategist", featured: true },
  { name: "Camila Bertagni", role: "Co-Author", featured: false },
  { name: "Ornella Lepinoux", role: "Co-Author", featured: false },
  { name: "Mary Martin Armstrong", role: "Co-Author", featured: false },
  { name: "Tara Murali", role: "Co-Author", featured: false },
];

function Team() {
  return (
    <section style={{ padding: "4rem 2.5rem", background: C.cream }} aria-labelledby="teamHead">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "1px solid rgba(13,13,13,0.1)", paddingBottom: "1.25rem", marginBottom: "2rem" }}>
        <div>
          <div className="fu" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.sage, marginBottom: "0.4rem" }}>Collaborators</div>
          <h2 id="teamHead" className="fu d1" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 300, color: C.ink }}>The team.</h2>
        </div>
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: "italic", fontSize: "0.78rem", color: C.sage }}>LXMT 730 · Prof. Alessandro Cannata</div>
      </div>

      {/* Horizontal row list — different from other pages' card grids */}
      <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "rgba(13,13,13,0.07)" }}>
        {team.map((m) => (
          <TeamRow key={m.name} m={m} />
        ))}
      </div>
    </section>
  );
}

function TeamRow({ m }: { m: typeof team[0] }) {
  const [h, setH] = useState(false);
  return (
    <div
      className={`fu team-row${m.featured ? " featured" : ""}`}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "grid", gridTemplateColumns: "1fr auto",
        alignItems: "center", padding: "1.1rem 1.5rem",
        background: m.featured ? (h ? "#1f1f1f" : C.ink) : (h ? C.creamDark : C.mist),
        transition: "background 0.22s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
        {/* Gold dot for featured, subtle dot for rest */}
        <div style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: m.featured ? C.rxGold : "rgba(13,13,13,0.15)" }} aria-hidden="true" />
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.05rem", fontWeight: 400, color: m.featured ? C.cream : C.ink }}>{m.name}</div>
      </div>
      <div style={{ fontSize: "0.65rem", color: m.featured ? C.rxGold : C.sage }}>{m.role}</div>
    </div>
  );
}

// ─── PROCESS BOOK CTA ────────────────────────────────────────────────────────
// Green bg (rxGreen) — unique vs ink (LP) and creamDark (MiuMiu, Guerlain)
// Makes Rolex the "darkest" and most authoritative CTA section
function ProcessBookCTA() {
  return (
    <section style={{ padding: "6rem 2.5rem", background: C.rxGreen, textAlign: "center" }} aria-labelledby="pbHead">
      <div className="fu" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(191,160,80,0.5)", marginBottom: "1.25rem" }}>Full Documentation</div>
      <h2 id="pbHead" className="fu d1" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.75rem,3.5vw,3rem)", fontWeight: 300, color: C.cream, lineHeight: 1.1, marginBottom: "1rem" }}>
        The complete brand equity strategy —<br />SWOT, brand architecture, market forecast,<br />extensions, and 10-year roadmap.
      </h2>
      <p className="fu d2" style={{ fontSize: "0.88rem", color: "rgba(242,235,217,0.4)", maxWidth: "44ch", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
        72 pages covering brand analysis, Aaker's matrix, Kapferer's prism, tribal marketing, 10-year market forecast, brand extensions, and the full RCPO + Digital Product Passport strategy.
      </p>
      <div className="fu d3">
        <a
          href="https://drive.google.com/file/d/1sdDatdeuObQWjD4ekaytI_CFhfOnlmAn/view?usp=sharing"
          target="_blank" rel="noopener noreferrer"
          className="pb-cta"
          aria-label="View Rolex Brand Equity Augmentation process book (PDF)"
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

// ─── NEXT PROJECT — back to Miu Miu (04 is last, loops to 01) ────────────────
function NextProject() {
  const [h, setH] = useState(false);
  return (
    <Link
      to="/works/miu-miu"
      aria-label="Back to first case study: Miu Miu Private Worlds"
      className="next-proj-wrap"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        gap: "2rem", textDecoration: "none", padding: "5rem 2.5rem",
        background: h ? "#111" : C.ink,
        borderTop: "1px solid rgba(242,235,217,0.06)",
        transition: "background 0.3s",
      }}
    >
      <div>
        <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(242,235,217,0.3)", marginBottom: "0.5rem" }}>Back to First</div>
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.6rem,3.5vw,3rem)", fontWeight: 300, color: C.cream, lineHeight: 1.05 }}>
          Miu Miu<br />
          <em style={{ fontStyle: "italic", color: C.terra }}>Private Worlds</em>
        </div>
      </div>
      <div
        className="np-arrow-inner"
        style={{
          width: 56, height: 56, borderRadius: "50%",
          border: `1px solid ${h ? C.rxGold : "rgba(242,235,217,0.15)"}`,
          background: h ? C.rxGold : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          transform: h ? "rotate(-45deg)" : "none",
          transition: "border-color 0.2s, background 0.2s, transform 0.3s",
        }}
      >
        <svg
          width="18" height="18" viewBox="0 0 18 18" fill="none"
          stroke={h ? C.rxGreen : "rgba(242,235,217,0.5)"}
          strokeWidth="1.4" aria-hidden="true"
          style={{ transition: "stroke 0.2s" }}
        >
          <path d="M4 14L14 4M14 4H7M14 4v7" />
        </svg>
      </div>
    </Link>
  );
}

// ─── FOOTER — identical structure to all other pages ─────────────────────────
function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        background: C.ink, color: "rgba(242,235,217,0.25)",
        padding: "1.5rem 2.5rem", display: "flex", justifyContent: "space-between",
        alignItems: "center", borderTop: "1px solid rgba(242,235,217,0.05)",
        fontSize: "0.62rem", letterSpacing: "0.1em", flexWrap: "wrap", gap: "0.5rem",
      }}
    >
      <Link
        to="/#work"
        style={{ color: "rgba(242,235,217,0.4)", textDecoration: "none" }}
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => e.currentTarget.style.color = C.rxGold}
        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => e.currentTarget.style.color = "rgba(242,235,217,0.4)"}
      >
        ← Selected Works
      </Link>
      <span style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: "italic", fontSize: "0.8rem", color: "rgba(242,235,217,0.15)" }}>Case Study 04 of 04</span>
      <a
        href="mailto:pranahitareddy1411@gmail.com"
        style={{ color: "rgba(242,235,217,0.4)", textDecoration: "none" }}
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => e.currentTarget.style.color = C.rxGold}
        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => e.currentTarget.style.color = "rgba(242,235,217,0.4)"}
      >
        pranahitareddy1411@gmail.com
      </a>
    </footer>
  );
}

// ─── BACK TO TOP — identical structure to all other pages ────────────────────
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
        background: h ? C.rxGold : C.ink,
        border: `1px solid ${h ? C.rxGold : "rgba(242,235,217,0.15)"}`,
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
export default function Rolex() {
  useFadeObserver();
  return (
    <div className="rx">
      <LocalStyles />
      <Loader />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <TheBrief />
        <Diagnosis />
        <Strategy />
        <Extensions />
        <Team />
        <ProcessBookCTA />
      </main>
      <NextProject />
      <Footer />
      <BackToTop />
    </div>
  );
}