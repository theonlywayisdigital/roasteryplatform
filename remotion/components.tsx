import React, { CSSProperties } from "react";
import { BRAND, FONT_FAMILY, mockupCard, mockupField, mockupLabel } from "./styles";

/* ── Off Your Bean inline SVG logo (adapted from feature-animations) ── */

export function OffYourBeanLogo({ size = 48 }: { size?: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <path
        d="M100 20C60 20 30 55 30 95c0 25 10 45 25 58l-5 30c-1 6 4 11 10 10l15-3c7 4 16 6 25 6s18-2 25-6l15 3c6 1 11-4 10-10l-5-30c15-13 25-33 25-58 0-40-30-75-70-75z"
        fill="#F5F0EB"
        stroke="#1A1A1A"
        strokeWidth="6"
      />
      <ellipse cx="75" cy="90" rx="14" ry="16" fill="#1A1A1A" />
      <ellipse cx="125" cy="90" rx="14" ry="16" fill="#1A1A1A" />
      <path d="M95 110l5 8 5-8" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M72 130h56M80 130v10M90 130v10M100 130v10M110 130v10M120 130v10" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="65" cy="45" rx="8" ry="12" transform="rotate(-30 65 45)" fill="#1A1A1A" />
      <ellipse cx="85" cy="32" rx="8" ry="12" transform="rotate(-10 85 32)" fill="#1A1A1A" />
      <ellipse cx="110" cy="30" rx="8" ry="12" transform="rotate(15 110 30)" fill="#1A1A1A" />
      <ellipse cx="132" cy="42" rx="8" ry="12" transform="rotate(35 132 42)" fill="#1A1A1A" />
      <ellipse cx="50" cy="62" rx="7" ry="10" transform="rotate(-45 50 62)" fill="#1A1A1A" />
      <ellipse cx="148" cy="58" rx="7" ry="10" transform="rotate(50 148 58)" fill="#1A1A1A" />
    </svg>
  );
}

/* ── Roastery Platform logo (recreated as SVG for Remotion) ── */

export function RoasteryPlatformLogo({ height = 80 }: { height?: number }) {
  const aspectRatio = 800 / 300;
  const w = height * aspectRatio;
  return (
    <svg viewBox="0 0 800 300" width={w} height={height} fill="none">
      {/* Coffee bean icon */}
      <g transform="translate(0, 40)">
        {/* Bottom disc */}
        <ellipse cx="100" cy="200" rx="85" ry="30" fill="#1A2744" />
        {/* Middle disc */}
        <ellipse cx="100" cy="175" rx="85" ry="30" fill="#2563EB" />
        {/* Top disc - bean shape */}
        <ellipse cx="100" cy="140" rx="85" ry="55" fill="#5B9CF5" />
        {/* Bean crease */}
        <path
          d="M60 100 Q100 170 140 100"
          stroke="white"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      {/* Text */}
      <text x="220" y="145" fill="#0F172A" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="80" letterSpacing="-1">
        ROASTERY
      </text>
      <text x="220" y="235" fill="#0F172A" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="80" letterSpacing="-1">
        PLATFORM
      </text>
    </svg>
  );
}

/* ── Reusable field component ── */

export function Field({
  label,
  value,
  style,
}: {
  label: string;
  value: string;
  style?: CSSProperties;
}) {
  return (
    <div style={{ ...style }}>
      <div style={mockupLabel}>{label}</div>
      <div style={mockupField}>{value}</div>
    </div>
  );
}

/* ── Card wrapper ── */

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: CSSProperties;
}) {
  return <div style={{ ...mockupCard, ...style }}>{children}</div>;
}

/* ── Status badge ── */

export function StatusBadge({
  label,
  bg,
  color,
  dot,
}: {
  label: string;
  bg: string;
  color: string;
  dot?: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 14px",
        borderRadius: 20,
        fontSize: 14,
        fontWeight: 600,
        backgroundColor: bg,
        color,
        fontFamily: FONT_FAMILY,
      }}
    >
      {dot && (
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: dot,
          }}
        />
      )}
      {label}
    </span>
  );
}

/* ── Icon circle ── */

export function IconCircle({
  color,
  bg,
  size = 40,
  children,
}: {
  color: string;
  bg: string;
  size?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        backgroundColor: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

/* ── Integration tile ── */

export function IntegrationTile({
  name,
  color,
  connected,
  style,
}: {
  name: string;
  color: string;
  connected: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        backgroundColor: "#FFFFFF",
        border: `1px solid ${BRAND.border}`,
        borderRadius: 12,
        padding: "14px 20px",
        position: "relative",
        fontFamily: FONT_FAMILY,
        ...style,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 6,
          backgroundColor: color,
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 16, fontWeight: 500, color: "#374151" }}>
        {name}
      </span>
      {connected && (
        <div
          style={{
            position: "absolute",
            top: -6,
            right: -6,
            width: 22,
            height: 22,
            borderRadius: "50%",
            backgroundColor: BRAND.green,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6L5 9L10 3"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
