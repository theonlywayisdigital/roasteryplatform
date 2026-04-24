import { Metadata } from "next";
import Link from "next/link";
import {
  Package,
  ClipboardText,
  ShoppingCart,
  Users,
  Receipt,
  Calendar,
  Envelope,
  ShareNetwork,
  Code,
  ArrowRight,
  CaretRight,
  Leaf,
  Fire,
  CalendarBlank,
  Star,
  Calculator,
  SquaresFour,
  ChartLine,
  Tray,
  Plugs,
  Question,
  Robot,
} from "@phosphor-icons/react/dist/ssr";
import { client } from "@/sanity/lib/client";
import {
  roasterFeaturesQuery,
  roasterFeaturesFaqsQuery,
  roasterFeaturesPageQuery,
} from "@/sanity/lib/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Features — Coffee Roaster Platform for Sales, Marketing & Production",
  description:
    "Explore every feature of Roastery Platform. Wholesale coffee management, CRM, invoicing, email marketing, roast logging, and production planning — built for independent coffee roasters UK.",
  openGraph: {
    title: "Features — Coffee Roaster Platform for Sales, Marketing & Production",
    description: "Explore every feature of Roastery Platform. Wholesale coffee management, CRM, invoicing, email marketing, roast logging, and production planning.",
  },
};

const PLATFORM_URL = "https://app.roasteryplatform.com";

// ── Types ────────────────────────────────────────────────────

interface Feature {
  _id: string;
  title: string;
  slug?: { current: string };
  description: string;
  category: string;
  icon?: string;
  order?: number;
}

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

// ── Default Features (inline fallback) ───────────────────────

interface DefaultFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  comingSoon?: boolean;
}

const salesFeatures: DefaultFeature[] = [
  {
    icon: <Package size={28} weight="duotone" />,
    title: "Product Management",
    description:
      "Manage your coffee catalogue, blends, sizes, and pricing in one place.",
    href: "/features/product-management",
  },
  {
    icon: <ClipboardText size={28} weight="duotone" />,
    title: "Order Tracking",
    description:
      "Track every order from placement to delivery with real-time status updates.",
    href: "/features/order-tracking",
  },
  {
    icon: <ShoppingCart size={28} weight="duotone" />,
    title: "Wholesale",
    description:
      "Manage wholesale accounts, custom pricing tiers, minimum order quantities, and repeat orders.",
    href: "/features/wholesale",
  },
  {
    icon: <Users size={28} weight="duotone" />,
    title: "CRM",
    description:
      "Customer profiles, purchase history, segments, and lifetime value tracking.",
    href: "/features/crm",
  },
  {
    icon: <Receipt size={28} weight="duotone" />,
    title: "Invoices",
    description:
      "Generate and send professional invoices. Track payments and export for your accountant.",
    href: "/features/invoices",
  },
  {
    icon: <Leaf size={28} weight="duotone" />,
    title: "Inventory Tracking",
    description:
      "Track every gram from green bean intake through roasting to finished product. Green stock, roasted stock and products — all linked.",
    href: "/features/inventory-tracking",
  },
  {
    icon: <Fire size={28} weight="duotone" />,
    title: "Roast Log",
    description:
      "Record profiles, charge temps, development times, and batch notes. Searchable library of every roast.",
    href: "/features/roast-log",
  },
  {
    icon: <CalendarBlank size={28} weight="duotone" />,
    title: "Production Planner",
    description:
      "Schedule roasts against orders and capacity. See what needs roasting and allocate batches.",
    href: "/features/production-planner",
  },
  {
    icon: <Calculator size={28} weight="duotone" />,
    title: "Margin Calculator",
    description:
      "Roast loss, brew ratio, and cost-per-cup calculators. The maths without the spreadsheet.",
    href: "/features/calculators",
  },
];

const marketingFeatures: DefaultFeature[] = [
  {
    icon: <Calendar size={28} weight="duotone" />,
    title: "Content Calendar",
    description:
      "Plan, create, and schedule all your content from a single calendar view.",
    href: "/features/content-calendar",
  },
  {
    icon: <Envelope size={28} weight="duotone" />,
    title: "Email Campaigns",
    description:
      "Design and send beautiful email campaigns. Segmentation and analytics built in.",
    href: "/features/email-campaigns",
  },
  {
    icon: <ShareNetwork size={28} weight="duotone" />,
    title: "Social Scheduling",
    description:
      "Plan, create, and schedule social media posts across Instagram, Facebook, and LinkedIn.",
    href: "/features/social-scheduling",
  },
  {
    icon: <Code size={28} weight="duotone" />,
    title: "Embedded Forms",
    description:
      "Capture leads and grow your audience with embeddable signup and contact forms.",
    href: "/features/embedded-forms",
  },
];

const moreFeatures: DefaultFeature[] = [
  {
    icon: <Star size={28} weight="duotone" />,
    title: "Cupping Scorecards",
    description:
      "SCA-aligned cupping forms. Compare scores across origins, profiles, and roast dates.",
    href: "/features/cupping-scorecards",
  },
  {
    icon: <SquaresFour size={28} weight="duotone" />,
    title: "Dashboard",
    description:
      "Your roastery at a glance. Orders, stock, revenue and activity in one view.",
    href: "/features/dashboard",
  },
  {
    icon: <ChartLine size={28} weight="duotone" />,
    title: "Analytics",
    description:
      "Track performance across sales, customers and marketing in one place.",
    href: "/features/analytics",
  },
  {
    icon: <Tray size={28} weight="duotone" />,
    title: "Inbox",
    description:
      "Receive order emails directly into Roastery Platform. Convert emails into orders with one click.",
    href: "/features/inbox",
  },
  {
    icon: <Plugs size={28} weight="duotone" />,
    title: "Integrations",
    description:
      "Connect Shopify, WooCommerce, Wix and Squarespace. Sync products and orders automatically.",
    href: "/features/integrations",
  },
  {
    icon: <Question size={28} weight="duotone" />,
    title: "Help Center",
    description:
      "Embedded help documentation available inside the platform whenever your team needs it.",
    href: "/features/help-center",
  },
  {
    icon: <Robot size={28} weight="duotone" />,
    title: "Beans AI",
    description:
      "AI-powered tools across the platform. Generate campaigns, write product descriptions, and convert emails into orders automatically.",
    href: "/features/ai",
  },
];

// ── Icon Map (for Sanity-sourced features) ───────────────────

const iconMap: Record<string, React.ReactNode> = {
  boxes: <Package size={28} weight="duotone" />,
  "clipboard-list": <ClipboardText size={28} weight="duotone" />,
  "shopping-cart": <ShoppingCart size={28} weight="duotone" />,
  users: <Users size={28} weight="duotone" />,
  receipt: <Receipt size={28} weight="duotone" />,
  "calendar-days": <Calendar size={28} weight="duotone" />,
  mail: <Envelope size={28} weight="duotone" />,
  share2: <ShareNetwork size={28} weight="duotone" />,
  code2: <Code size={28} weight="duotone" />,
  package: <Package size={28} weight="duotone" />,
};

// ── Feature Card Component ───────────────────────────────────

function FeatureCard({ feature }: { feature: DefaultFeature }) {
  const card = (
    <div className="group relative p-6 rounded-xl border border-neutral-200 hover:border-accent/30 hover:shadow-lg transition-all duration-300 bg-white">
      {feature.comingSoon && (
        <span className="absolute top-4 right-4 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full">
          Coming Soon
        </span>
      )}
      <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold text-neutral-900 mb-2">
        {feature.title}
      </h3>
      <p className="text-neutral-600">{feature.description}</p>
      {!feature.comingSoon && (
        <div className="mt-4 flex items-center text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
          Learn more
          <CaretRight size={20} weight="duotone" className="ml-1" />
        </div>
      )}
    </div>
  );

  if (feature.comingSoon) {
    return card;
  }

  return (
    <Link href={feature.href} className="block">
      {card}
    </Link>
  );
}

// ── Page Component ───────────────────────────────────────────

export default async function FeaturesPage() {
  // Fetch Sanity content in parallel
  const [sanityFeatures, faqs, cms] = await Promise.all([
    client.fetch<Feature[]>(roasterFeaturesQuery).catch(() => []),
    client.fetch<FAQ[]>(roasterFeaturesFaqsQuery).catch(() => []),
    client.fetch(roasterFeaturesPageQuery).catch(() => null),
  ]);

  // If Sanity has features, build cards from them; otherwise use defaults
  const hasSanityFeatures = sanityFeatures && sanityFeatures.length > 0;

  const resolvedSalesFeatures = hasSanityFeatures
    ? sanityFeatures
        .filter((f) => f.category === "sales")
        .map((f) => ({
          icon: iconMap[f.icon || "package"] || <Package size={28} weight="duotone" />,
          title: f.title,
          description: f.description,
          href: `/features/${f.slug?.current || f.title.toLowerCase().replace(/\s+/g, "-")}`,
        }))
    : salesFeatures;

  const resolvedMarketingFeatures = hasSanityFeatures
    ? sanityFeatures
        .filter((f) => f.category === "marketing")
        .map((f) => ({
          icon: iconMap[f.icon || "package"] || <Package size={28} weight="duotone" />,
          title: f.title,
          description: f.description,
          href: `/features/${f.slug?.current || f.title.toLowerCase().replace(/\s+/g, "-")}`,
        }))
    : marketingFeatures;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 mb-6">
            {cms?.heroHeadline ?? "Built for roasters."}{" "}
            <span className="text-accent">{cms?.heroAccentText ?? "Not adapted for them."}</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto mb-10">
            {cms?.heroSubheadline ?? "Every feature was designed around how a roastery actually works — from green bean intake to wholesale invoice. Not hashed out of a generic business SaaS."}
          </p>
          <a
            href={PLATFORM_URL}
            className="inline-flex items-center px-8 py-4 border-2 border-accent bg-accent text-white font-semibold text-lg rounded-lg hover:bg-transparent hover:text-accent transition-colors"
          >
            {cms?.heroCtaText ?? "Get Started Free"}
            <ArrowRight size={24} weight="duotone" className="ml-2" />
          </a>
        </div>
      </section>

      {/* ── Sales Suite ──────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 mb-3">
              {cms?.salesSuiteTitle ?? "Sales Suite"}
            </h2>
            <p className="text-neutral-500 text-lg">
              {cms?.salesSuiteSubtitle ?? "From £39/mo"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resolvedSalesFeatures.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/features/sales"
              className="inline-flex items-center text-accent font-semibold hover:underline"
            >
              View all Sales Suite features
              <ArrowRight size={20} weight="duotone" className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Marketing Suite ──────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white border-t border-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 mb-3">
              {cms?.marketingSuiteTitle ?? "Marketing Suite"}
            </h2>
            <p className="text-neutral-500 text-lg">
              {cms?.marketingSuiteSubtitle ?? "From £19/mo — add-on"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resolvedMarketingFeatures.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/features/marketing"
              className="inline-flex items-center text-accent font-semibold hover:underline"
            >
              View all Marketing Suite features
              <ArrowRight size={20} weight="duotone" className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── More ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white border-t border-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 mb-3">
              More
            </h2>
            <p className="text-neutral-500 text-lg">
              Included with every plan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {moreFeatures.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/features/more"
              className="inline-flex items-center text-accent font-semibold hover:underline"
            >
              View all More features
              <ArrowRight size={20} weight="duotone" className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 text-center mb-12">
                {cms?.faqTitle ?? "Frequently Asked Questions"}
              </h2>
              <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
                {faqs.map((faq) => (
                  <details key={faq._id} className="group">
                    <summary className="flex items-center justify-between cursor-pointer py-5 text-left text-lg font-semibold text-neutral-900 hover:text-accent transition-colors">
                      {faq.question}
                      <CaretRight size={24} weight="duotone" className="text-neutral-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
                    </summary>
                    <div className="pb-5 text-neutral-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-neutral-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6">
            {cms?.ctaHeadline ?? "Start selling coffee online today"}
          </h2>
          <p className="text-lg text-neutral-300 max-w-xl mx-auto mb-10">
            {cms?.ctaDescription ?? "Create your account and explore the platform. No credit card required."}
          </p>
          <a
            href={PLATFORM_URL}
            className="inline-flex items-center px-8 py-4 border-2 border-accent bg-accent text-white font-semibold text-lg rounded-lg hover:bg-transparent hover:text-accent transition-colors"
          >
            {cms?.ctaButtonText ?? "Get Started Free"}
            <ArrowRight size={24} weight="duotone" className="ml-2" />
          </a>
        </div>
      </section>
    </>
  );
}
