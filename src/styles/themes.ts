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
  avatarColors: readonly [string, string, string];

  // Contact map iframe CSS filter
  mapFilter: string;

  // Scrollbar
  scrollbarTrack: string;
  scrollbarThumb: string;

  // Selection highlight
  selectionBg: string;
  selectionText: string;
  // Logo filter (for navbar logo visibility on different bg colors)
  logoFilter: string;
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

    selectionBg: '#1B2D4F',
    selectionText: '#FFFFFF',
    logoFilter: 'none',
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

    selectionBg: '#C0C4D0',
    selectionText: '#0C0C0E',
    logoFilter: 'brightness(0) invert(1)',
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

    selectionBg: '#4A6741',
    selectionText: '#FFFFFF',
    logoFilter: 'none',
  },

  // ── Theme D: Luxury Estate (Venus & Jupiter — Warm Beige + Forest Green + Bronze/Gold) ──
  D: {
    accent: '#2C4A3A',
    accentHover: '#1E3528',
    accentLight: '#3D6B57',
    accentRgb: '44,74,58',
    onAccent: '#F0E2C8',

    sectionDark: '#CBAF7D',
    sectionMid: '#D9C498',
    sectionLight: '#E5D2B0',
    sectionWhite: '#F0E2C8',

    cardBg: '#F0E2C8',
    cardBgSubtle: '#D9C498',
    inputBg: '#D9C498',

    navScrolledBg: 'rgba(203,175,125,0.96)',
    navShadow: '0 1px 0 rgba(44,74,58,0.15), 0 8px 40px rgba(28,20,16,0.10)',
    mobileMenuBg: 'rgba(203,175,125,0.97)',

    textPrimary: '#1C1410',
    textSecondary: 'rgba(28,20,16,0.62)',
    textMuted: 'rgba(28,20,16,0.42)',

    borderMedium: 'rgba(28,20,16,0.15)',
    borderSubtle: 'rgba(28,20,16,0.09)',

    ctaOverlayStart: 'rgba(217,196,152,0.95)',
    ctaOverlayMid: 'rgba(217,196,152,0.85)',
    ctaOverlayEnd: 'rgba(217,196,152,0.60)',

    galleryOverlay: 'rgba(28,20,16,0)',

    glowColor: 'rgba(160,120,48,0.12)',

    avatarColors: ['#2C4A3A', '#A07830', '#3D6B57'],

    mapFilter: 'none',

    scrollbarTrack: '#D9C498',
    scrollbarThumb: '#A07830',

    selectionBg: '#A07830',
    selectionText: '#F0E2C8',
    logoFilter: 'none',
  },

  // ── Theme E: True Beige (Classic Internet Beige — F5F5DC family + warm taupe accents) ──
  E: {
    accent: '#7C6A52',
    accentHover: '#62533E',
    accentLight: '#9E896E',
    accentRgb: '124,106,82',
    onAccent: '#FFFFF0',

    sectionDark: '#D4C8B0',
    sectionMid: '#DDD2BE',
    sectionLight: '#EAE3D2',
    sectionWhite: '#F5F0E8',

    cardBg: '#F5F0E8',
    cardBgSubtle: '#DDD2BE',
    inputBg: '#DDD2BE',

    navScrolledBg: 'rgba(212,200,176,0.96)',
    navShadow: '0 1px 0 rgba(124,106,82,0.18), 0 8px 40px rgba(40,30,20,0.10)',
    mobileMenuBg: 'rgba(212,200,176,0.97)',

    textPrimary: '#2C2318',
    textSecondary: 'rgba(44,35,24,0.62)',
    textMuted: 'rgba(44,35,24,0.42)',

    borderMedium: 'rgba(44,35,24,0.15)',
    borderSubtle: 'rgba(44,35,24,0.09)',

    ctaOverlayStart: 'rgba(221,210,190,0.95)',
    ctaOverlayMid: 'rgba(221,210,190,0.85)',
    ctaOverlayEnd: 'rgba(221,210,190,0.60)',

    galleryOverlay: 'rgba(44,35,24,0)',

    glowColor: 'rgba(124,106,82,0.14)',

    avatarColors: ['#7C6A52', '#62533E', '#9E896E'],

    mapFilter: 'none',

    scrollbarTrack: '#DDD2BE',
    scrollbarThumb: '#7C6A52',

    selectionBg: '#7C6A52',
    selectionText: '#FFFFF0',
    logoFilter: 'none',
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
    '--t-accent-light': c.accentLight,
    '--t-nav-scrolled-bg': c.navScrolledBg,
    '--t-nav-shadow': c.navShadow,
    '--t-mobile-menu-bg': c.mobileMenuBg,
    '--t-glow-color': c.glowColor,
    '--t-card-bg': c.cardBg,
    '--t-card-bg-subtle': c.cardBgSubtle,
    '--t-input-bg': c.inputBg,
    '--t-text-primary': c.textPrimary,
    '--t-text-secondary': c.textSecondary,
    '--t-text-muted': c.textMuted,
    '--t-border-medium': c.borderMedium,
    '--t-border-subtle': c.borderSubtle,
    '--t-cta-overlay-start': c.ctaOverlayStart,
    '--t-cta-overlay-mid':   c.ctaOverlayMid,
    '--t-cta-overlay-end':   c.ctaOverlayEnd,
    '--t-gallery-overlay':   c.galleryOverlay,
    '--t-map-filter':        c.mapFilter,
    '--t-logo-filter':       c.logoFilter,
    '--t-scrollbar-track': c.scrollbarTrack,
    '--t-scrollbar-thumb': c.scrollbarThumb,
    '--t-selection-bg': c.selectionBg,
    '--t-selection-text': c.selectionText,
  };
}
