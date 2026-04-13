import { CSSProperties } from "react";

/* ── Brand tokens ─────────────────────────────────── */
export const BRAND = {
  blue: "#2563EB",
  orange: "#D97706",
  dark: "#0F172A",
  muted: "#64748B",
  bg: "#FFFFFF",
  border: "#E5E7EB",
  fieldBg: "#F9FAFB",
  green: "#16A34A",
  greenLight: "#DCFCE7",
  red: "#EF4444",
  redLight: "#FEE2E2",
} as const;

/* ── Font loading ─────────────────────────────────── */
export const FONT_FAMILY = "Inter, -apple-system, BlinkMacSystemFont, sans-serif";

/* ── Video spec ───────────────────────────────────── */
export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

/* ── Reusable easing (cubic-bezier as spring-like) ── */
export const EASE_VALUES = [0.21, 0.47, 0.32, 0.98] as const;

/* ── Helper styles ────────────────────────────────── */
export const fullScreen: CSSProperties = {
  width: VIDEO.width,
  height: VIDEO.height,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: BRAND.bg,
  fontFamily: FONT_FAMILY,
  overflow: "hidden",
};

export const headline: CSSProperties = {
  fontSize: 56,
  fontWeight: 900,
  color: BRAND.dark,
  fontFamily: FONT_FAMILY,
  letterSpacing: -1,
  lineHeight: 1.2,
  textAlign: "center" as const,
  margin: 0,
};

export const subtext: CSSProperties = {
  fontSize: 24,
  fontWeight: 500,
  color: BRAND.muted,
  fontFamily: FONT_FAMILY,
  lineHeight: 1.5,
  textAlign: "center" as const,
  margin: 0,
};

/* ── Mockup card ──────────────────────────────────── */
export const mockupCard: CSSProperties = {
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  border: `1px solid ${BRAND.border}`,
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  padding: 32,
  fontFamily: FONT_FAMILY,
};

export const mockupField: CSSProperties = {
  backgroundColor: BRAND.fieldBg,
  border: `1px solid ${BRAND.border}`,
  borderRadius: 10,
  padding: "10px 16px",
  fontSize: 16,
  fontWeight: 500,
  color: BRAND.dark,
  fontFamily: FONT_FAMILY,
};

export const mockupLabel: CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  color: BRAND.muted,
  marginBottom: 6,
  fontFamily: FONT_FAMILY,
};

export const blueButton: CSSProperties = {
  backgroundColor: BRAND.blue,
  color: "#FFFFFF",
  padding: "10px 24px",
  borderRadius: 10,
  fontSize: 15,
  fontWeight: 600,
  border: "none",
  fontFamily: FONT_FAMILY,
};

export const badge = (bg: string, color: string): CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "5px 14px",
  borderRadius: 20,
  fontSize: 13,
  fontWeight: 600,
  backgroundColor: bg,
  color,
  fontFamily: FONT_FAMILY,
});
