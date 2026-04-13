import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { fullScreen, headline, BRAND, FONT_FAMILY } from "../styles";
import { Card, Field } from "../components";

/* ═══════════════════════════════════════════════════════════════
   MergedScene5 — Marketing
   Duration: 450 frames (15s @ 30fps)

   Act 1 (0–150):   Email Campaigns — campaign card, send button, paper plane, stat cards
   Act 2 (160–295): Social Scheduling — weekly calendar grid with posts
   Act 3 (305–450): Embedded Forms — form card, typing fields, leads counter

   Transition rule: outgoing act fades out over 20 frames, then
   a ~10-frame pause (screen breathes), then next act fades in
   over 20 frames. Headlines follow the same pattern — previous
   headline is fully gone before the next one starts appearing.
   ═══════════════════════════════════════════════════════════════ */

const INSTAGRAM_PINK = "#E1306C";
const FACEBOOK_BLUE = "#1877F2";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const posts = [
  { day: "Mon", platform: "Instagram", color: INSTAGRAM_PINK, bg: "#FCE7F3", caption: "Meet our newest single origin — washed Ethiopian Yirgacheffe..." },
  { day: "Wed", platform: "Facebook", color: FACEBOOK_BLUE, bg: "#DBEAFE", caption: "Behind the scenes at the roastery this week..." },
];

export const MergedScene5_Marketing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Helpers ── */
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const easeOut = { ...clamp, easing: Easing.out(Easing.cubic) };

  /* ════════════════════════════════════════════════════════════
     HEADLINES — sequential: previous fully gone before next appears
     Head1 out by 145, Head2 in at 160. Head2 out by 290, Head3 in at 305.
     ════════════════════════════════════════════════════════════ */

  const head1Opacity = interpolate(frame, [0, 10, 130, 140], [0, 1, 1, 0], clamp);
  const head1Y = interpolate(frame, [0, 10], [25, 0], easeOut);

  const head2Opacity = interpolate(frame, [160, 170, 275, 285], [0, 1, 1, 0], clamp);
  const head2Y = interpolate(frame, [160, 170], [25, 0], easeOut);

  const head3Opacity = interpolate(frame, [305, 315], [0, 1], clamp);
  const head3Y = interpolate(frame, [305, 315], [25, 0], easeOut);

  /* ════════════════════════════════════════════════════════════
     ACT 1 — Email Campaigns (frames 0–150)
     Enter: spring from frame 10
     Exit: frames 130–150, shrink + slide left, then pause before Act 2
     ════════════════════════════════════════════════════════════ */

  // Campaign card slides in from left with fade + scale
  const campSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.7 },
  });
  const campX = interpolate(campSpring, [0, 1], [-400, 0]);
  const campOpacity = interpolate(campSpring, [0, 0.2, 1], [0, 0.6, 1]);
  const campScale = interpolate(campSpring, [0, 1], [0.92, 1]);

  // Field stagger
  const fo = (d: number) => interpolate(frame, [d, d + 15], [0, 1], clamp);
  const fy = (d: number) => interpolate(frame, [d, d + 15], [14, 0], easeOut);

  // Audience badge scale
  const audienceScale = interpolate(frame, [50, 62], [0.85, 1], {
    ...clamp,
    easing: Easing.out(Easing.back(1.3)),
  });

  // Send button pulses then is clicked — interpolated envelope
  const sendBtnOpacity = interpolate(frame, [65, 78], [0, 1], clamp);
  const sendPulseEnv = interpolate(frame, [78, 80, 86, 88], [0, 1, 1, 0], clamp);
  const sendBtnPulse = 1 + 0.04 * Math.sin((frame - 78) * 0.4) * sendPulseEnv;
  const sendBtnFadeOut = interpolate(frame, [88, 96], [1, 0], clamp);
  const sentBadgeSpring = spring({
    frame: frame - 88,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.5 },
  });
  const sentBadgeOpacity = interpolate(sentBadgeSpring, [0, 0.3, 1], [0, 0.7, 1]);
  const sentBadgeScale = interpolate(sentBadgeSpring, [0, 1], [0.8, 1]);

  // Paper plane animates across screen from button area toward right
  const planeProgress = interpolate(frame, [90, 120], [0, 1], easeOut);
  const planeX = interpolate(planeProgress, [0, 1], [0, 600]);
  const planeY = interpolate(planeProgress, [0, 0.5, 1], [0, -60, -20]);
  const planeOpacity = interpolate(frame, [88, 92, 115, 122], [0, 1, 1, 0], clamp);
  const planeRotate = interpolate(planeProgress, [0, 0.3, 1], [-10, -20, -5]);

  // Stat cards slide in from right — same timing as campaign card
  const statSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.7 },
  });
  const statX = interpolate(statSpring, [0, 1], [200, 0]);
  const statOpacity = interpolate(statSpring, [0, 0.2, 1], [0, 0.6, 1]);

  // Stat counters tick up (start ticking from frame 20 once cards are visible)
  const openRate = Math.round(interpolate(frame, [20, 60], [0, 68], easeOut));
  const clickRate = Math.round(interpolate(frame, [22, 60], [0, 24], easeOut));

  // Act 1 exit
  const act1ExitOpacity = interpolate(frame, [130, 150], [1, 0], clamp);
  const act1ExitScale = interpolate(frame, [130, 150], [1, 0.85], easeOut);
  const act1ExitX = interpolate(frame, [130, 150], [0, -500], easeOut);

  /* ════════════════════════════════════════════════════════════
     ACT 2 — Social Scheduling (frames 160–295)
     Enter: frames 160–180, slide in from right
     Exit: frames 275–295, shrink + slide left
     ════════════════════════════════════════════════════════════ */

  // Calendar card enters from right
  const act2EnterOpacity = interpolate(frame, [160, 180], [0, 1], clamp);
  const act2EnterX = interpolate(frame, [160, 180], [500, 0], easeOut);
  const act2EnterScale = interpolate(frame, [160, 180], [0.85, 1], easeOut);

  // Paper plane flies in from the left and lands into the calendar
  const plane2Opacity = interpolate(frame, [160, 168, 185, 192], [0, 1, 1, 0], clamp);
  const plane2X = interpolate(frame, [160, 192], [-300, 400], easeOut);
  const plane2Y = interpolate(frame, [160, 175, 192], [40, -30, 0], easeOut);
  const plane2Scale = interpolate(frame, [185, 192], [1, 0.3], easeOut);

  // Post tiles appear simultaneously
  const postOpacity = interpolate(frame, [192, 206], [0, 1], clamp);
  const postScale = interpolate(frame, [192, 206], [0.85, 1], {
    ...clamp,
    easing: Easing.out(Easing.back(1.3)),
  });

  // Act 2 exit
  const act2ExitOpacity = interpolate(frame, [275, 295], [1, 0], clamp);
  const act2ExitScale = interpolate(frame, [275, 295], [1, 0.85], easeOut);
  const act2ExitX = interpolate(frame, [275, 295], [0, -500], easeOut);

  // Combined act 2 transforms
  const act2Opacity = act2EnterOpacity * act2ExitOpacity;
  const act2X = act2EnterX + act2ExitX;
  const act2Scale = act2EnterScale * act2ExitScale;

  /* ════════════════════════════════════════════════════════════
     ACT 3 — Embedded Forms (frames 305–450)
     Enter: frames 305–325, slide in from right
     ════════════════════════════════════════════════════════════ */

  // Form card enters from right
  const act3EnterOpacity = interpolate(frame, [305, 325], [0, 1], clamp);
  const act3EnterX = interpolate(frame, [305, 325], [500, 0], easeOut);
  const act3EnterScale = interpolate(frame, [305, 325], [0.85, 1], easeOut);

  // Field stagger for form
  const formFo = (d: number) => interpolate(frame, [d, d + 14], [0, 1], clamp);
  const formFy = (d: number) => interpolate(frame, [d, d + 14], [14, 0], easeOut);

  // Field typing — interpolated character count, no boolean jump
  const bizNameChars = Math.round(interpolate(frame, [340, 365], [0, 15], easeOut));
  const emailChars = Math.round(interpolate(frame, [355, 385], [0, 20], easeOut));
  const bizNameValue = "The Daily Grind".slice(0, bizNameChars);
  const emailValue = "hello@dailygrind.co".slice(0, emailChars);

  // Field active state — interpolated glow, not boolean
  const field0Glow = interpolate(frame, [338, 342, 367, 372], [0, 1, 1, 0], clamp);
  const field1Glow = interpolate(frame, [353, 357, 387, 392], [0, 1, 1, 0], clamp);

  // Submit button pulses and is clicked — interpolated envelope
  const submitBtnOpacity = interpolate(frame, [390, 400], [0, 1], clamp);
  const submitPulseEnv = interpolate(frame, [400, 402, 408, 410], [0, 1, 1, 0], clamp);
  const submitBtnPulse = 1 + 0.04 * Math.sin((frame - 400) * 0.4) * submitPulseEnv;
  const submitClickedSpring = spring({
    frame: frame - 410,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.5 },
  });
  const submitSuccessOpacity = interpolate(submitClickedSpring, [0, 0.3, 1], [0, 0.7, 1]);
  const submitSuccessScale = interpolate(submitClickedSpring, [0, 1], [0.8, 1]);
  const submitBtnFadeOut = interpolate(frame, [410, 418], [1, 0], clamp);

  // Leads counter card — slides in from right simultaneously with form
  const leadsSpring = spring({
    frame: frame - 310,
    fps,
    config: { damping: 14, stiffness: 70, mass: 0.8 },
  });
  const leadsX = interpolate(leadsSpring, [0, 1], [200, 0]);
  const leadsOpacity = interpolate(leadsSpring, [0, 0.2, 1], [0, 0.6, 1]);

  // Leads counter ticks up
  const leadsVal = Math.round(interpolate(frame, [320, 400], [0, 12], easeOut));

  /* ════════════════════════════════════════════════════════════
     RENDER — all acts always mounted, controlled by opacity/transform.
     Each act exits → 10-frame pause → next act enters. No overlap.
     ════════════════════════════════════════════════════════════ */

  return (
    <AbsoluteFill style={fullScreen}>

      {/* ── Headlines ── */}
      <div style={{ position: "relative", marginBottom: 30, height: 140, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <h1 style={{ ...headline, position: "absolute", opacity: head1Opacity, transform: `translateY(${head1Y}px)`, maxWidth: 1200 }}>
          Keep buyers coming back.
        </h1>
        <h1 style={{ ...headline, position: "absolute", opacity: head2Opacity, transform: `translateY(${head2Y}px)`, maxWidth: 1200 }}>
          Stay consistent on social.
        </h1>
        <h1 style={{ ...headline, position: "absolute", opacity: head3Opacity, transform: `translateY(${head3Y}px)`, maxWidth: 1200 }}>
          Grow your wholesale list on autopilot.
        </h1>
      </div>

      {/* ── Main content area ── */}
      <div style={{ position: "relative", width: "100%", minHeight: 420 }}>

        {/* ═══ ACT 1 — Email Campaign + Stats ═══ */}
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%",
          display: "flex", justifyContent: "center", gap: 24, alignItems: "flex-start",
          opacity: act1ExitOpacity,
          transform: `translateX(${act1ExitX}px) scale(${act1ExitScale})`,
          transformOrigin: "center top",
          pointerEvents: act1ExitOpacity < 0.01 ? "none" as const : "auto" as const,
        }}>
          {/* Campaign card */}
          <div style={{
            opacity: campOpacity,
            transform: `translateX(${campX}px) scale(${campScale})`,
            transformOrigin: "left center",
          }}>
            <Card style={{ width: 440 }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 18 18"><rect x="2" y="4" width="14" height="10" rx="2" stroke={BRAND.blue} strokeWidth="1.5" fill="none" /><path d="M2 6l7 4 7-4" stroke={BRAND.blue} strokeWidth="1.5" fill="none" /></svg>
                </div>
                <span style={{ fontSize: 16, fontWeight: 700, color: BRAND.dark, fontFamily: FONT_FAMILY }}>New Campaign</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ opacity: fo(22), transform: `translateY(${fy(22)}px)` }}>
                  <Field label="From" value="Off Your Bean" />
                </div>
                <div style={{ opacity: fo(30), transform: `translateY(${fy(30)}px)` }}>
                  <Field label="Subject" value="New arrival: Ethiopia Yirgacheffe" />
                </div>
                <div style={{ opacity: fo(38), transform: `translateY(${fy(38)}px)` }}>
                  <Field label="Preview" value="We've just landed a stunning washed lot from Yirgacheffe..." />
                </div>
              </div>

              {/* Audience badge */}
              <div style={{ marginTop: 18, opacity: fo(50), transform: `scale(${audienceScale})`, transformOrigin: "left" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 20, backgroundColor: "#DBEAFE", color: BRAND.blue, fontSize: 14, fontWeight: 600, fontFamily: FONT_FAMILY }}>
                  <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="6" cy="6" r="3" stroke={BRAND.blue} strokeWidth="1.2" fill="none" /><path d="M1 14c0-3 2-5 5-5" stroke={BRAND.blue} strokeWidth="1.2" fill="none" /><circle cx="11" cy="6" r="2.5" stroke={BRAND.blue} strokeWidth="1.2" fill="none" /><path d="M8 14c0-2.5 1.5-4 3-4s3 1.5 3 4" stroke={BRAND.blue} strokeWidth="1.2" fill="none" /></svg>
                  42 wholesale buyers
                </span>
              </div>

              {/* Send button / Sent badge */}
              <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  opacity: sendBtnOpacity * sendBtnFadeOut,
                  transform: `scale(${sendBtnPulse})`,
                  backgroundColor: BRAND.blue, color: "#FFFFFF",
                  padding: "10px 24px", borderRadius: 10, fontSize: 14,
                  fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8,
                  fontFamily: FONT_FAMILY,
                }}>
                  Send Campaign
                  <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7l10-5-3 5 3 5z" fill="white" /></svg>
                </div>

                {/* "Sent" badge — always mounted, spring-animated */}
                <div style={{
                  opacity: sentBadgeOpacity,
                  transform: `scale(${sentBadgeScale})`,
                  backgroundColor: BRAND.green, color: "#FFFFFF",
                  padding: "10px 24px", borderRadius: 10, fontSize: 14,
                  fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8,
                  fontFamily: FONT_FAMILY,
                  pointerEvents: sentBadgeOpacity < 0.01 ? "none" as const : "auto" as const,
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 8l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                  Sent
                </div>
              </div>
            </Card>
          </div>

          {/* Paper plane — always mounted, opacity-controlled */}
          <div style={{
            position: "absolute",
            left: 320,
            top: 320,
            opacity: planeOpacity,
            transform: `translateX(${planeX}px) translateY(${planeY}px) rotate(${planeRotate}deg)`,
            pointerEvents: "none" as const,
            zIndex: 10,
          }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M4 16L28 4L20 16L28 28Z" fill={BRAND.blue} />
              <path d="M20 16L28 4V28L20 16Z" fill="#1D4ED8" />
            </svg>
          </div>

          {/* Stat cards — slide in from right simultaneously */}
          <div style={{
            display: "flex", flexDirection: "column", gap: 16,
            opacity: statOpacity,
            transform: `translateX(${statX}px)`,
          }}>
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

        {/* ═══ ACT 2 — Social Scheduling Calendar ═══ */}
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%",
          display: "flex", justifyContent: "center",
          opacity: act2Opacity,
          transform: `translateX(${act2X}px) scale(${act2Scale})`,
          transformOrigin: "center top",
          pointerEvents: act2Opacity < 0.01 ? "none" as const : "auto" as const,
        }}>
          {/* Paper plane landing into calendar — always mounted */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: 0,
            opacity: plane2Opacity,
            transform: `translateX(${plane2X}px) translateY(${plane2Y}px) scale(${plane2Scale})`,
            pointerEvents: "none" as const,
            zIndex: 10,
          }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M4 16L28 4L20 16L28 28Z" fill={BRAND.blue} />
              <path d="M20 16L28 4V28L20 16Z" fill="#1D4ED8" />
            </svg>
          </div>

          <Card style={{ width: 700 }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 18 18"><rect x="2" y="3" width="14" height="13" rx="2" stroke={BRAND.orange} strokeWidth="1.5" fill="none" /><path d="M2 7h14" stroke={BRAND.orange} strokeWidth="1.5" /></svg>
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: BRAND.dark, fontFamily: FONT_FAMILY }}>Week View</span>
              <span style={{ fontSize: 13, color: BRAND.muted, fontFamily: FONT_FAMILY, marginLeft: "auto" }}>Apr 7 – 11</span>
            </div>

            {/* Week grid header */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 12 }}>
              {weekDays.map((d) => (
                <div key={d} style={{ textAlign: "center" as const, fontSize: 13, fontWeight: 600, color: BRAND.muted, textTransform: "uppercase" as const, fontFamily: FONT_FAMILY }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Week grid with posts */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, minHeight: 180 }}>
              {weekDays.map((day) => {
                const post = posts.find((p) => p.day === day);

                if (!post) {
                  return (
                    <div key={day} style={{ borderRadius: 10, border: "2px dashed #F3F4F6", minHeight: 140 }} />
                  );
                }

                return (
                  <div
                    key={day}
                    style={{
                      opacity: postOpacity,
                      transform: `scale(${postScale})`,
                      borderRadius: 10,
                      border: `1px solid ${BRAND.border}`,
                      padding: 12,
                      backgroundColor: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: post.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color: post.color, fontFamily: FONT_FAMILY }}>{post.platform.charAt(0)}</span>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 600, color: BRAND.muted, fontFamily: FONT_FAMILY }}>{post.platform}</span>
                    </div>
                    <p style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.4, margin: 0, fontFamily: FONT_FAMILY, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const }}>
                      {post.caption}
                    </p>
                    <span style={{ fontSize: 11, fontWeight: 600, color: BRAND.orange, fontFamily: FONT_FAMILY, marginTop: "auto" }}>
                      {day === "Mon" ? "09:00" : "12:00"}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* ═══ ACT 3 — Embedded Form + Leads Counter ═══ */}
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%",
          display: "flex", justifyContent: "center", gap: 24, alignItems: "flex-start",
          opacity: act3EnterOpacity,
          transform: `translateX(${act3EnterX}px) scale(${act3EnterScale})`,
          transformOrigin: "center top",
          pointerEvents: act3EnterOpacity < 0.01 ? "none" as const : "auto" as const,
        }}>
          {/* Form card */}
          <Card style={{ width: 420 }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 18 18"><path d="M3 3h12v12H3z" stroke={BRAND.blue} strokeWidth="1.5" fill="none" rx="2" /><path d="M6 8h6M6 11h4" stroke={BRAND.blue} strokeWidth="1.5" strokeLinecap="round" /></svg>
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: BRAND.dark, fontFamily: FONT_FAMILY }}>Embedded Form</span>
            </div>

            <h3 style={{ fontSize: 22, fontWeight: 900, color: BRAND.dark, marginBottom: 20, fontFamily: FONT_FAMILY, opacity: formFo(330), transform: `translateY(${formFy(330)}px)` }}>
              Join our wholesale list
            </h3>

            {/* Business Name field */}
            <div style={{ marginBottom: 14, opacity: formFo(335), transform: `translateY(${formFy(335)}px)` }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: BRAND.muted, marginBottom: 6, fontFamily: FONT_FAMILY }}>Business Name</div>
              <div style={{
                backgroundColor: BRAND.fieldBg,
                border: `2px solid ${field0Glow > 0.5 ? BRAND.blue : BRAND.border}`,
                borderRadius: 10,
                padding: "10px 16px",
                fontSize: 16,
                fontWeight: 500,
                color: BRAND.dark,
                fontFamily: FONT_FAMILY,
                minHeight: 20,
                boxShadow: field0Glow > 0.5 ? `0 0 0 ${Math.round(field0Glow * 3)}px rgba(37,99,235,0.1)` : "none",
              }}>
                {bizNameValue}
              </div>
            </div>

            {/* Email field */}
            <div style={{ marginBottom: 20, opacity: formFo(345), transform: `translateY(${formFy(345)}px)` }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: BRAND.muted, marginBottom: 6, fontFamily: FONT_FAMILY }}>Email Address</div>
              <div style={{
                backgroundColor: BRAND.fieldBg,
                border: `2px solid ${field1Glow > 0.5 ? BRAND.blue : BRAND.border}`,
                borderRadius: 10,
                padding: "10px 16px",
                fontSize: 16,
                fontWeight: 500,
                color: BRAND.dark,
                fontFamily: FONT_FAMILY,
                minHeight: 20,
                boxShadow: field1Glow > 0.5 ? `0 0 0 ${Math.round(field1Glow * 3)}px rgba(37,99,235,0.1)` : "none",
              }}>
                {emailValue}
              </div>
            </div>

            {/* Submit button / Success badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                opacity: submitBtnOpacity * submitBtnFadeOut,
                transform: `scale(${submitBtnPulse})`,
                backgroundColor: BRAND.blue, color: "#fff",
                padding: "10px 24px", borderRadius: 10, fontSize: 15,
                fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: FONT_FAMILY,
              }}>
                Submit
              </div>

              {/* "Submitted" badge — always mounted, spring-animated */}
              <div style={{
                opacity: submitSuccessOpacity,
                transform: `scale(${submitSuccessScale})`,
                backgroundColor: BRAND.green, color: "#FFFFFF",
                padding: "10px 24px", borderRadius: 10, fontSize: 14,
                fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: FONT_FAMILY,
                pointerEvents: submitSuccessOpacity < 0.01 ? "none" as const : "auto" as const,
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 8l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                Submitted
              </div>
            </div>
          </Card>

          {/* Leads counter card */}
          <div style={{
            opacity: leadsOpacity,
            transform: `translateX(${leadsX}px)`,
          }}>
            <Card style={{ width: 240 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 18 18"><path d="M5 13l4-4 4 4" stroke="#16A34A" strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M5 8l4-4 4 4" stroke="#16A34A" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" /></svg>
                </div>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 500, color: BRAND.muted, fontFamily: FONT_FAMILY, display: "block" }}>New leads</span>
                  <span style={{ fontSize: 11, color: BRAND.muted, fontFamily: FONT_FAMILY }}>this month</span>
                </div>
              </div>
              <span style={{ fontSize: 40, fontWeight: 900, color: BRAND.dark, fontFamily: FONT_FAMILY, fontVariantNumeric: "tabular-nums" }}>
                {leadsVal}
              </span>
            </Card>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
