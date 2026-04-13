import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
  staticFile,
  Img,
} from "remotion";
import { fullScreen, BRAND, FONT_FAMILY } from "../styles";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();

  /* Main headline */
  const textOpacity = interpolate(frame, [6, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(frame, [6, 20], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  /* URL */
  const urlOpacity = interpolate(frame, [30, 44], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const urlY = interpolate(frame, [30, 44], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  /* Logo */
  const logoOpacity = interpolate(frame, [48, 66], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(frame, [48, 66], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={fullScreen}>
      <h1
        style={{
          fontSize: 60,
          fontWeight: 900,
          color: BRAND.dark,
          fontFamily: FONT_FAMILY,
          letterSpacing: -1,
          lineHeight: 1.2,
          textAlign: "center" as const,
          margin: 0,
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        Your roastery. Fully under control.
      </h1>

      <p
        style={{
          fontSize: 26,
          fontWeight: 600,
          color: BRAND.blue,
          fontFamily: FONT_FAMILY,
          marginTop: 20,
          opacity: urlOpacity,
          transform: `translateY(${urlY}px)`,
        }}
      >
        roasteryplatform.com
      </p>

      <div
        style={{
          marginTop: 40,
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
        }}
      >
        <Img
          src={staticFile("ghost-roastery-platform-logo.png")}
          style={{ height: 180, objectFit: "contain" }}
        />
      </div>
    </AbsoluteFill>
  );
};
