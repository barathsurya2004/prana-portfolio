import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
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

// ─── GLOBAL STYLES (Scoped-ish) ──────────────────────────────────────────────
function LocalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

      /* ── Fade-up observer ── */
      .miu .fu {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 0.85s ease, transform 0.85s cubic-bezier(0.16,1,0.3,1);
      }
      .miu .fu.d1 { transition-delay: 0.08s; }
      .miu .fu.d2 { transition-delay: 0.16s; }
      .miu .fu.d3 { transition-delay: 0.24s; }
      .miu .fu.d4 { transition-delay: 0.32s; }
      .miu .fu.vis { opacity: 1; transform: none; }

      /* ── Animations ── */
      @keyframes lspin  { to { transform: rotate(360deg); } }
      @keyframes lup    { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
      @keyframes lbar   { to { transform: scaleX(1); } }
      @keyframes rot    { to { transform: translateY(-50%) rotate(360deg); } }
      @keyframes fadeOut { to { opacity:0; transform:translateY(-8px); pointer-events:none; } }

      /* ── Visual image hover ── */
      .miu .visual-img-wrap { overflow: hidden; }
      .miu .visual-img-wrap img { width:100%; display:block; object-fit:cover; transition: transform 0.7s cubic-bezier(0.16,1,0.3,1); }
      .miu .visual-img-wrap:hover img { transform: scale(1.025); }

      /* ── Next project hover ── */
      .miu .next-proj-wrap:hover .np-arrow-inner { border-color: ${C.terra}; background: ${C.terra}; transform: rotate(-45deg); }
      .miu .next-proj-wrap:hover .np-arrow-inner svg { stroke: white; }
      .miu .next-proj-wrap:hover { background: #1a1a1a; }

      @media (prefers-reduced-motion: reduce) {
        .miu .fu { opacity: 1 !important; transform: none !important; }
      }

      @media (max-width: 900px) { .miu .two-col { grid-template-columns: 1fr !important; gap: 3rem !important; } }
      @media (max-width: 700px) { .miu .three-col { grid-template-columns: 1fr 1fr !important; } .miu .card-grid-inner { grid-template-columns: 1fr !important; } }
      @media (max-width: 700px) { .miu .stat-cols-4 { grid-template-columns: 1fr 1fr !important; } }
      @media (max-width: 768px) { .miu .hero-footer-grid { grid-template-columns: 1fr 1fr !important; } .miu .proj-title { font-size: clamp(2.8rem,10vw,5rem) !important; } }
    `}</style>
  );
}

// ─── FADE OBSERVER HOOK ───────────────────────────────────────────────────────
function useFadeObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("vis"); io.unobserve(e.target); } }),
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
    const t = setTimeout(() => {
      setFading(true);
      setTimeout(() => setGone(true), 900);
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 10000,
      background: C.ink,
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
        position: "relative", zIndex: 1,
        animation: "lup 0.9s cubic-bezier(0.16,1,0.3,1) both",
      }} aria-hidden="true">Miu Miu</p>
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
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav id="mainNav" aria-label="Page navigation" style={{
      position: "fixed", top: 0, width: "100%", zIndex: 100,
      padding: "1.4rem 2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(242,235,217,0.90)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(13,13,13,0.07)" : "none",
      transition: "background 0.4s,backdrop-filter 0.4s",
    }}>
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.ink, textDecoration: "none", transition: "color 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.color = C.terra} onMouseLeave={e => e.currentTarget.style.color = C.ink}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M11 7H3M6 4L3 7l3 3" /></svg>
        Selected Works
      </Link>
      <Link to="/" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.1rem", fontWeight: 400, letterSpacing: "0.05em", color: C.ink, textDecoration: "none" }}>P·R</Link>
      <span style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.sage }}>01 / 03</span>
    </nav>
  );
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
      height: "100svh",
      minHeight: 0,
      background: C.ink,
      display: "grid",
      gridTemplateRows: "1fr auto",
      padding: "0 2.5rem",
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
    }}>
      {/* Background lines */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {[16.66, 33.33, 50, 66.66, 83.33].map((pct, i) => (
          <span key={i} style={{ position: "absolute", top: 0, bottom: 0, width: 1, left: `${pct}%`, background: i === 2 ? "rgba(196,98,58,0.07)" : "rgba(242,235,217,0.04)" }} />
        ))}
      </div>

      {/* Decorative circle */}
      <div aria-hidden="true" style={{
        position: "absolute", right: "-8%", top: "50%", transform: "translateY(-50%)",
        width: "clamp(320px,45vw,680px)", height: "clamp(320px,45vw,680px)",
        borderRadius: "50%", border: "1px solid rgba(196,98,58,0.12)",
        animation: "rot 90s linear infinite", pointerEvents: "none",
      }} />

      {/* Main content */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "2rem", paddingTop: "7rem", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", ...fade(0) }}>
          <div style={{ width: 40, height: 1, background: C.terra }} aria-hidden="true" />
          <span style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(242,235,217,0.45)" }}>
            Case Study 01 · SCAD Brand Strategy Studio · 2026
          </span>
        </div>

        <h1 id="heroTitle" className="proj-title" style={{
          fontFamily: '"Cormorant Garamond",serif',
          fontSize: "clamp(2.8rem,7.5vw,7.5rem)",
          fontWeight: 300, lineHeight: 0.9, letterSpacing: "-0.025em", color: C.cream,
          ...fade(0.08),
        }}>
          Miu Miu<br />
          <em style={{ fontStyle: "italic", color: C.terra }}>Experiential</em><br />
          Retail &amp; App
        </h1>

        <p style={{
          fontFamily: '"Cormorant Garamond",serif',
          fontSize: "clamp(1rem,1.8vw,1.4rem)", fontWeight: 300, fontStyle: "italic",
          color: "rgba(242,235,217,0.55)", marginTop: "1.25rem", maxWidth: "52ch", lineHeight: 1.5,
          ...fade(0.16),
        }}>
          A phygital brand strategy that translates Miu Miu's intellectually subversive identity into a retail environment and companion app — without dissolving the productive disorientation that makes the brand magnetic.
        </p>
      </div>

      {/* Footer bar */}
      <div className="hero-footer-grid" style={{
        display: "grid", gridTemplateColumns: "repeat(4,1fr)",
        gap: "1.5rem", padding: "1.25rem 0",
        borderTop: "1px solid rgba(242,235,217,0.08)",
        position: "relative", zIndex: 1,
        ...fade(0.24),
      }}>
        {[
          ["Brand", "Miu Miu / Prada Group"],
          ["Discipline", "Retail Strategy · UX Concept"],
          ["Context", "SCAD · 2026"],
          ["Role", "Brand Strategist & Concept Designer"],
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

// ─── REUSABLE COMPONENTS ──────────────────────────────────────────────────────
function SLabel({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) {
  return (
    <div className="fu" style={{
      fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase",
      color: C.terra, display: "flex", alignItems: "center", gap: "0.75rem",
      marginBottom: "1rem", ...style,
    }}>
      {children}
      <span style={{ flex: 1, height: 1, background: "rgba(196,98,58,0.25)", maxWidth: 80 }} />
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
      color: light ? "rgba(242,235,217,0.65)" : C.inkMid,
      ...style,
    }}>{children}</p>
  );
}

function PullQuote({ children, light }: { children: React.ReactNode, light?: boolean }) {
  return (
    <blockquote className="fu d3" style={{
      fontFamily: '"Cormorant Garamond",serif',
      fontSize: "clamp(1.4rem,2.8vw,2.2rem)", fontWeight: 300, fontStyle: "italic",
      lineHeight: 1.4, borderLeft: `2px solid ${C.terra}`, paddingLeft: "1.5rem",
      margin: "2.5rem 0", color: light ? C.cream : C.ink,
    }}>{children}</blockquote>
  );
}

function StatRow({ stats, cols = 4, bg = C.cream }: { stats: [string, string][], cols?: number, bg?: string }) {
  return (
    <div className={`fu stat-cols-${cols}`} style={{
      display: "grid", gridTemplateColumns: `repeat(${cols},1fr)`,
      gap: 1, background: "rgba(13,13,13,0.09)", border: "1px solid rgba(13,13,13,0.09)",
    }}>
      {stats.map(([val, label]) => (
        <div key={label} style={{ padding: "1.75rem 1.5rem", background: bg }}>
          <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "2.8rem", fontWeight: 300, color: C.terra, lineHeight: 1 }}>{val}</div>
          <div style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.sage, marginTop: "0.3rem" }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

function Visual({ src, alt, caption, lightCaption }: { src: string, alt: string, caption?: string, lightCaption?: boolean }) {
  return (
    <div className="fu" style={{ margin: "2rem 0" }}>
      <div className="visual-img-wrap">
        <img src={src} alt={alt} loading="lazy" style={{ width: "100%", display: "block", objectFit: "cover" }} />
      </div>
      {caption && <p style={{ fontSize: "0.68rem", color: lightCaption ? "rgba(242,235,217,0.35)" : C.sage, marginTop: "0.65rem", fontStyle: "italic", letterSpacing: "0.04em" }}>{caption}</p>}
    </div>
  );
}

function Steps({ items, light }: { items: { num: string, head: string, body: string }[], light?: boolean }) {
  return (
    <div className="fu d3" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {items.map(({ num, head, body }) => (
        <div key={num} style={{ display: "grid", gridTemplateColumns: "3rem 1fr", gap: "1.25rem", alignItems: "start" }}>
          <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", border: "1px solid rgba(196,98,58,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: '"Cormorant Garamond",serif', fontSize: "1.1rem", color: C.terra }}>{num}</div>
          <div>
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.1rem", fontWeight: 400, color: light ? C.cream : C.ink, marginBottom: "0.3rem" }}>{head}</div>
            <p style={{ fontSize: "0.84rem", color: light ? "rgba(242,235,217,0.6)" : C.inkMid, lineHeight: 1.75 }}>{body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── STATS SECTION ────────────────────────────────────────────────────────────
function Stats() {
  return (
    <div style={{ padding: "4rem 2.5rem", background: C.cream }}>
      <StatRow stats={[["Phygital", "Core Approach"], ["2", "Touchpoints Designed"], ["Gen Z + α", "Primary Audience"], ["4", "Strategic Pillars"]]} cols={4} bg={C.cream} />
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
          <SHeading id="briefHead">What was<br />actually asked.</SHeading>
        </div>
        <div>
          <SBody delay="d2">
            Miu Miu has always been Miuccia Prada's laboratory — more cerebral, more subversive, and more willing to unsettle than its elder sibling. The challenge was to design a retail experience and digital companion that didn't <em style={{ color: C.ink, fontStyle: "italic" }}>flatten that complexity into a pretty store</em>, but instead activated it as the central drama of the consumer encounter.
          </SBody>
          <PullQuote>"The store should feel like entering someone's very particular mind — not a showroom."</PullQuote>
          <SBody delay="d4">
            The brief demanded a response that was simultaneously strategic and experiential — not a rebrand, not a campaign, but a <em style={{ color: C.ink, fontStyle: "italic" }}>reinvention of presence</em>: what does it feel like to be inside Miu Miu's world?
          </SBody>
        </div>
      </div>
    </section>
  );
}

// ─── BRAND DIAGNOSIS ─────────────────────────────────────────────────────────
function BrandDiagnosis() {
  const cards = [
    { num: "A", title: "The Campaign Miu Miu", body: "Cinematic. Literary. Provocative. Directors like Luca Guadagnino and Chloé Zhao. Talent chosen for intellectual weight. Every image a micro-essay on femininity, power, and desire." },
    { num: "B", title: "The Retail Miu Miu", body: "Cool lighting. Marble. Product by category. Immaculate but inert. Beautiful in a language shared by every luxury brand — erasing Miu Miu's constitutive difference." },
    { num: "C", title: "The Opportunity", body: "The space between A and B is the project. The store should be as surprising as the advertising — a physical space that rewards intellect, not just taste." },
  ];

  return (
    <section style={{ padding: "7rem 2.5rem", background: C.cream }} aria-labelledby="diagHead">
      <SLabel>Brand Diagnosis</SLabel>
      <SHeading id="diagHead">The gap<br />that needed closing.</SHeading>
      <Visual src="https://placehold.co/1200x480/E8DFC8/C4623A?text=Brand+Positioning+Analysis" alt="Miu Miu brand positioning gap analysis" caption="Brand audit — mapping the distance between Miu Miu's campaign language and its physical retail execution" />
      <div className="card-grid-inner" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(13,13,13,0.09)", marginTop: "3rem" }}>
        {cards.map(({ num, title, body }) => (
          <CardBlock key={num} num={num} title={title} body={body} />
        ))}
      </div>
    </section>
  );
}

function CardBlock({ num, title, body }: { num: string, title: string, body: string }) {
  const [h, setH] = useState(false);
  return (
    <div className="fu" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: h ? C.creamDark : C.mist, padding: "2rem 1.75rem", transition: "background 0.25s" }}>
      <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "2.5rem", fontWeight: 300, color: "rgba(13,13,13,0.08)", lineHeight: 1, marginBottom: "0.75rem" }}>{num}</div>
      <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.15rem", fontWeight: 400, color: C.ink, marginBottom: "0.5rem" }}>{title}</div>
      <p style={{ fontSize: "0.82rem", color: C.inkMid, lineHeight: 1.7 }}>{body}</p>
    </div>
  );
}

// ─── CONSUMER INSIGHT ────────────────────────────────────────────────────────
function ConsumerInsight() {
  const profiles = [
    { num: "I", head: "The Intellectual Collector", body: "Buys for meaning, not function. Sees the piece as an argument about culture. Reads the show notes before purchasing. Wants the store to give her something to decode." },
    { num: "II", head: "The Cultural Newcomer", body: "Younger, discovering Miu Miu through campaign films and editorial placement. Drawn to the brand's aesthetic but hasn't yet built the reference bank. Needs entry points that feel earned, not condescending." },
    { num: "III", head: "The Loyal Ritualist", body: "Has been buying Miu Miu for a decade. Values the store as a place of belonging — wants the experience to deepen, not just refresh." },
  ];

  return (
    <section style={{ padding: "7rem 2.5rem", background: C.ink, color: C.cream }} aria-labelledby="consumerHead">
      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
        <div>
          <SLabel>Consumer Insight</SLabel>
          <SHeading id="consumerHead" light>She doesn't<br />want to be sold to.</SHeading>
          <Visual src="https://placehold.co/500x380/1A1A1A/C4623A?text=Consumer+Archetype" alt="Miu Miu consumer archetype portrait" caption="Consumer archetype — the intellectually engaged, culturally fluent Miu Miu customer" lightCaption />
        </div>
        <div>
          <SBody light delay="d1" style={{ marginTop: 0 }}>
            The Miu Miu customer does not want to be sold to. She wants to <em style={{ color: C.cream, fontStyle: "italic" }}>discover</em>. She reads. She references. She is drawn to things that resist easy categorisation and reward sustained attention.
          </SBody>
          <SBody light delay="d2" style={{ marginTop: "1.5rem" }}>
            Research identified three overlapping consumer profiles within the Miu Miu orbit:
          </SBody>
          <Steps items={profiles} light />
        </div>
      </div>
    </section>
  );
}

// ─── STRATEGY ─────────────────────────────────────────────────────────────────
function Strategy() {
  const pillars = [
    { num: "1", head: "Narrative Zoning", body: "The retail floor is organised by emotional and thematic worlds drawn directly from the season's campaign references — not by product category (bags, RTW, shoes). A customer navigates a story, not a store. Each zone has a distinct sensory atmosphere: light temperature, sound palette, scent layer." },
    { num: "2", head: "The Companion App", body: "A minimal, intentionally low-friction app that acts as a literary guide. It unlocks deeper narrative context per zone — film clips, archival images, designer notes, critical essays — without gamifying the experience or reducing it to loyalty points. Think audio guide, not loyalty card." },
    { num: "3", head: "The Dwell Layer", body: "Deliberately designed slow zones — reading nooks, textile viewing tables, film screening alcoves — that reward presence over transaction. Extended dwell time deepens emotional attachment and is directly correlated with increased average basket value in luxury retail research." },
    { num: "4", head: "Post-Visit Continuity", body: "The app retains a 'memory' of which narrative zones the customer visited, curating subsequent digital content and product suggestions rooted in her in-store journey — not a generic recommendation algorithm. The store visit becomes the first chapter of an ongoing conversation." },
  ];

  return (
    <section style={{ padding: "7rem 2.5rem", background: C.creamDark }} aria-labelledby="stratHead">
      <SLabel>Strategic Framework</SLabel>
      <SHeading id="stratHead">Four pillars.<br />One world.</SHeading>
      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start", marginTop: "3.5rem" }}>
        <Steps items={pillars} />
        <div>
          <Visual src="https://placehold.co/560x400/E8DFC8/C4623A?text=Retail+Floor+Zoning" alt="Narrative zone layout concept for Miu Miu flagship" caption="Narrative zone concept — thematic territories replace traditional product categories on the retail floor" />
          <Visual src="https://placehold.co/560x300/0D0D0D/B8965A?text=App+Wireframe+Concept" alt="Miu Miu companion app wireframe concept" caption="App interface concept — zone discovery, archival content unlocking, narrative memory layer" />
        </div>
      </div>
    </section>
  );
}

// ─── INSIGHT BAND ────────────────────────────────────────────────────────────
function InsightBand() {
  return (
    <div className="fu" aria-label="Strategic insight" style={{
      background: C.ink, padding: "3.5rem 2.5rem",
      margin: "0", position: "relative", overflow: "hidden",
    }}>
      <div aria-hidden="true" style={{ position: "absolute", right: -30, top: "50%", transform: "translateY(-50%)", width: 220, height: 220, borderRadius: "50%", border: "1px solid rgba(196,98,58,0.1)", pointerEvents: "none" }} />
      <div style={{ fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.terra, marginBottom: "0.75rem" }}>Core Strategic Thesis</div>
      <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.25rem,2.5vw,1.9rem)", fontWeight: 300, fontStyle: "italic", color: C.cream, lineHeight: 1.45, maxWidth: "58ch", position: "relative", zIndex: 1 }}>
        "For a brand built on intellectual subversion, the greatest risk is a retail experience that is merely beautiful. Beauty without friction erases Miu Miu's identity. The store must create productive disorientation — and then resolve it into desire."
      </p>
    </div>
  );
}

// ─── EXECUTION ────────────────────────────────────────────────────────────────
function Execution() {
  const physical = [
    { num: "→", head: "Zone Entry Moments", body: "Each narrative zone is entered through a threshold moment — a change in floor material, a shift in ceiling height, a single archival image at eye level. The transition is felt before it is understood." },
    { num: "→", head: "Product Placement Logic", body: "Products are placed by narrative relevance to the zone theme, not by category. A bag may sit beside a book beside a piece of RTW — curated as a character would dress, not as a warehouse would sort." },
    { num: "→", head: "Staff as Dramaturgists", body: "Sales associates are briefed not only on product specifications but on the campaign references and cultural touchpoints of each zone. They can speak to the world, not just the item." },
  ];
  const digital = [
    { num: "→", head: "Seamless Activation", body: "The app activates automatically via Bluetooth Low Energy when entering a zone — no QR scanning, no manual selection. The content appears as naturally as walking into a room." },
    { num: "→", head: "Content Architecture", body: "Three layers per zone: the Surface (campaign images, product names), the Middle (director's notes, fabric sourcing stories), the Deep (critical essays, archival footage). The customer decides how far she goes." },
    { num: "→", head: "The Memory System", body: "Post-visit, the app generates a personalised 'reading list' — articles, films, and Miu Miu editorials related to the zones she explored. The store visit continues as a cultural experience long after she leaves." },
  ];

  return (
    <section style={{ padding: "7rem 2.5rem", background: C.mist }} aria-labelledby="execHead">
      <SLabel>Execution Details</SLabel>
      <SHeading id="execHead">How it<br />would actually work.</SHeading>
      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start", marginTop: "3rem" }}>
        <div>
          <SLabel style={{ marginTop: 0 }}>Physical Retail</SLabel>
          <Steps items={physical} />
        </div>
        <div>
          <SLabel style={{ marginTop: 0 }}>Digital (App)</SLabel>
          <Steps items={digital} />
        </div>
      </div>
    </section>
  );
}

// ─── OUTCOMES ─────────────────────────────────────────────────────────────────
function Outcomes() {
  const pills = [
    "Extended dwell time via slow-retail zoning",
    "Deeper brand recall through narrative immersion",
    "App-driven post-visit personalisation loop",
    "Reduced generic staff dependency via app-guided discovery",
    "Phygital brand consistency — physical and digital speaking the same language",
    "New consumer entry points without diluting brand complexity",
  ];
  const tools = ["Brand Audit", "Consumer Journey Mapping", "Competitive Benchmarking", "Retail Zoning Strategy", "Adobe XD — App Wireframes", "Mood Boarding", "Sensory Design Framework", "Audience Segmentation"];

  return (
    <section style={{ padding: "7rem 2.5rem", background: C.cream }} aria-labelledby="outcomeHead">
      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
        <div>
          <SLabel>Proposed Outcomes</SLabel>
          <SHeading id="outcomeHead">What success<br />looks like.</SHeading>
          <div className="fu d2" style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem", marginTop: "1.5rem" }}>
            {pills.map((p) => (
              <div key={p} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.45rem 1rem", border: "1px solid rgba(13,13,13,0.1)", fontSize: "0.78rem", color: C.inkMid, background: "rgba(242,235,217,0.5)" }}>
                <span style={{ width: 4, height: 4, background: C.terra, borderRadius: "50%", flexShrink: 0 }} />
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
          <Visual src="https://placehold.co/560x340/EAE3D3/6B7C6E?text=Process+Documentation" alt="Strategic process documentation and mood board" caption="Process — brand audit documentation, consumer journey mapping, zone mood boarding" />
        </div>
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
        borderTop: `1px solid rgba(242,235,217,0.06)`,
        transition: "background 0.3s",
      }}>
      <div>
        <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(242,235,217,0.3)", marginBottom: "0.5rem" }}>Next Case Study</div>
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.6rem,3.5vw,3rem)", fontWeight: 300, color: C.cream, lineHeight: 1.05 }}>Guerlain "Shalimar"<br />Campaign Relaunch</div>
      </div>
      <div className="np-arrow-inner" style={{
        width: 56, height: 56, borderRadius: "50%",
        border: `1px solid ${h ? C.terra : "rgba(242,235,217,0.15)"}`,
        background: h ? C.terra : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        transform: h ? "rotate(-45deg)" : "none",
        transition: "border-color 0.2s,background 0.2s,transform 0.3s",
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
        onMouseEnter={e => e.currentTarget.style.color = C.terra} onMouseLeave={e => e.currentTarget.style.color = "rgba(242,235,217,0.4)"}>
        ← Selected Works
      </Link>
      <span style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: "italic", fontSize: "0.8rem", color: "rgba(242,235,217,0.15)" }}>Case Study 01 of 03</span>
      <a href="mailto:pranahitareddy1411@gmail.com" style={{ color: "rgba(242,235,217,0.4)", textDecoration: "none" }}
        onMouseEnter={e => e.currentTarget.style.color = C.terra} onMouseLeave={e => e.currentTarget.style.color = "rgba(242,235,217,0.4)"}>
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
        background: h ? C.terra : C.ink,
        border: `1px solid ${h ? C.terra : "rgba(242,235,217,0.15)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        textDecoration: "none",
        opacity: show ? 1 : 0, pointerEvents: show ? "all" : "none",
        transition: "opacity 0.3s,background 0.2s,border-color 0.2s",
        cursor: "none"
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" aria-hidden="true">
        <path d="M8 12V4M4 7l4-4 4 4" />
      </svg>
    </button>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
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
        <Brief />
        <BrandDiagnosis />
        <ConsumerInsight />
        <Strategy />
        <InsightBand />
        <Execution />
        <Outcomes />
      </main>
      <NextProject />
      <Footer />
      <BackToTop />
    </div>
  );
}
