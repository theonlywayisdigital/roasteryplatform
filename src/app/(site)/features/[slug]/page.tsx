import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { FeatureIllustration, animatedSlugs } from "@/components/feature-animations";
import { client, urlFor } from "@/sanity/lib/client";
import { roasterFeatureDetailBySlugQuery, allRoasterFeatureDetailSlugsQuery } from "@/sanity/lib/queries";

export const revalidate = 3600;

const PLATFORM_URL = "https://app.roasteryplatform.com";

const suiteLabelMap: Record<string, string> = {
  sales: "Sales Suite",
  marketing: "Marketing Suite",
  more: "More",
};

const suitePriceLabel: Record<string, string> = {
  sales: "From £39/mo",
  marketing: "From £19/mo",
  more: "Included",
};

/** Slugs that redirect to a different page. */
const redirectSlugs: Record<string, string> = {
  "green-bean-inventory": "/features/inventory-tracking",
  certifications: "/features/sales",
};

/** Slugs that should no longer be publicly accessible. */
const hiddenSlugs = new Set([
  "storefront",
  "discount-codes",
  "sales-analytics",
  "marketing-analytics",
  "marketing-websites",
  "marketplace",
  "ai-studio",
  "automations",
]);

/** Hardcoded fallback data for features not yet in Sanity. */
const fallbackFeatures: Record<string, FeatureDetail> = {
  dashboard: {
    featureTitle: "Dashboard",
    slug: "dashboard",
    suite: "more",
    heroDescription:
      "See everything that matters at a glance. Your dashboard brings together orders, stock levels, revenue, and recent activity so you always know the state of your roastery.",
    includedNote: "Included",
    benefits: [
      "Real-time order count and revenue summary",
      "Stock level overview across green and roasted beans",
      "Recent activity feed — orders, invoices, dispatches",
      "Quick-access shortcuts to common tasks",
      "Customisable date range for key metrics",
      "At-a-glance view of outstanding and overdue invoices",
    ],
  },
  analytics: {
    featureTitle: "Analytics",
    slug: "analytics",
    suite: "more",
    heroDescription:
      "Understand your roastery's performance with clear, actionable analytics. Track sales trends, customer behaviour, and marketing results — all in one place.",
    includedNote: "Included",
    benefits: [
      "Sales performance charts — revenue, orders, and average order value",
      "Customer analytics — new vs returning, lifetime value trends",
      "Product performance — best sellers, margin analysis",
      "Marketing campaign metrics — open rates, click rates, conversions",
      "Date range filtering and comparison periods",
      "Export data to CSV for your own reporting",
    ],
  },
  inbox: {
    featureTitle: "Inbox",
    slug: "inbox",
    suite: "more",
    heroDescription:
      "Stop copying orders from emails into spreadsheets. Your Roastery Platform inbox receives order emails and lets you convert them into tracked orders with a single click.",
    includedNote: "Included",
    benefits: [
      "Dedicated inbox for receiving order emails",
      "AI-powered email parsing extracts order details automatically",
      "One-click conversion from email to tracked order",
      "Full email thread visible alongside the order",
      "Works with any email client your customers already use",
      "No setup required for your wholesale buyers",
    ],
  },
  integrations: {
    featureTitle: "Integrations",
    slug: "integrations",
    suite: "more",
    heroDescription:
      "Connect your roastery to the tools you already use. Storefronts, accounting, social media, Google Shopping, and custom webhooks — all from one platform.",
    includedNote: "Pro",
    benefits: [
      "Storefronts — Shopify, WooCommerce, Wix, and Squarespace. Sync products, pricing, and orders automatically.",
      "Accounting — Xero, QuickBooks, and Sage. Push invoices and payments directly to your accounting platform.",
      "Social — Facebook and Instagram. Publish products and content directly from Roastery Platform.",
      "Google Merchant — Sync your product catalogue to Google Shopping. Keep pricing and stock up to date automatically.",
      "Webhooks — Connect any custom system via webhooks. Send order, stock, and customer events to your own APIs or third-party tools.",
      "Simple setup wizard — connect in under 5 minutes. Webhook-based for real-time updates.",
    ],
  },
  "help-center": {
    featureTitle: "Help Center",
    slug: "help-center",
    suite: "more",
    heroDescription:
      "Get answers without leaving the platform. The built-in help centre provides searchable documentation, guides, and walkthroughs for every feature.",
    includedNote: "Included",
    benefits: [
      "Searchable knowledge base embedded in the platform",
      "Step-by-step guides for every feature",
      "Context-sensitive help — relevant articles appear where you need them",
      "Getting started walkthroughs for new team members",
      "Regularly updated with new features and tips",
      "No need to open a separate browser tab",
    ],
  },
  ai: {
    featureTitle: "Beans AI",
    slug: "ai",
    suite: "more",
    heroDescription:
      "AI is woven throughout Roastery Platform to save you time. Generate email campaigns, write product descriptions, extract orders from emails, and get smart suggestions — all powered by AI.",
    includedNote: "Included",
    benefits: [
      "Generate email campaign copy from a brief",
      "Write and refine product descriptions automatically",
      "AI-powered email-to-order extraction in the Inbox",
      "Smart product suggestions based on buying patterns",
      "AI credits included on every plan",
      "Works across Sales Suite, Marketing Suite, and Inbox",
    ],
  },
  "inventory-tracking": {
    featureTitle: "Inventory Tracking",
    slug: "inventory-tracking",
    suite: "sales",
    heroDescription:
      "Track every gram from green bean intake through roasting to finished product. Green stock, roasted stock and products — all linked, all up to date.",
    includedNote: "From £39/mo",
    benefits: [
      "Log green bean stock by origin, supplier, weight and cost",
      "Roast batches automatically deduct green stock and create roasted stock",
      "Products map directly to roasted stock pools",
      "Always know exactly what you have available to sell",
      "Weight loss calculated automatically on every roast",
      "Full stock history from arrival to sale",
    ],
  },
  "roast-log": {
    featureTitle: "Roast Log",
    slug: "roast-log",
    suite: "sales",
    heroDescription:
      "Record every roast with green and roasted weights, weight loss percentage, and batch notes. Your green stock adjusts automatically.",
    includedNote: "From £39/mo",
    benefits: [
      "Log green weight in, roasted weight out",
      "Automatic weight loss percentage calculation",
      "Green stock decrements in real time after each roast",
      "Roasted stock increments automatically",
      "Record roast profiles, temperatures, and development times",
      "Full roast history searchable by bean, date, or batch",
    ],
  },
  "production-planner": {
    featureTitle: "Production Planner",
    slug: "production-planner",
    suite: "sales",
    heroDescription:
      "Plan your roasting schedule for the week ahead. Assign batches to days, track capacity, and fulfil orders on time.",
    includedNote: "From £39/mo",
    benefits: [
      "Weekly calendar view of planned roasts",
      "Assign roast batches to specific days",
      "Link batches to customer orders for fulfilment",
      "Capacity tracking to avoid over-scheduling",
      "Drag and drop to reschedule batches",
      "At-a-glance view of the week's production load",
    ],
  },
  "cupping-scorecards": {
    featureTitle: "Cupping Scorecards",
    slug: "cupping-scorecards",
    suite: "more",
    heroDescription:
      "Score every batch with SCA-aligned cupping scorecards. Compare across origins, profiles, and dates to maintain quality.",
    includedNote: "Included",
    benefits: [
      "SCA-aligned scoring for aroma, flavour, aftertaste, acidity, body, and overall",
      "Automatic total score calculation",
      "Compare scores across batches, origins, and dates",
      "Attach cupping notes and tasting descriptors",
      "Track quality trends over time",
      "Share scorecards with your team",
    ],
  },
  calculators: {
    featureTitle: "Margin Calculator",
    slug: "calculators",
    suite: "sales",
    heroDescription:
      "Roast loss, brew ratio, and cost-per-cup calculators built for working roasters. The maths without the spreadsheet.",
    includedNote: "From £39/mo",
    benefits: [
      "Roast loss calculator — weight loss and percentage",
      "Cost per kg roasted based on green bean cost",
      "Brew ratio calculator for dialling in recipes",
      "Cost per cup breakdown for retail pricing",
      "No spreadsheets needed — results update instantly",
      "Save calculations alongside roast logs",
    ],
  },
};

interface FeatureDetail {
  featureTitle: string;
  featureIcon?: string;
  slug: string;
  suite: string;
  heroDescription: string;
  includedNote?: string;
  benefits: string[];
  benefitsTitle?: string;
  screenshot?: { asset: { _ref: string }; alt?: string };
  ctaHeadline?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  comingSoon?: boolean;
}

export async function generateStaticParams() {
  const slugs = await client
    .fetch<{ slug: string }[]>(allRoasterFeatureDetailSlugsQuery)
    .catch(() => []);
  const sanityPaths = slugs
    .filter((s) => !hiddenSlugs.has(s.slug))
    .map((s) => ({ slug: s.slug }));
  const sanitySlugs = new Set(sanityPaths.map((p) => p.slug));
  const fallbackPaths = Object.keys(fallbackFeatures)
    .filter((s) => !sanitySlugs.has(s))
    .map((s) => ({ slug: s }));
  return [...sanityPaths, ...fallbackPaths];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (hiddenSlugs.has(slug)) return { title: "Feature" };

  const detail =
    (await client
      .fetch<FeatureDetail>(roasterFeatureDetailBySlugQuery, { slug })
      .catch(() => null)) ?? fallbackFeatures[slug] ?? null;

  if (!detail) return { title: "Feature" };

  return {
    title: detail.featureTitle,
    description: detail.heroDescription,
  };
}

export default async function FeatureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (hiddenSlugs.has(slug)) notFound();
  if (redirectSlugs[slug]) redirect(redirectSlugs[slug]);

  const detail =
    (await client
      .fetch<FeatureDetail>(roasterFeatureDetailBySlugQuery, { slug })
      .catch(() => null)) ?? fallbackFeatures[slug] ?? null;

  if (!detail) notFound();

  const suiteLabel = suiteLabelMap[detail.suite] || detail.suite;

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `Roastery Platform — ${detail.featureTitle}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: detail.heroDescription,
    offers: {
      "@type": "Offer",
      price: detail.suite === "sales" ? "39" : detail.suite === "marketing" ? "19" : "0",
      priceCurrency: "GBP",
      description: detail.includedNote || suitePriceLabel[detail.suite] || "Included",
    },
    featureList: detail.benefits?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            {suiteLabel}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 mb-6">
            {detail.featureTitle}
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto mb-3">
            {detail.heroDescription}
          </p>
          {!detail.comingSoon && (detail.includedNote || suitePriceLabel[detail.suite]) && (
            <p className="text-sm font-medium text-accent">
              {detail.includedNote || suitePriceLabel[detail.suite]}
            </p>
          )}
          {detail.comingSoon && (
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
              Coming Soon
            </span>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 mb-12 text-center">
            {detail.benefitsTitle || "What you get"}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Benefits list */}
            {detail.benefits && detail.benefits.length > 0 && (
              <div className="space-y-3">
                {detail.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 p-3">
                    <CheckCircle
                      size={24}
                      weight="duotone"
                      className="text-accent flex-shrink-0 mt-0.5"
                    />
                    <span className="text-neutral-700">{benefit}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Illustration / Screenshot */}
            {animatedSlugs.has(slug) ? (
              <FeatureIllustration slug={slug} />
            ) : detail.screenshot ? (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-lg">
                <Image
                  src={urlFor(detail.screenshot).width(800).height(600).url()}
                  alt={detail.screenshot.alt || `${detail.featureTitle} screenshot`}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-sm text-neutral-400 font-medium">
                    Screenshot coming soon
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-neutral-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6">
            {detail.ctaHeadline || `Try ${detail.featureTitle}`}
          </h2>
          <p className="text-lg text-neutral-300 max-w-xl mx-auto mb-10">
            {detail.ctaDescription ||
              "Create your account and start exploring. No credit card required."}
          </p>
          <a
            href={PLATFORM_URL}
            className="inline-flex items-center px-8 py-4 border-2 border-accent bg-accent text-white font-semibold text-lg rounded-lg hover:bg-transparent hover:text-accent transition-colors"
          >
            {detail.ctaButtonText || "Start Free Trial"}
            <ArrowRight size={24} weight="duotone" className="ml-2" />
          </a>
        </div>
      </section>
    </>
  );
}
