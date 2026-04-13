import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { BRAND, FONT_FAMILY, fullScreen, headline } from "../styles";

/* Three messy window mockups */
function Window({
  title,
  children,
  rotation,
  fromX,
  fromY,
  delay,
}: {
  title: string;
  children: React.ReactNode;
  rotation: number;
  fromX: number;
  fromY: number;
  delay: number;
}) {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - delay, [0, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const x = interpolate(progress, [0, 1], [fromX, 0]);
  const y = interpolate(progress, [0, 1], [fromY, 0]);
  const opacity = interpolate(progress, [0, 0.3, 1], [0, 0.8, 1]);

  return (
    <div
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
        opacity,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        border: `1px solid ${BRAND.border}`,
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        width: 380,
        overflow: "hidden",
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          padding: "10px 16px",
          borderBottom: `1px solid ${BRAND.border}`,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#EF4444" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#22C55E" }} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 500, color: BRAND.muted }}>{title}</span>
      </div>
      <div style={{ padding: 16 }}>{children}</div>
    </div>
  );
}

export const Scene0a_Problem: React.FC = () => {
  const frame = useCurrentFrame();

  /* Headline fade */
  const headOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headY = interpolate(frame, [0, 40], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <AbsoluteFill style={fullScreen}>
      {/* Headline */}
      <h1
        style={{
          ...headline,
          opacity: headOpacity,
          transform: `translateY(${headY}px)`,
          marginBottom: 60,
        }}
      >
        Running a roastery means juggling a lot.
      </h1>

      {/* Three scattered windows */}
      <div
        style={{
          display: "flex",
          gap: 30,
          position: "relative",
        }}
      >
        {/* Messy spreadsheet */}
        <Window title="orders.xlsx" rotation={-4} fromX={-400} fromY={100} delay={40}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {["Order", "Customer", "Product", "Qty", "Status"].map((h, i) => (
              <div key={h} style={{ display: "flex", gap: 2 }}>
                <div
                  style={{
                    flex: 1,
                    height: 22,
                    backgroundColor: i === 0 ? "#DBEAFE" : "#F9FAFB",
                    borderRadius: 2,
                    border: `1px solid ${BRAND.border}`,
                    fontSize: 10,
                    fontWeight: i === 0 ? 600 : 400,
                    color: i === 0 ? BRAND.dark : BRAND.muted,
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 6,
                    fontFamily: FONT_FAMILY,
                  }}
                >
                  {h}
                </div>
                {[1, 2, 3, 4].map((c) => (
                  <div
                    key={c}
                    style={{
                      flex: 1,
                      height: 22,
                      backgroundColor: i === 0 ? "#DBEAFE" : "#F9FAFB",
                      borderRadius: 2,
                      border: `1px solid ${BRAND.border}`,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </Window>

        {/* Overflowing inbox */}
        <Window title="Inbox — 47 unread" rotation={2} fromX={0} fromY={-300} delay={52}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { from: "The Daily Grind", subject: "Order req — House Blend", unread: true },
              { from: "Cafe Nero", subject: "Re: Delivery next week", unread: true },
              { from: "Bean & Gone", subject: "Wholesale enquiry", unread: true },
              { from: "Xero", subject: "Invoice #1042 overdue", unread: true },
              { from: "Royal Mail", subject: "Shipment update", unread: false },
            ].map((e) => (
              <div
                key={e.subject}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "6px 0",
                  borderBottom: `1px solid #F3F4F6`,
                }}
              >
                {e.unread && (
                  <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: BRAND.blue, flexShrink: 0 }} />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: e.unread ? 700 : 400, color: BRAND.dark, fontFamily: FONT_FAMILY }}>{e.from}</div>
                  <div style={{ fontSize: 10, color: BRAND.muted, fontFamily: FONT_FAMILY }}>{e.subject}</div>
                </div>
              </div>
            ))}
          </div>
        </Window>

        {/* Handwritten notes */}
        <Window title="notes.txt" rotation={5} fromX={400} fromY={150} delay={64}>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 13,
              color: "#4B5563",
              lineHeight: 2.0,
              whiteSpace: "pre-wrap",
            }}
          >
            {`Daily Grind — 10x House Blend
Cafe Nero — check stock??
Ethiopia batch — weight loss 17%?
Call supplier re: Colombia lot
Invoice #42 — still unpaid!`}
          </div>
        </Window>
      </div>
    </AbsoluteFill>
  );
};
