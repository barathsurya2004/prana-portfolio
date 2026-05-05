import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  cream: "#F2EBD9",
  creamDark: "#E8DFC8",
  mist: "#EAE3D3",
  ink: "#0D0D0D",
  inkMid: "#2A2A2A",
  terra: "#C4623A",
  gold: "#B8965A",
  goldSoft: "rgba(184,150,90,0.12)",
  sage: "#6B7C6E",
  stone: "#D6CDB8",
};

// ─── LOCAL STYLES ────────────────────────────────────────────────────────────
function LocalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

      .lp .fu {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 0.85s ease, transform 0.85s cubic-bezier(0.16,1,0.3,1);
      }
      .lp .fu.d1 { transition-delay: 0.08s; }
      .lp .fu.d2 { transition-delay: 0.16s; }
      .lp .fu.d3 { transition-delay: 0.24s; }
      .lp .fu.d4 { transition-delay: 0.32s; }
      .lp .fu.vis { opacity: 1; transform: none; }

      @keyframes lspin { to { transform: rotate(360deg); } }
      @keyframes lup   { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
      @keyframes lbar  { to { transform: scaleX(1); } }
      @keyframes rot   { to { transform: translateY(-50%) rotate(360deg); } }
      @keyframes rotCW { to { transform: translateY(-50%) rotate(-360deg); } }
      @keyframes threadPulse { 0%,100%{opacity:0.04} 50%{opacity:0.09} }

      .lp .visual-img-wrap { overflow: hidden; }
      .lp .visual-img-wrap img { width:100%; display:block; object-fit:cover; transition: transform 0.7s cubic-bezier(0.16,1,0.3,1); filter: sepia(10%) contrast(1.04); }
      .lp .visual-img-wrap:hover img { transform: scale(1.025); }

      .lp .next-proj-wrap:hover .np-arrow-inner { border-color: ${C.gold}; background: ${C.gold}; transform: rotate(-45deg); }
      .lp .next-proj-wrap:hover .np-arrow-inner svg { stroke: white; }
      .lp .next-proj-wrap:hover { background: #1a1a1a; }

      .lp .fiber-line { animation: threadPulse 4s ease-in-out infinite; }
      .lp .fiber-line:nth-child(2) { animation-delay: 0.6s; }
      .lp .fiber-line:nth-child(3) { animation-delay: 1.2s; }
      .lp .fiber-line:nth-child(4) { animation-delay: 1.8s; }
      .lp .fiber-line:nth-child(5) { animation-delay: 2.4s; }

      @media (max-width: 768px) {
        .lp section, .lp header { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
        .lp .hero-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 1rem !important; }
        .lp .comp-row-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
      }

      @media (prefers-reduced-motion: reduce) {
        .lp .fu { opacity: 1 !important; transform: none !important; }
      }
      @media (max-width: 900px) { .lp .two-col  { grid-template-columns: 1fr !important; gap: 3rem !important; } }
      @media (max-width: 700px) { .lp .three-col { grid-template-columns: 1fr !important; } .lp .stat-cols-4 { grid-template-columns: 1fr 1fr !important; } }
      @media (max-width: 768px) { .lp .proj-title { font-size: clamp(2.8rem,10vw,5rem) !important; } }
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
      <div style={{ position: "absolute", width: "clamp(180px,34vw,340px)", height: "clamp(180px,34vw,340px)", borderRadius: "50%", border: `1px solid rgba(184,150,90,0.18)`, animation: "lspin 18s linear infinite" }} aria-hidden="true" />
      <div style={{ position: "absolute", width: "clamp(120px,22vw,220px)", height: "clamp(120px,22vw,220px)", borderRadius: "50%", border: `1px solid rgba(184,150,90,0.1)`, animation: "rotCW 12s linear infinite" }} aria-hidden="true" />
      <p style={{
        fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.6rem,5vw,3.5rem)",
        fontWeight: 300, color: C.cream, letterSpacing: "0.08em", textAlign: "center",
        position: "relative", zIndex: 1, animation: "lup 0.9s cubic-bezier(0.16,1,0.3,1) both",
      }} aria-hidden="true">Loro Piana</p>
      <p style={{
        fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase",
        color: "rgba(242,235,217,0.35)", marginTop: "1rem", position: "relative", zIndex: 1,
        animation: "lup 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s both",
      }}>Case Study 03 · Pranahita Reddy</p>
      <div style={{
        width: "clamp(100px,20vw,200px)", height: 1, background: "rgba(242,235,217,0.1)",
        marginTop: "2rem", position: "relative", zIndex: 1, overflow: "hidden",
      }} aria-hidden="true">
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(90deg, ${C.gold}, ${C.terra})`,
          transform: "scaleX(0)", transformOrigin: "left",
          animation: "lbar 1.6s cubic-bezier(0.4,0,0.2,1) 0.2s forwards",
        }} />
      </div>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav aria-label="Page navigation" style={{
      position: "fixed", top: 0, width: "100%", zIndex: 100,
      padding: "1.4rem 2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(242,235,217,0.90)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(13,13,13,0.07)" : "none",
      transition: "background 0.4s, backdrop-filter 0.4s",
    }}>
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.ink, textDecoration: "none", transition: "color 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.color = C.gold} onMouseLeave={e => e.currentTarget.style.color = C.ink}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M11 7H3M6 4L3 7l3 3" /></svg>
        Selected Works
      </Link>
      <Link to="/" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.1rem", fontWeight: 400, letterSpacing: "0.05em", color: C.ink, textDecoration: "none" }}>P·R</Link>
      <span style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.sage }}>03 / 03</span>
    </nav>
  );
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
      height: "100svh", minHeight: 0,
      background: C.ink,
      display: "grid", gridTemplateRows: "1fr auto",
      padding: "0 2.5rem",
      position: "relative", overflow: "hidden",
      boxSizing: "border-box",
    }}>
      {/* Vertical fiber / warp thread lines */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {[10, 22, 34, 50, 62, 74, 86].map((pct, i) => (
          <span key={i} className="fiber-line" style={{
            position: "absolute", top: 0, bottom: 0, width: 1, left: `${pct}%`,
            background: i === 3 ? `rgba(184,150,90,0.08)` : "rgba(242,235,217,0.04)",
          }} />
        ))}
      </div>

      {/* Concentric rings */}
      <div aria-hidden="true" style={{
        position: "absolute", right: "-6%", top: "50%", transform: "translateY(-50%)",
        width: "clamp(300px,42vw,640px)", height: "clamp(300px,42vw,640px)",
        borderRadius: "50%", border: "1px solid rgba(184,150,90,0.1)",
        animation: "rot 100s linear infinite", pointerEvents: "none",
      }}>
        <div style={{ position: "absolute", inset: 48, borderRadius: "50%", border: "1px solid rgba(184,150,90,0.06)" }} />
        <div style={{ position: "absolute", inset: 96, borderRadius: "50%", border: "1px solid rgba(196,98,58,0.05)" }} />
      </div>

      {/* Main content */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "2rem", paddingTop: "7rem", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", ...fade(0) }}>
          <div style={{ width: 40, height: 1, background: C.gold }} aria-hidden="true" />
          <span style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(242,235,217,0.45)" }}>
            Case Study 03 · SCAD Consumer Behaviour Module · 2026
          </span>
        </div>

        <h1 id="heroTitle" className="proj-title" style={{
          fontFamily: '"Cormorant Garamond",serif',
          fontSize: "clamp(2.8rem,7.5vw,7.5rem)",
          fontWeight: 300, lineHeight: 0.9, letterSpacing: "-0.025em", color: C.cream,
          ...fade(0.08),
        }}>
          Loro Piana<br />
          <em style={{ fontStyle: "italic", color: C.gold }}>Heritage</em><br />
          Repositioning
        </h1>

        <p style={{
          fontFamily: '"Cormorant Garamond",serif',
          fontSize: "clamp(1rem,1.8vw,1.4rem)", fontWeight: 300, fontStyle: "italic",
          color: "rgba(242,235,217,0.55)", marginTop: "1.25rem", maxWidth: "54ch", lineHeight: 1.5,
          ...fade(0.16),
        }}>
          A recalibrated brand narrative for one of luxury's most quietly powerful houses — preserving century-old material authority while opening new territory in the global values shift toward meaning over status.
        </p>
      </div>

      {/* Hero footer bar */}
      <div className="hero-footer-grid" style={{
        display: "grid", gridTemplateColumns: "repeat(4,1fr)",
        gap: "1.5rem", padding: "1.25rem 0",
        borderTop: "1px solid rgba(242,235,217,0.08)",
        position: "relative", zIndex: 1,
        ...fade(0.24),
      }}>
        {[
          ["Brand", "Loro Piana / LVMH"],
          ["Discipline", "Heritage Strategy · Consumer Insights"],
          ["Context", "SCAD · 2026"],
          ["Role", "Brand Strategist & Market Analyst"],
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

// ─── SHARED PRIMITIVES ────────────────────────────────────────────────────────
function SLabel({ children, light, style }: { children: React.ReactNode, light?: boolean, style?: React.CSSProperties }) {
  return (
    <div className="fu" style={{
      fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase",
      color: C.gold, display: "flex", alignItems: "center", gap: "0.75rem",
      marginBottom: "1rem", ...style,
    }}>
      {children}
      <span style={{ flex: 1, height: 1, background: light ? "rgba(184,150,90,0.25)" : "rgba(184,150,90,0.2)", maxWidth: 80 }} />
    </div>
  );
}

function SHeading({ id, children, light, delay = "d1" }: { id?: string, children: React.ReactNode, light?: boolean, delay?: string }) {
  return (
    <h2 id={id} className={`fu ${delay}`} style={{
      fontFamily: '"Cormorant Garamond",serif',
      fontSize: "clamp(2rem,4vw,3.8rem)", fontWeight: 300,
      lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: "0.5rem",
      color: light ? C.cream : C.ink,
    }}>{children}</h2>
  );
}

function SBody({ children, light, delay, style }: { children: React.ReactNode, light?: boolean, delay?: string, style?: React.CSSProperties }) {
  return (
    <p className={`fu ${delay || ""}`} style={{
      fontSize: "0.92rem", lineHeight: 1.85,
      color: light ? "rgba(242,235,217,0.65)" : C.inkMid, ...style,
    }}>{children}</p>
  );
}

function PullQuote({ children, light }: { children: React.ReactNode, light?: boolean }) {
  return (
    <blockquote className="fu d3" style={{
      fontFamily: '"Cormorant Garamond",serif',
      fontSize: "clamp(1.4rem,2.8vw,2.2rem)", fontWeight: 300, fontStyle: "italic",
      lineHeight: 1.4, borderLeft: `2px solid ${C.gold}`, paddingLeft: "1.5rem",
      margin: "2.5rem 0", color: light ? C.cream : C.ink,
    }}>{children}</blockquote>
  );
}

function Visual({ src, alt, caption, lightCaption, delay }: { src: string, alt: string, caption?: string, lightCaption?: boolean, delay?: string }) {
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

function Steps({ items, light }: { items: { num: string, head: string, body: string }[], light?: boolean }) {
  return (
    <div className="fu d3" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {items.map(({ num, head, body }) => (
        <div key={num} style={{ display: "grid", gridTemplateColumns: "3rem 1fr", gap: "1.25rem", alignItems: "start" }}>
          <div style={{
            width: "3rem", height: "3rem", borderRadius: "50%",
            border: `1px solid rgba(184,150,90,0.35)`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            fontFamily: '"Cormorant Garamond",serif', fontSize: "1.1rem", color: C.gold,
          }}>{num}</div>
          <div>
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.1rem", fontWeight: 400, color: light ? C.cream : C.ink, marginBottom: "0.3rem" }}>{head}</div>
            <p style={{ fontSize: "0.84rem", color: light ? "rgba(242,235,217,0.6)" : C.inkMid, lineHeight: 1.75 }}>{body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function StatRow({ stats, bg = C.cream, cols = 4 }: { stats: [string, string][], bg?: string, cols?: number }) {
  return (
    <div className={`fu stat-cols-${cols}`} style={{
      display: "grid", gridTemplateColumns: `repeat(${cols},1fr)`,
      gap: 1, background: "rgba(13,13,13,0.08)", border: "1px solid rgba(13,13,13,0.08)",
    }}>
      {stats.map(([val, label]) => (
        <div key={label} style={{ padding: "1.75rem 1.5rem", background: bg }}>
          <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "2.8rem", fontWeight: 300, color: C.gold, lineHeight: 1 }}>{val}</div>
          <div style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.sage, marginTop: "0.3rem" }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── STATS BAND ───────────────────────────────────────────────────────────────
function Stats() {
  return (
    <div style={{ padding: "4rem 2.5rem", background: C.cream }}>
      <StatRow
        stats={[["1924", "Founded in Quarona, Italy"], ["100+", "Years of Material Innovation"], ["Vicuña", "World's Rarest Luxury Fiber"], ["LVMH", "Acquired 2013"]]}
        cols={4} bg={C.cream}
      />
    </div>
  );
}

// ─── THE BRIEF ────────────────────────────────────────────────────────────────
function Brief() {
  return (
    <section style={{ padding: "7rem 2.5rem", background: C.mist }} aria-labelledby="briefHead">
      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
        <div>
          <SLabel>The Brief</SLabel>
          <SHeading id="briefHead">A brand that<br />speaks in whispers.</SHeading>
        </div>
        <div>
          <SBody delay="d2">
            Loro Piana occupies a singular position in global luxury — one built not on logo display or celebrity endorsement but on the quiet authority of material excellence. The brief asked a harder question than most repositioning exercises: <em style={{ color: C.ink, fontStyle: "italic" }}>how do you evolve a brand whose identity depends on its resistance to evolution?</em>
          </SBody>
          <PullQuote>"Loro Piana does not need to be discovered — it needs to be understood. The challenge is not visibility. It is legibility."</PullQuote>
          <SBody delay="d4">
            With LVMH's acquisition in 2013 and rising global competition in the ultra-luxury segment, the brand faced pressure from two directions simultaneously: maintaining its fiercely exclusive positioning while making itself relevant to a younger, values-driven consumer who had not grown up inside the Loro Piana world.
          </SBody>
        </div>
      </div>
    </section>
  );
}

// ─── BRAND AUDIT ─────────────────────────────────────────────────────────────
function BrandAudit() {
  const [hovered, setHovered] = useState<number | null>(null);
  const tensions = [
    { num: "01", title: "Exclusivity vs. Accessibility", body: "The brand's value derives from its scarcity logic — yet younger luxury consumers demand some form of cultural entry point. The old assumption that mystique alone sustains desire is fracturing." },
    { num: "02", title: "Heritage vs. Contemporaneity", body: "100 years of material authority is a profound asset. But heritage, when uncurated, calcifies into irrelevance. Loro Piana risks appearing to the next generation as a brand their parents wear." },
    { num: "03", title: "Quiet Luxury vs. Cultural Presence", body: "The quiet luxury trend amplified Loro Piana's visibility globally — but the brand had no strategic apparatus to capture that attention and convert it into enduring brand equity." },
  ];

  return (
    <section style={{ padding: "7rem 2.5rem", background: C.cream }} aria-labelledby="auditHead">
      <SLabel>Brand Audit</SLabel>
      <SHeading id="auditHead">Three structural<br />tensions.</SHeading>

      <Visual
        src="https://placehold.co/1200x460/E8DFC8/B8965A?text=Brand+Positioning+Audit"
        alt="Loro Piana brand positioning audit"
        caption="Competitive mapping — ultra-luxury positioning analysis against Hermès, Brunello Cucinelli, and emerging craft-forward brands"
        delay="d2"
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(13,13,13,0.08)", marginTop: "3rem" }} className="three-col">
        {tensions.map(({ num, title, body }, i) => {
          const h = hovered === i;
          return (
            <div key={num} className="fu" onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{ background: h ? C.creamDark : C.mist, padding: "2rem 1.75rem", transition: "background 0.25s" }}>
              <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "2.5rem", fontWeight: 300, color: `rgba(184,150,90,${h ? 0.22 : 0.1})`, lineHeight: 1, marginBottom: "0.75rem", transition: "color 0.25s" }}>{num}</div>
              <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.15rem", fontWeight: 400, color: C.ink, marginBottom: "0.5rem" }}>{title}</div>
              <p style={{ fontSize: "0.82rem", color: C.inkMid, lineHeight: 1.7 }}>{body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── COMPETITIVE LANDSCAPE ────────────────────────────────────────────────────
function CompetitiveLandscape() {
  const competitors = [
    { name: "Hermès", pos: "Craft as myth — artisan scarcity weaponised at scale", gap: "Accessible mythology via the orange box. Loro Piana has no equivalent cultural symbol." },
    { name: "Brunello Cucinelli", pos: "Humanistic capitalism — craft meets ethical narrative", gap: "Younger consumers responding to Cucinelli's philosophy of dignity. LP has no comparable values expression." },
    { name: "The Row", pos: "Quiet luxury for the fashion-aware — anti-logo as statement", gap: "Cultural coolness Loro Piana doesn't own despite predating The Row's entire aesthetic thesis." },
    { name: "Zegna (Oasi Zegna)", pos: "Sustainability as luxury — place, ecology, material chain", gap: "LP controls the supply chain from fiber to shelf — but this story is almost entirely untold." },
  ];

  return (
    <section style={{ padding: "7rem 2.5rem", background: C.ink, color: C.cream }} aria-labelledby="compHead">
      <SLabel light>Competitive Landscape</SLabel>
      <SHeading id="compHead" light>Where rivals<br />moved. Where LP didn't.</SHeading>

      <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", gap: 1, background: "rgba(242,235,217,0.04)" }} className="fu d2">
        {competitors.map(({ name, pos, gap }) => (
          <CompetitorRow key={name} name={name} pos={pos} gap={gap} />
        ))}
      </div>

      <PullQuote light>
        "Loro Piana is the best-kept secret in luxury — which is precisely the problem. Secrets, by definition, cannot build the next generation of devotees."
      </PullQuote>
    </section>
  );
}

function CompetitorRow({ name, pos, gap }: { name: string, pos: string, gap: string }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      className="comp-row-grid"
      style={{
        display: "grid", gridTemplateColumns: "14rem 1fr 1fr", gap: "2rem", padding: "1.75rem 1.5rem",
        background: h ? "rgba(184,150,90,0.06)" : "rgba(242,235,217,0.03)",
        borderBottom: "1px solid rgba(242,235,217,0.06)",
        transition: "background 0.25s", alignItems: "start",
      }}>
      <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.1rem", fontWeight: 400, color: h ? C.gold : C.cream, transition: "color 0.2s" }}>{name}</div>
      <div style={{ fontSize: "0.82rem", color: "rgba(242,235,217,0.55)", lineHeight: 1.7 }}><span style={{ fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.sage, display: "block", marginBottom: "0.3rem" }}>Positioning</span>{pos}</div>
      <div style={{ fontSize: "0.82rem", color: "rgba(242,235,217,0.55)", lineHeight: 1.7 }}><span style={{ fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.terra, display: "block", marginBottom: "0.3rem" }}>The Gap for LP</span>{gap}</div>
    </div>
  );
}

// ─── CONSUMER INSIGHT ────────────────────────────────────────────────────────
function ConsumerInsight() {
  const profiles = [
    { num: "I", head: "The Material Devotee", body: "Typically 45+, established wealth. Buys Loro Piana because they have learned to feel the difference. Loyal but aging. The brand must earn their children without losing them." },
    { num: "II", head: "The Values-Led New Luxury Consumer", body: "30–44, professionally successful, increasingly hostile to logo-display. Gravitates toward craft, provenance, and environmental integrity. The brand LP is for — but who doesn't know it yet." },
    { num: "III", head: "The Culturally Curious Aspirant", body: "Urban, globally mobile, late 20s. Discovered quiet luxury through fashion editorial and TikTok. Knows Loro Piana as an aesthetic reference, not a lived relationship. The conversion opportunity." },
  ];

  return (
    <section style={{ padding: "7rem 2.5rem", background: C.creamDark }} aria-labelledby="consumerHead">
      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
        <div>
          <SLabel>Consumer Insight</SLabel>
          <SHeading id="consumerHead">Three audiences.<br />One inheritance.</SHeading>
          <Visual
            src="https://placehold.co/520x400/E8DFC8/B8965A?text=Consumer+Archetype+Map"
            alt="Loro Piana consumer archetype mapping"
            caption="Consumer spectrum — from the material devotee to the culturally curious aspirant"
            delay="d2"
          />
        </div>
        <div>
          <SBody delay="d1" style={{ marginTop: 0 }}>
            Loro Piana's consumer base is undergoing a generational transition that the brand has not yet explicitly addressed. Three distinct cohorts exist simultaneously — each requiring a different mode of engagement while sharing a common underlying desire: <em style={{ color: C.ink, fontStyle: "italic" }}>things that are genuinely, irreducibly excellent.</em>
          </SBody>
          <SBody delay="d2" style={{ marginTop: "1.5rem" }}>
            The strategic challenge is to speak to all three without flattening the brand into something that satisfies none of them.
          </SBody>
          <Steps items={profiles} />
        </div>
      </div>
    </section>
  );
}

// ─── STRATEGIC FRAMEWORK ──────────────────────────────────────────────────────
function Strategy() {
  const pillars = [
    {
      num: "1", head: "Make the Supply Chain the Story",
      body: "Loro Piana controls one of the most extraordinary material journeys in all of luxury — vicuña fiber sourced from the Andes at 4,500m altitude, lotus flower thread from Myanmar, baby cashmere from newborn Hircus goats. This is not supply chain management. It is an ongoing act of material devotion. The repositioning anchors the brand's identity in this provenance narrative — not as a sustainability claim, but as evidence of an obsessive relationship with raw material that no competitor can replicate.",
    },
    {
      num: "2", head: "Translate Craft into Cultural Capital",
      body: "The brand's century of expertise must be made legible to consumers who did not inherit the knowledge framework to receive it. This means producing cultural content — essays, documentary, editorial — that contextualises the LP material world within broader conversations about slowness, permanence, and ecological care. Not advertising. Documentation.",
    },
    {
      num: "3", head: "Architect a Generational Gateway",
      body: "A carefully conceived entry-tier product strategy that opens a relationship with younger consumers without triggering the luxury paradox of perceived accessibility. The gateway is not a cheaper bag — it is a considered object that carries the full weight of LP's craft language at a more accessible price point. This is how Hermès uses small leather goods.",
    },
    {
      num: "4", head: "Silence as a Brand Signal",
      body: "Loro Piana's instinct toward silence is not a weakness — it is its most differentiating asset in an environment of permanent brand noise. The repositioning reframes reticence as philosophy: the brand does not explain itself because the work speaks. All communication is designed to feel like restraint, not absence.",
    },
  ];

  return (
    <section style={{ padding: "7rem 2.5rem", background: C.mist }} aria-labelledby="stratHead">
      <SLabel>Strategic Framework</SLabel>
      <SHeading id="stratHead">Four moves.<br />One unbroken thread.</SHeading>

      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start", marginTop: "3.5rem" }}>
        <Steps items={pillars} />
        <div>
          <Visual
            src="https://placehold.co/560x420/D6CDB8/B8965A?text=Brand+Architecture+Map"
            alt="Loro Piana brand architecture repositioning map"
            caption="Brand architecture — repositioning framework mapping provenance, craft, and cultural legibility vectors"
            delay="d1"
          />
          <Visual
            src="https://placehold.co/560x300/0D0D0D/B8965A?text=Supply+Chain+Narrative"
            alt="Loro Piana supply chain storytelling concept"
            caption="Material provenance — the Andean vicuña to Quarona mill narrative as brand core"
            delay="d2"
          />
        </div>
      </div>
    </section>
  );
}

// ─── INSIGHT BAND ─────────────────────────────────────────────────────────────
function InsightBand() {
  return (
    <div className="fu" aria-label="Strategic insight" style={{
      background: C.ink, padding: "3.5rem 2.5rem",
      position: "relative", overflow: "hidden",
    }}>
      <div aria-hidden="true" style={{ position: "absolute", right: -30, top: "50%", transform: "translateY(-50%)", width: 240, height: 240, borderRadius: "50%", border: "1px solid rgba(184,150,90,0.08)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", right: 80, top: "50%", transform: "translateY(-50%)", width: 120, height: 120, borderRadius: "50%", border: "1px solid rgba(184,150,90,0.05)", pointerEvents: "none" }} />
      <div style={{ fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, marginBottom: "0.75rem" }}>Core Strategic Thesis</div>
      <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.25rem,2.5vw,1.9rem)", fontWeight: 300, fontStyle: "italic", color: C.cream, lineHeight: 1.45, maxWidth: "58ch", position: "relative", zIndex: 1 }}>
        "Loro Piana's greatest risk is not irrelevance — it is illegibility. The brand possesses everything a post-status luxury consumer desires, and has not yet found the language to say so. The repositioning is not a reinvention. It is a translation."
      </p>
    </div>
  );
}

// ─── COMMUNICATION STRATEGY ───────────────────────────────────────────────────
function CommunicationStrategy() {
  const channels = [
    { num: "→", head: "The Archive as Content", body: "A curated digital archive of Loro Piana's material research — fiber sourcing journals, mill documentation, weave technique studies — published as long-form editorial. Not a campaign. A library. Updated seasonally." },
    { num: "→", head: "Documentary Series", body: "Short-form documentary following a single LP material from source to shelf: the altitude at which vicuña is shorn, the hands that process it, the silence of the mill at night. No voiceover. No music. Presence." },
    { num: "→", head: "In-Store Material Education", body: "A reimagined store experience where the craft narrative is physically present: fiber samples under glass, looms as sculpture, staff trained as material historians rather than salespeople. The store as a place of slow knowledge." },
    { num: "→", head: "Selective Cultural Partnerships", body: "Limited, carefully chosen collaborations with institutions that share LP's commitment to material excellence — natural history museums, craft schools, textile conservation bodies. Not influencer partnerships. Institutional alignment." },
  ];

  return (
    <section style={{ padding: "7rem 2.5rem", background: C.cream }} aria-labelledby="commHead">
      <SLabel>Communication Strategy</SLabel>
      <SHeading id="commHead">How a silent brand<br />begins to speak.</SHeading>
      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start", marginTop: "3rem" }}>
        <Steps items={channels} />
        <div>
          <div className="fu d1" style={{ padding: "2.5rem", background: C.mist, borderLeft: `2px solid ${C.gold}` }}>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, marginBottom: "1rem" }}>Design Principle</div>
            <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.2rem", fontWeight: 300, fontStyle: "italic", color: C.ink, lineHeight: 1.5 }}>
              Every communication act should feel like the brand is reluctantly, barely, showing you something you probably would not have found otherwise — and trusting you to understand it.
            </p>
          </div>
          <Visual
            src="https://placehold.co/560x340/EAE3D3/6B7C6E?text=Editorial+Content+System"
            alt="LP editorial content architecture concept"
            caption="Content architecture — the archive, documentary, and institutional partnership system"
            delay="d2"
          />
        </div>
      </div>
    </section>
  );
}

// ─── OUTCOMES ─────────────────────────────────────────────────────────────────
function Outcomes() {
  const pills = [
    "Brand equity preserved — no repositioning visible to existing loyalists",
    "Cultural legibility built for values-driven new luxury consumers",
    "Generational gateway product strategy outlined",
    "Provenance narrative developed as primary brand differentiator",
    "Competitive whitespace identified against Cucinelli, Zegna, and The Row",
    "Communication system built on restraint, not silence",
    "TAM expanded without diluting ultra-luxury positioning",
  ];
  const tools = [
    "Brand Equity Audit", "Consumer Behaviour Analysis", "Competitive Benchmarking",
    "Luxury Positioning Framework", "Generational Segmentation", "Provenance Mapping",
    "Editorial Strategy", "Cultural Partnerships Model",
  ];

  return (
    <section style={{ padding: "7rem 2.5rem", background: C.creamDark }} aria-labelledby="outcomeHead">
      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
        <div>
          <SLabel>Proposed Outcomes</SLabel>
          <SHeading id="outcomeHead">What success<br />looks like.</SHeading>
          <SBody delay="d2" style={{ marginTop: "0.5rem" }}>
            The repositioning preserves everything that makes Loro Piana irreplaceable while building the strategic infrastructure needed to transmit that value to the next generation of devotees.
          </SBody>
          <div className="fu d3" style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem", marginTop: "1.75rem" }}>
            {pills.map((p) => (
              <div key={p} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.45rem 1rem", border: "1px solid rgba(13,13,13,0.1)", fontSize: "0.78rem", color: C.inkMid, background: "rgba(242,235,217,0.5)" }}>
                <span style={{ width: 4, height: 4, background: C.gold, borderRadius: "50%", flexShrink: 0 }} />
                {p}
              </div>
            ))}
          </div>
        </div>

        <div>
          <SLabel>Tools &amp; Methods</SLabel>
          <div className="fu d1" style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem", marginTop: "0.75rem" }}>
            {tools.map((t) => (
              <span key={t} style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.sage, border: "1px solid rgba(107,124,110,0.25)", padding: "0.2rem 0.6rem" }}>{t}</span>
            ))}
          </div>

          <div className="fu d2" style={{ marginTop: "2.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(13,13,13,0.08)" }}>
            {[["100+", "Years of provenance to activate"], ["3", "Untapped consumer cohorts"], ["0", "Competitors with equivalent material story"], ["∞", "Cultural runway for a brand built on permanence"]].map(([val, lbl]) => (
              <div key={lbl} style={{ padding: "1.5rem 1.25rem", background: C.cream }}>
                <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "2.2rem", fontWeight: 300, color: C.gold, lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.sage, marginTop: "0.3rem", lineHeight: 1.4 }}>{lbl}</div>
              </div>
            ))}
          </div>

          <Visual
            src="https://placehold.co/560x320/E8DFC8/B8965A?text=Process+Documentation"
            alt="Strategic process documentation"
            caption="Process — brand audit, consumer journey mapping, competitive landscape analysis"
            delay="d3"
          />
        </div>
      </div>
    </section>
  );
}

// ─── REFLECTION ──────────────────────────────────────────────────────────────
function Reflection() {
  return (
    <section style={{ padding: "7rem 2.5rem", background: C.ink, color: C.cream }} aria-labelledby="reflHead">
      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
        <div>
          <SLabel light>Strategic Reflection</SLabel>
          <SHeading id="reflHead" light>What this<br />project taught me.</SHeading>
        </div>
        <div>
          <SBody light delay="d2" style={{ marginTop: 0 }}>
            Loro Piana resists the usual toolbox of luxury repositioning. There is no brand story to rebuild — only a story that has never been told in the right language. Working on this case study required unlearning the reflex to add, and instead developing a practice of strategic subtraction: what is the minimum intervention that creates maximum legibility?
          </SBody>
          <SBody light delay="d3" style={{ marginTop: "1.5rem" }}>
            The deeper lesson was about the relationship between brand equity and brand communication. Loro Piana has extraordinary equity — built over a century of craft obsession — and almost no communication apparatus to convert that equity into cultural presence for new audiences. The gap between the two is not a failure of the brand. It is a strategic opportunity of rare size.
          </SBody>
          <div className="fu d4" style={{ marginTop: "2.5rem", padding: "1.75rem", border: "1px solid rgba(184,150,90,0.2)", background: "rgba(184,150,90,0.04)" }}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase", color: C.gold, marginBottom: "0.75rem" }}>Takeaway</div>
            <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.15rem", fontWeight: 300, fontStyle: "italic", color: C.cream, lineHeight: 1.5 }}>
              The most powerful brand strategies are not the ones that change what a brand is — they are the ones that change who can understand it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── NEXT PROJECT ──────────────────
function NextProject() {
  const [h, setH] = useState(false);
  return (
    <Link to="/" aria-label="Back to Selected Works"
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
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.6rem,3.5vw,3rem)", fontWeight: 300, color: C.cream, lineHeight: 1.05 }}>Selected Works<br /><em style={{ fontStyle: "italic", color: C.gold }}>Pranahita Reddy</em></div>
      </div>
      <div className="np-arrow-inner" style={{
        width: 56, height: 56, borderRadius: "50%",
        border: `1px solid ${h ? C.gold : "rgba(242,235,217,0.15)"}`,
        background: h ? C.gold : "transparent",
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
      <Link to="/" style={{ color: "rgba(242,235,217,0.4)", textDecoration: "none" }}
        onMouseEnter={e => e.currentTarget.style.color = C.gold} onMouseLeave={e => e.currentTarget.style.color = "rgba(242,235,217,0.4)"}>
        ← Selected Works
      </Link>
      <span style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: "italic", fontSize: "0.8rem", color: "rgba(242,235,217,0.15)" }}>Case Study 03 of 03</span>
      <a href="mailto:pranahitareddy1411@gmail.com" style={{ color: "rgba(242,235,217,0.4)", textDecoration: "none" }}
        onMouseEnter={e => e.currentTarget.style.color = C.gold} onMouseLeave={e => e.currentTarget.style.color = "rgba(242,235,217,0.4)"}>
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
    <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}
      aria-label="Back to top"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        position: "fixed", bottom: "2rem", right: "2rem", zIndex: 200,
        width: 42, height: 42, borderRadius: "50%",
        background: h ? C.gold : C.ink,
        border: `1px solid ${h ? C.gold : "rgba(242,235,217,0.15)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        textDecoration: "none",
        opacity: show ? 1 : 0, pointerEvents: show ? "all" : "none",
        transition: "opacity 0.3s, background 0.2s, border-color 0.2s",
        cursor: "none"
      }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" aria-hidden="true">
        <path d="M8 12V4M4 7l4-4 4 4" />
      </svg>
    </button>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
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
        <Brief />
        <BrandAudit />
        <CompetitiveLandscape />
        <ConsumerInsight />
        <Strategy />
        <InsightBand />
        <CommunicationStrategy />
        <Outcomes />
        <Reflection />
      </main>
      <NextProject />
      <Footer />
      <BackToTop />
    </div>
  );
}
