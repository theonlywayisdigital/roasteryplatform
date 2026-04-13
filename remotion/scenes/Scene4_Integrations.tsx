import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { fullScreen, headline, BRAND, FONT_FAMILY } from "../styles";
import { IntegrationTile } from "../components";

const stores = [
  { name: "Shopify", color: "#96BF48" },
  { name: "WooCommerce", color: "#7F54B3" },
  { name: "Wix", color: "#0C6EFC" },
  { name: "Squarespace", color: "#000000" },
];

export const Scene4_Integrations: React.FC = () => {
  const frame = useCurrentFrame();

  const headOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const headY = interpolate(frame, [0, 12], [25, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill style={fullScreen}>
      <h1 style={{ ...headline, opacity: headOpacity, transform: `translateY(${headY}px)`, marginBottom: 50 }}>
        Connect your existing stores.
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, width: 600 }}>
        {stores.map((s, idx) => {
          const scale = interpolate(frame, [24, 44], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.back(1.4)),
          });
          const opacity = interpolate(frame, [24, 39], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const connected = frame >= 46 + idx * 8;

          return (
            <div
              key={s.name}
              style={{
                transform: `scale(${scale})`,
                opacity,
              }}
            >
              <IntegrationTile name={s.name} color={s.color} connected={connected} />
            </div>
          );
        })}
      </div>

      {/* "All connected" label */}
      {(() => {
        const allDelay = 80;
        const labelOpacity = interpolate(frame, [allDelay, allDelay + 20], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const labelY = interpolate(frame, [allDelay, allDelay + 20], [15, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        return (
          <div
            style={{
              marginTop: 30,
              opacity: labelOpacity,
              transform: `translateY(${labelY}px)`,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: BRAND.green }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: BRAND.green, fontFamily: FONT_FAMILY }}>
              Your storefront connected
            </span>
          </div>
        );
      })()}
    </AbsoluteFill>
  );
};
