import React, { useMemo } from "react";
import { AbsoluteFill, Composition, Easing, interpolate } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";

import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";
import { BRAND, VIDEO } from "./styles";

/* ── Individual scenes ── */
import { Scene0a_Problem } from "./scenes/Scene0a_Problem";
import { Scene0b_Transition } from "./scenes/Scene0b_Transition";
import { Scene0c_LogoIntro } from "./scenes/Scene0c_LogoIntro";
import { MergedScene1_GreenBeanRoastLog } from "./scenes/MergedScene1_GreenBeanRoastLog";
import { MergedScene2_WholesalePortal } from "./scenes/MergedScene2_WholesalePortal";
import { Scene4_Integrations } from "./scenes/Scene4_Integrations";
import { Scene5_Purchasing } from "./scenes/Scene5_Purchasing";
import { Scene6_Inbox } from "./scenes/Scene6_Inbox";
import { Scene7_Orders } from "./scenes/Scene7_Orders";
import { Scene8_CRM } from "./scenes/Scene8_CRM";
import { Scene9_Invoicing } from "./scenes/Scene9_Invoicing";
import { Scene10_EmailCampaigns } from "./scenes/Scene10_EmailCampaigns";
import { Scene11_SocialScheduling } from "./scenes/Scene11_SocialScheduling";
import { Scene12_EmbeddedForms } from "./scenes/Scene12_EmbeddedForms";
import { Outro } from "./scenes/Outro";

/* ═══════════════════════════════════════════════════════
   Custom transition presentations
   ═══════════════════════════════════════════════════════ */

/* ── White Flash ──
   Exiting scene fades to white (first half),
   then entering scene fades from white (second half).
   Sharp camera-shutter feel.
   ─────────────────────────────────────────────────── */

type WhiteFlashProps = Record<string, unknown>;

const WhiteFlashPresentation: React.FC<
  TransitionPresentationComponentProps<WhiteFlashProps>
> = ({ children, presentationDirection, presentationProgress }) => {
  const isEntering = presentationDirection === "entering";

  const style = useMemo((): React.CSSProperties => {
    if (isEntering) {
      // Entering: invisible for first half, then fade from white → scene
      const enterProgress = interpolate(
        presentationProgress,
        [0.5, 1],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      );
      return { opacity: enterProgress };
    }
    // Exiting: fade scene → white for first half, then invisible
    const exitProgress = interpolate(
      presentationProgress,
      [0, 0.5],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    return { opacity: exitProgress };
  }, [isEntering, presentationProgress]);

  return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
};

const whiteFlash = (): TransitionPresentation<WhiteFlashProps> => ({
  component: WhiteFlashPresentation,
  props: {},
});

/* ── Zoom Through ──
   Exiting scene zooms in (scale up) and fades out,
   entering scene fades in behind it.
   ─────────────────────────────────────────────────── */

type ZoomThroughProps = Record<string, unknown>;

const ZoomThroughPresentation: React.FC<
  TransitionPresentationComponentProps<ZoomThroughProps>
> = ({ children, presentationDirection, presentationProgress }) => {
  const isEntering = presentationDirection === "entering";

  const style = useMemo((): React.CSSProperties => {
    const eased = Easing.inOut(Easing.cubic)(presentationProgress);

    if (isEntering) {
      // Entering: fade in from behind
      return { opacity: eased };
    }
    // Exiting: zoom in and fade out
    const scale = interpolate(eased, [0, 1], [1, 3]);
    const opacity = interpolate(eased, [0, 0.7, 1], [1, 0.3, 0]);
    return {
      transform: `scale(${scale})`,
      opacity,
      zIndex: 1,
    };
  }, [isEntering, presentationProgress]);

  return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
};

const zoomThrough = (): TransitionPresentation<ZoomThroughProps> => ({
  component: ZoomThroughPresentation,
  props: {},
});

/* ── Shared Element: Morph ──
   Exiting scene scales down + slides left,
   entering scene scales up from center.
   ─────────────────────────────────────────────────── */

type MorphProps = Record<string, unknown>;

const MorphPresentation: React.FC<
  TransitionPresentationComponentProps<MorphProps>
> = ({ children, presentationDirection, presentationProgress }) => {
  const isEntering = presentationDirection === "entering";

  const style = useMemo((): React.CSSProperties => {
    const eased = Easing.inOut(Easing.cubic)(presentationProgress);

    if (isEntering) {
      // Entering: scale up from small, fade in
      const scale = interpolate(eased, [0, 1], [0.85, 1]);
      const opacity = interpolate(eased, [0, 0.4, 1], [0, 0.8, 1]);
      return {
        transform: `scale(${scale})`,
        opacity,
      };
    }
    // Exiting: scale down + slide left, fade out
    const scale = interpolate(eased, [0, 1], [1, 0.7]);
    const translateX = interpolate(eased, [0, 1], [0, -300]);
    const opacity = interpolate(eased, [0, 0.6, 1], [1, 0.5, 0]);
    return {
      transform: `scale(${scale}) translateX(${translateX}px)`,
      opacity,
    };
  }, [isEntering, presentationProgress]);

  return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
};

const morph = (): TransitionPresentation<MorphProps> => ({
  component: MorphPresentation,
  props: {},
});

/* ── Shared Element: Cross-Slide ──
   Exiting scene slides out left,
   entering scene slides in from right — simultaneously.
   ─────────────────────────────────────────────────── */

type CrossSlideProps = Record<string, unknown>;

const CrossSlidePresentation: React.FC<
  TransitionPresentationComponentProps<CrossSlideProps>
> = ({ children, presentationDirection, presentationProgress }) => {
  const isEntering = presentationDirection === "entering";

  const style = useMemo((): React.CSSProperties => {
    const eased = Easing.inOut(Easing.cubic)(presentationProgress);

    if (isEntering) {
      const translateX = interpolate(eased, [0, 1], [1920, 0]);
      return { transform: `translateX(${translateX}px)` };
    }
    const translateX = interpolate(eased, [0, 1], [0, -1920]);
    return { transform: `translateX(${translateX}px)` };
  }, [isEntering, presentationProgress]);

  return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
};

const crossSlide = (): TransitionPresentation<CrossSlideProps> => ({
  component: CrossSlidePresentation,
  props: {},
});

/* ── Shared Element: Expand ──
   Exiting scene's card grows to fill screen,
   entering scene emerges as the expanding card morphs.
   ─────────────────────────────────────────────────── */

type ExpandProps = Record<string, unknown>;

const ExpandPresentation: React.FC<
  TransitionPresentationComponentProps<ExpandProps>
> = ({ children, presentationDirection, presentationProgress }) => {
  const isEntering = presentationDirection === "entering";

  const style = useMemo((): React.CSSProperties => {
    const eased = Easing.inOut(Easing.cubic)(presentationProgress);

    if (isEntering) {
      // Entering: fade + scale from slightly expanded
      const scale = interpolate(eased, [0, 1], [1.1, 1]);
      const opacity = interpolate(eased, [0, 0.3, 1], [0, 0.6, 1]);
      return {
        transform: `scale(${scale})`,
        opacity,
      };
    }
    // Exiting: expand outward + fade
    const scale = interpolate(eased, [0, 1], [1, 1.5]);
    const opacity = interpolate(eased, [0, 0.7, 1], [1, 0.4, 0]);
    return {
      transform: `scale(${scale})`,
      opacity,
      zIndex: 1,
    };
  }, [isEntering, presentationProgress]);

  return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
};

const expand = (): TransitionPresentation<ExpandProps> => ({
  component: ExpandPresentation,
  props: {},
});

/* ═══════════════════════════════════════════════════════
   Scene definitions
   ═══════════════════════════════════════════════════════ */

const scenes = [
  { id: "Scene0a", component: Scene0a_Problem, duration: 140 },
  { id: "Scene0b", component: Scene0b_Transition, duration: 52 },
  { id: "Scene0c", component: Scene0c_LogoIntro, duration: 68 },
  { id: "MergedScene1", component: MergedScene1_GreenBeanRoastLog, duration: 420 },
  { id: "MergedScene2", component: MergedScene2_WholesalePortal, duration: 540 },
  { id: "Scene4", component: Scene4_Integrations, duration: 134 },
  { id: "Scene5", component: Scene5_Purchasing, duration: 145 },
  { id: "Scene6", component: Scene6_Inbox, duration: 150 },
  { id: "Scene7", component: Scene7_Orders, duration: 110 },
  { id: "Scene8", component: Scene8_CRM, duration: 110 },
  { id: "Scene9", component: Scene9_Invoicing, duration: 118 },
  { id: "Scene10", component: Scene10_EmailCampaigns, duration: 110 },
  { id: "Scene11", component: Scene11_SocialScheduling, duration: 68 },
  { id: "Scene12", component: Scene12_EmbeddedForms, duration: 94 },
  { id: "Outro", component: Outro, duration: 96 },
] as const;

/* ── Transition map: keyed by "fromId" ── */

type TransitionDef = {
  duration: number;
  presentation: TransitionPresentation<Record<string, unknown>>;
};

const WHITE_FLASH_DUR = 16; // 8 out + 8 in
const ZOOM_DUR = 20;
const SHARED_DUR = 25;

const transitionMap: Record<string, TransitionDef> = {
  /* White flash */
  Scene0a: { duration: WHITE_FLASH_DUR, presentation: whiteFlash() },
  Scene0b: { duration: WHITE_FLASH_DUR, presentation: whiteFlash() },
  Scene4: { duration: WHITE_FLASH_DUR, presentation: whiteFlash() },
  Scene5: { duration: WHITE_FLASH_DUR, presentation: whiteFlash() },
  Scene7: { duration: WHITE_FLASH_DUR, presentation: whiteFlash() },
  Scene8: { duration: WHITE_FLASH_DUR, presentation: whiteFlash() },
  Scene10: { duration: WHITE_FLASH_DUR, presentation: whiteFlash() },
  Scene11: { duration: WHITE_FLASH_DUR, presentation: whiteFlash() },
  Scene12: { duration: WHITE_FLASH_DUR, presentation: whiteFlash() },

  /* Zoom through */
  Scene0c: { duration: ZOOM_DUR, presentation: zoomThrough() },
  MergedScene2: { duration: ZOOM_DUR, presentation: zoomThrough() },
  Scene9: { duration: ZOOM_DUR, presentation: zoomThrough() },

  /* Shared element */
  MergedScene1: { duration: SHARED_DUR, presentation: crossSlide() },
  Scene6: { duration: SHARED_DUR, presentation: expand() },
};

/* ── Calculate total duration accounting for overlaps ── */
const transitionOverlap = scenes.reduce((sum, scene, i) => {
  if (i === scenes.length - 1) return sum;
  const t = transitionMap[scene.id];
  return sum + (t ? t.duration : 0);
}, 0);

const rawDuration = scenes.reduce((sum, s) => sum + s.duration, 0);
const totalDuration = rawDuration - transitionOverlap;

/* ═══════════════════════════════════════════════════════
   Main marketing video composition
   ═══════════════════════════════════════════════════════ */

const MarketingVideoContent: React.FC = () => {
  const elements: React.ReactNode[] = [];

  scenes.forEach((scene, i) => {
    const SceneComponent = scene.component;

    elements.push(
      <TransitionSeries.Sequence
        key={scene.id}
        durationInFrames={scene.duration}
      >
        <AbsoluteFill style={{ backgroundColor: BRAND.bg }}>
          <SceneComponent />
        </AbsoluteFill>
      </TransitionSeries.Sequence>
    );

    // Add transition after this scene (unless it's the last)
    if (i < scenes.length - 1) {
      const t = transitionMap[scene.id];
      if (t) {
        elements.push(
          <TransitionSeries.Transition
            key={`t-${scene.id}`}
            timing={linearTiming({ durationInFrames: t.duration })}
            presentation={t.presentation}
          />
        );
      }
    }
  });

  return <TransitionSeries>{elements}</TransitionSeries>;
};

/* ═══════════════════════════════════════════════════════
   Root component with all compositions
   ═══════════════════════════════════════════════════════ */

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Full marketing video */}
      <Composition
        id="MarketingVideo"
        component={MarketingVideoContent}
        durationInFrames={totalDuration}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
      />

      {/* Individual scene compositions for preview */}
      {scenes.map((scene) => (
        <Composition
          key={scene.id}
          id={scene.id}
          component={scene.component}
          durationInFrames={scene.duration}
          fps={VIDEO.fps}
          width={VIDEO.width}
          height={VIDEO.height}
        />
      ))}
    </>
  );
};
