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
  amber: "#8B5E3C",
  amberSoft: "#C4907A",
  amberFade: "rgba(139,94,60,0.12)",
  petal: "#D9B49A",
  petalFade: "rgba(196,144,122,0.10)",
  indigo: "#2D2A4A",
};

// ─── LOCAL STYLES ────────────────────────────────────────────────────────────
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

      .gr .visual-img-wrap { overflow: hidden; }
      .gr .visual-img-wrap img {
        width:100%; display:block; object-fit:cover;
        filter: sepia(12%) contrast(1.05) saturate(1.05);
        transition: transform 0.7s cubic-bezier(0.16,1,0.3,1);
      }
      .gr .visual-img-wrap:hover img { transform: scale(1.03); }

      .gr .next-proj-wrap:hover .np-arrow-inner { border-color: ${C.amber}; background: ${C.amber}; transform: rotate(-45deg); }
      .gr .next-proj-wrap:hover { background: #1a1a1a; }

      .gr .note-card { transition: background 0.3s, transform 0.3s; }
      .gr .note-card:hover { background: ${C.creamDark} !important; transform: translateY(-3px); }

      .gr .pyramid-layer { transition: background 0.25s, padding-left 0.25s; }
      .gr .pyramid-layer:hover { background: rgba(139,94,60,0.07) !important; padding-left: 2.25rem !important; }

      @media (max-width: 768px) {
        .gr section, .gr header, .gr .stats-container { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
        .gr .hero-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 1rem !important; }
        .gr .two-col { grid-template-columns: 1fr !important; gap: 3rem !important; }
        .gr .three-col, .gr .notes-grid { grid-template-columns: 1fr !important; }
        .gr .stat-cols-4 { grid-template-columns: 1fr !important; }
        .gr .proj-title { font-size: clamp(2.8rem,10vw,5rem) !important; }
        .gr .hero-content { justify-content: center !important; padding-top: 3rem !important; }
      }

      @media (prefers-reduced-motion: reduce) {
        .gr .fu { opacity: 1 !important; transform: none !important; }
      }
    `}</style>
  );
}

// ─── FADE OBSERVER ────────────────────────────────────────────────────────────
function useFadeObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("vis"); io.unobserve(e.target); } }),
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
    { left: "45%", delay: "0s", dur: "2.4s" },
    { left: "50%", delay: "0.4s", dur: "2.8s" },
    { left: "55%", delay: "0.8s", dur: "2.2s" },
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
      <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.6rem,5vw,3.5rem)", fontWeight: 300, color: C.cream, letterSpacing: "0.12em", textAlign: "center", position: "relative", zIndex: 1, animation: "lup 0.9s cubic-bezier(0.16,1,0.3,1) both" }} aria-hidden="true">Guerlain</p>
      <p style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: "italic", fontSize: "clamp(1rem,2.5vw,1.6rem)", color: C.amberSoft, letterSpacing: "0.06em", textAlign: "center", position: "relative", zIndex: 1, marginTop: "0.3rem", animation: "lup 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both" }} aria-hidden="true">Shalimar</p>
      <p style={{ fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(242,235,217,0.3)", marginTop: "1.25rem", position: "relative", zIndex: 1, animation: "lup 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}>Case Study 02 · Pranahita Reddy</p>
      <div style={{ width: "clamp(100px,20vw,200px)", height: 1, background: "rgba(242,235,217,0.08)", marginTop: "2.25rem", position: "relative", zIndex: 1, overflow: "hidden" }} aria-hidden="true">
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${C.amber}, ${C.amberSoft}, ${C.gold})`, transform: "scaleX(0)", transformOrigin: "left", animation: "lbar 1.8s cubic-bezier(0.4,0,0.2,1) 0.2s forwards" }} />
      </div>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  return <SelectedWorksNav accentColor={C.amber} current="02" />;
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 300); return () => clearTimeout(t); }, []);
  const fade = (delay = 0) => ({
    opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)",
    transition: `opacity 0.85s ease ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });
  const heroParticles = [
    { left: "18%", bottom: "34%", delay: "0s", dur: "3.2s" },
    { left: "28%", bottom: "30%", delay: "0.6s", dur: "2.8s" },
    { left: "38%", bottom: "36%", delay: "1.2s", dur: "3.6s" },
    { left: "55%", bottom: "32%", delay: "0.3s", dur: "2.6s" },
    { left: "72%", bottom: "38%", delay: "0.9s", dur: "3.0s" },
  ];
  return (
    <header aria-labelledby="heroTitle" style={{ height: "100svh", minHeight: 0, background: C.indigo, display: "grid", gridTemplateRows: "1fr auto", padding: "0 2.5rem", position: "relative", overflow: "hidden", boxSizing: "border-box" }}>
      <div aria-hidden="true" style={{ position: "absolute", left: "50%", bottom: "-10%", width: "clamp(400px,60vw,900px)", height: "clamp(400px,60vw,900px)", borderRadius: "50%", background: `radial-gradient(ellipse at center, rgba(139,94,60,0.22) 0%, rgba(196,144,122,0.08) 45%, transparent 70%)`, transform: "translateX(-50%)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", right: "-8%", top: "50%", width: "clamp(320px,44vw,660px)", height: "clamp(320px,44vw,660px)", borderRadius: "50%", border: "1px solid rgba(196,144,122,0.1)", animation: "rotOrbit 120s linear infinite", pointerEvents: "none", transform: "translateY(-50%)" }}>
        <div style={{ position: "absolute", inset: 60, borderRadius: "50%", border: "1px solid rgba(184,150,90,0.07)" }} />
      </div>
      {heroParticles.map((p, i) => (
        <div key={i} aria-hidden="true" style={{ position: "absolute", left: p.left, bottom: p.bottom, width: 3, height: 3, borderRadius: "50%", background: C.amberSoft, opacity: 0, animation: `scentRise ${p.dur} ease-out ${p.delay} infinite`, pointerEvents: "none" }} />
      ))}
      <div className="hero-content" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "2rem", paddingTop: "7rem", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", ...fade(0) }}>
          <div style={{ width: 40, height: 1, background: C.amberSoft }} aria-hidden="true" />
          <span style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(242,235,217,0.4)" }}>Case Study 02 · SCAD Luxury Marketing Studio · 2026</span>
        </div>
        <h1 id="heroTitle" className="proj-title" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(2.5rem,7.5vw,7.5rem)", fontWeight: 300, lineHeight: 0.9, letterSpacing: "-0.025em", color: C.cream, ...fade(0.08) }}>Guerlain<br /><em style={{ fontStyle: "italic", color: C.amberSoft }}>Shalimar</em><br />Reimagined</h1>
        <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1rem,1.8vw,1.4rem)", fontWeight: 300, fontStyle: "italic", color: "rgba(242,235,217,0.5)", marginTop: "1.25rem", maxWidth: "54ch", lineHeight: 1.55, ...fade(0.16) }}>A fragrance brand extension strategy rooted in Guerlain's 190-year maison heritage — extending the iconic Shalimar universe into a contemporary olfactory narrative anchored in Indian craft and the Indo-French cultural axis.</p>
      </div>
      <div className="hero-footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem", padding: "1.25rem 0", borderTop: "1px solid rgba(242,235,217,0.07)", position: "relative", zIndex: 1, ...fade(0.24) }}>
        {[["Brand", "Guerlain / LVMH"], ["Discipline", "Fragrance Strategy · Brand Extension"], ["Context", "SCAD · 2026"], ["Role", "Brand Strategist & Olfactory Concept Developer"]].map(([label, value]) => (
          <div key={label}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,235,217,0.28)", marginBottom: "0.3rem" }}>{label}</div>
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "0.95rem", color: "rgba(242,235,217,0.75)" }}>{value}</div>
          </div>
        ))}
      </div>
    </header>
  );
}

// ─── PRIMITIVES ──────────────────────────────────────────────────────────────
function SLabel({ children, light, style }: any) {
  return (
    <div className="fu" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.amber, display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", ...style }}>
      {children}
      <span style={{ flex: 1, height: 1, background: light ? "rgba(139,94,60,0.2)" : "rgba(139,94,60,0.18)", maxWidth: 80 }} />
    </div>
  );
}
function SHeading({ id, children, light, delay = "d1" }: any) {
  return (
    <h2 id={id} className={`fu ${delay}`} style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(2rem,4vw,3.8rem)", fontWeight: 300, lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: "0.5rem", color: light ? C.cream : C.ink }}>{children}</h2>
  );
}
function SBody({ children, light, delay, style }: any) {
  return (
    <p className={`fu ${delay || ""}`} style={{ fontSize: "0.92rem", lineHeight: 1.85, color: light ? "rgba(242,235,217,0.65)" : C.inkMid, ...style }}>{children}</p>
  );
}
function PullQuote({ children, light }: any) {
  return (
    <blockquote className="fu d3" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.4rem,2.8vw,2.2rem)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.4, borderLeft: `2px solid ${C.amber}`, paddingLeft: "1.5rem", margin: "2.5rem 0", color: light ? C.cream : C.ink }}>{children}</blockquote>
  );
}
function Visual({ src, alt, caption, lightCaption, delay }: any) {
  return (
    <div className={`fu ${delay || ""}`} style={{ margin: "2rem 0" }}>
      <div className="visual-img-wrap">
        <img src={src} alt={alt} loading="lazy" style={{ width: "100%", display: "block", objectFit: "cover" }} />
      </div>
      {caption && (
        <p style={{ fontSize: "0.68rem", color: lightCaption ? "rgba(242,235,217,0.35)" : C.sage, marginTop: "0.65rem", fontStyle: "italic", letterSpacing: "0.04em" }}>{caption}</p>
      )}
    </div>
  );
}

// ─── CONTENT SECTIONS ────────────────────────────────────────────────────────
function Stats() {
  return (
    <section className="stats-container" style={{ padding: "4rem 2.5rem", background: C.cream }}>
      <div className="fu stat-cols-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(13,13,13,0.08)", border: "1px solid rgba(13,13,13,0.08)" }}>
        {[["1828", "Year Guerlain was founded"], ["1925", "Shalimar's year of creation"], ["190+", "Years of Maison heritage"], ["India", "Spiritual origin of Shalimar"]].map(([val, label]) => (
          <div key={label} style={{ padding: "1.75rem 1.5rem", background: C.cream }}>
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "2.8rem", fontWeight: 300, color: C.amber, lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.sage, marginTop: "0.3rem" }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
function Brief() {
  return (
    <section style={{ padding: "7rem 2.5rem", background: C.mist }} aria-labelledby="briefHead">
      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
        <div><SLabel>The Brief</SLabel><SHeading id="briefHead">A legend that<br />outlived its story.</SHeading></div>
        <div>
          <SBody delay="d2">Shalimar is one of the most iconic fragrances ever made — born in 1925 from the mythic love story of Emperor Shah Jahan and Mumtaz Mahal, and the gardens he built in her memory. For a century it has carried that narrative. The question this brief asked was: <em style={{ color: C.ink, fontStyle: "italic" }}>what happens when a legend becomes so familiar it stops being felt?</em></SBody>
          <PullQuote>"Shalimar is not a fragrance. It is a promise made in another century that the brand must keep finding ways to honour."</PullQuote>
          <SBody delay="d4">The brief called for a fragrance brand extension strategy — an architectural expansion of its universe: new expressions that carry its olfactory DNA while anchoring the range in the Indo-French cultural axis.</SBody>
        </div>
      </div>
    </section>
  );
}
function Heritage() {
  const timeline = [
    { year: "1828", event: "Pierre-François Pascal Guerlain founds the maison at 42 rue de Rivoli, Paris." },
    { year: "1889", event: "Jicky — the world's first modern perfume, pioneering synthetic musks." },
    { year: "1925", event: "Shalimar. Inspired by the Shalimar Gardens of Lahore, creating the Oriental fragrance template." },
    { year: "2026", event: "This Project. A new chapter: extending Shalimar through the lens of its authentic Indian origin." },
  ];
  return (
    <section style={{ padding: "7rem 2.5rem", background: C.ink, color: C.cream }} aria-labelledby="heritageHead">
      <SLabel light>Maison Heritage</SLabel><SHeading id="heritageHead" light>190 years of<br />olfactory architecture.</SHeading>
      <div style={{ marginTop: "3.5rem", position: "relative", paddingLeft: "2rem" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, ${C.amber}, transparent)` }} />
        {timeline.map(({ year, event }) => (
          <div key={year} className="fu" style={{ display: "grid", gridTemplateColumns: "7rem 1fr", gap: "2rem", padding: "1.5rem 0", borderBottom: "1px solid rgba(242,235,217,0.06)" }}>
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.1rem", color: C.amber }}>{year}</div>
            <p style={{ fontSize: "0.88rem", color: "rgba(242,235,217,0.65)", lineHeight: 1.75 }}>{event}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
function Origin() {
  return (
    <section style={{ padding: "7rem 2.5rem", background: C.creamDark }} aria-labelledby="originHead">
      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
        <div>
          <SLabel>The Shalimar Myth</SLabel><SHeading id="originHead">A love story<br />told in fragrance.</SHeading>
          <Visual src="https://placehold.co/520x420/D6CDB8/8B5E3C?text=Shalimar+Gardens" alt="Shalimar Gardens" caption="The Shalimar Gardens, Lahore" delay="d2" />
        </div>
        <div>
          <SBody delay="d1">Jacques Guerlain built a heart of rose and jasmine, settling into a base of vanilla and benzoin. It was his <em style={{ color: C.ink, fontStyle: "italic" }}>imagination of longing</em>.</SBody>
          <SBody delay="d2" style={{ marginTop: "1.25rem" }}>A century later, the brand has an opportunity to return that story to its source — to re-anchor Shalimar in the actual cultural landscape it represents.</SBody>
          <div className="fu d4" style={{ marginTop: "2rem", padding: "1.75rem", background: C.amberFade, borderLeft: `2px solid ${C.amber}` }}>
            <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.1rem", fontStyle: "italic", color: C.ink, lineHeight: 1.55 }}>The extension is not a departure from Shalimar's identity. It is a correction of its geography.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
function Olfactory() {
  const extensions = [
    { num: "I", name: "Shalimar Noir", desc: "The original formula enriched with Assam oud and deeper benzoin.", accent: C.indigo },
    { num: "II", name: "Shalimar Dawali", desc: "Marigold and saffron opening. A fragrance for the Indo-French homecoming.", accent: C.amber },
    { num: "III", name: "Shalimar Jardin d'Eau", desc: "A transparent, watery interpretation — bergamot and green tea.", accent: C.sage },
    { num: "IV", name: "Shalimar Vanille Sauvage", desc: "Vanilla reframed as wild and austere — raw Madagascar absolute.", accent: C.terra },
  ];
  return (
    <section style={{ padding: "7rem 2.5rem", background: C.cream }} aria-labelledby="olfactHead">
      <SLabel>Olfactory Architecture</SLabel><SHeading id="olfactHead">The scent universe,<br />mapped and extended.</SHeading>
      <div className="notes-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(13,13,13,0.08)", marginTop: "4rem" }}>
        {extensions.map(({ num, name, desc }) => (
          <div key={num} className="fu note-card" style={{ background: C.mist, padding: "2rem 1.75rem" }}>
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "2.2rem", fontWeight: 300, color: `rgba(13,13,13,0.07)`, lineHeight: 1 }}>{num}</div>
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.15rem", fontWeight: 400, color: C.ink, marginBottom: "0.9rem" }}>{name}</div>
            <p style={{ fontSize: "0.8rem", color: C.inkMid, lineHeight: 1.7 }}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
function Reflection() {
  return (
    <section style={{ padding: "7rem 2.5rem", background: C.indigo, color: C.cream }}>
      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
        <div><SLabel light>Reflection</SLabel><SHeading id="reflHead" light>A personal<br />homecoming.</SHeading></div>
        <div>
          <SBody light delay="d2">Working on Shalimar's extension meant navigating a tension: how do you honour a heritage that was both the source and the subject of someone else's artistic vision?</SBody>
          <SBody light delay="d3" style={{ marginTop: "1.5rem" }}>The extension does not attempt to reclaim Shalimar — it attempts to complete it. To fill in the geography that Guerlain always gestured toward but never fully visited.</SBody>
        </div>
      </div>
    </section>
  );
}

// ─── NEXT PROJECT ──────────────────
function NextProject() {
  const [h, setH] = useState(false);
  return (
    <Link to="/works/loro-piana" aria-label="Next case study: Loro Piana"
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
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.6rem,3.5vw,3rem)", fontWeight: 300, color: C.cream, lineHeight: 1.05 }}>Loro Piana<br /><em style={{ fontStyle: "italic", color: C.amberSoft }}>Heritage Repositioning</em></div>
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

// ─── BACK TO TOP ──────────────────
function BackToTop() {
  const [show, setShow] = useState(false);
  const [h, setH] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}
      aria-label="Back to top"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        position: "fixed", bottom: "2rem", right: "2rem", zIndex: 200,
        width: 42, height: 42, borderRadius: "50%",
        background: h ? C.amber : C.ink,
        border: `1px solid ${h ? C.amber : "rgba(242,235,217,0.15)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        textDecoration: "none",
        opacity: show ? 1 : 0, pointerEvents: show ? "all" : "none",
        transition: "opacity 0.3s, background 0.2s, border-color 0.2s",
        cursor: "none"
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" aria-hidden="true">
        <path d="M8 12V4M4 7l4-4 4 4" />
      </svg>
    </button>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
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
        <Brief />
        <Heritage />
        <Origin />
        <Olfactory />
        <Reflection />
      </main>
      <NextProject />
      <footer style={{ background: C.ink, color: "rgba(242,235,217,0.25)", padding: "1.5rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(242,235,217,0.05)", fontSize: "0.62rem", letterSpacing: "0.1em" }}>
        <Link to="/#work" style={{ color: "rgba(242,235,217,0.4)", textDecoration: "none" }}>← Selected Works</Link>
        <span>Case Study 02 of 03</span>
        <a href="mailto:pranahitareddy1411@gmail.com" style={{ color: "rgba(242,235,217,0.4)", textDecoration: "none" }}>Contact</a>
      </footer>
      <BackToTop />
    </div>
  );
}
