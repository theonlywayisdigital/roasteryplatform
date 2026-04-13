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

export const Scene0c_LogoIntro: React.FC = () => {
  const frame = useCurrentFrame();

  const logoOpacity = interpolate(frame, [6, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(frame, [6, 20], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const taglineOpacity = interpolate(frame, [24, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [24, 38], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={fullScreen}>
      <Img
        src={staticFile("ghost-roastery-platform-logo.png")}
        style={{
          height: 240,
          objectFit: "contain",
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
        }}
      />
      <p
        style={{
          fontSize: 28,
          fontWeight: 500,
          color: BRAND.muted,
          fontFamily: FONT_FAMILY,
          marginTop: 30,
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
        }}
      >
        The complete platform for independent roasters.
      </p>
    </AbsoluteFill>
  );
};
