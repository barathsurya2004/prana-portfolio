import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { colors } from "../types";

type SelectedWorksNavProps = {
    accentColor: string;
    current: string;
    total?: string;
};

export default function SelectedWorksNav({ accentColor, current, total = "03" }: SelectedWorksNavProps) {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const lastScrollY = useRef(0);
    const hiddenRef = useRef(false);

    useEffect(() => {
        lastScrollY.current = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollingUp = currentScrollY < lastScrollY.current;
            const scrollingDown = currentScrollY > lastScrollY.current;
            const passedThreshold = currentScrollY > 70;
            const meaningfulDownScroll = currentScrollY - lastScrollY.current > 10;

            setScrolled(currentScrollY > 50);

            let nextHidden = hiddenRef.current;

            if (currentScrollY <= 50) {
                nextHidden = false;
            } else if (scrollingUp) {
                nextHidden = false;
            } else if (scrollingDown && passedThreshold && meaningfulDownScroll) {
                nextHidden = true;
            }

            hiddenRef.current = nextHidden;
            setHidden(nextHidden);
            lastScrollY.current = currentScrollY;
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navText = scrolled ? colors.ink : colors.cream;
    const navTextMuted = scrolled ? "rgba(13,13,13,0.7)" : "rgba(242,235,217,0.72)";

    return (
        <nav
            aria-label="Page navigation"
            style={{
                position: "fixed",
                top: 0,
                width: "100%",
                zIndex: 100,
                padding: "1.4rem 2.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: scrolled ? "rgba(242,235,217,0.90)" : "transparent",
                backdropFilter: scrolled ? "blur(14px)" : "none",
                borderBottom: scrolled ? "1px solid rgba(13,13,13,0.07)" : "none",
                transform: hidden ? "translateY(-110%)" : "translateY(0)",
                opacity: hidden ? 0 : 1,
                pointerEvents: hidden ? "none" : "auto",
                transition: "background 0.4s, backdrop-filter 0.4s, transform 0.28s ease, opacity 0.2s ease",
            }}
        >
            <Link
                to="/#work"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    fontSize: "0.68rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: navText,
                    textDecoration: "none",
                    transition: "color 0.2s",
                }}
                onMouseEnter={(event: React.MouseEvent<HTMLElement>) => (event.currentTarget.style.color = accentColor)}
                onMouseLeave={(event: React.MouseEvent<HTMLElement>) => (event.currentTarget.style.color = navText)}
            >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                    <path d="M11 7H3M6 4L3 7l3 3" />
                </svg>
                Selected Works
            </Link>
            <Link
                to="/"
                style={{
                    fontFamily: '"Cormorant Garamond",serif',
                    fontSize: "1.1rem",
                    fontWeight: 400,
                    letterSpacing: "0.05em",
                    color: navText,
                    textDecoration: "none",
                }}
            >
                P·R
            </Link>
            <span style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: navTextMuted }}>
                {current} / {total}
            </span>
        </nav>
    );
}