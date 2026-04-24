import { Metadata } from "next";
import Link from "next/link";
import {
  Star,
  SquaresFour,
  ChartLine,
  Tray,
  Plugs,
  Question,
  Robot,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "More Features — Dashboard, Analytics, AI & Integrations",
  description:
    "Dashboard, analytics, AI-powered tools, inbox, Shopify & WooCommerce integrations, and built-in help centre — all included with your coffee roaster platform subscription.",
  openGraph: {
    title: "More Features — Dashboard, Analytics, AI & Integrations",
    description: "Dashboard, analytics, AI-powered tools, inbox, and e-commerce integrations — included with every plan.",
  },
};

const PLATFORM_URL = "https://app.roasteryplatform.com";

const features = [
  {
    title: "Cupping Scorecards",
    href: "/features/cupping-scorecards",
    icon: Star,
    description:
      "Score every batch with SCA-aligned cupping forms. Compare scores across origins, profiles, and roast dates.",
  },
  {
    title: "Dashboard",
    href: "/features/dashboard",
    icon: SquaresFour,
    description:
      "Your roastery at a glance. Orders, stock, revenue and activity in one view.",
  },
  {
    title: "Analytics",
    href: "/features/analytics",
    icon: ChartLine,
    description:
      "Track performance across sales, customers and marketing in one place.",
  },
  {
    title: "Inbox",
    href: "/features/inbox",
    icon: Tray,
    description:
      "Receive order emails directly into Roastery Platform. Convert emails into orders with one click.",
  },
  {
    title: "Integrations",
    href: "/features/integrations",
    icon: Plugs,
    description:
      "Connect Shopify, WooCommerce, Wix and Squarespace. Sync products and orders automatically.",
  },
  {
    title: "Help Center",
    href: "/features/help-center",
    icon: Question,
    description:
      "Embedded help documentation available inside the platform whenever your team needs it.",
  },
  {
    title: "Beans AI",
    href: "/features/ai",
    icon: Robot,
    description:
      "AI-powered tools across the platform. Generate campaigns, write product descriptions, and convert emails into orders automatically.",
  },
];

export default function MoreFeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 mb-6">
            <span className="text-accent">More</span> Features
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto mb-4">
            Dashboard, analytics, inbox, integrations, help centre, and
            AI-powered tools — included with every plan.
          </p>
          <p className="text-sm font-medium text-accent">
            Included
          </p>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="group p-6 rounded-xl border border-neutral-200 hover:border-accent/30 hover:shadow-lg transition-all duration-300 bg-white flex flex-col"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
                    <Icon size={28} weight="duotone" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 mb-4 flex-1">
                    {feature.description}
                  </p>
                  <span className="inline-flex items-center text-accent font-semibold text-sm group-hover:gap-2 transition-all">
                    Learn more
                    <ArrowRight className="ml-1" size={20} weight="duotone" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-neutral-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6">
            Explore the full platform
          </h2>
          <p className="text-lg text-neutral-300 max-w-xl mx-auto mb-10">
            Create your account and see everything Roastery Platform has to
            offer. No credit card required.
          </p>
          <a
            href={PLATFORM_URL}
            className="inline-flex items-center px-8 py-4 border-2 border-accent bg-accent text-white font-semibold text-lg rounded-lg hover:bg-transparent hover:text-accent transition-colors"
          >
            Start Free Trial
            <ArrowRight className="ml-2" size={24} weight="duotone" />
          </a>
        </div>
      </section>
    </>
  );
}
