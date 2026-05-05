import { ReactNode } from 'react';

// ─── COLORS ───────────────────────────────────────────────────────────────────
export const colors = {
    cream: "#F2EBD9",
    creamDark: "#E8DFC8",
    ink: "#0D0D0D",
    inkMid: "#2a2a2a",
    terra: "#C4623A",
    gold: "#B8965A",
    sage: "#6B7C6E",
    mist: "#EAE3D3",
} as const;

// ─── WORK SECTION ─────────────────────────────────────────────────────────────
export interface WorkItem {
    index: string;
    tags: string[];
    title: string;
    subtitle: string;
    lensText: string;
    desc: string;
    outcome: string;
}

export interface WorkCardProps {
    item: WorkItem;
    delay?: number;
}

// ─── CAPABILITIES SECTION ─────────────────────────────────────────────────────
export interface CapabilityItem {
    title: string;
    icon: ReactNode;
    skills: string[];
}

export interface CapabilityBlockProps {
    item?: CapabilityItem | null;
    dark?: boolean;
}

// ─── EXPERIENCE SECTION ───────────────────────────────────────────────────────
export interface TimelineItem {
    date: string;
    role: string;
    type: string;
    org: string;
    bullets: string[];
}

export interface TimelineItemProps {
    item: TimelineItem;
    delay: number;
}

export interface CertCardProps {
    institution: string;
    name: string;
    year: string;
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
export interface SectionHeaderProps {
    label: string;
    title: string;
    count: string | number;
    light?: boolean;
}

export interface NavLinkProps {
    children: ReactNode;
    onClick: () => void;
}

export interface OutlineBtnProps {
    href: string;
    children: ReactNode;
    terra?: boolean;
    light?: boolean;
}

// ─── NAV SECTION ──────────────────────────────────────────────────────────────
export type NavLink = 'work' | 'about' | 'capabilities' | 'experience' | 'contact';

export const navLabels: Record<NavLink, string> = {
    work: "Work",
    about: "About",
    capabilities: "Skills",
    experience: "Experience",
    contact: "Contact",
};

export const navLinks: NavLink[] = ['work', 'about', 'capabilities', 'experience', 'contact'];
