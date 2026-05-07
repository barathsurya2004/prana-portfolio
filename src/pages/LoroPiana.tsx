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
  stone: "#D6CDB8",
};

// ─── LOCAL STYLES ─────────────────────────────────────────────────────────────
function LocalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

      .lp .fu {
        opacity: 0; transform: translateY(28px);
        transition: opacity 0.85s ease, transform 0.85s cubic-bezier(0.16,1,0.3,1);
      }
      .lp .fu.d1 { transition-delay: 0.08s; }
      .lp .fu.d2 { transition-delay: 0.16s; }
      .lp .fu.d3 { transition-delay: 0.24s; }
      .lp .fu.d4 { transition-delay: 0.32s; }
      .lp .fu.vis { opacity: 1; transform: none; }

      @keyframes lspin  { to { transform: rotate(360deg); } }
      @keyframes lspinR { to { transform: rotate(-360deg); } }
      @keyframes lup    { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
      @keyframes lbar   { to { transform: scaleX(1); } }
      @keyframes rot    { to { transform: translateY(-50%) rotate(360deg); } }
      @keyframes threadPulse { 0%,100%{opacity:0.04} 50%{opacity:0.09} }

      .lp .fiber-line { animation: threadPulse 4s ease-in-out infinite; }
      .lp .fiber-line:nth-child(2) { animation-delay: 0.6s; }
      .lp .fiber-line:nth-child(3) { animation-delay: 1.2s; }
      .lp .fiber-line:nth-child(4) { animation-delay: 1.8s; }
      .lp .fiber-line:nth-child(5) { animation-delay: 2.4s; }

      /* Fragrance cards */
      .lp .frag-card { transition: background 0.28s, transform 0.28s; }
      .lp .frag-card:hover { background: ${C.creamDark} !important; transform: translateY(-2px); }
      .lp .frag-card:hover .frag-num { color: ${C.gold} !important; }

      /* Experience cards */
      .lp .exp-card { transition: background 0.25s; }
      .lp .exp-card:hover { background: rgba(184,150,90,0.06) !important; }

      /* Process Book CTA */
      .lp .pb-cta {
        display: inline-flex; align-items: center; gap: 0.75rem;
        padding: 0.85rem 2rem;
        border: 1px solid ${C.gold};
        color: ${C.gold};
        font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase;
        text-decoration: none; transition: all 0.25s; background: transparent;
      }
      .lp .pb-cta:hover { background: ${C.gold}; color: ${C.cream}; }

      /* Next project */
      .lp .next-proj-wrap:hover .np-arrow-inner { border-color: ${C.gold}; background: ${C.gold}; transform: rotate(-45deg); }
      .lp .next-proj-wrap:hover { background: #1a1a1a; }

      @media (prefers-reduced-motion: reduce) {
        .lp .fu { opacity:1 !important; transform:none !important; }
        .lp [style*="animation"] { animation:none !important; }
      }
      @media (max-width: 900px)  { .lp .two-col { grid-template-columns: 1fr !important; gap: 3rem !important; } }
      @media (max-width: 768px)  {
        .lp section, .lp header { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
        .lp .hero-footer-grid   { grid-template-columns: 1fr 1fr !important; }
        .lp .proj-title         { font-size: clamp(2.8rem,10vw,5rem) !important; }
        .lp .frags-grid         { grid-template-columns: 1fr 1fr !important; }
        .lp .stat-row           { grid-template-columns: 1fr 1fr !important; }
        .lp .exp-grid           { grid-template-columns: 1fr !important; }
        .lp .team-grid          { grid-template-columns: 1fr 1fr !important; }
      }
      @media (max-width: 480px)  {
        .lp .frags-grid { grid-template-columns: 1fr !important; }
        .lp .team-grid  { grid-template-columns: 1fr !important; }
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
    document.querySelectorAll(".lp .fu").forEach((el) => io.observe(el));
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
    }} role="status" aria-label="Loading Loro Piana case study">
      <div aria-hidden="true" style={{ position: "absolute", width: "clamp(180px,34vw,340px)", height: "clamp(180px,34vw,340px)", borderRadius: "50%", border: "1px solid rgba(184,150,90,0.18)", animation: "lspin 18s linear infinite" }} />
      <div aria-hidden="true" style={{ position: "absolute", width: "clamp(110px,20vw,220px)", height: "clamp(110px,20vw,220px)", borderRadius: "50%", border: "1px solid rgba(184,150,90,0.09)", animation: "lspinR 12s linear infinite" }} />
      <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.6rem,5vw,3.5rem)", fontWeight: 300, color: C.cream, letterSpacing: "0.08em", textAlign: "center", position: "relative", zIndex: 1, animation: "lup 0.9s cubic-bezier(0.16,1,0.3,1) both" }} aria-hidden="true">Loro Piana</p>
      <p style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: "italic", fontSize: "clamp(0.9rem,2vw,1.2rem)", color: `rgba(184,150,90,0.65)`, letterSpacing: "0.06em", position: "relative", zIndex: 1, marginTop: "0.2rem", animation: "lup 0.9s cubic-bezier(0.16,1,0.3,1) 0.08s both" }} aria-hidden="true">Trama Invisible</p>
      <p style={{ fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(242,235,217,0.35)", marginTop: "1rem", position: "relative", zIndex: 1, animation: "lup 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s both" }}>Case Study 03 · Pranahita Reddy</p>
      <div style={{ width: "clamp(100px,20vw,200px)", height: 1, background: "rgba(242,235,217,0.1)", marginTop: "2rem", position: "relative", zIndex: 1, overflow: "hidden" }} aria-hidden="true">
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${C.gold}, ${C.terra})`, transform: "scaleX(0)", transformOrigin: "left", animation: "lbar 1.6s cubic-bezier(0.4,0,0.2,1) 0.2s forwards" }} />
      </div>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  return <SelectedWorksNav accentColor={C.gold} current="03" />;
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 300); return () => clearTimeout(t); }, []);
  const fade = (delay = 0) => ({
    opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)",
    transition: `opacity 0.85s ease ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <header aria-labelledby="heroTitle" style={{
      height: "100svh", minHeight: 0, background: C.ink,
      display: "grid", gridTemplateRows: "1fr auto",
      padding: "0 2.5rem", position: "relative", overflow: "hidden", boxSizing: "border-box",
    }}>
      {/* Warp thread lines — references LP's textile heritage */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {[10, 22, 34, 50, 62, 74, 86].map((pct, i) => (
          <span key={i} className="fiber-line" style={{ position: "absolute", top: 0, bottom: 0, width: 1, left: `${pct}%`, background: i === 3 ? "rgba(184,150,90,0.08)" : "rgba(242,235,217,0.04)" }} />
        ))}
      </div>

      {/* Concentric rings */}
      <div aria-hidden="true" style={{ position: "absolute", right: "-6%", top: "50%", transform: "translateY(-50%)", width: "clamp(300px,42vw,640px)", height: "clamp(300px,42vw,640px)", borderRadius: "50%", border: "1px solid rgba(184,150,90,0.1)", animation: "rot 100s linear infinite", pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 52, borderRadius: "50%", border: "1px solid rgba(184,150,90,0.06)" }} />
        <div style={{ position: "absolute", inset: 104, borderRadius: "50%", border: "1px solid rgba(196,98,58,0.04)" }} />
      </div>

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "2rem", paddingTop: "7rem", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", ...fade(0) }}>
          <div style={{ width: 40, height: 1, background: C.gold }} aria-hidden="true" />
          <span style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(242,235,217,0.45)" }}>
            Case Study 03 · LXMT 501 · SCAD · 2025
          </span>
        </div>

        <h1 id="heroTitle" className="proj-title" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(2.8rem,7.5vw,7.5rem)", fontWeight: 300, lineHeight: 0.9, letterSpacing: "-0.025em", color: C.cream, ...fade(0.08) }}>
          Loro Piana<br />
          <em style={{ fontStyle: "italic", color: C.gold }}>Trama</em><br />
          Invisible
        </h1>

        <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1rem,1.8vw,1.35rem)", fontWeight: 300, fontStyle: "italic", color: "rgba(242,235,217,0.5)", marginTop: "1.25rem", maxWidth: "50ch", lineHeight: 1.55, ...fade(0.16) }}>
          A fragrance brand extension that translates Loro Piana's century of textile mastery into olfactory experience — six wood-based scents, each one a different way of touching cashmere.
        </p>
      </div>

      {/* Footer bar */}
      <div className="hero-footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem", padding: "1.25rem 0", borderTop: "1px solid rgba(242,235,217,0.08)", position: "relative", zIndex: 1, ...fade(0.24) }}>
        {[
          ["Brand", "Loro Piana / LVMH"],
          ["Discipline", "Brand Extension · Fragrance Strategy"],
          ["Context", "SCAD · LXMT 501 · 2025"],
          ["Deliverables", "6-Scent Collection + Retail Strategy"],
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

// ─── STATS ────────────────────────────────────────────────────────────────────
function Stats() {
  return (
    <div style={{ padding: "3.5rem 2.5rem", background: C.cream }}>
      <div className="fu stat-row" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(13,13,13,0.08)" }}>
        {[
          ["6", "Wood-based fragrances"],
          ["$490", "Per 100 ml — niche tier"],
          ["1924", "The heritage being extended"],
          ["1", "New brand category"],
        ].map(([val, lbl]) => (
          <div key={lbl} style={{ padding: "1.6rem 1.5rem", background: C.cream }}>
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "2.6rem", fontWeight: 300, color: C.gold, lineHeight: 1 }}>{val}</div>
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
        <div>
          <div className="fu" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            The Concept
            <span style={{ flex: 1, height: 1, background: "rgba(184,150,90,0.2)", maxWidth: 80 }} />
          </div>
          <h2 id="conceptHead" className="fu d1" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300, lineHeight: 1.05, color: C.ink, marginBottom: "1.5rem" }}>
            Turning texture<br />into scent.<br />Comfort into identity.
          </h2>
          {/* Concept callout */}
          <div className="fu d2" style={{ padding: "1.5rem", background: "rgba(184,150,90,0.1)", borderLeft: `2px solid ${C.gold}` }}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.gold, marginBottom: "0.5rem" }}>Collection Name</div>
            <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.4rem", fontStyle: "italic", fontWeight: 300, color: C.ink, lineHeight: 1.3 }}>
              Trama Invisible<br />
              <span style={{ fontSize: "0.75rem", fontStyle: "normal", color: C.sage, letterSpacing: "0.04em" }}>Italian for "Invisible Weave"</span>
            </p>
          </div>
        </div>

        <div>
          <p className="fu d2" style={{ fontSize: "0.92rem", lineHeight: 1.85, color: C.inkMid, marginBottom: "1.25rem" }}>
            Loro Piana has never needed to announce itself. Its identity lives in the touch of a vicuña scarf, the weight of a baby cashmere coat, the quiet warmth of a fiber sourced at 4,500 metres in the Andes. This project asks: <em style={{ color: C.ink }}>what happens when that tactile world is translated into scent?</em>
          </p>
          <p className="fu d3" style={{ fontSize: "0.92rem", lineHeight: 1.85, color: C.inkMid, marginBottom: "1.25rem" }}>
            <em style={{ fontStyle: "italic", color: C.ink }}>Trama Invisible</em> is Loro Piana's first fragrance collection — six warm, wood-based compositions crafted from natural Italian ingredients and blended in small batches by artisans. Each scent is designed around the same philosophy that governs the garments: nothing superfluous, nothing loud, everything felt.
          </p>
          <p className="fu d4" style={{ fontSize: "0.92rem", lineHeight: 1.85, color: C.inkMid }}>
            The fragrance becomes an entry point — a more accessible gesture toward the brand's world that deepens emotional connection without disturbing the quiet exclusivity Loro Piana has spent a century earning.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── THE COLLECTION ───────────────────────────────────────────────────────────
const fragrances = [
  {
    name: "Fiato di Legno",
    profile: "Woody Floral Musk",
    desc: "Hand-finished wood, sun-bleached linen, soft wool fibers warmed by skin. The scent unfolds gently — not loud, but deeply comforting.",
    notes: "Bergamot · Iris · Pink pepper · Cedarwood · Cashmere wood · Sandalwood",
    swatch: "#C8B49A",
  },
  {
    name: "Infiore",
    profile: "Creamy White Floral Musk",
    desc: "A thread of quiet luxury, spun from creamy gardenia. A vicuña accord imagined through suede and ambrette seed.",
    notes: "Gardenia absolute · Vegetal musk · Sandalwood · Vicuña accord",
    swatch: "#E8D8C4",
  },
  {
    name: "Respiro Nascosto",
    profile: "Clean Woody Musk",
    desc: "A whisper of warmth — soft, woody, and intimate. Like the breath between skin and fabric at the end of a long day.",
    notes: "Guaiac wood · Cotton · Musk · Cedar",
    swatch: "#B8A890",
  },
  {
    name: "Notte Alpina",
    profile: "Woody Aromatic",
    desc: "A breath of alpine stillness — crisp, resinous, and cool. The Dolomites at night, when temperature drops and the air crystallises.",
    notes: "Juniper · Black tea · Pine resin · Violet leaf",
    swatch: "#8FA090",
  },
  {
    name: "Ombra di Corteccia",
    profile: "Woody Spicy Moss",
    desc: "The warmth of earth and wood — spiced with pink pepper and cinnamon, unfolding like sunlight filtered through oak and cedar bark.",
    notes: "Oakmoss · Patchouli · Pink pepper · Cinnamon · Cedar",
    swatch: "#A08870",
  },
  {
    name: "Silenzio d'Oriente",
    profile: "Amber Woody Floral",
    desc: "An intimate whisper of mystery — dark resins and blooming jasmine wrapped in the warmth of oud and patchouli.",
    notes: "Myrrh · Jasmine · Patchouli · Oud",
    swatch: "#786050",
  },
];

function Collection() {
  return (
    <section style={{ padding: "6rem 2.5rem", background: C.cream }} aria-labelledby="collectionHead">
      <div style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: `1px solid rgba(13,13,13,0.1)`, paddingBottom: "1.5rem" }}>
        <div>
          <div className="fu" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, marginBottom: "0.5rem" }}>The Fragrance Collection</div>
          <h2 id="collectionHead" className="fu d1" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 300, color: C.ink, lineHeight: 1.05 }}>
            Six scents.<br />One philosophy.
          </h2>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="fu d2" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "0.88rem", fontStyle: "italic", color: C.sage, lineHeight: 1.5 }}>
            100 ml each · $490<br />
            <span style={{ fontSize: "0.72rem" }}>Crafted in Italy · Small batch</span>
          </div>
        </div>
      </div>

      <div className="frags-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(13,13,13,0.08)" }}>
        {fragrances.map((f) => <FragCard key={f.name} f={f} />)}
      </div>

      {/* Bottle detail */}
      <div className="fu d3" style={{ marginTop: "2.5rem", padding: "1.75rem 2rem", background: C.mist, display: "flex", alignItems: "start", gap: "2rem", flexWrap: "wrap" }}>
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.sage, marginBottom: "0.4rem" }}>The Bottle</div>
          <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1rem", fontWeight: 400, color: C.ink }}>Italian walnut &amp; ash cap</div>
        </div>
        <div style={{ width: 1, background: "rgba(13,13,13,0.1)", alignSelf: "stretch", flexShrink: 0 }} aria-hidden="true" />
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.sage, marginBottom: "0.4rem" }}>Packaging</div>
          <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1rem", fontWeight: 400, color: C.ink }}>Linen drawstring pouch</div>
        </div>
        <div style={{ width: 1, background: "rgba(13,13,13,0.1)", alignSelf: "stretch", flexShrink: 0 }} aria-hidden="true" />
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.sage, marginBottom: "0.4rem" }}>Digital Integration</div>
          <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1rem", fontWeight: 400, color: C.ink }}>NFC chip in cap — tap to unlock scent story</div>
        </div>
        <div style={{ width: 1, background: "rgba(13,13,13,0.1)", alignSelf: "stretch", flexShrink: 0 }} aria-hidden="true" />
        <div>
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.sage, marginBottom: "0.4rem" }}>Target Price</div>
          <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1rem", fontWeight: 400, color: C.ink }}>USD $490 · 100 ml</div>
        </div>
      </div>
    </section>
  );
}

function FragCard({ f }: { f: typeof fragrances[0] }) {
  const [h, setH] = useState(false);
  return (
    <div className="fu frag-card" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: h ? C.creamDark : C.mist, padding: "2rem 1.75rem" }}>
      {/* Colour swatch — references the wooden cap tones */}
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: f.swatch, border: "1px solid rgba(13,13,13,0.1)", marginBottom: "1.25rem" }} aria-hidden="true" />
      <div className="frag-num" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.15rem", fontWeight: 400, color: h ? C.gold : C.ink, marginBottom: "0.2rem", transition: "color 0.28s" }}>{f.name}</div>
      <div style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.gold, marginBottom: "0.85rem" }}>{f.profile}</div>
      <p style={{ fontSize: "0.8rem", color: C.inkMid, lineHeight: 1.7, marginBottom: "0.85rem" }}>{f.desc}</p>
      <p style={{ fontSize: "0.68rem", color: C.sage, fontStyle: "italic", lineHeight: 1.6 }}>{f.notes}</p>
    </div>
  );
}

// ─── EXPERIENCES ──────────────────────────────────────────────────────────────
const experiences = [
  {
    icon: "◎",
    label: "Fragrance Island",
    sub: "Milan Flagship · Via Montenapoleone",
    desc: "The main entrance of the Milan flagship is reimagined as a dedicated fragrance display. Walnut wood, warm lighting, and natural materials. Testing cards invite an intimate, unhurried encounter.",
  },
  {
    icon: "❀",
    label: "Scent & Sip Café",
    sub: "Garden Courtyard · Launch Period",
    desc: "The flagship's courtyard becomes a botanical retreat — surrounding jasmine, sage, and cedar plants. Curated teas served with origin cards lightly scented with the collection. Discovery through slowness.",
  },
  {
    icon: "◻",
    label: "Pop-Up Pavilion",
    sub: "Orto Botanico di Brera · Milan",
    desc: "A temporary pavilion in Milan's 18th-century botanical garden. Linen drapes, warm wood, dappled light through tree canopies. Fragrance displayed alongside its ingredient origins. Atmosphere as argument.",
  },
  {
    icon: "◈",
    label: "Digital Scent Map",
    sub: "loropiana.com · Online",
    desc: "An interactive Italian map where each region reveals the origin of a key ingredient. An AI emotion-based quiz generates a personal scent profile. Calm, slow, cream-white interface — the digital store as garden.",
  },
];

function Experiences() {
  return (
    <section style={{ padding: "6rem 2.5rem", background: C.ink, color: C.cream }} aria-labelledby="expHead">
      <div style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "1px solid rgba(242,235,217,0.07)", paddingBottom: "1.5rem" }}>
        <div>
          <div className="fu" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, marginBottom: "0.5rem" }}>Retail & Digital Strategy</div>
          <h2 id="expHead" className="fu d1" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 300, color: C.cream, lineHeight: 1.05 }}>
            Discovery<br />over transaction.
          </h2>
        </div>
        <p className="fu d2" style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: "italic", fontSize: "0.88rem", color: "rgba(242,235,217,0.3)", textAlign: "right", maxWidth: "22ch", lineHeight: 1.6 }}>
          Every touchpoint designed around atmosphere, not promotion.
        </p>
      </div>

      <div className="exp-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(242,235,217,0.04)" }}>
        {experiences.map((ex) => <ExpCard key={ex.label} ex={ex} />)}
      </div>
    </section>
  );
}

function ExpCard({ ex }: { ex: typeof experiences[0] }) {
  const [h, setH] = useState(false);
  return (
    <div className="fu exp-card" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: h ? "rgba(184,150,90,0.06)" : "rgba(13,13,13,0.3)", padding: "2rem 1.75rem" }}>
      <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.8rem", color: h ? C.gold : "rgba(184,150,90,0.3)", marginBottom: "1.25rem", transition: "color 0.25s" }} aria-hidden="true">{ex.icon}</div>
      <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.1rem", fontWeight: 400, color: C.cream, marginBottom: "0.2rem" }}>{ex.label}</div>
      <div style={{ fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: h ? C.gold : C.sage, marginBottom: "0.85rem", transition: "color 0.25s" }}>{ex.sub}</div>
      <p style={{ fontSize: "0.8rem", color: "rgba(242,235,217,0.55)", lineHeight: 1.7 }}>{ex.desc}</p>
    </div>
  );
}

// ─── TARGET CONSUMER ──────────────────────────────────────────────────────────
function Consumer() {
  return (
    <section style={{ padding: "6rem 2.5rem", background: C.creamDark }} aria-labelledby="consHead">
      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
        <div>
          <div className="fu" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            The Consumer
            <span style={{ flex: 1, height: 1, background: "rgba(184,150,90,0.2)", maxWidth: 80 }} />
          </div>
          <h2 id="consHead" className="fu d1" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300, lineHeight: 1.05, color: C.ink, marginBottom: "1.25rem" }}>
            The Refined<br />Aesthete.
          </h2>
          <p className="fu d2" style={{ fontSize: "0.92rem", lineHeight: 1.85, color: C.inkMid }}>
            Age 35–50. Milan, Paris, London. A fashion buyer who begins her day with yoga and ends it reading by a fireplace in her Lake Como villa. She collects fragrances from Le Labo, Byredo, and Creed. She already knows about cashmere. She just hasn't met Loro Piana's version of it in scent form yet.
          </p>
        </div>
        <div>
          {/* Persona card — Sofia Rossi */}
          <div className="fu d2" style={{ background: C.mist, padding: "2rem" }}>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.gold, marginBottom: "1rem" }}>Persona</div>
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.4rem", fontWeight: 400, color: C.ink, marginBottom: "0.5rem" }}>Sofia Rossi</div>
            <div style={{ fontSize: "0.72rem", color: C.sage, marginBottom: "1.25rem" }}>39 · Fashion Buyer · Brera, Milan · €180k income</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {[
                ["Fragrance world", "Le Labo · Byredo · Creed"],
                ["Fashion world", "Loro Piana · The Row · Brunello Cucinelli"],
                ["Lifestyle", "Yoga · Lake Como · Paris Fashion Week"],
                ["Shopping ritual", "Treats purchase as an experience, not a transaction"],
              ].map(([label, value]) => (
                <div key={label} style={{ display: "grid", gridTemplateColumns: "9rem 1fr", gap: "0.5rem", borderBottom: "1px solid rgba(13,13,13,0.07)", paddingBottom: "0.65rem" }}>
                  <span style={{ fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.sage, paddingTop: "0.1rem" }}>{label}</span>
                  <span style={{ fontSize: "0.82rem", color: C.inkMid }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="fu d3" style={{ fontSize: "0.82rem", color: C.sage, fontStyle: "italic", lineHeight: 1.7, marginTop: "1.25rem", paddingLeft: "0.25rem" }}>
            "The new Loro Piana fragrance is, for her, the missing dimension of the brand: turning texture into scent, emotion into identity."
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── TEAM ─────────────────────────────────────────────────────────────────────
const team = [
  { name: "Pranahita Reddy Chinta", role: "Research & Strategy" },
  { name: "Ella Hua", role: "Creative Direction" },
  { name: "Jainisha Jolapara", role: "Market Analysis" },
  { name: "Sia Sun", role: "Retail Strategy" },
];

function Team() {
  return (
    <section style={{ padding: "4rem 2.5rem", background: C.cream }} aria-labelledby="teamHead">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: `1px solid rgba(13,13,13,0.1)`, paddingBottom: "1.25rem", marginBottom: "2rem" }}>
        <div>
          <div className="fu" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.sage, marginBottom: "0.4rem" }}>Collaborators</div>
          <h2 id="teamHead" className="fu d1" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 300, color: C.ink }}>The team.</h2>
        </div>
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: "italic", fontSize: "0.78rem", color: C.sage }}>LXMT 501 · Prof. Kudzayi Kanyama</div>
      </div>
      <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(13,13,13,0.07)" }}>
        {team.map((m) => (
          <div key={m.name} className="fu" style={{ padding: "1.5rem", background: C.mist }}>
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1rem", fontWeight: 400, color: C.ink, marginBottom: "0.25rem" }}>{m.name}</div>
            <div style={{ fontSize: "0.65rem", color: C.sage }}>{m.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PROCESS BOOK CTA ─────────────────────────────────────────────────────────
function ProcessBookCTA() {
  return (
    <section style={{ padding: "6rem 2.5rem", background: C.ink, textAlign: "center" }} aria-labelledby="pbHead">
      <div className="fu" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.sage, marginBottom: "1.25rem" }}>Full Documentation</div>
      <h2 id="pbHead" className="fu d1" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.75rem,3.5vw,3rem)", fontWeight: 300, color: C.cream, lineHeight: 1.1, marginBottom: "1rem" }}>
        The complete brand extension — fragrance<br />architecture, retail strategy, consumer<br />analysis, and merchandising plan.
      </h2>
      <p className="fu d2" style={{ fontSize: "0.88rem", color: "rgba(242,235,217,0.4)", maxWidth: "44ch", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
        79 pages covering company overview, market analysis, competitive benchmarking, the full fragrance collection, packaging, retail strategy, and digital integration.
      </p>
      <div className="fu d3">
        <a
          href="/process-books/loro-piana-trama-invisible.pdf"
          target="_blank" rel="noopener noreferrer"
          className="pb-cta"
          aria-label="View Loro Piana Trama Invisible process book (PDF)"
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

// ─── NEXT PROJECT (last of 3 — back to selected works) ────────────────────────
function NextProject() {
  const [h, setH] = useState(false);
  return (
    <Link to="/#work" aria-label="Back to Selected Works"
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
        <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(242,235,217,0.3)", marginBottom: "0.5rem" }}>Back to</div>
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.6rem,3.5vw,3rem)", fontWeight: 300, color: C.cream, lineHeight: 1.05 }}>
          Selected Works<br />
          <em style={{ fontStyle: "italic", color: C.gold }}>Pranahita Reddy</em>
        </div>
      </div>
      <div className="np-arrow-inner" style={{
        width: 56, height: 56, borderRadius: "50%",
        border: `1px solid ${h ? C.gold : "rgba(242,235,217,0.15)"}`,
        background: h ? C.gold : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        transform: h ? "rotate(135deg)" : "none",
        transition: "border-color 0.2s, background 0.2s, transform 0.3s",
      }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
          stroke={h ? "white" : "rgba(242,235,217,0.5)"}
          strokeWidth="1.4" aria-hidden="true" style={{ transition: "stroke 0.2s" }}>
          <path d="M14 4L4 14M4 14H11M4 14V7" />
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
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => e.currentTarget.style.color = C.gold}
        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => e.currentTarget.style.color = "rgba(242,235,217,0.4)"}>
        ← Selected Works
      </Link>
      <span style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: "italic", fontSize: "0.8rem", color: "rgba(242,235,217,0.15)" }}>Case Study 03 of 03</span>
      <a href="mailto:pranahitareddy1411@gmail.com" style={{ color: "rgba(242,235,217,0.4)", textDecoration: "none" }}
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => e.currentTarget.style.color = C.gold}
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
        background: h ? C.gold : C.ink,
        border: `1px solid ${h ? C.gold : "rgba(242,235,217,0.15)"}`,
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
export default function LoroPiana() {
  useFadeObserver();
  return (
    <div className="lp">
      <LocalStyles />
      <Loader />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Concept />
        <Collection />
        <Experiences />
        <Consumer />
        <Team />
        <ProcessBookCTA />
      </main>
      <NextProject />
      <Footer />
      <BackToTop />
    </div>
  );
}