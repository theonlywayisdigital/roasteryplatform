import { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import {
  Scene1AddGreenStock,
  Scene2LogRoast,
  Scene3BuildProducts,
  Scene4WholesalePortal,
  Scene5BuyersOrder,
  Scene6Invoice,
  Act2Features,
  CtaBlock,
  FinalCta,
} from "./HowItWorksScenes";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "How It Works — Roastery Platform",
  description:
    "From green bean to paid invoice — see exactly how Roastery Platform works. Inventory, roasting, products, wholesale, orders, and invoicing in one platform.",
};

const PLATFORM_URL = "https://app.roasteryplatform.com";

export default function HowItWorksPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-neutral-50">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-transparent to-white" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 lg:py-28">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6 text-neutral-900">
            From green bean to paid invoice
            <br />
            <span className="text-accent">— in one platform.</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-neutral-600 max-w-2xl mx-auto mb-10">
            See exactly how Roastery Platform works.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`${PLATFORM_URL}/signup`}
              className="inline-flex items-center px-8 py-4 border-2 border-accent bg-accent text-white font-semibold text-lg rounded-lg hover:bg-transparent hover:text-accent transition-colors"
            >
              Start free trial
              <ArrowRight className="ml-2" size={24} weight="duotone" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          ACT 1 — The Core Loop
      ═══════════════════════════════════════════════════ */}
      <div className="bg-white divide-y divide-neutral-100">
        <Scene1AddGreenStock />
        <Scene2LogRoast />
        <Scene3BuildProducts />
        <Scene4WholesalePortal />
        <Scene5BuyersOrder />
        <Scene6Invoice />
      </div>

      {/* ═══════════════════════════════════════════════════
          CTA BLOCK — After Act 1
      ═══════════════════════════════════════════════════ */}
      <CtaBlock
        headline="Ready to simplify your roastery?"
        buttonText="Start free trial"
        variant="accent"
      />

      {/* ═══════════════════════════════════════════════════
          ACT 2 — Extends it
      ═══════════════════════════════════════════════════ */}
      <Act2Features />

      {/* ═══════════════════════════════════════════════════
          CTA BLOCK — After Act 2
      ═══════════════════════════════════════════════════ */}
      <CtaBlock
        headline="Join roasters already using Roastery Platform."
        buttonText="Start free trial"
        variant="dark"
      />

      {/* ═══════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════ */}
      <FinalCta />
    </>
  );
}
