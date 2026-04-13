import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { fullScreen, headline, BRAND, FONT_FAMILY } from "../styles";
import { Card, Field } from "../components";

export const Scene12_EmbeddedForms: React.FC = () => {
  const frame = useCurrentFrame();

  const headOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const headY = interpolate(frame, [0, 12], [25, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  const cardOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardY = interpolate(frame, [10, 22], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  const fo = (d: number) => interpolate(frame, [d, d + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fy = (d: number) => interpolate(frame, [d, d + 15], [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* Field highlighting */
  const field0Active = frame >= 26 && frame < 44;
  const field1Active = frame >= 38 && frame < 56;
  const field0Value = frame >= 26 ? "The Daily Grind" : "";
  const field1Value = frame >= 38 ? "hello@dailygrind.co" : "";

  /* Leads counter — appears with card */
  const leadsOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const leadsY = interpolate(frame, [10, 22], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const leadsVal = Math.round(interpolate(frame, [0, 45], [0, 12], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }));

  return (
    <AbsoluteFill style={fullScreen}>
      <h1 style={{ ...headline, opacity: headOpacity, transform: `translateY(${headY}px)`, marginBottom: 40 }}>
        Grow your wholesale list on autopilot.
      </h1>

      <div style={{ display: "flex", gap: 24, alignItems: "flex-start", opacity: cardOpacity, transform: `translateY(${cardY}px)` }}>
        <Card style={{ width: 420 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 18 18"><path d="M3 3h12v12H3z" stroke={BRAND.blue} strokeWidth="1.5" fill="none" rx="2" /><path d="M6 8h6M6 11h4" stroke={BRAND.blue} strokeWidth="1.5" strokeLinecap="round" /></svg>
            </div>
            <span style={{ fontSize: 16, fontWeight: 700, color: BRAND.dark, fontFamily: FONT_FAMILY }}>Embedded Form</span>
          </div>

          <h3 style={{ fontSize: 22, fontWeight: 900, color: BRAND.dark, marginBottom: 20, fontFamily: FONT_FAMILY, opacity: fo(18), transform: `translateY(${fy(18)}px)` }}>
            Join our wholesale list
          </h3>

          {/* Business Name */}
          <div style={{ marginBottom: 14, opacity: fo(18), transform: `translateY(${fy(18)}px)` }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: BRAND.muted, marginBottom: 6, fontFamily: FONT_FAMILY }}>Business Name</div>
            <div style={{
              backgroundColor: BRAND.fieldBg,
              border: `2px solid ${field0Active ? BRAND.blue : BRAND.border}`,
              borderRadius: 10,
              padding: "10px 16px",
              fontSize: 16,
              fontWeight: 500,
              color: BRAND.dark,
              fontFamily: FONT_FAMILY,
              minHeight: 20,
              boxShadow: field0Active ? `0 0 0 3px rgba(37,99,235,0.1)` : "none",
            }}>
              {field0Value}
              {field0Active && <span style={{ display: "inline-block", width: 2, height: 18, backgroundColor: BRAND.blue, marginLeft: 2, verticalAlign: "text-bottom" }} />}
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: 20, opacity: fo(18), transform: `translateY(${fy(18)}px)` }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: BRAND.muted, marginBottom: 6, fontFamily: FONT_FAMILY }}>Email Address</div>
            <div style={{
              backgroundColor: BRAND.fieldBg,
              border: `2px solid ${field1Active ? BRAND.blue : BRAND.border}`,
              borderRadius: 10,
              padding: "10px 16px",
              fontSize: 16,
              fontWeight: 500,
              color: BRAND.dark,
              fontFamily: FONT_FAMILY,
              minHeight: 20,
              boxShadow: field1Active ? `0 0 0 3px rgba(37,99,235,0.1)` : "none",
            }}>
              {field1Value}
              {field1Active && <span style={{ display: "inline-block", width: 2, height: 18, backgroundColor: BRAND.blue, marginLeft: 2, verticalAlign: "text-bottom" }} />}
            </div>
          </div>

          {/* Submit button */}
          <div style={{ opacity: fo(18) }}>
            <div style={{ backgroundColor: BRAND.blue, color: "#fff", padding: "10px 24px", borderRadius: 10, fontSize: 15, fontWeight: 600, display: "inline-block", fontFamily: FONT_FAMILY }}>
              Submit
            </div>
          </div>
        </Card>

        {/* Leads counter */}
        <div style={{ opacity: leadsOpacity, transform: `translateY(${leadsY}px)` }}>
          <Card style={{ width: 240, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 18 18"><path d="M5 13l4-4 4 4" stroke="#16A34A" strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M5 8l4-4 4 4" stroke="#16A34A" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" /></svg>
              </div>
              <div>
                <span style={{ fontSize: 12, fontWeight: 500, color: BRAND.muted, fontFamily: FONT_FAMILY, display: "block" }}>New leads</span>
                <span style={{ fontSize: 11, color: BRAND.muted, fontFamily: FONT_FAMILY }}>this month</span>
              </div>
            </div>
            <span style={{ fontSize: 32, fontWeight: 900, color: BRAND.dark, fontFamily: FONT_FAMILY, fontVariantNumeric: "tabular-nums" }}>
              {leadsVal}
            </span>
          </Card>
        </div>
      </div>
    </AbsoluteFill>
  );
};
