import { useEffect, useRef, useState, type ReactNode } from "react";
import { colors } from "../types";

export default function CursorWrapper({ children }: { children: ReactNode }) {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkPointer = () => {
            setIsDesktop(window.matchMedia("(pointer: fine)").matches);
        };
        
        checkPointer();
        window.addEventListener("resize", checkPointer);

        const dot = dotRef.current;
        const ring = ringRef.current;

        const move = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            
            if (dot) {
                dot.style.left = e.clientX + "px";
                dot.style.top = e.clientY + "px";
            }
            if (ring) {
                ring.style.left = e.clientX + "px";
                ring.style.top = e.clientY + "px";
            }
        };

        const handleMouseEnter = () => {
            if (ring) {
                ring.style.width = "60px";
                ring.style.height = "60px";
                ring.style.borderColor = colors.terra;
            }
            if (dot) {
                dot.style.transform = "translate(-50%,-50%) scale(0.4)";
            }
        };

        const handleMouseLeave = () => {
            if (ring) {
                ring.style.width = "36px";
                ring.style.height = "36px";
                ring.style.borderColor = colors.ink;
            }
            if (dot) {
                dot.style.transform = "translate(-50%,-50%) scale(1)";
            }
        };

        const handleMouseOver = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            if (target?.closest("a, button, .hover-target")) {
                handleMouseEnter();
            }
        };

        const handleMouseOut = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            const relatedTarget = event.relatedTarget as HTMLElement | null;

            if (
                target?.closest("a, button, .hover-target") &&
                !relatedTarget?.closest("a, button, .hover-target")
            ) {
                handleMouseLeave();
            }
        };

        if (window.matchMedia("(pointer: fine)").matches) {
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseover", handleMouseOver);
            document.addEventListener("mouseout", handleMouseOut);
        }

        return () => {
            window.removeEventListener("resize", checkPointer);
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, [isVisible]);

    return (
        <>
            {isDesktop && (
                <>
                    <div
                        ref={dotRef}
                        style={{
                            width: 8,
                            height: 8,
                            background: colors.terra,
                            borderRadius: "50%",
                            position: "fixed",
                            top: 0,
                            left: 0,
                            pointerEvents: "none",
                            zIndex: 9999,
                            transform: "translate(-50%,-50%)",
                            transition: "transform 0.1s ease, opacity 0.3s ease",
                            opacity: isVisible ? 1 : 0,
                        }}
                        aria-hidden="true"
                    />
                    <div
                        ref={ringRef}
                        style={{
                            width: 36,
                            height: 36,
                            border: `1px solid ${colors.ink}`,
                            borderRadius: "50%",
                            position: "fixed",
                            top: 0,
                            left: 0,
                            pointerEvents: "none",
                            zIndex: 9998,
                            transform: "translate(-50%,-50%)",
                            transition: "width 0.3s ease, height 0.3s ease, border-color 0.2s ease, opacity 0.3s ease",
                            opacity: isVisible ? 1 : 0,
                        }}
                        aria-hidden="true"
                    />
                </>
            )}
            {children}
        </>
    );
}
