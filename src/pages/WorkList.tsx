import { useNavigate } from "react-router-dom";
import { colors } from "../types";

const works = [
    {
        id: "01",
        title: "Miu Miu — Phygital Retail Experience",
        subtitle: "Brand Extension · SCAD Brand Strategy Studio",
        summary:
            "Conceptualised a phygital retail strategy that deepens emotional engagement with Gen-Z consumers.",
    },
    {
        id: "02",
        title: "Guerlain — Fragrance Brand Extension",
        subtitle: "Brand Architecture · SCAD Luxury Marketing Studio",
        summary:
            "Developed an extension strategy rooted in heritage storytelling and contemporary luxury cues.",
    },
    {
        id: "03",
        title: "Loro Piana — Heritage Repositioning",
        subtitle: "Luxury Strategy · SCAD Consumer Behaviour Module",
        summary:
            "Reframed ultra-luxury positioning against emerging consumer values while preserving exclusivity.",
    },
];

export default function WorkList() {
    const navigate = useNavigate();

    return (
        <section style={{ minHeight: "100vh", padding: "8rem 2.5rem 6rem", background: colors.cream }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <div style={{ marginBottom: "2.5rem" }}>
                    <div style={{ fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: colors.sage, marginBottom: "0.75rem" }}>
                        Selected Work
                    </div>
                    <h1 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(2.2rem,5vw,4.2rem)", fontWeight: 300, lineHeight: 1, color: colors.ink }}>
                        Temporary work routing
                    </h1>
                </div>

                <div style={{ display: "grid", gap: "1rem" }}>
                    {works.map((work) => (
                        <button
                            key={work.id}
                            type="button"
                            onClick={() => {
                                if (work.id === "01") {
                                    navigate("/works/miu-miu");
                                } else if (work.id === "02") {
                                    navigate("/works/guerlain");
                                } else if (work.id === "03") {
                                    navigate("/works/loro-piana");
                                } else {
                                    navigate(`/work/${work.id}`);
                                }
                            }}
                            style={{
                                textAlign: "left",
                                padding: "1.35rem 1.4rem",
                                border: "1px solid rgba(13,13,13,0.1)",
                                background: colors.mist,
                                color: colors.ink,
                                cursor: "pointer",
                                transition: "transform 0.2s ease, background 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.background = colors.creamDark;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.background = colors.mist;
                            }}
                        >
                            <div style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: colors.terra, marginBottom: "0.6rem" }}>
                                Project {work.id}
                            </div>
                            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.4rem", fontWeight: 400, marginBottom: "0.45rem" }}>
                                {work.title}
                            </div>
                            <div style={{ fontSize: "0.85rem", color: colors.sage, marginBottom: "0.45rem" }}>{work.subtitle}</div>
                            <div style={{ fontSize: "0.9rem", color: colors.inkMid, lineHeight: 1.7 }}>{work.summary}</div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}