import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { fullScreen, headline } from "../styles";

export const Scene0b_Transition: React.FC = () => {
  const frame = useCurrentFrame();

  const textOpacity = interpolate(frame, [8, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(frame, [8, 22], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={fullScreen}>
      <h1
        style={{
          ...headline,
          fontSize: 64,
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        There&apos;s a better way.
      </h1>
    </AbsoluteFill>
  );
};
