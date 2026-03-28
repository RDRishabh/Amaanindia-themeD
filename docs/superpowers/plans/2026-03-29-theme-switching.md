# Theme Switching System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace hardcoded gold/dark colors with a config-driven system supporting three premium themes (A=Light Navy, B=Dark Platinum, C=Warm Sage) switchable by changing one value in `src/config/theme.config.ts`.

**Architecture:** A `ThemeTokens` object is defined for each theme in `themes.ts`. `main.tsx` injects a small set as CSS custom properties on `:root` (for Tailwind `var()` class syntax). Components call `getThemeColors()` directly for rgba values, inline styles, and complex tokens like nav shadow, avatar colors, and map filter.

**Tech Stack:** React, TypeScript, Tailwind CSS v4, Vite

---

## File Map

| Action | File |
|--------|------|
| Create | `src/config/theme.config.ts` |
| Create | `src/styles/themes.ts` |
| Modify | `src/main.tsx` |
| Modify | `src/styles/theme.css` |
| Modify | `src/styles/index.css` |
| Modify | `src/app/components/HeroSection.tsx` |
| Modify | `src/app/components/Navbar.tsx` |
| Modify | `src/app/components/ServicesSection.tsx` |
| Modify | `src/app/components/TrustSection.tsx` |
| Modify | `src/app/components/AmenitiesSection.tsx` |
| Modify | `src/app/components/TestimonialsSection.tsx` |
| Modify | `src/app/components/ProjectsSection.tsx` |
| Modify | `src/app/components/GallerySection.tsx` |
| Modify | `src/app/components/CTASection.tsx` |
| Modify | `src/app/components/ContactSection.tsx` |
| Modify | `src/app/components/Footer.tsx` |

---

## Task 1: Create theme config and tokens

**Files:**
- Create: `src/config/theme.config.ts`
- Create: `src/styles/themes.ts`

- [ ] **Step 1: Create `src/config/theme.config.ts`**

```ts
export const ACTIVE_THEME = 'A' as const; // Change to 'B' or 'C' to switch themes
export type ThemeKey = 'A' | 'B' | 'C';
```

- [ ] **Step 2: Create `src/styles/themes.ts`**

```ts
import { ACTIVE_THEME, type ThemeKey } from '../config/theme.config';

export interface ThemeTokens {
  // Accent
  accent: string;
  accentHover: string;
  accentLight: string;
  accentRgb: string;    // "R,G,B" — use as: `rgba(${c.accentRgb}, 0.3)`
  onAccent: string;     // text color on accent button bg

  // Section backgrounds
  sectionDark: string;  // replaces #0a0a0a, #0d0d0d sections
  sectionMid: string;   // replaces #111111, #0d0d0d sections
  sectionLight: string; // replaces #F8F5EF sections
  sectionWhite: string; // replaces bg-white / ProjectsSection

  // Surface backgrounds
  cardBg: string;       // replaces #111111 cards
  cardBgSubtle: string; // replaces #1a1a1a icon containers
  inputBg: string;      // replaces #111111 inputs

  // Navigation
  navScrolledBg: string;
  navShadow: string;
  mobileMenuBg: string;

  // Text
  textPrimary: string;
  textSecondary: string;   // ~60% opacity equivalent
  textMuted: string;       // ~40–45% opacity equivalent

  // Borders
  borderMedium: string;    // replaces #2a2a2a
  borderSubtle: string;    // replaces #1e1e1e / #1a1a1a

  // CTA section overlay (over photo bg)
  ctaOverlayStart: string;
  ctaOverlayMid: string;
  ctaOverlayEnd: string;

  // Gallery
  galleryOverlay: string;      // transparent start for hover overlay

  // Decorative
  glowColor: string;       // for orb glow, blur decorations

  // Testimonials
  avatarColors: [string, string, string];

  // Contact map iframe CSS filter
  mapFilter: string;

  // Scrollbar
  scrollbarTrack: string;
  scrollbarThumb: string;
}

const themes: Record<ThemeKey, ThemeTokens> = {
  // ── Theme A: Light & Minimal (Hermes / Architectural Digest) ──────────
  A: {
    accent: '#1B2D4F',
    accentHover: '#152540',
    accentLight: '#2D4A7A',
    accentRgb: '27,45,79',
    onAccent: '#FFFFFF',

    sectionDark: '#FAFAF8',
    sectionMid: '#F5F2EC',
    sectionLight: '#F8F5EF',
    sectionWhite: '#FFFFFF',

    cardBg: '#FFFFFF',
    cardBgSubtle: '#F2EFE9',
    inputBg: '#F2EFE9',

    navScrolledBg: 'rgba(250,250,248,0.96)',
    navShadow: '0 1px 0 rgba(27,45,79,0.15), 0 8px 40px rgba(0,0,0,0.08)',
    mobileMenuBg: 'rgba(250,250,248,0.97)',

    textPrimary: '#1A1A1A',
    textSecondary: 'rgba(26,26,26,0.62)',
    textMuted: 'rgba(26,26,26,0.42)',

    borderMedium: 'rgba(26,26,26,0.15)',
    borderSubtle: 'rgba(26,26,26,0.09)',

    ctaOverlayStart: 'rgba(245,242,236,0.95)',
    ctaOverlayMid: 'rgba(245,242,236,0.85)',
    ctaOverlayEnd: 'rgba(245,242,236,0.60)',

    galleryOverlay: 'rgba(26,26,26,0)',

    glowColor: 'rgba(27,45,79,0.10)',

    avatarColors: ['#1B2D4F', '#2D4A7A', '#0D1E38'],

    mapFilter: 'none',

    scrollbarTrack: '#F2EFE9',
    scrollbarThumb: '#1B2D4F',
  },

  // ── Theme B: Dark Refined (Apple Pro / Bang & Olufsen) ────────────────
  B: {
    accent: '#C0C4D0',
    accentHover: '#A8ACBA',
    accentLight: '#D8DCE8',
    accentRgb: '192,196,208',
    onAccent: '#0C0C0E',

    sectionDark: '#0C0C0E',
    sectionMid: '#0F0F12',
    sectionLight: '#131316',
    sectionWhite: '#131316',

    cardBg: '#131316',
    cardBgSubtle: '#1C1C20',
    inputBg: '#1C1C20',

    navScrolledBg: 'rgba(12,12,14,0.96)',
    navShadow: '0 1px 0 rgba(192,196,208,0.15), 0 8px 40px rgba(0,0,0,0.60)',
    mobileMenuBg: 'rgba(10,10,12,0.97)',

    textPrimary: '#EDEDF0',
    textSecondary: 'rgba(237,237,240,0.62)',
    textMuted: 'rgba(237,237,240,0.42)',

    borderMedium: 'rgba(237,237,240,0.12)',
    borderSubtle: 'rgba(237,237,240,0.07)',

    ctaOverlayStart: 'rgba(8,8,10,0.95)',
    ctaOverlayMid: 'rgba(8,8,10,0.85)',
    ctaOverlayEnd: 'rgba(8,8,10,0.60)',

    galleryOverlay: 'rgba(8,8,10,0)',

    glowColor: 'rgba(192,196,208,0.08)',

    avatarColors: ['#2A2E3C', '#1C2030', '#343844'],

    mapFilter: 'invert(90%) hue-rotate(180deg)',

    scrollbarTrack: '#0C0C0E',
    scrollbarThumb: '#C0C4D0',
  },

  // ── Theme C: Warm Neutral (Luxury Scandinavian / Aesop) ──────────────
  C: {
    accent: '#4A6741',
    accentHover: '#3D5A35',
    accentLight: '#6B8F62',
    accentRgb: '74,103,65',
    onAccent: '#FFFFFF',

    sectionDark: '#F4EFE6',
    sectionMid: '#EDE8DE',
    sectionLight: '#F8F4EC',
    sectionWhite: '#FAF7F2',

    cardBg: '#FAF7F2',
    cardBgSubtle: '#EDE8DE',
    inputBg: '#EDE8DE',

    navScrolledBg: 'rgba(244,239,230,0.96)',
    navShadow: '0 1px 0 rgba(74,103,65,0.15), 0 8px 40px rgba(0,0,0,0.08)',
    mobileMenuBg: 'rgba(244,239,230,0.97)',

    textPrimary: '#1C1814',
    textSecondary: 'rgba(28,24,20,0.62)',
    textMuted: 'rgba(28,24,20,0.42)',

    borderMedium: 'rgba(28,24,20,0.15)',
    borderSubtle: 'rgba(28,24,20,0.09)',

    ctaOverlayStart: 'rgba(238,233,223,0.95)',
    ctaOverlayMid: 'rgba(238,233,223,0.85)',
    ctaOverlayEnd: 'rgba(238,233,223,0.60)',

    galleryOverlay: 'rgba(28,24,20,0)',

    glowColor: 'rgba(74,103,65,0.10)',

    avatarColors: ['#4A6741', '#3D5A35', '#5E7E55'],

    mapFilter: 'none',

    scrollbarTrack: '#EDE8DE',
    scrollbarThumb: '#4A6741',
  },
};

export function getThemeColors(): ThemeTokens {
  return themes[ACTIVE_THEME];
}

/** CSS variables injected onto :root — used by Tailwind var() syntax and global CSS */
export function getThemeCssVars(): Record<string, string> {
  const c = themes[ACTIVE_THEME];
  return {
    '--t-accent': c.accent,
    '--t-accent-hover': c.accentHover,
    '--t-on-accent': c.onAccent,
    '--t-section-dark': c.sectionDark,
    '--t-section-mid': c.sectionMid,
    '--t-section-light': c.sectionLight,
    '--t-section-white': c.sectionWhite,
    '--t-card-bg': c.cardBg,
    '--t-card-bg-subtle': c.cardBgSubtle,
    '--t-input-bg': c.inputBg,
    '--t-text-primary': c.textPrimary,
    '--t-text-secondary': c.textSecondary,
    '--t-text-muted': c.textMuted,
    '--t-border-medium': c.borderMedium,
    '--t-border-subtle': c.borderSubtle,
    '--t-scrollbar-track': c.scrollbarTrack,
    '--t-scrollbar-thumb': c.scrollbarThumb,
  };
}
```

- [ ] **Step 3: Commit**

```bash
git add src/config/theme.config.ts src/styles/themes.ts
git commit -m "feat: add theme config and token definitions for A/B/C themes"
```

---

## Task 2: Apply theme at startup + update global CSS

**Files:**
- Modify: `src/main.tsx`
- Modify: `src/styles/theme.css`
- Modify: `src/styles/index.css`

- [ ] **Step 1: Update `src/main.tsx`** to inject CSS variables before render

```tsx
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { getThemeCssVars } from "./styles/themes.ts";

// Apply theme CSS variables to :root before render
const cssVars = getThemeCssVars();
const root = document.documentElement;
Object.entries(cssVars).forEach(([key, value]) => {
  root.style.setProperty(key, value);
});

createRoot(document.getElementById("root")!).render(<App />);
```

- [ ] **Step 2: Update `src/styles/index.css`** — replace hardcoded scrollbar hex values

Replace the entire scrollbar block (lines 11–29) with:

```css
::selection {
  background-color: var(--t-accent);
  color: var(--t-on-accent);
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: var(--t-scrollbar-track);
}

::-webkit-scrollbar-thumb {
  background: var(--t-scrollbar-thumb);
  border-radius: 0;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--t-accent-hover);
}
```

- [ ] **Step 3: Update `src/styles/theme.css`** — replace hardcoded `:root` color values with theme-appropriate ones

Replace the entire `:root { ... }` block (lines 3–42) with:

```css
:root {
  --font-size: 16px;
  --background: var(--t-section-white, #ffffff);
  --foreground: var(--t-text-primary, #1a1a1a);
  --card: var(--t-card-bg, #ffffff);
  --card-foreground: var(--t-text-primary, #1a1a1a);
  --popover: var(--t-card-bg, #ffffff);
  --popover-foreground: var(--t-text-primary, #1a1a1a);
  --primary: var(--t-accent, #1B2D4F);
  --primary-foreground: var(--t-on-accent, #ffffff);
  --secondary: var(--t-card-bg-subtle, #F2EFE9);
  --secondary-foreground: var(--t-text-primary, #1a1a1a);
  --muted: var(--t-card-bg-subtle, #F2EFE9);
  --muted-foreground: var(--t-text-muted, rgba(26,26,26,0.42));
  --accent: var(--t-card-bg-subtle, #F2EFE9);
  --accent-foreground: var(--t-text-primary, #1a1a1a);
  --destructive: #d4183d;
  --destructive-foreground: #ffffff;
  --border: var(--t-border-subtle, rgba(0,0,0,0.1));
  --input: transparent;
  --input-background: var(--t-input-bg, #F2EFE9);
  --switch-background: #cbced4;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --ring: var(--t-accent, #1B2D4F);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: var(--t-section-light, #F8F5EF);
  --sidebar-foreground: var(--t-text-primary, #1a1a1a);
  --sidebar-primary: var(--t-accent, #1B2D4F);
  --sidebar-primary-foreground: var(--t-on-accent, #ffffff);
  --sidebar-accent: var(--t-card-bg-subtle, #F2EFE9);
  --sidebar-accent-foreground: var(--t-text-primary, #1a1a1a);
  --sidebar-border: var(--t-border-subtle, rgba(0,0,0,0.1));
  --sidebar-ring: var(--t-accent, #1B2D4F);
}
```

Keep the `.dark { ... }` block and `@theme inline { ... }` block unchanged.

- [ ] **Step 4: Commit**

```bash
git add src/main.tsx src/styles/theme.css src/styles/index.css
git commit -m "feat: inject theme CSS vars at startup, wire global CSS to theme tokens"
```

---

## Task 3: Update HeroSection

**Files:**
- Modify: `src/app/components/HeroSection.tsx`

- [ ] **Step 1: Add import at top of file**

After the last import line, add:
```tsx
import { getThemeColors } from "../../styles/themes";
const c = getThemeColors();
```

- [ ] **Step 2: Update `OrbDecoration` component**

Replace the outer glow `background` value:
```tsx
// OLD
"radial-gradient(ellipse at center, rgba(201,168,76,0.12) 0%, transparent 70%)"
// NEW
`radial-gradient(ellipse at center, rgba(${c.accentRgb},0.12) 0%, transparent 70%)`
```

Replace Ring 1 border and boxShadow:
```tsx
// OLD
border: "1px solid rgba(201,168,76,0.55)",
boxShadow: "0 0 18px rgba(201,168,76,0.15)",
// NEW
border: `1px solid rgba(${c.accentRgb},0.55)`,
boxShadow: `0 0 18px rgba(${c.accentRgb},0.15)`,
```

Replace Ring 2 border:
```tsx
// OLD
border: "1px solid rgba(201,168,76,0.38)",
// NEW
border: `1px solid rgba(${c.accentRgb},0.38)`,
```

Replace Ring 3 border:
```tsx
// OLD
border: "1px solid rgba(201,168,76,0.28)",
// NEW
border: `1px solid rgba(${c.accentRgb},0.28)`,
```

Replace orbiting dot color:
```tsx
// OLD
className="absolute rounded-full bg-[#C9A84C]"
// NEW
className="absolute rounded-full" style={{ backgroundColor: c.accent }}
```

Replace centre diamond:
```tsx
// OLD
border: "2px solid #C9A84C",
background: "rgba(201,168,76,0.1)",
boxShadow: "0 0 20px rgba(201,168,76,0.4), inset 0 0 10px rgba(201,168,76,0.15)",
// NEW
border: `2px solid ${c.accent}`,
background: `rgba(${c.accentRgb},0.1)`,
boxShadow: `0 0 20px rgba(${c.accentRgb},0.4), inset 0 0 10px rgba(${c.accentRgb},0.15)`,
```

Replace inner pulsing glow:
```tsx
// OLD
background: "radial-gradient(circle, rgba(201,168,76,0.5) 0%, transparent 70%)",
// NEW
background: `radial-gradient(circle, rgba(${c.accentRgb},0.5) 0%, transparent 70%)`,
```

- [ ] **Step 3: Update `PropertyCard` component**

Replace card border:
```tsx
// OLD
border: "1px solid rgba(201,168,76,0.35)",
background: "rgba(8,8,8,0.82)",
// NEW
border: `1px solid rgba(${c.accentRgb},0.35)`,
background: `rgba(${c.accentRgb.split(',').map((v,i)=>i<3?Math.round(parseInt(v)*0.05):v).join(',')})`,
```

Actually, keep the card bg as a near-black overlay (it sits over the hero image, so it works for all themes). Replace only the color references:

```tsx
// Card background — keep dark for all themes (it's a floating card over image)
background: "rgba(8,8,8,0.82)",
border: `1px solid rgba(${c.accentRgb},0.35)`,
```

Replace Building2 icon className:
```tsx
// OLD
className="text-[#C9A84C]"
// NEW (on the icon)
style={{ color: c.accent }}
```

Replace "Featured Property" text color:
```tsx
// OLD
color: "#C9A84C",
// NEW
color: c.accent,
```

Replace price text color:
```tsx
// OLD
style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.1rem", color: "#C9A84C" }}
// NEW
style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.1rem", color: c.accent }}
```

Replace progress bar fill:
```tsx
// OLD
<div className="h-full bg-[#C9A84C]" style={{ width: "72%" }} />
// NEW
<div className="h-full" style={{ width: "72%", backgroundColor: c.accent }} />
```

Replace whileHover boxShadow in PropertyCard motion.div:
```tsx
// OLD
whileHover={{ y: -6, boxShadow: "0 30px 60px rgba(201,168,76,0.2)", ... }}
// NEW
whileHover={{ y: -6, boxShadow: `0 30px 60px rgba(${c.accentRgb},0.2)`, ... }}
```

- [ ] **Step 4: Update `HeroSection` main component**

Replace light streak background:
```tsx
// OLD
"linear-gradient(135deg, transparent 30%, rgba(201,168,76,0.25) 50%, transparent 70%)"
// NEW
`linear-gradient(135deg, transparent 30%, rgba(${c.accentRgb},0.25) 50%, transparent 70%)`
```

Replace overline divider gradient:
```tsx
// OLD
background: "linear-gradient(to right, #C9A84C, transparent)",
// NEW
background: `linear-gradient(to right, ${c.accent}, transparent)`,
```

Replace overline tagline color:
```tsx
// OLD
color: "#C9A84C",
// NEW
color: c.accent,
```

Replace overline box border:
```tsx
// OLD
border: "1px solid rgba(201,168,76,0.25)",
// NEW
border: `1px solid rgba(${c.accentRgb},0.25)`,
```

Replace MapPin color:
```tsx
// OLD
<MapPin size={9} color="rgba(201,168,76,0.7)" />
// NEW
<MapPin size={9} color={`rgba(${c.accentRgb},0.7)`} />
```

Replace location text color:
```tsx
// OLD
color: "rgba(201,168,76,0.65)",
// NEW
color: `rgba(${c.accentRgb},0.65)`,
```

Replace second headline line (the italic gold one):
```tsx
// OLD
{ text: "Property Decision", style: { color: "#C9A84C", fontStyle: "italic" } },
// NEW
{ text: "Property Decision", style: { color: c.accent, fontStyle: "italic" } },
```

Replace CTA primary button:
```tsx
// OLD
background: "linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)",
color: "#080808",
// NEW
background: `linear-gradient(135deg, ${c.accent} 0%, ${c.accentLight} 50%, ${c.accent} 100%)`,
color: c.onAccent,
```

Replace CTA primary button hover handlers:
```tsx
onMouseEnter={(e) => {
  (e.currentTarget as HTMLButtonElement).style.backgroundPosition = "100% 0";
  (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 40px rgba(${c.accentRgb},0.55), 0 8px 24px rgba(0,0,0,0.4)`;
  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
}}
```

Replace secondary button hover handlers:
```tsx
onMouseEnter={(e) => {
  (e.currentTarget as HTMLButtonElement).style.borderColor = c.accent;
  (e.currentTarget as HTMLButtonElement).style.color = c.accent;
  (e.currentTarget as HTMLButtonElement).style.background = `rgba(${c.accentRgb},0.06)`;
}}
onMouseLeave={(e) => {
  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.28)";
  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.85)";
  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
}}
```

Replace stat icon + value colors:
```tsx
// Icon: className="text-[#C9A84C] opacity-70" → style={{ color: c.accent, opacity: 0.7 }}
// Value: color: "#C9A84C" → color: c.accent
```

Replace slide indicator active color:
```tsx
// OLD
background: i === current ? "#C9A84C" : "rgba(255,255,255,0.28)",
boxShadow: i === current ? "0 0 8px rgba(201,168,76,0.5)" : "none",
// NEW
background: i === current ? c.accent : "rgba(255,255,255,0.28)",
boxShadow: i === current ? `0 0 8px rgba(${c.accentRgb},0.5)` : "none",
```

Replace scroll indicator gradient:
```tsx
// OLD
background: "linear-gradient(to bottom, rgba(201,168,76,0.7), transparent)",
// NEW
background: `linear-gradient(to bottom, rgba(${c.accentRgb},0.7), transparent)`,
```

Replace ArrowDown color:
```tsx
// OLD
style={{ color: "rgba(201,168,76,0.65)" }}
// NEW
style={{ color: `rgba(${c.accentRgb},0.65)` }}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/components/HeroSection.tsx
git commit -m "feat: apply theme tokens to HeroSection"
```

---

## Task 4: Update Navbar

**Files:**
- Modify: `src/app/components/Navbar.tsx`

- [ ] **Step 1: Add import**

```tsx
import { getThemeColors } from "../../styles/themes";
```

- [ ] **Step 2: Add inside `Navbar` component body (top)**

```tsx
const c = getThemeColors();
```

- [ ] **Step 3: Replace scrolled navbar classes and styles**

```tsx
// OLD className conditional
scrolled
  ? "bg-[#060606]/96 backdrop-blur-xl shadow-[0_1px_0_rgba(201,168,76,0.15),0_8px_40px_rgba(0,0,0,0.6)]"
  : "bg-transparent"

// NEW — use inline style for dynamic nav bg and shadow
```

Change the `motion.nav` to use inline style for background and boxShadow:
```tsx
<motion.nav
  ...
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-xl" : ""}`}
  style={{
    padding: scrolled ? "10px 0" : "18px 0",
    background: scrolled ? c.navScrolledBg : "transparent",
    boxShadow: scrolled ? c.navShadow : "none",
  }}
>
```

- [ ] **Step 4: Replace logo hover gold color**

```tsx
// OLD className on img
className="group-hover:[filter:brightness(0)_sepia(1)_saturate(4)_hue-rotate(5deg)]"
// NEW — remove the hover filter class; the logo stays white. The AMAAN text hover is enough.

// OLD className on AMAAN text span
className="group-hover:text-[#C9A84C]"
// NEW
className="group-hover:text-[var(--t-accent)]"

// OLD — INDIA subtext color
color: "#C9A84C"
// NEW
color: c.accent,
```

- [ ] **Step 5: Replace nav link active + hover colors**

```tsx
// OLD
color: activeLink === link.href ? "#C9A84C" : "rgba(255,255,255,0.75)",

// NEW
color: activeLink === link.href ? c.accent : c.textSecondary,
```

```tsx
// OLD underline span background
background: "linear-gradient(to right, #C9A84C, rgba(201,168,76,0.3))",
// NEW
background: `linear-gradient(to right, ${c.accent}, rgba(${c.accentRgb},0.3))`,
```

```tsx
// OLD onMouseEnter/Leave
onMouseEnter={(e) => { if (activeLink !== link.href) (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
onMouseLeave={(e) => { if (activeLink !== link.href) (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.75)"; }}
// NEW
onMouseEnter={(e) => { if (activeLink !== link.href) (e.currentTarget as HTMLButtonElement).style.color = c.textPrimary; }}
onMouseLeave={(e) => { if (activeLink !== link.href) (e.currentTarget as HTMLButtonElement).style.color = c.textSecondary; }}
```

- [ ] **Step 6: Replace phone icon ring + CTA button**

```tsx
// Phone icon ring border
// OLD className: "group-hover:border-[#C9A84C] group-hover:bg-[rgba(201,168,76,0.1)]"
// Keep as Tailwind but use var():
className="group-hover:border-[var(--t-accent)] group-hover:bg-[var(--t-card-bg-subtle)]"

// Phone icon color
// OLD: style={{ color: "#C9A84C" }}
style={{ color: c.accent }}

// Phone number text hover
// OLD: className="group-hover:text-[#C9A84C]"
className="group-hover:text-[var(--t-accent)]"
// Also update base color:
color: c.textSecondary,

// CTA button gradient
// OLD: background: "linear-gradient(135deg, #C9A84C, #E8C96A)"
background: `linear-gradient(135deg, ${c.accent}, ${c.accentLight})`,
color: c.onAccent,

// CTA button whileHover shadow
// OLD: boxShadow: "0 0 28px rgba(201,168,76,0.45)"
whileHover={{ scale: 1.02, boxShadow: `0 0 28px rgba(${c.accentRgb},0.45)` }}
```

- [ ] **Step 7: Replace mobile menu styles**

```tsx
// Mobile menu fullscreen div
// OLD: style={{ background: "rgba(4,4,4,0.97)", backdropFilter: "blur(20px)" }}
style={{ background: c.mobileMenuBg, backdropFilter: "blur(20px)" }}

// Mobile nav links hover
// OLD: whileHover={{ color: "#C9A84C", x: 8 }}
whileHover={{ color: c.accent, x: 8 }}
// Base color:
color: c.textPrimary,

// Mobile phone link
// OLD: color: "#C9A84C"
color: c.accent,

// Mobile CTA button
background: `linear-gradient(135deg, ${c.accent}, ${c.accentLight})`,
color: c.onAccent,
```

- [ ] **Step 8: Replace bottom gold line**

```tsx
// OLD
background: "linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)",
// NEW
background: `linear-gradient(to right, transparent, rgba(${c.accentRgb},0.4), transparent)`,
```

- [ ] **Step 9: Commit**

```bash
git add src/app/components/Navbar.tsx
git commit -m "feat: apply theme tokens to Navbar"
```

---

## Task 5: Update ServicesSection

**Files:**
- Modify: `src/app/components/ServicesSection.tsx`

- [ ] **Step 1: Add import + call**

```tsx
import { getThemeColors } from "../../styles/themes";
// inside ServicesSection():
const c = getThemeColors();
```

- [ ] **Step 2: Replace section background**

```tsx
// OLD: className="py-28 bg-[#0a0a0a]"
// NEW — add inline style:
<section className="py-28" style={{ background: c.sectionDark }}>
```

- [ ] **Step 3: Replace accent decorations in header**

```tsx
// Divider lines: className="h-px w-10 bg-[#C9A84C]"
className="h-px w-10" style={{ background: c.accent }}  // use inline for both

// "What We Offer" label: className="text-[#C9A84C] uppercase"
style={{ ..., color: c.accent }}  // add to existing style prop

// Heading italic span: className="italic text-[#C9A84C]"
className="italic" style={{ color: c.accent }}
```

- [ ] **Step 4: Replace card styles**

```tsx
// Card wrapper: bg-[#111111] border-[#2a2a2a] hover:border-[#C9A84C]
<motion.div
  className="group relative border p-8 transition-all duration-500 overflow-hidden cursor-pointer"
  style={{ background: c.cardBg, borderColor: c.borderMedium }}
  // Add onMouseEnter/Leave for border color change:
  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = c.accent}
  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = c.borderMedium}
>

// Hover bg overlay: from-[#C9A84C]/5
style={{ background: `linear-gradient(to bottom, rgba(${c.accentRgb},0.05), transparent)` }}

// Ghost number: text-white/5 group-hover:text-[#C9A84C]/10
// Change to inline with textPrimary at very low opacity:
style={{ ..., color: `rgba(${c.accentRgb},0.08)` }}
// (keep as constant — the number is decorative)

// Icon container: bg-[#1a1a1a] group-hover:bg-[#C9A84C]
// Use onMouseEnter/Leave on the card and manage icon container via ref, OR:
// Simplest: apply className that uses CSS vars:
className="w-14 h-14 flex items-center justify-center mb-6 transition-colors duration-500"
style={{ background: c.cardBgSubtle }}
// For hover, keep the group-hover Tailwind trick using CSS var:
// Add to card div: className="group ..."
// Icon container: className="... group-hover:bg-[var(--t-accent)]"
// Icon: className="... group-hover:text-[var(--t-on-accent)]"
// Icon base color: style={{ color: c.accent }}

// Feature bullet dots: bg-[#C9A84C]
style={{ backgroundColor: c.accent }}

// "Learn More" text + arrow:
className="flex items-center gap-2 opacity-0 group-hover:opacity-100 ..."
style={{ color: c.accent }}
```

- [ ] **Step 5: Replace heading and text colors**

```tsx
// h3: className="text-white mb-3" → style={{ color: c.textPrimary }}
// p desc: className="text-white/50 mb-6" → style={{ color: c.textSecondary }}
// feature li spans: className="text-white/50" → style={{ color: c.textSecondary }}
```

- [ ] **Step 6: Commit**

```bash
git add src/app/components/ServicesSection.tsx
git commit -m "feat: apply theme tokens to ServicesSection"
```

---

## Task 6: Update TrustSection

**Files:**
- Modify: `src/app/components/TrustSection.tsx`

- [ ] **Step 1: Add import + call**

```tsx
import { getThemeColors } from "../../styles/themes";
// inside TrustSection():
const c = getThemeColors();
```

- [ ] **Step 2: Replace section background + text colors**

```tsx
// OLD: className="py-28 bg-[#F8F5EF]"
<section id="about" className="py-28" style={{ background: c.sectionLight }}>

// Heading: className="text-[#0a0a0a] text-4xl md:text-5xl mb-6"
style={{ ..., color: c.textPrimary }}  // merge with existing style

// Italic span: className="block italic text-[#C9A84C]"
className="block italic" style={{ color: c.accent }}

// Body paragraphs: className="text-[#4a4a4a]"
style={{ ..., color: c.textSecondary }}

// CTA button: bg-[#0a0a0a] hover:bg-[#C9A84C] text-white hover:text-[#0a0a0a]
// Convert to controlled style:
style={{
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  fontSize: "0.78rem",
  letterSpacing: "0.15em",
  background: c.accent,
  color: c.onAccent,
  padding: "16px 32px",
  textTransform: "uppercase" as const,
  transition: "all 0.5s",
  border: "none",
  cursor: "pointer",
}}
```

- [ ] **Step 3: Replace divider line + "Who We Are" label**

```tsx
// Divider: className="h-px w-10 bg-[#C9A84C]"
style={{ height: 1, width: 40, background: c.accent }}

// Label: className="text-[#C9A84C] uppercase" → style={{ ..., color: c.accent }}
```

- [ ] **Step 4: Replace pillar cards**

```tsx
// Card: border-[#e8e2d8] hover:border-[#C9A84C] hover:shadow-[0_8px_40px_rgba(201,168,76,0.15)]
<motion.div
  className="p-8 transition-all duration-400 group"
  style={{ background: c.cardBg, border: `1px solid ${c.borderSubtle}` }}
  onMouseEnter={(e) => {
    const el = e.currentTarget as HTMLElement;
    el.style.borderColor = c.accent;
    el.style.boxShadow = `0 8px 40px rgba(${c.accentRgb},0.15)`;
  }}
  onMouseLeave={(e) => {
    const el = e.currentTarget as HTMLElement;
    el.style.borderColor = c.borderSubtle;
    el.style.boxShadow = "none";
  }}
>

// Icon container: bg-[#F8F5EF] group-hover:bg-[#C9A84C]
className="w-12 h-12 flex items-center justify-center mb-4 transition-colors duration-400 group-hover:bg-[var(--t-accent)]"
style={{ background: c.sectionLight }}

// Icon: text-[#C9A84C] group-hover:text-[#0a0a0a]
className="transition-colors duration-400 group-hover:text-[var(--t-on-accent)]"
style={{ color: c.accent }}

// h3: className="text-[#0a0a0a] mb-3" → style={{ color: c.textPrimary }}
// p: className="text-[#6a6a6a]" → style={{ color: c.textSecondary }}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/components/TrustSection.tsx
git commit -m "feat: apply theme tokens to TrustSection"
```

---

## Task 7: Update AmenitiesSection

**Files:**
- Modify: `src/app/components/AmenitiesSection.tsx`

- [ ] **Step 1: Add import + call**

```tsx
import { getThemeColors } from "../../styles/themes";
// inside AmenitiesSection():
const c = getThemeColors();
```

- [ ] **Step 2: Replace section + decorative blobs**

```tsx
// Section: className="py-28 bg-[#0a0a0a] relative overflow-hidden"
<section className="py-28 relative overflow-hidden" style={{ background: c.sectionDark }}>

// Blob 1: className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#C9A84C]/5 blur-3xl ..."
style={{ background: c.glowColor }}  // glowColor already includes correct opacity

// Blob 2: same treatment
```

- [ ] **Step 3: Replace header accent colors**

Same pattern as ServicesSection — divider lines, label, italic heading span → `c.accent`.

Replace heading text: `className="text-white ..."` → `style={{ color: c.textPrimary }}`
Replace subtext: `className="text-white/50 ..."` → `style={{ color: c.textSecondary }}`

- [ ] **Step 4: Replace amenity grid cards**

```tsx
// Card: border-[#1e1e1e] hover:border-[#C9A84C] bg-[#111111] hover:bg-[#0f0f0f]
<motion.div
  className="group flex flex-col items-center gap-4 p-6 transition-all duration-400 cursor-pointer"
  style={{ background: c.cardBg, border: `1px solid ${c.borderSubtle}` }}
  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = c.accent}
  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = c.borderSubtle}
>

// Icon circle: bg-[#1a1a1a] group-hover:bg-[#C9A84C]
className="w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-400 group-hover:bg-[var(--t-accent)]"
style={{ background: c.cardBgSubtle }}

// Icon: text-[#C9A84C] group-hover:text-[#0a0a0a]
className="transition-colors duration-400 group-hover:text-[var(--t-on-accent)]"
style={{ color: c.accent }}

// Label: className="text-white/60 group-hover:text-white ..."
style={{ color: c.textSecondary }}
// group-hover color handled by: onMouseEnter on card updating label...
// Simpler: keep Tailwind group-hover with CSS var:
className="... text-[var(--t-text-secondary)] group-hover:text-[var(--t-text-primary)]"
// Remove the style={{ color }} and use Tailwind vars instead
```

- [ ] **Step 5: Replace image strip overlays**

```tsx
// Each image strip overlay: bg-gradient-to-t from-[#0a0a0a]/80
// Keep as-is — these are image overlays, always dark for readability
// Only change the text overlay (it's already text-white which is fine)
```

- [ ] **Step 6: Commit**

```bash
git add src/app/components/AmenitiesSection.tsx
git commit -m "feat: apply theme tokens to AmenitiesSection"
```

---

## Task 8: Update TestimonialsSection

**Files:**
- Modify: `src/app/components/TestimonialsSection.tsx`

- [ ] **Step 1: Add import + call**

```tsx
import { getThemeColors } from "../../styles/themes";
// inside TestimonialsSection():
const c = getThemeColors();
```

- [ ] **Step 2: Replace testimonial data avatar colors**

```tsx
// OLD color values in testimonials array: "#C9A84C", "#8B6914", "#5a4a28"
// These are defined at module level, so move them inside the component or make them dynamic:

// Change the testimonials array to not include color, and derive it from theme:
const testimonials = [
  { name: "Rajiv Sharma", role: "Senior IT Professional, Noida", rating: 5, text: "...", initials: "RS" },
  { name: "Priya Kapoor", role: "Entrepreneur & Investor, Delhi", rating: 5, text: "...", initials: "PK" },
  { name: "Arun Mehta", role: "Commercial Investor, Mumbai", rating: 5, text: "...", initials: "AM" },
];
// Then use: c.avatarColors[i] when rendering
```

- [ ] **Step 3: Replace section background**

```tsx
// OLD: className="py-28 bg-[#0a0a0a] relative overflow-hidden"
<section className="py-28 relative overflow-hidden" style={{ background: c.sectionDark }}>
```

- [ ] **Step 4: Replace header accents + heading**

Same accent pattern. Replace `text-white` headings with `style={{ color: c.textPrimary }}`.

- [ ] **Step 5: Replace desktop cards**

```tsx
// Card: bg-[#111111] border-[#1e1e1e] hover:border-[#C9A84C]
<motion.div
  className="relative border p-8 transition-all duration-400 group"
  style={{ background: c.cardBg, borderColor: c.borderSubtle }}
  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = c.accent}
  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = c.borderSubtle}
>

// Quote icon: className="text-[#C9A84C]/20 mb-6"
style={{ color: `rgba(${c.accentRgb},0.20)` }}

// Stars: fill="#C9A84C" className="text-[#C9A84C]"
<Star key={j} size={14} style={{ fill: c.accent, color: c.accent }} />

// Review text: className="text-white/60 ..."
style={{ color: c.textSecondary }}

// Avatar divider: border-t border-[#1e1e1e]
style={{ borderTop: `1px solid ${c.borderSubtle}` }}

// Avatar bg: style={{ backgroundColor: t.color }} → style={{ backgroundColor: c.avatarColors[i] }}

// Author name: className="text-white block" → style={{ color: c.textPrimary }}
// Author role: className="text-[#C9A84C]" → style={{ color: c.accent }}
```

- [ ] **Step 6: Replace mobile slider card + controls**

Same as desktop but also:
```tsx
// Prev/Next buttons: border-[#2a2a2a] hover:border-[#C9A84C] text-white hover:text-[#C9A84C]
style={{ border: `1px solid ${c.borderMedium}`, color: c.textSecondary }}
onMouseEnter/Leave to swap borderColor + color

// Slide indicator dots:
// Active: className="w-8 bg-[#C9A84C]" → style={{ background: c.accent }}
// Inactive: className="w-2 bg-white/20" → style={{ background: c.borderMedium }}
```

- [ ] **Step 7: Commit**

```bash
git add src/app/components/TestimonialsSection.tsx
git commit -m "feat: apply theme tokens to TestimonialsSection"
```

---

## Task 9: Update ProjectsSection

**Files:**
- Modify: `src/app/components/ProjectsSection.tsx`

- [ ] **Step 1: Add import + call**

```tsx
import { getThemeColors } from "../../styles/themes";
// inside ProjectsSection():
const c = getThemeColors();
```

- [ ] **Step 2: Update project data tagColors**

The `tagColor: "#C9A84C"` in project data should use the accent. Move project data inside component or update the "New Launch" tag color:

```tsx
// The projects array uses specific tag colors: #22c55e (green), #C9A84C (gold), #3b82f6 (blue), #a855f7 (purple)
// Only the #C9A84C ones need replacing. Find them (Amaan Riviera, Amaan Green Homes) and change:
tagColor: c.accent,  // (used inline since array is now inside component scope)
```

Move the `projects` array inside the `ProjectsSection` function to access `c`.

- [ ] **Step 3: Replace section + filter tabs**

```tsx
// Section: className="py-28 bg-white" → add style={{ background: c.sectionWhite }}
<section id="projects" className="py-28" style={{ background: c.sectionWhite }}>

// Header divider + "Our Portfolio" label → c.accent pattern
// Heading italic span: text-[#C9A84C] → style={{ color: c.accent }}

// Filter tabs active: bg-[#C9A84C] text-[#0a0a0a] border-[#C9A84C]
// → background: c.accent, color: c.onAccent, borderColor: c.accent
// Filter tabs inactive: text-[#4a4a4a] border-[#d0c9be] hover:border-[#C9A84C] hover:text-[#C9A84C]
// → color: c.textSecondary, borderColor: c.borderMedium
// Use onMouseEnter/Leave or CSS vars for hover
```

- [ ] **Step 4: Replace project cards**

```tsx
// Card wrapper: bg-white border-[#e8e2d8]
style={{ background: c.cardBg, border: `1px solid ${c.borderSubtle}` }}

// Image gradient overlay: from-[#0a0a0a]/70 — keep dark for image readability

// Hover CTA button over image: bg-[#C9A84C] text-[#0a0a0a]
style={{ background: c.accent, color: c.onAccent }}

// Project name: className="text-[#0a0a0a]" → style={{ color: c.textPrimary }}
// MapPin icon: className="text-[#C9A84C]" → style={{ color: c.accent }}
// Location: className="text-[#6a6a6a]" → style={{ color: c.textSecondary }}
// Card divider: border-t border-[#f0ebe3] → style={{ borderTop: `1px solid ${c.borderSubtle}` }}
// "Price Range" label: className="text-[#9a9a9a]" → style={{ color: c.textMuted }}
// Price value: className="text-[#C9A84C]" → style={{ color: c.accent }}
// Beds label: className="text-[#9a9a9a]" → style={{ color: c.textMuted }}
// Area value: className="text-[#4a4a4a]" → style={{ color: c.textSecondary }}
```

- [ ] **Step 5: Replace "View All Projects" button**

```tsx
// OLD: border-2 border-[#0a0a0a] hover:bg-[#0a0a0a] text-[#0a0a0a] hover:text-white
style={{
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  fontSize: "0.78rem",
  letterSpacing: "0.15em",
  border: `2px solid ${c.textPrimary}`,
  color: c.textPrimary,
  background: "transparent",
  padding: "16px 40px",
  textTransform: "uppercase" as const,
  cursor: "pointer",
  transition: "all 0.4s",
}}
onMouseEnter={(e) => {
  const el = e.currentTarget as HTMLElement;
  el.style.background = c.textPrimary;
  el.style.color = c.sectionWhite;
}}
onMouseLeave={(e) => {
  const el = e.currentTarget as HTMLElement;
  el.style.background = "transparent";
  el.style.color = c.textPrimary;
}}
```

- [ ] **Step 6: Commit**

```bash
git add src/app/components/ProjectsSection.tsx
git commit -m "feat: apply theme tokens to ProjectsSection"
```

---

## Task 10: Update GallerySection

**Files:**
- Modify: `src/app/components/GallerySection.tsx`

- [ ] **Step 1: Add import + call**

```tsx
import { getThemeColors } from "../../styles/themes";
// inside GallerySection():
const c = getThemeColors();
```

- [ ] **Step 2: Replace section + header**

```tsx
// Section: className="py-28 bg-[#F8F5EF]"
<section id="gallery" className="py-28" style={{ background: c.sectionLight }}>

// Heading: className="text-[#0a0a0a] ..." → style={{ color: c.textPrimary }}
// Dividers + label + italic span → c.accent
```

- [ ] **Step 3: Replace gallery grid hover overlay**

```tsx
// OLD: className="... bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/50 ..."
// The gallery image overlays should always be dark (they're over photos).
// Keep using: style={{ background: 'rgba(0,0,0,0)' }} and hover handled by Tailwind:
className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-400 flex items-center justify-center"
// (text-white stays as-is for image label readability)
```

- [ ] **Step 4: Replace lightbox**

```tsx
// Lightbox bg: bg-[#0a0a0a]/95 — keep dark (always overlays content)
// X button hover: hover:text-[#C9A84C]
className="absolute top-6 right-6 text-white hover:text-[var(--t-accent)] transition-colors"
```

- [ ] **Step 5: Commit**

```bash
git add src/app/components/GallerySection.tsx
git commit -m "feat: apply theme tokens to GallerySection"
```

---

## Task 11: Update CTASection

**Files:**
- Modify: `src/app/components/CTASection.tsx`

- [ ] **Step 1: Add import + call**

```tsx
import { getThemeColors } from "../../styles/themes";
// inside CTASection():
const c = getThemeColors();
```

- [ ] **Step 2: Replace photo overlay gradient**

```tsx
// OLD: bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/85 to-[#0a0a0a]/60
// NEW — use ctaOverlay tokens:
<div
  className="absolute inset-0"
  style={{
    background: `linear-gradient(to right, ${c.ctaOverlayStart}, ${c.ctaOverlayMid}, ${c.ctaOverlayEnd})`,
  }}
/>
```

- [ ] **Step 3: Replace accent decorations + heading**

```tsx
// Divider + label → c.accent
// Heading: className="text-white ..." → style={{ color: c.textPrimary }}
// Italic span: className="block italic text-[#C9A84C]" → style={{ color: c.accent }}
// "with Expert Guidance" span: className="block text-white/80" → style={{ color: c.textSecondary }}
// Body paragraph: className="text-white/65 ..." → style={{ color: c.textSecondary }}
```

- [ ] **Step 4: Replace CTA buttons**

```tsx
// Primary button: bg-[#C9A84C] hover:bg-[#B8963E] text-[#0a0a0a] shadow-[...]
<motion.button
  className="flex items-center gap-3 px-8 py-5 transition-all duration-300 group"
  style={{ background: c.accent, color: c.onAccent }}
  whileHover={{ scale: 1.03, backgroundColor: c.accentHover }}
  whileTap={{ scale: 0.97 }}
  onClick={...}
>

// Secondary button: border-white/30 hover:border-[#C9A84C] text-white hover:text-[#C9A84C]
<a
  href="tel:9540005050"
  className="flex items-center gap-3 px-8 py-5 backdrop-blur-sm group transition-all duration-400"
  style={{ border: `1px solid rgba(255,255,255,0.30)`, color: "rgba(255,255,255,0.9)" }}
  onMouseEnter={(e) => {
    const el = e.currentTarget as HTMLElement;
    el.style.borderColor = c.accent;
    el.style.color = c.accent;
  }}
  onMouseLeave={(e) => {
    const el = e.currentTarget as HTMLElement;
    el.style.borderColor = "rgba(255,255,255,0.30)";
    el.style.color = "rgba(255,255,255,0.9)";
  }}
>
```

- [ ] **Step 5: Replace decorative bottom line**

```tsx
// OLD: bg-gradient-to-r from-[#C9A84C] via-[#F0D080] to-transparent
style={{
  background: `linear-gradient(to right, ${c.accent}, ${c.accentLight}, transparent)`,
}}
```

- [ ] **Step 6: Commit**

```bash
git add src/app/components/CTASection.tsx
git commit -m "feat: apply theme tokens to CTASection"
```

---

## Task 12: Update ContactSection

**Files:**
- Modify: `src/app/components/ContactSection.tsx`

- [ ] **Step 1: Add import + call**

```tsx
import { getThemeColors } from "../../styles/themes";
// inside ContactSection():
const c = getThemeColors();
```

- [ ] **Step 2: Replace section bg + inputClass**

```tsx
// Section: className="py-28 bg-[#0d0d0d]"
<section id="contact" className="py-28" style={{ background: c.sectionMid }}>

// inputClass — replace the entire string:
const inputClass = `w-full border px-4 py-4 outline-none transition-colors duration-300`;
const inputStyle = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 300,
  fontSize: "0.88rem",
  background: c.inputBg,
  borderColor: c.borderMedium,
  color: c.textPrimary,
};
// For placeholder color, add a <style> injection or use a wrapper class.
// Simplest: add onFocus/onBlur to each input to change border color:
onFocus={(e) => (e.currentTarget as HTMLElement).style.borderColor = c.accent}
onBlur={(e) => (e.currentTarget as HTMLElement).style.borderColor = c.borderMedium}
// For select option bg: style={{ background: c.inputBg }} on each <option>
```

- [ ] **Step 3: Replace header accents + form labels**

```tsx
// Header dividers + label + italic span → c.accent
// Form section heading: className="text-white mb-3" → style={{ color: c.textPrimary }}
// Body text: className="text-white/50" → style={{ color: c.textSecondary }}

// All form labels: className="text-[#C9A84C] uppercase block mb-2"
// → style={{ ..., color: c.accent }}
```

- [ ] **Step 4: Replace contact info icons + text**

```tsx
// Phone/Mail icon containers: bg-[#1a1a1a] group-hover:bg-[#C9A84C]
className="w-12 h-12 flex items-center justify-center transition-colors duration-400 flex-shrink-0 group-hover:bg-[var(--t-accent)]"
style={{ background: c.cardBgSubtle }}

// Icons: text-[#C9A84C] group-hover:text-[#0a0a0a]
style={{ color: c.accent }}
className="transition-colors duration-400 group-hover:text-[var(--t-on-accent)]"

// Contact value text hover: className="text-white group-hover:text-[#C9A84C]"
style={{ color: c.textPrimary }}
className="... group-hover:text-[var(--t-accent)] transition-colors"

// "Call Us" / "Email Us" labels: className="text-white/40 uppercase block"
style={{ color: c.textMuted }}

// Address text: className="text-white/70" → style={{ color: c.textSecondary }}

// Map iframe border: border-[#2a2a2a] → style={{ borderColor: c.borderMedium }}
// Map filter: style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
// → style={{ border: 0, filter: c.mapFilter }}
```

- [ ] **Step 5: Replace form card + submit button**

```tsx
// Form card: bg-[#111111] border-[#1e1e1e]
style={{ background: c.cardBg, border: `1px solid ${c.borderSubtle}` }}

// Success state CheckCircle: className="text-[#C9A84C]" → style={{ color: c.accent }}
// "Message Received!": className="text-white" → style={{ color: c.textPrimary }}
// Subtext: className="text-white/50" → style={{ color: c.textSecondary }}

// Submit button: bg-[#C9A84C] hover:bg-[#B8963E] text-[#0a0a0a]
className="w-full flex items-center justify-center gap-3 py-5 transition-all duration-300"
style={{ background: c.accent, color: c.onAccent }}
whileHover={{ scale: 1.02, boxShadow: `0 0 30px rgba(${c.accentRgb},0.4)` }}

// Privacy text: className="text-white/30 ..." → style={{ color: c.textMuted }}
```

- [ ] **Step 6: Commit**

```bash
git add src/app/components/ContactSection.tsx
git commit -m "feat: apply theme tokens to ContactSection"
```

---

## Task 13: Update Footer

**Files:**
- Modify: `src/app/components/Footer.tsx`

- [ ] **Step 1: Add import + call**

```tsx
import { getThemeColors } from "../../styles/themes";
// inside Footer():
const c = getThemeColors();
```

- [ ] **Step 2: Replace footer background + borders**

```tsx
// Footer: className="bg-[#050505] border-t border-[#1a1a1a]"
<footer style={{ background: c.sectionDark, borderTop: `1px solid ${c.borderSubtle}` }}>

// Bottom bar divider: className="border-t border-[#141414]"
<div style={{ borderTop: `1px solid ${c.borderSubtle}` }}>
```

- [ ] **Step 3: Replace text colors**

```tsx
// Brand name AMAAN: className="text-white" → style={{ color: c.textPrimary }}
// INDIA subtext: className="text-[#C9A84C]" → style={{ color: c.accent }}
// Body paragraph: className="text-white/45 mb-6" → style={{ color: c.textMuted }}

// Section headings (Quick Links, Our Services, Contact Us): className="text-[#C9A84C] uppercase mb-6"
// → style={{ ..., color: c.accent }}

// Link buttons: className="text-white/45 hover:text-[#C9A84C] ..."
style={{ color: c.textMuted }}
className="... hover:text-[var(--t-accent)] transition-colors duration-300 ..."

// Link bullet lines: className="w-4 h-px bg-white/20 group-hover:bg-[#C9A84C] ..."
className="h-px bg-[var(--t-border-medium)] group-hover:bg-[var(--t-accent)] transition-all duration-300"

// Contact icons: className="text-[#C9A84C] mt-1 flex-shrink-0" → style={{ color: c.accent }}
// Contact values: className="text-white/45 group-hover:text-white ..."
style={{ color: c.textMuted }}
className="... group-hover:text-[var(--t-text-primary)] transition-colors"
```

- [ ] **Step 4: Replace social icons**

```tsx
// Social icon links: border-[#2a2a2a] hover:border-[#C9A84C] hover:text-[#C9A84C] text-white/40
style={{ borderColor: c.borderMedium, color: c.textMuted }}
onMouseEnter={(e) => {
  const el = e.currentTarget as HTMLElement;
  el.style.borderColor = c.accent;
  el.style.color = c.accent;
}}
onMouseLeave={(e) => {
  const el = e.currentTarget as HTMLElement;
  el.style.borderColor = c.borderMedium;
  el.style.color = c.textMuted;
}}
```

- [ ] **Step 5: Replace bottom bar**

```tsx
// Copyright + links: className="text-white/30" → style={{ color: c.textMuted }}
// Privacy/Terms hover: className="hover:text-[#C9A84C]" → className="hover:text-[var(--t-accent)] transition-colors"

// Scroll-to-top button: border-[#2a2a2a] hover:border-[#C9A84C] hover:text-[#C9A84C] text-white/40
// Same hover pattern as social icons
```

- [ ] **Step 6: Commit**

```bash
git add src/app/components/Footer.tsx
git commit -m "feat: apply theme tokens to Footer"
```

---

## Task 14: Verify all three themes

- [ ] **Step 1: Test Theme A**

Ensure `src/config/theme.config.ts` has `ACTIVE_THEME = 'A'`.

Run dev server:
```bash
npm run dev
```

Expected: Site renders with off-white backgrounds, deep navy accent, no gold anywhere.

- [ ] **Step 2: Test Theme B**

Change `ACTIVE_THEME = 'B'`, save, check hot-reload.

Expected: Dark cool backgrounds, platinum silver accent, no gold.

- [ ] **Step 3: Test Theme C**

Change `ACTIVE_THEME = 'C'`, save, check hot-reload.

Expected: Warm sand backgrounds, sage green accent, no gold.

- [ ] **Step 4: Reset to preferred theme + final commit**

```bash
# Set ACTIVE_THEME to client's preferred starting theme (default: 'A')
git add src/config/theme.config.ts
git commit -m "feat: complete theme switching system — A/B/C via ACTIVE_THEME config"
```
