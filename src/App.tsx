import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation, Link, useNavigate } from "react-router-dom";
import type {
  WorkItem,
  WorkCardProps,
  CapabilityItem,
  CapabilityBlockProps,
  TimelineItem,
  TimelineItemProps,
  CertCardProps,
  SectionHeaderProps,
  NavLinkProps,
  OutlineBtnProps,
} from "./types";
import {
  colors,
  navLabels,
  navLinks,
} from "./types";
import CursorWrapper from "./components/CursorWrapper";
import WorkList from "./pages/WorkList";
import WorkDetail from "./pages/WorkDetail";
import MiuMiu from "./pages/MiuMiu";
import LoroPiana from "./pages/LoroPiana";
import Guerlain from "./pages/Guerlain";

// Module-level flag persisted for the lifetime of the SPA (resets on full page reload)
let appLoaderShown = false;

// ─── UTILS ────────────────────────────────────────────────────────────────────

// ... (omitting some lines for brevity in thought, but I will provide full strings in actual call)
function useFadeObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up-obs").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  };

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, width: "100%", zIndex: 100,
          padding: "1.5rem 2.5rem", display: "flex", justifyContent: "space-between",
          alignItems: "center",
          background: scrolled ? "rgba(242,235,217,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(13,13,13,0.08)" : "none",
          transition: "background 0.4s ease, backdrop-filter 0.4s",
        }}
        aria-label="Main navigation"
      >
        <button
          onClick={() => scrollTo("hero")}
          style={{
            fontFamily: '"Cormorant Garamond", serif', fontSize: "1.2rem",
            fontWeight: 400, letterSpacing: "0.05em", color: colors.ink,
            background: "none", border: "none", cursor: "none",
          }}
          aria-label="Pranahita Reddy — Home"
        >
          P·R
        </button>

        {/* Desktop Links */}
        <ul style={{ gap: "2.5rem", listStyle: "none" }} className="nav-desktop-links">
          {navLinks.map((id) => (
            <li key={id}>
              <NavLink onClick={() => scrollTo(id)}>{navLabels[id]}</NavLink>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          style={{ background: "none", border: "none", cursor: "none", flexDirection: "column", gap: 5, padding: 4 }}
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
          className="nav-hamburger"
        >
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              style={{
                display: "block", width: 24, height: 1, background: colors.ink,
                transition: "all 0.3s ease",
                transform: menuOpen
                  ? n === 1 ? "translateY(6px) rotate(45deg)" : n === 3 ? "translateY(-6px) rotate(-45deg)" : ""
                  : "none",
                opacity: menuOpen && n === 2 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 99, background: colors.cream,
            display: "flex", flexDirection: "column", justifyContent: "center",
            alignItems: "center", gap: "2.5rem",
          }}
        >
          {navLinks.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                fontFamily: '"Cormorant Garamond", serif', fontSize: "2.5rem",
                fontWeight: 300, color: colors.ink, background: "none", border: "none", cursor: "none",
              }}
            >
              {navLabels[id]}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function NavLink({ children, onClick }: NavLinkProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: "0.72rem", fontWeight: 400, letterSpacing: "0.2em",
        textTransform: "uppercase", color: hovered ? colors.terra : colors.ink,
        background: "none", border: "none", cursor: "none", position: "relative",
        transition: "color 0.2s",
      }}
    >
      {children}
      <span
        style={{
          position: "absolute", bottom: -3, left: 0,
          width: hovered ? "100%" : "0%", height: 1,
          background: colors.terra, transition: "width 0.3s ease",
        }}
      />
    </button>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ visible }: { visible: boolean }) {
  return (
    <section
      id="hero"
      style={{
        height: "100svh",
        minHeight: 0,
        padding: "0 2.5rem",
        display: "grid",
        gridTemplateRows: "1fr auto",
        position: "relative",
        overflow: "hidden",
        background: colors.cream,
        boxSizing: "border-box",
      }}
      aria-labelledby="heroHeading"
    >
      {/* Decorative circle */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "clamp(300px,40vw,600px)", height: "clamp(300px,40vw,600px)",
          borderRadius: "50%", border: `1px solid rgba(196,98,58,0.15)`,
          right: "-10%", top: "50%", transform: "translateY(-50%)",
          animation: "rotateSlow 60s linear infinite",
        }}
      />

      {/* Main content */}
      <div
        className="hero-content"
        style={{
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          paddingBottom: "4rem", paddingTop: "8rem", position: "relative", zIndex: 1
        }}
      >
        <div
          style={{
            display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem",
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div style={{ width: 48, height: 1, background: colors.terra }} aria-hidden="true" />
          <span style={{ fontFamily: '"DM Sans",sans-serif', fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: colors.sage }}>
            Luxury Brand Strategist & Designer
          </span>
        </div>

        <h1
          id="heroHeading"
          aria-label="Pranahita Reddy"
          style={{ fontFamily: '"Cormorant Garamond",serif', fontWeight: 300, lineHeight: 0.92, letterSpacing: "-0.02em", fontSize: "clamp(4.5rem,7.5vw,7.5rem)" }}
        >
          {["Pranahita", "Reddy"].map((word, i) => (
            <div key={word} style={{ overflow: "hidden" }}>
              <span
                style={{
                  display: "block",
                  transform: visible ? "translateY(0)" : "translateY(110%)",
                  transition: `transform 1s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
                }}
              >
                {word}
              </span>
            </div>
          ))}
        </h1>

        <p style={{
          fontFamily: '"Cormorant Garamond",serif',
          fontSize: "clamp(1.1rem, 2vw, 1.5rem)", fontWeight: 300, fontStyle: "italic",
          color: "rgba(13,13,13,0.7)", marginTop: "2rem", maxWidth: "24ch", lineHeight: 1.5,
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)",
          transition: `opacity 0.8s ease 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s`,
        }}>
          Culturally driven brand storytelling — where Indian craft heritage meets global luxury positioning.
        </p>
      </div>

      <div
        className="hero-bottom-grid"
        style={{
          display: "grid", gridTemplateColumns: "1fr auto 1fr",
          alignItems: "end", paddingBottom: "2.5rem", gap: "2rem",
          borderTop: "1px solid rgba(13,13,13,0.12)", paddingTop: "1.5rem",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)",
          transition: `opacity 0.8s ease 0.4s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s`,
          position: "relative", zIndex: 1
        }}
      >
        <div>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: colors.sage, marginBottom: "0.25rem" }}>Currently</div>
          <div style={{ fontSize: "0.82rem", color: "rgba(13,13,13,0.8)" }}>MA Luxury & Brand Management</div>
          <div style={{ fontSize: "0.78rem", color: colors.sage, fontStyle: "italic" }}>SCAD, Savannah GA · 2027</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "center" }} aria-hidden="true">
          <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, transparent, ${colors.ink})`, animation: "scrollPulse 2s ease-in-out infinite" }} />
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: colors.sage, writingMode: "vertical-rl" }}>Scroll</span>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: colors.sage, marginBottom: "0.25rem" }}>Based in</div>
          <div style={{ fontSize: "0.82rem", color: "rgba(13,13,13,0.8)" }}>Savannah, Georgia</div>
          <div style={{ fontSize: "0.78rem", color: colors.sage, fontStyle: "italic" }}>Open to global roles</div>
        </div>
      </div>
    </section>
  );
}

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
function Marquee() {
  const [paused, setPaused] = useState(false);
  const items = ["Brand Positioning", "Consumer Insights", "Luxury Marketing Strategy", "Cultural Storytelling", "Textile Design", "Visual Identity", "Trend Forecasting", "Campaign Strategy"];
  const doubled = [...items, ...items];

  return (
    <div
      style={{ overflow: "hidden", background: colors.ink, padding: "1rem 0", display: "flex" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-hidden="true"
    >
      <div style={{ display: "flex", whiteSpace: "nowrap", animation: `marqueeScroll 28s linear infinite`, animationPlayState: paused ? "paused" : "running" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ padding: "0 2rem", fontFamily: '"DM Sans",sans-serif', fontSize: "0.75rem", fontWeight: 300, letterSpacing: "0.05em", color: "rgba(242,235,217,0.6)" }}>
            {item} <span style={{ color: colors.terra }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
function SectionHeader({ label, title, count, light = false }: SectionHeaderProps) {
  return (
    <div
      className="fade-up-obs"
      style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        marginBottom: "3.5rem", paddingBottom: "1.5rem",
        borderBottom: `1px solid ${light ? "rgba(242,235,217,0.1)" : "rgba(13,13,13,0.1)"}`,
      }}
    >
      <div>
        <div style={{ fontFamily: '"DM Sans",sans-serif', fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: light ? "rgba(242,235,217,0.4)" : colors.sage, marginBottom: 8 }}>{label}</div>
        <h2 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.75rem,3.5vw,3rem)", fontWeight: 300, lineHeight: 1.1, color: light ? colors.cream : colors.ink }}>{title}</h2>
      </div>
      <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "5rem", fontWeight: 300, color: light ? "rgba(242,235,217,0.05)" : "rgba(13,13,13,0.07)", lineHeight: 1 }} aria-hidden="true">{count}</div>
    </div>
  );
}

// ─── WORK ─────────────────────────────────────────────────────────────────────
const workItems: WorkItem[] = [
  {
    index: "01", slug: "miu-miu", tags: ["Retail Strategy", "UX Concept"], title: "Miu Miu — Private Worlds",
    subtitle: "Brand Extension · SCAD Brand Strategy Studio", lensText: "Private\nWorlds",
    desc: "A life-sized dollhouse pop-up and companion app that translates Miu Miu's playful, subversive femininity into a fully immersive phygital retail installation.",
    outcome: "Deepened emotional engagement through immersive retail and app experiences",
  },
  {
    index: "02", slug: "guerlain", tags: ["Fragrance Marketing", "Brand Extension"], title: "Guerlain Shalimar — Where Love Becomes Eternal",
    subtitle: "Brand Architecture · SCAD Luxury Marketing Studio", lensText: "Heritage Meets\nModernity",
    desc: "A digitally-first campaign and sensory storytelling approach that repositions Shalimar for younger luxury consumers, translating its olfactory heritage into cinematic and tactile experiences.",
    outcome: "Reframed a heritage scent to resonate with Gen Z and younger millennials",
  },
  {
    index: "03", slug: "loro-piana", tags: ["Heritage Repositioning", "Consumer Insights"], title: "Loro Piana — Trama Invisible",
    subtitle: "Luxury Strategy · SCAD Consumer Behaviour Module", lensText: "Craft · Legacy\nAuthenticity",
    desc: "A fragrance brand extension that translates Loro Piana's century of textile mastery into olfactory experiences — six wood-based scents, each evoking a different way of touching cashmere.",
    outcome: "Expanded brand into fragrance while preserving heritage",
  },
];

function WorkCard({ item, delay = 0 }: WorkCardProps) {
  const [hovered, setHovered] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const to = item.slug ? `/works/${item.slug}` : `/work/${item.index}`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) setLensPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <article
      ref={cardRef}
      className="fade-up-obs hover-target work-card-grid"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={(e) => {
        // if a link or interactive element was clicked, let it handle the event
        if ((e.target as HTMLElement).closest('a,button')) return;
        navigate(to);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate(to);
        }
      }}
      role="link"
      tabIndex={0}
      style={{
        position: "relative", overflow: "hidden",
        borderBottom: "1px solid rgba(13,13,13,0.1)",
        padding: "2.5rem 0", cursor: "none",
        display: "grid", gridTemplateColumns: "5rem 1fr auto",
        alignItems: "start", gap: "2rem",
        background: hovered ? colors.mist : "transparent",
        transition: "background 0.3s ease",
        transitionDelay: `${delay}s`,
      }}
    >
      {/* Brand lens spotlight */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", width: 200, height: 200, borderRadius: "50%",
          pointerEvents: "none",
          background: "radial-gradient(circle, rgba(196,98,58,0.12) 0%, transparent 70%)",
          border: "1px solid rgba(196,98,58,0.2)",
          left: lensPos.x, top: lensPos.y,
          transform: `translate(-50%,-50%) scale(${hovered ? 1 : 0})`,
          opacity: hovered ? 1 : 0,
          transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s",
          zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <span style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "0.8rem", fontStyle: "italic", color: colors.terra, textAlign: "center", whiteSpace: "pre-line", padding: "1rem" }}>
          {item.lensText}
        </span>
      </div>

      <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1rem", fontWeight: 300, color: colors.sage, paddingTop: "0.3rem" }} aria-hidden="true">{item.index}</div>

      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.6rem" }}>
          {item.tags.map((t: string) => (
            <span key={t} style={{ fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: colors.terra, border: `1px solid rgba(196,98,58,0.3)`, padding: "0.25rem 0.6rem" }}>{t}</span>
          ))}
        </div>
        <h3 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.4rem,3vw,2.4rem)", fontWeight: 300, color: hovered ? colors.terra : colors.ink, lineHeight: 1.1, marginBottom: "0.5rem", transition: "color 0.2s" }}>
          {item.title}
        </h3>
        <div style={{ fontSize: "0.82rem", color: colors.sage, fontStyle: "italic", marginBottom: "0.75rem" }}>{item.subtitle}</div>
        <p style={{ fontSize: "0.88rem", color: colors.inkMid, maxWidth: "55ch", lineHeight: 1.7 }}>{item.desc}</p>
        <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: colors.sage }}>Outcome</span>
          <span style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "0.9rem", fontStyle: "italic", color: colors.ink }}>{item.outcome}</span>
        </div>
      </div>

      <Link
        to={item.slug ? `/works/${item.slug}` : `/work/${item.index}`}
        aria-label={`View ${item.title}`}
        style={{
          width: 48, height: 48, borderRadius: "50%",
          border: hovered ? `1px solid ${colors.terra}` : "1px solid rgba(13,13,13,0.2)",
          background: hovered ? colors.terra : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          alignSelf: "center", flexShrink: 0,
          transform: hovered ? "rotate(-45deg)" : "rotate(0)",
          transition: "all 0.3s ease", textDecoration: "none",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? "white" : colors.ink} strokeWidth="1.5">
          <path d="M3 13L13 3M13 3H6M13 3v7" />
        </svg>
      </Link>
    </article>
  );
}

function Work() {
  useFadeObserver();
  return (
    <section id="work" style={{ padding: "6rem 2.5rem", background: colors.cream }} aria-labelledby="workHeading">
      <SectionHeader label="Selected Work" title="Academic Case Studies" count="03" />
      <div role="list" style={{ borderTop: "1px solid rgba(13,13,13,0.1)" }}>
        {workItems.map((item, i) => <WorkCard key={item.index} item={item} delay={i * 0.1} />)}
      </div>
    </section>
  );
}

// ─── LOADER ───────────────────────────────────────────────────────────────────
function MainLoader({ onLoaded }: { onLoaded: () => void }) {
  const [gone, setGone] = useState(false);
  const [hiding, setHiding] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1600;
    const intervalTime = 40;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment + (Math.random() * 2);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setHiding(true);
            onLoaded();
            setTimeout(() => setGone(true), 1200);
          }, 350);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onLoaded]);

  if (gone) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 10000,
      background: colors.cream,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      transform: hiding ? "translateY(-100%)" : "none",
      transition: "transform 1.2s cubic-bezier(0.85, 0, 0.15, 1)",
      pointerEvents: hiding ? "none" : "all",
    }} role="status" aria-label="Loading Pranahita Reddy Portfolio">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", opacity: hiding ? 0 : 1, transition: "opacity 0.6s ease" }}>
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "3.5rem", fontWeight: 300, color: colors.ink, letterSpacing: "0.1em" }}>P·R</div>
        <div style={{ width: 140, height: 1, background: "rgba(13,13,13,0.1)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${progress}%`, background: colors.terra, transition: "width 0.1s ease-out" }} />
        </div>
        <div style={{ fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: colors.sage, opacity: 0.8 }}>Curating Narratives</div>
      </div>
    </div>
  );
}

function HomePage() {
  const shouldShowLoader = !appLoaderShown;
  const [loaded, setLoaded] = useState(!shouldShowLoader);

  return (
    <>
      {shouldShowLoader && (
        <MainLoader
          onLoaded={() => {
            setLoaded(true);
            appLoaderShown = true;
          }}
        />
      )}
      <Hero visible={loaded} />
      <Marquee />
      <Work />
      <About />
      <Capabilities />
      <Experience />
      <Contact />
    </>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ padding: "6rem 2.5rem", background: colors.ink, color: colors.cream }} aria-labelledby="aboutHeading">
      <SectionHeader label="About" title="Philosophy" count="02" light />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="about-grid">
        {/* Portrait */}
        <div className="fade-up-obs hidden md:block" style={{ position: "relative" }}>
          <img
            src="https://placehold.co/480x640/1A1A1A/B8965A?text=Pranahita+Reddy"
            alt="Portrait of Pranahita Reddy"
            style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", filter: "sepia(15%) contrast(1.05)" }}
            loading="lazy"
          />
          <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", right: "-1.5rem", bottom: "-1.5rem", border: "1px solid rgba(196,98,58,0.3)", zIndex: -1 }} aria-hidden="true" />
          <p style={{ position: "absolute", bottom: "-2.5rem", right: 0, fontFamily: '"Cormorant Garamond",serif', fontSize: "0.8rem", fontStyle: "italic", color: "rgba(242,235,217,0.5)" }}>SCAD · Savannah, 2026</p>
        </div>

        {/* Text */}
        <div className="fade-up-obs">
          <blockquote style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.4rem,2.5vw,2.2rem)", fontWeight: 300, fontStyle: "italic", color: colors.cream, lineHeight: 1.35, marginBottom: "2rem", borderLeft: `2px solid ${colors.terra}`, paddingLeft: "1.5rem" }}>
            "A brand is not what it says — it is what it makes people feel. My work lives in that gap."
          </blockquote>
          {[
            "I am a Luxury and Brand Management graduate student at SCAD, trained as a textile designer at NIFT Hyderabad. My practice sits at the intersection of cultural intelligence and strategic brand architecture — I build brand identities that are not only visually precise but emotionally resonant.",
            "Growing up immersed in India's rich craft traditions — hand-embroidery, block-printing, handloom weaving — gave me a foundational understanding of how materials carry meaning. That sensibility now informs how I approach brand strategy: every touchpoint is a texture, every communication is a gesture toward a deeper heritage narrative.",
          ].map((text, i) => (
            <p key={i} style={{ fontSize: "0.93rem", color: "rgba(242,235,217,0.75)", lineHeight: 1.85, marginBottom: "1.25rem" }}>{text}</p>
          ))}
          <p style={{ fontSize: "0.93rem", color: "rgba(242,235,217,0.75)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            I have worked across fashion weeks, luxury design houses, and children's apparel brands — always asking the same question: <em>what story does this want to tell, and who needs to feel it?</em>
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(242,235,217,0.1)" }}>
            {[["5+", "Brand Projects"], ["3", "Luxury Houses Studied"], ["2", "Countries Worked In"], ["4+", "Industry Certifications"]].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "2.8rem", fontWeight: 300, color: colors.terra, lineHeight: 1, marginBottom: "0.25rem" }}>{val}</div>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(242,235,217,0.4)" }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <OutlineBtn href="mailto:pranahitareddy1411@gmail.com" terra={true}>Start a Conversation</OutlineBtn>
            <OutlineBtn href="https://linkedin.com/in/pranahita-reddy" light={true}>LinkedIn →</OutlineBtn>
          </div>
        </div>
      </div>
    </section>
  );
}

function OutlineBtn({ href, children, terra = false, light = false }: OutlineBtnProps) {
  const [h, setH] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.75rem",
        padding: "0.65rem 1.25rem",
        border: `1px solid ${terra ? (h ? colors.terra : colors.terra) : light ? "rgba(242,235,217,0.3)" : colors.ink}`,
        color: terra ? (h ? colors.cream : colors.terra) : light ? (h ? colors.terra : "rgba(242,235,217,0.7)") : (h ? colors.cream : colors.ink),
        background: terra ? (h ? colors.terra : "transparent") : light ? "transparent" : (h ? colors.ink : "transparent"),
        fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase",
        textDecoration: "none", transition: "all 0.25s",
      }}
    >
      {children}
    </a>
  );
}

// ─── CAPABILITIES ─────────────────────────────────────────────────────────────
const capabilityItems: CapabilityItem[] = [
  {
    title: "Brand Strategy",
    icon: <><circle cx="20" cy="20" r="18" /><path d="M20 8v24M8 20h24M12 12l16 16M28 12L12 28" /></>,
    skills: ["Brand Positioning & Architecture", "Consumer Insights & Behaviour Analysis", "Luxury Marketing Strategy", "Market Research & Competitive Analysis", "Trend Forecasting", "Strategic Storytelling"],
  },
  {
    title: "Creative & Visual Design",
    icon: <><rect x="4" y="4" width="32" height="32" rx="1" /><path d="M4 16h32M16 4v32" /><circle cx="27" cy="27" r="4" /></>,
    skills: ["Visual Storytelling & Art Direction", "Textile Design & Surface Pattern", "Graphic Design & Brand Collateral", "Experiential Retail Concept", "Fashion Styling & Curation", "Concept Development"],
  },
  {
    title: "Tools & Software",
    icon: <><path d="M8 32V12l12-8 12 8v20H8z" /><path d="M16 32v-10h8v10" /><circle cx="20" cy="16" r="2" /></>,
    skills: ["Adobe Illustrator & Photoshop", "Adobe InDesign & Premiere Pro", "Adobe XD", "Procreate", "Microsoft Office Suite", "CAD (Textile & Pattern)"],
  },
  {
    title: "Campaign & Communication",
    icon: <><path d="M6 34l8-18 6 10 6-14 8 22" /><circle cx="6" cy="34" r="2" fill="currentColor" stroke="none" /></>,
    skills: ["Digital-First Campaign Strategy", "Heritage Brand Repositioning", "Cross-Platform Brand Storytelling", "Retail Experience Design"],
  },
  {
    title: "Cultural Intelligence",
    icon: <><circle cx="20" cy="20" r="4" /><circle cx="8" cy="10" r="3" /><circle cx="32" cy="10" r="3" /><circle cx="8" cy="30" r="3" /><circle cx="32" cy="30" r="3" /><path d="M11 12l6 5M29 12l-6 5M11 28l6-5M29 28l-6-5" /></>,
    skills: ["India–Global Luxury Market Bridge", "Craft Heritage & Material Narratives", "Emerging Market Consumer Insights", "Cross-Cultural Brand Translation"],
  },
];

function CapabilityBlock({ item, dark }: CapabilityBlockProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="fade-up-obs hover-target"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: dark ? colors.ink : hovered ? colors.creamDark : colors.mist,
        padding: "2.5rem", transition: "background 0.3s ease",
      }}
    >
      {dark ? (
        <>
          <div style={{ fontFamily: '"DM Sans",sans-serif', fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: colors.terra, marginBottom: 12 }}>Certified</div>
          <p style={{ fontFamily: '"Cormorant Garamond",serif', fontWeight: 300, fontStyle: "italic", fontSize: "1.2rem", color: colors.cream, lineHeight: 1.4, marginBottom: "0.75rem" }}>
            INSIDE LVMH — Creation & Branding, Retail & Client Experience
          </p>
          <p style={{ fontSize: "0.75rem", color: "rgba(242,235,217,0.4)", lineHeight: 1.6 }}>
            + Università Bocconi Fashion & Luxury Management<br />
            + Copenhagen Business School Sustainable Fashion
          </p>
        </>
      ) : (
        <>
          <svg style={{ width: 40, height: 40, marginBottom: "1.5rem", color: colors.terra }} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
            {item?.icon}
          </svg>
          <h3 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.4rem", fontWeight: 400, color: colors.ink, marginBottom: "0.75rem" }}>{item?.title}</h3>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {item && item.skills.map((s: string) => (
              <li key={s} style={{ fontSize: "0.82rem", color: colors.inkMid, display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ width: 4, height: 4, background: colors.terra, borderRadius: "50%", flexShrink: 0 }} />
                {s}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function Capabilities() {
  return (
    <section id="capabilities" style={{ padding: "6rem 2.5rem", background: colors.mist }} aria-labelledby="capabilitiesHeading">
      <SectionHeader label="Capabilities" title="The Toolkit" count="04" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(13,13,13,0.1)", border: "1px solid rgba(13,13,13,0.1)" }} className="cap-grid">
        {capabilityItems.map((item) => <CapabilityBlock key={item.title} item={item} dark={false} />)}
        <CapabilityBlock dark={true} item={null} />
      </div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
const timelineItems: TimelineItem[] = [
  {
    date: "2025 — Present", role: "Master of Arts — Luxury & Brand Management", type: "Education",
    org: "Savannah College of Art and Design (SCAD) · Savannah, GA · Expected 2027",
    bullets: [
      "Coursework in Brand Strategy, Consumer Behaviour, Fashion & Luxury Marketing, and Strategic Communication",
      "Academic projects with Miu Miu, Guerlain, and Loro Piana — developing brand strategy, campaign repositioning, and fragrance brand extension",
    ],
  },
  {
    date: "Sept 2024 — April 2025", role: "Freelance Print Designer & Visual Strategist", type: "Professional",
    org: "Aisha Rao · India",
    bullets: [
      "Developed cohesive branding and marketing materials across print and digital platforms to strengthen client brand identity",
      "Collaborated directly with clients to refine visual direction and ensure alignment with brand goals",
      "Contributed to collections presented at FDCI x Lakmé Fashion Week and India Couture Week — key platforms for luxury and emerging designer visibility",
    ],
  },
  {
    date: "June — Aug 2023", role: "Design & Visual Merchandising Intern", type: "Professional",
    org: "Aditya Birla Fashion & Retail Ltd. (ABFRL) · India",
    bullets: [
      "Designed presentation decks and visual aids for seasonal product launches and retail strategy reviews",
      "Supported styling, product curation, and visual storytelling for children's apparel at Alien & Bug — informed by consumer behaviour and market positioning",
      "Collaborated cross-functionally with design, merchandising, and marketing teams to ensure cohesive brand narratives",
    ],
  },
  {
    date: "2020 — 2024", role: "Bachelor of Design — Textile Design", type: "Education",
    org: "National Institute of Fashion Technology (NIFT) · Hyderabad, India",
    bullets: [
      "Specialised in surface design, handloom weaving, and traditional Indian craft techniques",
      "Developed brand identities and marketing strategies for graduation collections",
    ],
  },
];

function Experience() {
  return (
    <section id="experience" style={{ padding: "6rem 2.5rem", background: colors.cream }} aria-labelledby="experienceHeading">
      <SectionHeader label="Experience" title="The Journey" count="05" />
      <div style={{ position: "relative", paddingLeft: "2rem" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, ${colors.terra}, transparent)` }} aria-hidden="true" />
        {timelineItems.map((item, i) => (
          <TimelineItem key={i} item={item} delay={i * 0.1} />
        ))}
      </div>

      {/* Certifications */}
      <div style={{ marginTop: "4rem" }}>
        <div id="certifications" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(13,13,13,0.1)" }}>
          <div>
            <div style={{ fontFamily: '"DM Sans",sans-serif', fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: colors.sage, marginBottom: 8 }}>Certifications</div>
            <h2 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.75rem,3.5vw,3rem)", fontWeight: 300, lineHeight: 1.1 }}>Credentials</h2>
          </div>
          <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "5rem", fontWeight: 300, color: "rgba(13,13,13,0.07)", lineHeight: 1 }} aria-hidden="true">06</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 1, background: "rgba(13,13,13,0.08)", border: "1px solid rgba(13,13,13,0.08)" }}>
          {[
            ["LVMH", "INSIDE LVMH — Creation & Branding, Retail & Client Experience", "2025"],
            ["Università Bocconi", "Management of Fashion and Luxury Companies", "Sept – Oct 2024"],
            ["Copenhagen Business School", "Sustainable Fashion", "Nov 2024 – Jan 2025"],
            ["Adobe / LinkedIn Learning", "Adobe InDesign & Premiere Pro 2025 Essential Training", "Jan 2026"],
            ["LinkedIn Learning", "Microsoft Office Suite — Excel, PowerPoint, Word", "2025"],
          ].map(([inst, name, year], i) => (
            <CertCard key={i} institution={inst} name={name} year={year} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, delay }: TimelineItemProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <article
      className="fade-up-obs"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", padding: "2.5rem 0 2.5rem 3rem", borderBottom: "1px solid rgba(13,13,13,0.07)", transitionDelay: `${delay}s` }}
      role="listitem"
    >
      <div
        style={{
          position: "absolute", left: -4, top: "3rem", width: 8, height: 8, borderRadius: "50%",
          background: hovered ? colors.terra : colors.cream, border: `1.5px solid ${colors.terra}`,
          transform: hovered ? "scale(1.4)" : "scale(1)", transition: "all 0.2s",
        }}
        aria-hidden="true"
      />
      <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: colors.terra, marginBottom: "0.3rem" }}>{item.date}</div>
      <h3 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.5rem", fontWeight: 400, color: colors.ink, marginBottom: "0.2rem" }}>
        {item.role}
        <span style={{ marginLeft: "0.75rem", fontFamily: '"DM Sans",sans-serif', fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: colors.terra, border: `1px solid rgba(196,98,58,0.3)`, padding: "0.2rem 0.5rem", verticalAlign: "middle" }}>{item.type}</span>
      </h3>
      <div style={{ fontSize: "0.8rem", color: colors.sage, fontStyle: "italic", marginBottom: "0.75rem" }}>{item.org}</div>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        {item.bullets.map((b: string, i: number) => (
          <li key={i} style={{ fontSize: "0.87rem", color: colors.inkMid, lineHeight: 1.6, paddingLeft: "1.25rem", position: "relative" }}>
            <span style={{ position: "absolute", left: 0, color: colors.sage }}>—</span>
            {b}
          </li>
        ))}
      </ul>
    </article>
  );
}

function CertCard({ institution, name, year }: CertCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? colors.cream : colors.creamDark, padding: "2rem", transition: "background 0.2s" }}
    >
      <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: colors.terra, marginBottom: "0.5rem" }}>{institution}</div>
      <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.1rem", fontWeight: 400, color: colors.ink, lineHeight: 1.3, marginBottom: "0.5rem" }}>{name}</div>
      <div style={{ fontSize: "0.7rem", color: colors.sage }}>{year}</div>
    </div>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section
      id="contact"
      style={{ padding: "7rem 2.5rem", background: colors.ink, color: colors.cream, textAlign: "center", position: "relative", overflow: "hidden" }}
      aria-labelledby="contactHeading"
    >
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", border: "1px solid rgba(196,98,58,0.1)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", animation: "rotateSlow 80s linear infinite reverse" }} aria-hidden="true" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="fade-up-obs" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", border: "1px solid rgba(196,98,58,0.4)", marginBottom: "2rem" }}>
          <div style={{ width: 6, height: 6, background: colors.terra, borderRadius: "50%", animation: "pulse 2s ease-in-out infinite" }} aria-hidden="true" />
          <span style={{ fontFamily: '"DM Sans",sans-serif', fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(242,235,217,0.6)" }}>
            Available for internships & collaborations — 2026/27
          </span>
        </div>

        <h2 id="contactHeading" className="fade-up-obs" style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(2.5rem,6vw,5.5rem)", fontWeight: 300, lineHeight: 1, letterSpacing: "-0.015em", color: colors.cream, marginBottom: "1.5rem" }}>
          Let's build<br /><em>something remarkable.</em>
        </h2>

        <p className="fade-up-obs" style={{ fontSize: "0.9rem", color: "rgba(242,235,217,0.5)", maxWidth: "40ch", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
          Seeking internships in brand strategy, luxury marketing, and creative direction — bridging global luxury with emerging market intelligence.
        </p>

        <a
          href="mailto:pranahitareddy1411@gmail.com"
          className="fade-up-obs"
          style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(1.2rem,3.5vw,3rem)", fontWeight: 300, color: colors.cream, textDecoration: "none", borderBottom: "1px solid rgba(242,235,217,0.3)", paddingBottom: "0.25rem", transition: "color 0.2s, border-color 0.2s", display: "inline-block" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = colors.terra; e.currentTarget.style.borderColor = colors.terra; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = colors.cream; e.currentTarget.style.borderColor = "rgba(242,235,217,0.3)"; }}
        >
          pranahitareddy1411@gmail.com
        </a>

        <div className="fade-up-obs" style={{ display: "flex", justifyContent: "center", gap: "2.5rem", marginTop: "3rem", flexWrap: "wrap" }}>
          {[
            { label: "LinkedIn", href: "https://linkedin.com/in/pranahita-reddy" },
            { label: "+1 (912) 226-8844", href: "tel:+19122268844" },
            { label: "Behance", href: "https://behance.net" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(242,235,217,0.5)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = colors.terra; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(242,235,217,0.5)"; }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="main-footer" style={{ background: colors.ink, color: "rgba(242,235,217,0.3)", padding: "1.5rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(242,235,217,0.06)", fontSize: "0.65rem", letterSpacing: "0.1em", flexWrap: "wrap", gap: "0.5rem" }}>
      <span>© 2026 Pranahita Reddy — All rights reserved</span>
      <span style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: "italic", fontSize: "0.8rem", color: "rgba(242,235,217,0.2)" }}>Brand · Strategy · Design</span>
      <span>Savannah, GA</span>
    </footer>
  );
}

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background-color: #F2EBD9;
      color: #0D0D0D;
      font-family: 'DM Sans', sans-serif;
      font-weight: 300;
      line-height: 1.7;
      overflow-x: hidden;
      cursor: none;
    }
    a, button { cursor: none; }

    /* Grain overlay */
    body::after {
      content: '';
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9990;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      opacity: 0.035;
    }

    /* Animations */
    @keyframes rotateSlow { to { transform: translateY(-50%) rotate(360deg); } }
    @keyframes scrollPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
    @keyframes marqueeScroll { to { transform: translateX(-50%); } }
    @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }

    /* Fade observer */
    .fade-up-obs {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1);
    }
    .fade-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: #F2EBD9; }
    ::-webkit-scrollbar-thumb { background: #C4623A; }

    /* Mobile adjustments */
    @media (max-width: 768px) {
      section, header { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
      nav { padding: 1.25rem 1.5rem !important; }
      .hero-content { justify-content: center !important; padding-top: 3rem !important; }
      .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
      .cap-grid { grid-template-columns: 1fr !important; }
      .hero-bottom-grid { grid-template-columns: 1fr !important; gap: 2rem !important; text-align: center; }
      .hero-bottom-grid > div { text-align: center !important; }
      .hero-bottom-grid > div:nth-child(2) { display: none !important; }
      .work-card-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
      .work-card-grid > div:first-child { font-size: 0.8rem !important; }
      .main-footer { flex-direction: column !important; text-align: center; gap: 1rem !important; padding: 2.5rem 1.5rem !important; }
    }
    @media (min-width: 769px) and (max-width: 1024px) {
      .cap-grid { grid-template-columns: repeat(2,1fr) !important; }
    }

    :focus-visible { outline: 2px solid #C4623A; outline-offset: 3px; }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
      .fade-up-obs { opacity: 1; transform: none; }
    }
  `}</style>
);

// ─── APP ──────────────────────────────────────────────────────────────────────
function AppContent() {
  useFadeObserver();
  const location = useLocation();
  const isWorkRoute = location.pathname.startsWith("/work");

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <GlobalStyles />
      {!isWorkRoute && <Nav />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkList />} />
          <Route path="/work/:id" element={<WorkDetail />} />
          <Route path="/works/miu-miu" element={<MiuMiu />} />
          <Route path="/works/loro-piana" element={<LoroPiana />} />
          <Route path="/works/guerlain" element={<Guerlain />} />
        </Routes>
      </main>
      {!isWorkRoute && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <CursorWrapper>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CursorWrapper>
  );
}