import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { fullScreen, headline, BRAND, FONT_FAMILY } from "../styles";
import { Card, Field } from "../components";

export const Scene10_EmailCampaigns: React.FC = () => {
  const frame = useCurrentFrame();

  const headOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const headY = interpolate(frame, [0, 12], [25, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* Main card — fade + scale up */
  const cardOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardScale = interpolate(frame, [10, 22], [0.95, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* Side cards — fade + slide from right */
  const sideOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sideX = interpolate(frame, [10, 22], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  const fo = (d: number) => interpolate(frame, [d, d + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fy = (d: number) => interpolate(frame, [d, d + 15], [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* Audience badge */
  const audienceScale = interpolate(frame, [42, 54], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.3)) });

  /* Stat counters — appear with card */
  const openRate = Math.round(interpolate(frame, [0, 55], [0, 68], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }));
  const clickRate = Math.round(interpolate(frame, [0, 55], [0, 24], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }));

  return (
    <AbsoluteFill style={fullScreen}>
      <h1 style={{ ...headline, opacity: headOpacity, transform: `translateY(${headY}px)`, marginBottom: 40 }}>
        Keep buyers coming back.
      </h1>

      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div style={{ opacity: cardOpacity, transform: `scale(${cardScale})`, transformOrigin: "left center" }}>
        <Card style={{ width: 440 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 18 18"><rect x="2" y="4" width="14" height="10" rx="2" stroke={BRAND.blue} strokeWidth="1.5" fill="none" /><path d="M2 6l7 4 7-4" stroke={BRAND.blue} strokeWidth="1.5" fill="none" /></svg>
            </div>
            <span style={{ fontSize: 16, fontWeight: 700, color: BRAND.dark, fontFamily: FONT_FAMILY }}>New Campaign</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ opacity: fo(18), transform: `translateY(${fy(18)}px)` }}>
              <Field label="From" value="Off Your Bean" />
            </div>
            <div style={{ opacity: fo(28), transform: `translateY(${fy(28)}px)` }}>
              <Field label="Subject" value="New arrival: Ethiopia Yirgacheffe" />
            </div>
            <div style={{ opacity: fo(34), transform: `translateY(${fy(34)}px)` }}>
              <Field label="Preview" value="We've just landed a stunning washed lot from Yirgacheffe..." />
            </div>
          </div>

          {/* Audience badge */}
          <div style={{ marginTop: 18, opacity: fo(42), transform: `scale(${audienceScale})`, transformOrigin: "left" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 20, backgroundColor: "#DBEAFE", color: BRAND.blue, fontSize: 14, fontWeight: 600, fontFamily: FONT_FAMILY }}>
              <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="6" cy="6" r="3" stroke={BRAND.blue} strokeWidth="1.2" fill="none" /><path d="M1 14c0-3 2-5 5-5" stroke={BRAND.blue} strokeWidth="1.2" fill="none" /><circle cx="11" cy="6" r="2.5" stroke={BRAND.blue} strokeWidth="1.2" fill="none" /><path d="M8 14c0-2.5 1.5-4 3-4s3 1.5 3 4" stroke={BRAND.blue} strokeWidth="1.2" fill="none" /></svg>
              42 wholesale buyers
            </span>
          </div>
        </Card>
        </div>

        {/* Stat tiles — slide from right */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, opacity: sideOpacity, transform: `translateX(${sideX}px)` }}>
          <Card style={{ width: 200 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 14 14"><rect x="1" y="8" width="3" height="5" fill="#16A34A" rx="1" /><rect x="5.5" y="5" width="3" height="8" fill="#16A34A" rx="1" /><rect x="10" y="2" width="3" height="11" fill="#16A34A" rx="1" /></svg>
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: BRAND.muted, fontFamily: FONT_FAMILY }}>Open Rate</span>
            </div>
            <span style={{ fontSize: 32, fontWeight: 900, color: BRAND.dark, fontFamily: FONT_FAMILY, fontVariantNumeric: "tabular-nums" }}>
              {openRate}<span style={{ fontSize: 16, fontWeight: 500, color: BRAND.muted }}>%</span>
            </span>
          </Card>

          <Card style={{ width: 200 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 14 14"><rect x="1" y="8" width="3" height="5" fill={BRAND.blue} rx="1" /><rect x="5.5" y="5" width="3" height="8" fill={BRAND.blue} rx="1" /><rect x="10" y="2" width="3" height="11" fill={BRAND.blue} rx="1" /></svg>
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: BRAND.muted, fontFamily: FONT_FAMILY }}>Click Rate</span>
            </div>
            <span style={{ fontSize: 32, fontWeight: 900, color: BRAND.dark, fontFamily: FONT_FAMILY, fontVariantNumeric: "tabular-nums" }}>
              {clickRate}<span style={{ fontSize: 16, fontWeight: 500, color: BRAND.muted }}>%</span>
            </span>
          </Card>
        </div>
      </div>
    </AbsoluteFill>
  );
};
