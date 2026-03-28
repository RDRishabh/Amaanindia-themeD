# Theme Switching System — Design Spec
**Date:** 2026-03-29
**Project:** Amaan India website
**Status:** Approved

---

## Overview

Replace the current single hardcoded dark-gold theme with a config-driven system supporting three distinct premium palettes. Switching themes requires changing one value in one file.

---

## Architecture

### Files changed / created

| File | Change |
|------|--------|
| `src/config/theme.config.ts` | **New** — single source of truth: `ACTIVE_THEME = 'A' \| 'B' \| 'C'` |
| `src/styles/themes.ts` | **New** — defines all three palettes as CSS variable maps |
| `src/main.tsx` | **Modified** — reads config, applies theme CSS vars to `:root` before render |
| `src/styles/theme.css` | **Modified** — remove hardcoded color values; keep only `@theme inline` and base typography |
| `src/styles/index.css` | **Modified** — update hardcoded scrollbar colors (`#C9A84C`, `#0a0a0a`) to use CSS variables |

### How it works

1. `theme.config.ts` exports `ACTIVE_THEME`.
2. `themes.ts` maps each theme key to a flat object of CSS variable name → value.
3. `main.tsx` iterates the active theme's variables and sets them on `document.documentElement` (i.e. `:root`) before the React tree mounts.
4. All components already use CSS variables (`var(--background)`, `var(--primary)`, etc.) via Tailwind — no component files need to change.

---

## Theme Definitions

### Theme A — Light & Minimal
*Reference: Hermes, Architectural Digest, high-end editorial*

| Variable | Value | Role |
|----------|-------|------|
| `--background` | `#FAFAF8` | Warm off-white page background |
| `--foreground` | `#1A1A1A` | Near-black body text |
| `--card` | `#FFFFFF` | Card surfaces |
| `--card-foreground` | `#1A1A1A` | Card text |
| `--primary` | `#1B2D4F` | Deep navy — CTA buttons, active states |
| `--primary-foreground` | `#FFFFFF` | Text on primary |
| `--secondary` | `#F2EFE9` | Warm light gray surfaces |
| `--secondary-foreground` | `#1A1A1A` | Text on secondary |
| `--muted` | `#E8E4DC` | Subtle backgrounds |
| `--muted-foreground` | `#6B6860` | Subdued text |
| `--accent` | `#EAE6DF` | Hover/highlight surfaces |
| `--accent-foreground` | `#1A1A1A` | Text on accent |
| `--border` | `rgba(26,26,26,0.1)` | Delicate borders |
| `--input-background` | `#F2EFE9` | Input fields |
| `--sidebar` | `#F5F2EC` | Sidebar background |
| `--scrollbar-track` | `#F2EFE9` | Scrollbar track |
| `--scrollbar-thumb` | `#1B2D4F` | Scrollbar thumb |

**Inline color overrides in components** (hardcoded, not CSS vars):
- All `#C9A84C` / `#E8C96A` references → `#1B2D4F`
- All `#030303` / `#060606` / `#080808` / `#0a0a0a` / `#111111` background references → `#FAFAF8` or `#FFFFFF`
- All `rgba(201,168,76,...)` glow/border references → `rgba(27,45,79,...)`

---

### Theme B — Dark Refined
*Reference: Apple Pro, Bang & Olufsen, Rolls Royce digital*

| Variable | Value | Role |
|----------|-------|------|
| `--background` | `#0C0C0E` | Cool deep black |
| `--foreground` | `#EDEDF0` | Cool off-white text |
| `--card` | `#131316` | Slightly elevated dark surface |
| `--card-foreground` | `#EDEDF0` | Card text |
| `--primary` | `#EDEDF0` | Light — used for primary actions |
| `--primary-foreground` | `#0C0C0E` | Dark text on primary |
| `--secondary` | `#1C1C20` | Subtle dark surface |
| `--secondary-foreground` | `#EDEDF0` | Text on secondary |
| `--muted` | `#1C1C20` | Muted backgrounds |
| `--muted-foreground` | `#9090A0` | Subdued text |
| `--accent` | `#1C1C20` | Hover surfaces |
| `--accent-foreground` | `#EDEDF0` | Text on accent |
| `--border` | `rgba(237,237,240,0.08)` | Barely-visible cool outlines |
| `--input-background` | `#1C1C20` | Input fields |
| `--sidebar` | `#0F0F12` | Sidebar |
| `--scrollbar-track` | `#0C0C0E` | Scrollbar track |
| `--scrollbar-thumb` | `#C0C4D0` | Platinum scrollbar thumb |

**Inline color overrides in components:**
- All `#C9A84C` / `#E8C96A` → `#C0C4D0` (platinum silver)
- All `rgba(201,168,76,...)` → `rgba(192,196,208,...)`
- Dark backgrounds largely unchanged (already near-black)

---

### Theme C — Warm Neutral
*Reference: Luxury Scandinavian, high-end hospitality, Aesop*

| Variable | Value | Role |
|----------|-------|------|
| `--background` | `#F4EFE6` | Warm sand/stone |
| `--foreground` | `#1C1814` | Warm near-black |
| `--card` | `#FAF7F2` | Warm white card |
| `--card-foreground` | `#1C1814` | Card text |
| `--primary` | `#4A6741` | Sage green — CTA, active states |
| `--primary-foreground` | `#FFFFFF` | Text on primary |
| `--secondary` | `#EDE8DE` | Warm light surface |
| `--secondary-foreground` | `#1C1814` | Text on secondary |
| `--muted` | `#E4DDCF` | Muted warm background |
| `--muted-foreground` | `#6E6560` | Subdued warm text |
| `--accent` | `#E8E2D8` | Hover surfaces |
| `--accent-foreground` | `#1C1814` | Text on accent |
| `--border` | `rgba(28,24,20,0.1)` | Warm subtle borders |
| `--input-background` | `#EDE8DE` | Input fields |
| `--sidebar` | `#EEE9DF` | Sidebar |
| `--scrollbar-track` | `#EDE8DE` | Scrollbar track |
| `--scrollbar-thumb` | `#4A6741` | Sage scrollbar thumb |

**Inline color overrides in components:**
- All `#C9A84C` / `#E8C96A` → `#4A6741`
- All `rgba(201,168,76,...)` → `rgba(74,103,65,...)`
- All `#030303` / `#060606` / `#080808` / `#0a0a0a` / `#111111` backgrounds → `#F4EFE6` or `#FAF7F2`
- All `rgba(3,3,3,...)` / `rgba(8,8,8,...)` overlays → `rgba(28,24,20,...)`

---

## Inline Color Overrides in Components

The components (HeroSection, Navbar, ServicesSection, Footer, etc.) contain many hardcoded color values that are not referenced via CSS variables. These must be updated per-theme. The implementation plan must address all component files.

**Strategy:** Add a `getThemeColors()` utility (exported from `themes.ts`) that returns the raw color values for the active theme. Components that have hardcoded colors import this and use the returned values instead of literals.

This keeps the component code clean without requiring a React context or prop-drilling.

---

## Scrollbar

`src/styles/index.css` has hardcoded scrollbar colors. These will be changed to use the new `--scrollbar-track` and `--scrollbar-thumb` CSS variables.

---

## Out of Scope

- Runtime theme switching UI (toggle in the browser) — not requested
- Dark mode variants per theme — not requested
- Font changes — typography stays as Cormorant Garamond + Montserrat + Inter

---

## Success Criteria

1. Changing `ACTIVE_THEME` in `theme.config.ts` from `'A'` to `'B'` or `'C'` and reloading the dev server produces a visually distinct, premium-looking site with no gold remaining.
2. After the one-time migration (replacing hardcoded literals in components with `getThemeColors()` values), no component file needs to be edited to switch themes — only `theme.config.ts`.
3. Each theme looks intentional and polished — not just a color swap.
