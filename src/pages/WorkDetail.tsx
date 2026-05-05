import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { colors } from "../types";

const works = {
    "01": {
        title: "Miu Miu — Phygital Retail Experience",
        subtitle: "Brand Extension · SCAD Brand Strategy Studio",
        summary:
            "Conceptualised a phygital retail strategy that merges digital interactivity with tactile in-store theatricality.",
        outcome: "Repositioned brand touchpoints across three audience cohorts",
    },
    "02": {
        title: "Guerlain — Fragrance Brand Extension",
        subtitle: "Brand Architecture · SCAD Luxury Marketing Studio",
        summary:
            "Developed a fragrance extension strategy rooted in heritage storytelling and contemporary luxury consumers.",
        outcome: "Extended brand into Indian heritage storytelling framework",
    },
    "03": {
        title: "Loro Piana — Heritage Repositioning",
        subtitle: "Luxury Strategy · SCAD Consumer Behaviour Module",
        summary:
            "Analysed ultra-luxury positioning against emerging consumer values while preserving exclusivity.",
        outcome: "Maintained brand equity while expanding TAM",
    },
} as const;

export default function WorkDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const work = useMemo(() => (id ? works[id as keyof typeof works] : undefined), [id]);

    if (!work) {
        return (
            <section style={{ minHeight: "100vh", padding: "8rem 2.5rem", background: colors.cream, display: "grid", placeItems: "center" }}>
                <div style={{ textAlign: "center" }}>
                    <h1 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "2.5rem", fontWeight: 300, color: colors.ink, marginBottom: "1rem" }}>
                        Work not found
                    </h1>
                    <button
                        type="button"
                        onClick={() => navigate("/work")}
                        style={{
                            padding: "0.7rem 1.2rem",
                            border: `1px solid ${colors.terra}`,
                            background: colors.terra,
                            color: colors.cream,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            fontSize: "0.68rem",
                            cursor: "pointer",
                        }}
                    >
                        Back to work
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section style={{ minHeight: "100vh", padding: "8rem 2.5rem 6rem", background: colors.cream }}>
            <div style={{ maxWidth: 920, margin: "0 auto" }}>
                <button
                    type="button"
                    onClick={() => navigate("/work")}
                    style={{
                        marginBottom: "2rem",
                        background: "none",
                        border: "none",
                        color: colors.terra,
                        fontSize: "0.68rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                    }}
                >
                    ← Back to work
                </button>

                <div style={{ marginBottom: "1.4rem" }}>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: colors.sage, marginBottom: "0.7rem" }}>
                        Project {id}
                    </div>
                    <h1 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 300, lineHeight: 1.05, color: colors.ink, marginBottom: "0.8rem" }}>
                        {work.title}
                    </h1>
                    <p style={{ fontSize: "0.95rem", color: colors.sage, fontStyle: "italic", marginBottom: "1.2rem" }}>{work.subtitle}</p>
                    <p style={{ fontSize: "1rem", color: colors.inkMid, lineHeight: 1.8, maxWidth: "72ch" }}>{work.summary}</p>
                </div>

                <div style={{ padding: "1.5rem", background: colors.mist, borderLeft: `3px solid ${colors.terra}` }}>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: colors.sage, marginBottom: "0.5rem" }}>
                        Outcome
                    </div>
                    <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "1.4rem", fontStyle: "italic", color: colors.ink, lineHeight: 1.5 }}>
                        {work.outcome}
                    </p>
                </div>
            </div>
        </section>
    );
}