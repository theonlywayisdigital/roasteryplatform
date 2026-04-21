"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Receipt,
  Envelope,
  ShareNetwork,
  ArrowRight,
  ClipboardText,
  Leaf,
  Fire,
  Star,
  Calculator,
  SquaresFour,
  Tray,
  Plugs,
  Robot,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { SalesSuiteAnimation } from "@/components/feature-animations/SalesSuiteAnimation";
import { MarketingSuiteAnimation } from "@/components/feature-animations/MarketingSuiteAnimation";
import { RoasterToolsAnimation } from "@/components/feature-animations/RoasterToolsAnimation";
import { MoreAnimation } from "@/components/feature-animations/MoreAnimation";

const ANIMATION_MAP: Record<string, React.ComponentType> = {
  sales: SalesSuiteAnimation,
  marketing: MarketingSuiteAnimation,
  "roaster-tools": RoasterToolsAnimation,
  more: MoreAnimation,
};

interface CarouselCmsData {
  suites?: Array<{
    key: string;
    tagline?: string;
    description?: string;
  }>;
}

const suites = [
  {
    key: "sales",
    label: "Sales Suite",
    tagline: "Sell wholesale and direct — from one dashboard",
    description:
      "Manage your products, track every order, handle wholesale accounts, send invoices, and get paid automatically. From £39/mo.",
    allHref: "/features/sales",
    features: [
      {
        icon: ClipboardText,
        title: "Order Tracking",
        desc: "Track every order from placement to delivery with real-time status updates.",
        href: "/features/order-tracking",
      },
      {
        icon: ShoppingCart,
        title: "Wholesale",
        desc: "Manage wholesale accounts, custom pricing tiers, and repeat orders.",
        href: "/features/wholesale",
      },
      {
        icon: Receipt,
        title: "Invoices",
        desc: "Generate and send professional invoices. Track payments and export for your accountant.",
        href: "/features/invoices",
      },
    ],
  },
  {
    key: "marketing",
    label: "Marketing Suite",
    tagline: "Grow your brand on autopilot",
    description:
      "Email campaigns, social scheduling, content calendar, and embedded forms. From £19/mo.",
    allHref: "/features/marketing",
    features: [
      {
        icon: Envelope,
        title: "Email Campaigns",
        desc: "Design beautiful emails that drive repeat orders. Segmentation and analytics built in.",
        href: "/features/email-campaigns",
      },
      {
        icon: ShareNetwork,
        title: "Social Scheduling",
        desc: "Plan, create, and schedule social media posts across Instagram, Facebook, and LinkedIn.",
        href: "/features/social-scheduling",
      },
    ],
  },
  {
    key: "roaster-tools",
    label: "Roaster Tools",
    tagline: "The tools your roastery actually needs",
    description:
      "Green bean inventory, roast logging, cupping scorecards, and calculators — built for working roasters. Included with Sales Suite.",
    allHref: "/features/roaster-tools",
    features: [
      {
        icon: Leaf,
        title: "Green Bean Inventory",
        desc: "Track every bag of green coffee from arrival to roast. Origins, suppliers, and stock levels.",
        href: "/features/roaster-tools",
      },
      {
        icon: Fire,
        title: "Roast Log",
        desc: "Record profiles, temperatures, development times, and batch notes.",
        href: "/features/roaster-tools",
      },
      {
        icon: Star,
        title: "Cupping Scorecards",
        desc: "SCA-aligned scoring. Compare batches across origins, profiles, and dates.",
        href: "/features/roaster-tools",
      },
      {
        icon: Calculator,
        title: "Calculators",
        desc: "Roast loss, brew ratio, and cost-per-cup. The maths without the spreadsheet.",
        href: "/features/roaster-tools",
      },
    ],
  },
  {
    key: "more",
    label: "More",
    tagline: "Everything else your roastery needs",
    description:
      "Dashboard, analytics, inbox, integrations, help centre, and AI-powered tools. Included with every plan.",
    allHref: "/features/more",
    features: [
      {
        icon: SquaresFour,
        title: "Dashboard",
        desc: "Orders, stock, revenue and activity at a glance.",
        href: "/features/dashboard",
      },
      {
        icon: Tray,
        title: "Inbox",
        desc: "Convert order emails into tracked orders with one click.",
        href: "/features/inbox",
      },
      {
        icon: Plugs,
        title: "Integrations",
        desc: "Shopify, WooCommerce, Wix and Squarespace — sync automatically.",
        href: "/features/integrations",
      },
      {
        icon: Robot,
        title: "AI",
        desc: "Generate campaigns, write descriptions, and extract orders automatically.",
        href: "/features/ai",
      },
    ],
  },
];

export function ProductsCarousel({ cms }: { cms?: CarouselCmsData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const resolvedSuites = suites.map((suite) => {
    const cmsSuite = cms?.suites?.find((s) => s.key === suite.key);
    return {
      ...suite,
      tagline: cmsSuite?.tagline || suite.tagline,
      description: cmsSuite?.description || suite.description,
    };
  });

  // Reset animation key when tab changes
  const handleTabChange = useCallback((i: number) => {
    setActiveIndex(i);
    setAnimKey((k) => k + 1);
  }, []);

  // Loop: replay animation every 4 seconds while tab is visible
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        setAnimKey((k) => k + 1);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div>
      {/* Toggle tabs */}
      <div className="flex justify-center mb-12">
        <div className="grid grid-cols-4 sm:inline-flex rounded-lg border border-neutral-200 p-1 bg-neutral-50 w-full sm:w-auto">
          {resolvedSuites.map((suite, i) => (
            <button
              key={suite.key}
              onClick={() => handleTabChange(i)}
              className={cn(
                "px-2 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-md transition-all duration-200 text-center leading-tight",
                activeIndex === i
                  ? "bg-accent text-white shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              )}
            >
              {suite.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content — crossfade */}
      <div className="relative">
        {resolvedSuites.map((suite, i) => {
          const AnimationComponent = ANIMATION_MAP[suite.key];
          return (
            <div
              key={suite.key}
              className={cn(
                "transition-all duration-500 ease-in-out",
                activeIndex === i
                  ? "opacity-100 relative"
                  : "opacity-0 absolute inset-0 pointer-events-none"
              )}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                {/* Animation panel */}
                <div
                  className={cn(
                    "relative",
                    i === 1 ? "order-1 lg:order-2" : ""
                  )}
                >
                  {AnimationComponent && activeIndex === i && (
                    <AnimationComponent key={animKey} />
                  )}
                </div>

                {/* Content */}
                <div className={i === 1 ? "order-2 lg:order-1" : ""}>
                  <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
                    {suite.label}
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight mb-4">
                    {suite.tagline}
                  </h3>
                  <p className="text-lg text-neutral-600 mb-8">
                    {suite.description}
                  </p>
                  <div className="space-y-3">
                    {suite.features.map((feature) => {
                      const Icon = feature.icon;
                      return (
                        <Link
                          key={feature.title}
                          href={feature.href}
                          className="flex gap-4 p-4 rounded-xl border border-neutral-200 hover:border-accent/30 hover:shadow-md transition-all group bg-white"
                        >
                          <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                            <Icon weight="duotone" size={24} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-neutral-900 group-hover:text-accent transition-colors">
                              {feature.title}
                            </p>
                            <p className="text-xs text-neutral-500 mt-0.5">
                              {feature.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <Link
                    href={suite.allHref}
                    className="inline-flex items-center gap-1 mt-6 text-sm font-semibold text-accent hover:underline"
                  >
                    View all {suite.label} features
                    <ArrowRight weight="duotone" size={20} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
