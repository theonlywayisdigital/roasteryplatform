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
import { Card, StatusBadge, OffYourBeanLogo, IntegrationTile } from "../components";

/* ═══════════════════════════════════════════════════════════════
   MergedScene4 — Operations
   Duration: 600 frames (20s @ 30fps)

   Act 1 (0–150):   Inbox — email arrives, convert to order
   Act 2 (150–300): Orders — order list with status badges
   Act 3 (300–420): CRM — contact card with lifetime value
   Act 4 (420–600): Invoice → Accounting sync

   Transition rule: every act exit = 20 frames fade+slide out,
   next act enter = 20 frames fade+slide in, NO instant jumps.
   ═══════════════════════════════════════════════════════════════ */

export const MergedScene4_Operations: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Helpers ── */
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const easeOut = { ...clamp, easing: Easing.out(Easing.cubic) };

  /* ════════════════════════════════════════════════════════════
     HEADLINES — crossfade across four acts
     ════════════════════════════════════════════════════════════ */

  const head1Opacity = interpolate(frame, [0, 12, 130, 150], [0, 1, 1, 0], clamp);
  const head1Y = interpolate(frame, [0, 12], [25, 0], easeOut);

  const head2Opacity = interpolate(frame, [150, 170, 280, 300], [0, 1, 1, 0], clamp);
  const head2Y = interpolate(frame, [150, 170], [25, 0], easeOut);

  const head3Opacity = interpolate(frame, [300, 320, 400, 420], [0, 1, 1, 0], clamp);
  const head3Y = interpolate(frame, [300, 320], [25, 0], easeOut);

  const head4Opacity = interpolate(frame, [420, 440], [0, 1], clamp);
  const head4Y = interpolate(frame, [420, 440], [25, 0], easeOut);

  /* ════════════════════════════════════════════════════════════
     ACT 1 — Inbox (frames 0–150)
     Enter: spring from frame 10
     Exit: frames 130–150, fade + slide up
     ════════════════════════════════════════════════════════════ */

  // Envelope slides in from left
  const envSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.7 },
  });
  const envX = interpolate(envSpring, [0, 1], [-400, 0]);
  const envOpacity = interpolate(envSpring, [0, 0.2, 1], [0, 0.6, 1]);

  // Letter content fades in inside card
  const letterOpacity = interpolate(frame, [40, 55], [0, 1], clamp);

  // Convert button pulses
  const convertBtnOpacity = interpolate(frame, [65, 78], [0, 1], clamp);
  const convertBtnPulse = frame >= 78 && frame < 95
    ? 1 + 0.04 * Math.sin((frame - 78) * 0.3)
    : 1;

  // Click at frame 95 — flip to green
  const isConverted = frame >= 95;
  const convertedSpring = spring({
    frame: frame - 95,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.5 },
  });
  const convertedOpacity = interpolate(convertedSpring, [0, 0.3, 1], [0, 0.7, 1]);
  const convertedScale = interpolate(convertedSpring, [0, 1], [0.8, 1]);
  const btnFadeOut = isConverted
    ? interpolate(frame, [95, 103], [1, 0], clamp)
    : 1;

  // Order card assembles below — smooth scale from 0.8→1 over 20 frames
  const orderCardOpacity = interpolate(frame, [108, 128], [0, 1], clamp);
  const orderCardY = interpolate(frame, [108, 128], [40, 0], easeOut);
  const orderCardScale = interpolate(frame, [108, 128], [0.8, 1], easeOut);

  // Order card field stagger
  const ocFo = (d: number) => interpolate(frame, [d, d + 12], [0, 1], clamp);

  // Act 1 exit — fade + slide up over 20 frames
  const act1ExitOpacity = interpolate(frame, [130, 150], [1, 0], clamp);
  const act1ExitY = interpolate(frame, [130, 150], [0, -40], easeOut);

  /* ════════════════════════════════════════════════════════════
     ACT 2 — Orders (frames 150–300)
     Enter: frames 150–170, fade + slide up from below
     Exit: frames 280–300, fade + slide left
     ════════════════════════════════════════════════════════════ */

  const orders = [
    { buyer: "The Daily Grind", product: "House Blend × 20", amount: "£170.00", status: "Processing", badgeBg: "#DBEAFE", badgeColor: BRAND.blue, finalStatus: "Processing" },
    { buyer: "Café Nero", product: "Ethiopia Yirga × 15", amount: "£180.00", status: "Dispatched", badgeBg: "#FEF3C7", badgeColor: BRAND.orange, finalStatus: "Dispatched" },
    { buyer: "Bean & Gone", product: "Decaf Colombia × 8", amount: "£72.00", status: "Delivered", badgeBg: "#DCFCE7", badgeColor: BRAND.green, finalStatus: "Delivered" },
  ];

  // Order list card enters — fade + slide up from below
  const act2EnterOpacity = interpolate(frame, [150, 170], [0, 1], clamp);
  const act2EnterY = interpolate(frame, [150, 170], [40, 0], easeOut);
  const act2EnterScale = interpolate(frame, [150, 170], [0.92, 1], easeOut);

  // Departure board letter cycling for status badges
  const statusChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const getFlippingText = (finalText: string, rowIdx: number) => {
    const startFrame = 180 + rowIdx * 15;
    const endFrame = startFrame + 30;
    if (frame < startFrame) return "";
    if (frame >= endFrame) return finalText;
    const progress = (frame - startFrame) / (endFrame - startFrame);
    return finalText
      .split("")
      .map((ch, i) => {
        const charProgress = Math.min(1, progress * finalText.length / (i + 1));
        if (charProgress >= 1) return ch;
        if (ch === " ") return " ";
        return statusChars[Math.floor(Math.random() * 26)] || ch;
      })
      .join("");
  };

  // Act 2 exit — fade + slide left over 20 frames
  const act2ExitOpacity = interpolate(frame, [280, 300], [1, 0], clamp);
  const act2ExitX = interpolate(frame, [280, 300], [0, -400], easeOut);

  // Combined act 2 opacity
  const act2Opacity = act2EnterOpacity * act2ExitOpacity;

  /* ════════════════════════════════════════════════════════════
     ACT 3 — CRM (frames 300–420)
     Enter: frames 300–320, slide in from right + fade
     Exit: frames 400–420, fade + slide left
     ════════════════════════════════════════════════════════════ */

  // Contact card slides in from the right — smooth slide + fade
  const act3EnterOpacity = interpolate(frame, [300, 320], [0, 1], clamp);
  const act3EnterX = interpolate(frame, [300, 320], [300, 0], easeOut);

  // LTV counter ticks up
  const ltvVal = Math.round(interpolate(frame, [325, 385], [0, 2840], easeOut));

  // Background offset cards
  const bg1Opacity = interpolate(frame, [315, 330], [0, 0.35], clamp);
  const bg2Opacity = interpolate(frame, [318, 333], [0, 0.55], clamp);

  // CRM detail stagger
  const crmFo = (d: number) => interpolate(frame, [d, d + 14], [0, 1], clamp);
  const crmFy = (d: number) => interpolate(frame, [d, d + 14], [14, 0], easeOut);

  // Act 3 exit — fade + slide left over 20 frames
  const act3ExitOpacity = interpolate(frame, [400, 420], [1, 0], clamp);
  const act3ExitX = interpolate(frame, [400, 420], [0, -400], easeOut);

  // Combined act 3 transforms
  const act3Opacity = act3EnterOpacity * act3ExitOpacity;
  const act3X = act3EnterX + act3ExitX;

  /* ════════════════════════════════════════════════════════════
     ACT 4 — Invoice → Accounting (frames 420–600)
     Enter: frames 420–440, slide in from right + fade
     ════════════════════════════════════════════════════════════ */

  // Invoice slides in from right — smooth over 20 frames
  const act4EnterOpacity = interpolate(frame, [420, 440], [0, 1], clamp);
  const act4EnterX = interpolate(frame, [420, 440], [300, 0], easeOut);
  const act4EnterScale = interpolate(frame, [420, 440], [0.95, 1], easeOut);

  // Invoice field stagger
  const invFo = (d: number) => interpolate(frame, [d, d + 14], [0, 1], clamp);
  const invFy = (d: number) => interpolate(frame, [d, d + 14], [14, 0], easeOut);

  // Brand bar
  const barScale = interpolate(frame, [445, 463], [0, 1], easeOut);

  // Status transitions: Draft → Sent → Paid
  const statusLabel = frame < 500 ? "Draft" : frame < 540 ? "Sent" : "Paid";
  const statusBg = frame < 500 ? "#F3F4F6" : frame < 540 ? "#DBEAFE" : "#DCFCE7";
  const statusColor = frame < 500 ? BRAND.muted : frame < 540 ? BRAND.blue : BRAND.green;

  // Green pulse on Paid
  const paidPulse = frame >= 540
    ? interpolate(frame, [540, 555, 570], [0, 1, 0], clamp)
    : 0;

  // Accounting tiles beam in from invoice at frame 555
  const accounting = [
    { name: "Xero", color: "#13B5EA" },
    { name: "QuickBooks", color: "#2CA01C" },
    { name: "Sage", color: "#00D639" },
  ];

  const acctTileDelay = (idx: number) => 555 + idx * 10;
  const acctLineProgress = (idx: number) => {
    const d = acctTileDelay(idx);
    return interpolate(frame, [d - 5, d + 10], [0, 1], easeOut);
  };
  const acctTileSpring = (idx: number) => spring({
    frame: frame - acctTileDelay(idx),
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.5 },
  });

  /* ════════════════════════════════════════════════════════════
     RENDER — all acts always mounted, controlled by opacity/transform
     ════════════════════════════════════════════════════════════ */

  return (
    <AbsoluteFill style={fullScreen}>

      {/* ── Headlines ── */}
      <div style={{ position: "relative", marginBottom: 30, height: 140, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <h1 style={{ ...headline, position: "absolute", opacity: head1Opacity, transform: `translateY(${head1Y}px)`, maxWidth: 1200 }}>
          Email arrives. Order created in one click.
        </h1>
        <h1 style={{ ...headline, position: "absolute", opacity: head2Opacity, transform: `translateY(${head2Y}px)`, maxWidth: 1200 }}>
          Every order. Every status. One place.
        </h1>
        <h1 style={{ ...headline, position: "absolute", opacity: head3Opacity, transform: `translateY(${head3Y}px)`, maxWidth: 1200 }}>
          Know your buyers.
        </h1>
        <h1 style={{ ...headline, position: "absolute", opacity: head4Opacity, transform: `translateY(${head4Y}px)`, maxWidth: 1200 }}>
          Invoice in seconds. Sync to your accounts.
        </h1>
      </div>

      {/* ── Main content area — centred ── */}
      <div style={{ position: "relative", width: "100%", minHeight: 420 }}>

          {/* ═══ ACT 1 — Email + Order Card ═══ */}
          <div style={{
            position: "absolute", top: 0, left: 0, width: "100%",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
            opacity: act1ExitOpacity,
            transform: `translateY(${act1ExitY}px)`,
            pointerEvents: act1ExitOpacity < 0.01 ? "none" as const : "auto" as const,
          }}>
            {/* Envelope + Letter */}
            <div style={{
              width: 600,
              opacity: envOpacity,
              transform: `translateX(${envX}px)`,
            }}>
              {/* Envelope body */}
              <Card style={{
                width: 600,
                borderLeft: `4px solid ${BRAND.blue}`,
                background: "rgba(37,99,235,0.02)",
              }}>
                {/* Email header */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 20 20"><rect x="2" y="4" width="16" height="12" rx="2" stroke={BRAND.blue} strokeWidth="1.5" fill="none" /><path d="M2 6l8 5 8-5" stroke={BRAND.blue} strokeWidth="1.5" fill="none" /></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: BRAND.dark, fontFamily: FONT_FAMILY }}>The Daily Grind</div>
                    <div style={{ fontSize: 13, color: BRAND.muted, fontFamily: FONT_FAMILY }}>Order Request — House Blend × 20</div>
                  </div>
                </div>

                {/* Letter content — fades in inside card, no translateY out of bounds */}
                <div style={{ opacity: letterOpacity }}>
                  <div style={{ fontSize: 14, color: BRAND.muted, lineHeight: 1.6, marginBottom: 20, fontFamily: FONT_FAMILY }}>
                    Hi, could we place our usual order of 20 bags of House Blend 1kg please, same delivery address.
                  </div>
                </div>

                {/* Convert button / Converted state */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    opacity: convertBtnOpacity * btnFadeOut,
                    transform: `scale(${convertBtnPulse})`,
                    backgroundColor: BRAND.blue, color: "#FFFFFF",
                    padding: "10px 24px", borderRadius: 10, fontSize: 14,
                    fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8,
                    fontFamily: FONT_FAMILY,
                  }}>
                    Convert to Order
                    <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                  </div>

                  {isConverted && (
                    <div style={{
                      opacity: convertedOpacity,
                      transform: `scale(${convertedScale})`,
                      backgroundColor: BRAND.green, color: "#FFFFFF",
                      padding: "10px 24px", borderRadius: 10, fontSize: 14,
                      fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8,
                      fontFamily: FONT_FAMILY,
                    }}>
                      <svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 8l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                      Order Created
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Order card assembles below — smooth scale 0.8→1 over 20 frames */}
            <div style={{
              opacity: orderCardOpacity,
              transform: `translateY(${orderCardY}px) scale(${orderCardScale})`,
              width: 600,
            }}>
              <Card style={{ width: 600, borderLeft: `4px solid ${BRAND.green}` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 4h10l-1 7H4L3 4Z" stroke="#16A34A" strokeWidth="1.5" fill="none" /><circle cx="6" cy="13" r="1" fill="#16A34A" /><circle cx="11" cy="13" r="1" fill="#16A34A" /></svg>
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 700, color: BRAND.dark, fontFamily: FONT_FAMILY, opacity: ocFo(112) }}>ORD-1043</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: BRAND.green, backgroundColor: "#DCFCE7", padding: "4px 12px", borderRadius: 20, fontFamily: FONT_FAMILY, opacity: ocFo(118) }}>Confirmed</span>
                </div>
                <div style={{ display: "flex", gap: 30, fontSize: 14, fontFamily: FONT_FAMILY }}>
                  {[
                    ["Buyer", "The Daily Grind"],
                    ["Product", "House Blend 1kg"],
                    ["Qty", "× 20"],
                    ["Total", "£170.00"],
                  ].map(([label, value], i) => (
                    <div key={label} style={{ opacity: ocFo(115 + i * 6) }}>
                      <div style={{ color: BRAND.muted, fontSize: 12, marginBottom: 4 }}>{label}</div>
                      <div style={{ fontWeight: 600, color: BRAND.dark }}>{value}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* ═══ ACT 2 — Order List ═══ */}
          <div style={{
            position: "absolute", top: 0, left: 0, width: "100%",
            display: "flex", justifyContent: "center",
            opacity: act2Opacity,
            transform: `translateY(${act2EnterY}px) scale(${act2EnterScale}) translateX(${act2ExitX}px)`,
            transformOrigin: "center top",
            pointerEvents: act2Opacity < 0.01 ? "none" as const : "auto" as const,
          }}>
            <Card style={{ width: 700 }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 18 18"><rect x="2" y="3" width="14" height="12" rx="2" stroke={BRAND.blue} strokeWidth="1.5" fill="none" /><path d="M2 7h14" stroke={BRAND.blue} strokeWidth="1.5" /></svg>
                </div>
                <span style={{ fontSize: 16, fontWeight: 700, color: BRAND.dark, fontFamily: FONT_FAMILY }}>Recent Orders</span>
              </div>

              {/* Column headers */}
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.2fr 0.8fr auto", gap: 16, paddingBottom: 10, borderBottom: "1px solid #F3F4F6", marginBottom: 4 }}>
                {["Customer", "Product", "Amount", "Status"].map((h) => (
                  <span key={h} style={{ fontSize: 13, fontWeight: 500, color: BRAND.muted, fontFamily: FONT_FAMILY, textAlign: h === "Amount" || h === "Status" ? "right" as const : "left" as const }}>{h}</span>
                ))}
              </div>

              {/* Order rows */}
              {orders.map((order, i) => {
                const delay = 180 + i * 15;
                const rowOpacity = interpolate(frame, [delay, delay + 18], [0, 1], clamp);
                const rowY = interpolate(frame, [delay, delay + 18], [16, 0], easeOut);

                // Departure board badge
                const badgeDelay = delay + 12;
                const badgeScale = interpolate(frame, [badgeDelay, badgeDelay + 12], [0.7, 1], {
                  ...clamp,
                  easing: Easing.out(Easing.back(1.5)),
                });
                const badgeOpacity = interpolate(frame, [badgeDelay, badgeDelay + 8], [0, 1], clamp);
                const displayStatus = getFlippingText(order.finalStatus, i);

                return (
                  <div key={order.buyer} style={{
                    display: "grid", gridTemplateColumns: "1.2fr 1.2fr 0.8fr auto",
                    gap: 16, alignItems: "center", padding: "14px 0",
                    borderBottom: "1px solid #FAFAFA",
                    opacity: rowOpacity, transform: `translateY(${rowY}px)`,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="5" r="3" stroke="#9CA3AF" strokeWidth="1.2" fill="none" /><path d="M2 13c0-3 2-5 5-5s5 2 5 5" stroke="#9CA3AF" strokeWidth="1.2" fill="none" /></svg>
                      </div>
                      <span style={{ fontSize: 15, fontWeight: 500, color: BRAND.dark, fontFamily: FONT_FAMILY }}>{order.buyer}</span>
                    </div>
                    <span style={{ fontSize: 15, color: "#6B7280", fontFamily: FONT_FAMILY }}>{order.product}</span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: BRAND.dark, textAlign: "right" as const, fontFamily: FONT_FAMILY }}>{order.amount}</span>
                    <div style={{ display: "flex", justifyContent: "flex-end", opacity: badgeOpacity, transform: `scale(${badgeScale})` }}>
                      <StatusBadge
                        label={displayStatus || order.finalStatus}
                        bg={order.badgeBg}
                        color={order.badgeColor}
                        dot={order.finalStatus === "Delivered" ? BRAND.green : undefined}
                      />
                    </div>
                  </div>
                );
              })}
            </Card>
          </div>

          {/* ═══ ACT 3 — CRM Contact Card ═══ */}
          <div style={{
            position: "absolute", top: 0, left: 0, width: "100%",
            display: "flex", justifyContent: "center",
            opacity: act3Opacity,
            transform: `translateX(${act3X}px)`,
            pointerEvents: act3Opacity < 0.01 ? "none" as const : "auto" as const,
          }}>
            <div style={{ position: "relative", width: 480, height: 340 }}>
              {/* Background offset cards */}
              <div style={{
                position: "absolute", inset: 0,
                transform: "translate(16px, 16px) rotate(3deg)",
                opacity: bg1Opacity,
                backgroundColor: "#fff", borderRadius: 16,
                border: `1px solid ${BRAND.border}`,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }} />
              <div style={{
                position: "absolute", inset: 0,
                transform: "translate(8px, 8px) rotate(1.5deg)",
                opacity: bg2Opacity,
                backgroundColor: "#fff", borderRadius: 16,
                border: `1px solid ${BRAND.border}`,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }} />

              {/* Main contact card */}
              <div style={{ position: "relative", zIndex: 10 }}>
                <Card style={{ width: 480 }}>
                  {/* Avatar + name */}
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, opacity: crmFo(325), transform: `translateY(${crmFy(325)}px)` }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke={BRAND.blue} strokeWidth="2" fill="none" /><path d="M4 20c0-4 3-7 8-7s8 3 8 7" stroke={BRAND.blue} strokeWidth="2" fill="none" /></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: BRAND.dark, fontFamily: FONT_FAMILY }}>The Daily Grind</div>
                      <div style={{ fontSize: 13, color: BRAND.muted, fontFamily: FONT_FAMILY }}>Daily Grind Ltd</div>
                    </div>
                  </div>

                  {/* Location */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, opacity: crmFo(335), transform: `translateY(${crmFy(335)}px)` }}>
                    <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 2a5 5 0 0 0-5 5c0 4 5 9 5 9s5-5 5-9a5 5 0 0 0-5-5Z" stroke={BRAND.muted} strokeWidth="1.5" fill="none" /><circle cx="9" cy="7" r="1.5" fill={BRAND.muted} /></svg>
                    <span style={{ fontSize: 15, color: "#6B7280", fontFamily: FONT_FAMILY }}>Manchester</span>
                  </div>

                  {/* LTV */}
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 18px", backgroundColor: "#F9FAFB",
                    borderRadius: 12, border: `1px solid ${BRAND.border}`,
                    marginBottom: 14, opacity: crmFo(345), transform: `translateY(${crmFy(345)}px)`,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <svg width="18" height="18" viewBox="0 0 18 18"><text x="3" y="14" fontSize="14" fontWeight="700" fill={BRAND.blue} fontFamily="serif">£</text></svg>
                      <span style={{ fontSize: 13, fontWeight: 500, color: BRAND.muted, fontFamily: FONT_FAMILY }}>Lifetime Value</span>
                    </div>
                    <span style={{ fontSize: 22, fontWeight: 900, color: BRAND.blue, fontFamily: FONT_FAMILY, fontVariantNumeric: "tabular-nums" }}>
                      £{ltvVal.toLocaleString()}
                    </span>
                  </div>

                  {/* Last order */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: crmFo(355), transform: `translateY(${crmFy(355)}px)` }}>
                    <svg width="18" height="18" viewBox="0 0 18 18"><rect x="2" y="3" width="14" height="13" rx="2" stroke={BRAND.muted} strokeWidth="1.5" fill="none" /><path d="M2 7h14" stroke={BRAND.muted} strokeWidth="1.5" /></svg>
                    <span style={{ fontSize: 13, color: BRAND.muted, fontFamily: FONT_FAMILY }}>Last order</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginLeft: "auto", fontFamily: FONT_FAMILY }}>Today</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* ═══ ACT 4 — Invoice + Accounting ═══ */}
          <div style={{
            position: "absolute", top: 0, left: 0, width: "100%",
            display: "flex", gap: 30, alignItems: "flex-start",
            justifyContent: "center",
            opacity: act4EnterOpacity,
            transform: `translateX(${act4EnterX}px) scale(${act4EnterScale})`,
            transformOrigin: "center top",
            pointerEvents: act4EnterOpacity < 0.01 ? "none" as const : "auto" as const,
          }}>
            {/* Invoice card */}
            <Card style={{ width: 440, padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "24px 24px 0" }}>
                {/* Invoice label + status */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, opacity: invFo(445) }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: BRAND.orange, textTransform: "uppercase" as const, letterSpacing: 1.5, fontFamily: FONT_FAMILY }}>Invoice</span>
                  <div style={{
                    boxShadow: paidPulse > 0 ? `0 0 0 ${Math.round(paidPulse * 4)}px rgba(22,163,74,${paidPulse * 0.3})` : "none",
                    borderRadius: 20,
                  }}>
                    <StatusBadge label={statusLabel} bg={statusBg} color={statusColor} dot={statusLabel === "Paid" ? BRAND.green : undefined} />
                  </div>
                </div>

                {/* Brand bar */}
                <div style={{ width: "100%", height: 6, backgroundColor: "#1A1A1A", borderRadius: 3, marginBottom: 24, transform: `scaleX(${barScale})`, transformOrigin: "left" }} />

                {/* Logo + Invoice # */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, opacity: invFo(455), transform: `translateY(${invFy(455)}px)` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <OffYourBeanLogo size={44} />
                    <span style={{ fontSize: 16, fontWeight: 700, color: BRAND.dark, fontFamily: FONT_FAMILY }}>Off Your Bean</span>
                  </div>
                  <div style={{ textAlign: "right" as const }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.orange, fontFamily: FONT_FAMILY }}>INVOICE</div>
                    <div style={{ fontSize: 12, color: BRAND.muted, fontFamily: FONT_FAMILY }}>INV-0042</div>
                  </div>
                </div>
              </div>

              {/* Line items */}
              <div style={{ padding: "0 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid #F3F4F6", fontSize: 13, color: BRAND.muted, fontFamily: FONT_FAMILY, opacity: invFo(465) }}>
                  <span>Description</span>
                  <span>Amount</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid #F3F4F6", fontSize: 15, fontFamily: FONT_FAMILY, opacity: invFo(475), transform: `translateY(${invFy(475)}px)` }}>
                  <span style={{ color: BRAND.dark }}>House Blend × 10</span>
                  <span style={{ fontWeight: 600, color: BRAND.dark }}>£85.00</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderTop: `1px solid ${BRAND.border}`, opacity: invFo(485), transform: `translateY(${invFy(485)}px)` }}>
                  <span style={{ fontWeight: 700, color: BRAND.dark, fontSize: 16, fontFamily: FONT_FAMILY }}>Total</span>
                  <span style={{ fontSize: 22, fontWeight: 900, color: "#1A1A1A", fontFamily: FONT_FAMILY }}>£85.00</span>
                </div>
              </div>

              {/* Pay Now button */}
              <div style={{ padding: "8px 24px 24px", display: "flex", justifyContent: "center", opacity: invFo(495) }}>
                <div style={{ backgroundColor: BRAND.orange, color: "#fff", padding: "10px 32px", borderRadius: 10, fontSize: 15, fontWeight: 600, fontFamily: FONT_FAMILY }}>
                  Pay Now
                </div>
              </div>
            </Card>

            {/* Accounting tiles with connecting lines */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, position: "relative" }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: BRAND.dark, fontFamily: FONT_FAMILY, marginBottom: 4, opacity: interpolate(frame, [550, 560], [0, 1], clamp) }}>Accounting</span>
              {accounting.map((a, idx) => {
                const s = acctTileSpring(idx);
                const lineP = acctLineProgress(idx);
                const tileOpacity = interpolate(s, [0, 0.3, 1], [0, 0.6, 1]);
                const tileX = interpolate(s, [0, 1], [40, 0]);

                return (
                  <div key={a.name} style={{ position: "relative" }}>
                    {/* Connecting line from invoice */}
                    <div style={{
                      position: "absolute",
                      left: -30,
                      top: "50%",
                      width: 30,
                      height: 2,
                      backgroundColor: BRAND.blue,
                      transform: `scaleX(${lineP})`,
                      transformOrigin: "right center",
                      opacity: lineP > 0 ? 0.4 : 0,
                    }} />
                    <div style={{
                      opacity: tileOpacity,
                      transform: `translateX(${tileX}px)`,
                    }}>
                      <IntegrationTile name={a.name} color={a.color} connected={frame >= acctTileDelay(idx) + 15} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
      </div>
    </AbsoluteFill>
  );
};
