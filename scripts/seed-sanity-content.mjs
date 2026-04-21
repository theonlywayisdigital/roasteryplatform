/**
 * Seed Sanity content — creates missing singletons, FAQs, and updates
 * siteSettings + roastersPageSettings to match codebase fallback content.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> node scripts/seed-sanity-content.mjs
 */

import { createClient } from "@sanity/client";

const projectId = "7ptzzw40";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("Missing SANITY_WRITE_TOKEN environment variable");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

// ── 1. roasterFeaturesPage (singleton) ─────────────────────
const roasterFeaturesPage = {
  _id: "roasterFeaturesPage",
  _type: "roasterFeaturesPage",
  heroHeadline: "Powerful tools for",
  heroAccentText: "modern roasters",
  heroSubheadline:
    "Everything you need to sell, market, and grow your coffee brand online — all included on every plan.",
  heroCtaText: "Get Started Free",
  salesSuiteTitle: "Sales Suite",
  salesSuiteSubtitle: "From £39/mo",
  marketingSuiteTitle: "Marketing Suite",
  marketingSuiteSubtitle: "From £19/mo — add-on",
  marketplaceTitle: "Marketplace",
  marketplaceCopy: "",
  faqTitle: "Frequently Asked Questions",
  ctaHeadline: "Start selling coffee online today",
  ctaDescription:
    "Create your account and explore the platform. No credit card required.",
  ctaButtonText: "Get Started Free",
};

// ── 2. roasterPricingPage (singleton) ──────────────────────
const roasterPricingPage = {
  _id: "roasterPricingPage",
  _type: "roasterPricingPage",
  heroHeadline: "Simple, transparent",
  heroSubheadline:
    "Sales Suite from £39/mo. Marketing Suite from £19/mo. Roaster Tools included with every plan.",
  faqTitle: "Frequently asked questions",
  ctaHeadline: "Start your free trial today.",
  ctaDescription:
    "14 days free. No credit card required. Explore every feature.",
  ctaButtonText: "Start Free Trial",
};

// ── 3. roasterPartnerProgramPage (singleton) ───────────────
const roasterPartnerProgramPage = {
  _id: "roasterPartnerProgramPage",
  _type: "roasterPartnerProgramPage",
  heroHeadline: "More orders.",
  heroAccentText: "No marketing.",
  heroSubheadline:
    "We bring the brands and the orders. You bring the craft. Fill your roaster without spending a penny on advertising.",
  heroCtaText: "Apply Now",
  stepsTitle: "How it works",
  steps: [
    {
      _key: "step01",
      step: "01",
      title: "Apply",
      description:
        "Tell us about your roastery — equipment, capacity, profiles you roast, and certifications. We review and respond within 48 hours.",
    },
    {
      _key: "step02",
      step: "02",
      title: "Get matched",
      description:
        "We match you with brands in your region that need your capacity and roast style. You choose which orders to accept.",
    },
    {
      _key: "step03",
      step: "03",
      title: "Roast & ship",
      description:
        "Roast to spec, apply the brand's label, and dispatch. We handle customer service, returns, and reorders.",
    },
    {
      _key: "step04",
      step: "04",
      title: "Get paid",
      description:
        "Payouts processed weekly into your bank account. Transparent rates, no invoicing to chase, no hidden fees.",
    },
  ],
  benefitsTitle: "What you get",
  benefits: [
    {
      _key: "ben01",
      icon: "TrendUp",
      title: "Fill your spare capacity",
      description:
        "Turn downtime into revenue. We send orders that match your capacity — you roast when you have time, not when you have to.",
    },
    {
      _key: "ben02",
      icon: "ShieldCheck",
      title: "Zero marketing spend",
      description:
        "We handle customer acquisition, brand building, and advertising. You never need to spend a penny on marketing to get orders.",
    },
    {
      _key: "ben03",
      icon: "Package",
      title: "Simple fulfilment",
      description:
        "Orders arrive in your dashboard. Roast, label, dispatch. We handle customer service, returns, and reorders.",
    },
    {
      _key: "ben04",
      icon: "Lightning",
      title: "Weekly payouts",
      description:
        "Transparent rates published upfront. Payouts every week, directly to your bank. No invoicing, no chasing, no delays.",
    },
  ],
  requirementsTitle: "What you need",
  requirements: [
    "UK-based speciality coffee roastery with commercial roasting equipment",
    "Ability to fulfil orders within 3–5 working days of receipt",
    "Food safety certification (HACCP or equivalent) in place",
    "Experience roasting a range of profiles — light through dark",
    "Consistent quality standards across batches",
  ],
  ctaHeadline: "Ready to fill your roaster?",
  ctaDescription:
    "Apply today. We review applications within 48 hours. No upfront costs, no risk.",
  ctaButtonText: "Apply Now",
};

// ── 4. roasterProductsCarousel (singleton) ─────────────────
const roasterProductsCarousel = {
  _id: "roasterProductsCarousel",
  _type: "roasterProductsCarousel",
  suites: [
    {
      _key: "sales",
      key: "sales",
      label: "Sales Suite",
      tagline: "Sell wholesale and direct — from one dashboard",
      description:
        "Manage your products, track every order, handle wholesale accounts, send invoices, and get paid automatically. From £39/mo.",
      features: [
        {
          _key: "sales-f1",
          icon: "clipboard-list",
          title: "Order Tracking",
          description:
            "Track every order from placement to delivery with real-time status updates.",
          href: "/features/order-tracking",
        },
        {
          _key: "sales-f2",
          icon: "shopping-cart",
          title: "Wholesale",
          description:
            "Manage wholesale accounts, custom pricing tiers, and repeat orders.",
          href: "/features/wholesale",
        },
        {
          _key: "sales-f3",
          icon: "receipt",
          title: "Invoices",
          description:
            "Generate and send professional invoices. Track payments and export for your accountant.",
          href: "/features/invoices",
        },
      ],
    },
    {
      _key: "marketing",
      key: "marketing",
      label: "Marketing Suite",
      tagline: "Grow your brand on autopilot",
      description:
        "Email campaigns, social scheduling, content calendar, and embedded forms. From £19/mo.",
      features: [
        {
          _key: "mkt-f1",
          icon: "mail",
          title: "Email Campaigns",
          description:
            "Design beautiful emails that drive repeat orders. Segmentation and analytics built in.",
          href: "/features/email-campaigns",
        },
        {
          _key: "mkt-f2",
          icon: "share2",
          title: "Social Scheduling",
          description:
            "Plan, create, and schedule social media posts across Instagram, Facebook, and LinkedIn.",
          href: "/features/social-scheduling",
        },
      ],
    },
    {
      _key: "roaster-tools",
      key: "roaster-tools",
      label: "Roaster Tools",
      tagline: "The tools your roastery actually needs",
      description:
        "Green bean inventory, roast logging, cupping scorecards, and calculators — built for working roasters. Included with Sales Suite.",
      features: [
        {
          _key: "rt-f1",
          icon: "leaf",
          title: "Green Bean Inventory",
          description:
            "Track every bag of green coffee from arrival to roast. Origins, suppliers, and stock levels.",
          href: "/features/roaster-tools",
        },
        {
          _key: "rt-f2",
          icon: "fire",
          title: "Roast Log",
          description:
            "Record profiles, temperatures, development times, and batch notes.",
          href: "/features/roaster-tools",
        },
        {
          _key: "rt-f3",
          icon: "star",
          title: "Cupping Scorecards",
          description:
            "SCA-aligned scoring. Compare batches across origins, profiles, and dates.",
          href: "/features/roaster-tools",
        },
        {
          _key: "rt-f4",
          icon: "calculator",
          title: "Calculators",
          description:
            "Roast loss, brew ratio, and cost-per-cup. The maths without the spreadsheet.",
          href: "/features/roaster-tools",
        },
      ],
    },
    {
      _key: "more",
      key: "more",
      label: "More",
      tagline: "Everything else your roastery needs",
      description:
        "Dashboard, analytics, inbox, integrations, help centre, and AI-powered tools. Included with every plan.",
      features: [
        {
          _key: "more-f1",
          icon: "squares-four",
          title: "Dashboard",
          description: "Orders, stock, revenue and activity at a glance.",
          href: "/features/dashboard",
        },
        {
          _key: "more-f2",
          icon: "tray",
          title: "Inbox",
          description:
            "Convert order emails into tracked orders with one click.",
          href: "/features/inbox",
        },
        {
          _key: "more-f3",
          icon: "plugs",
          title: "Integrations",
          description:
            "Shopify, WooCommerce, Wix and Squarespace — sync automatically.",
          href: "/features/integrations",
        },
        {
          _key: "more-f4",
          icon: "robot",
          title: "AI",
          description:
            "Generate campaigns, write descriptions, and extract orders automatically.",
          href: "/features/ai",
        },
      ],
    },
  ],
};

// ── 5. siteSettings (update existing) ──────────────────────
const siteSettingsPatch = {
  tagline:
    "The all-in-one platform for coffee roasters. Sales, marketing, and roaster tools.",
  defaultSeoTitle:
    "Roastery Platform — The All-in-One Platform for Coffee Roasters",
  defaultSeoDescription:
    "Everything you need to sell more coffee. Wholesale, marketing, roaster tools — one platform, one login.",
};

// ── 6. roastersPageSettings (update existing) ──────────────
const roastersPageSettingsPatch = {
  heroHeadline:
    "The all-in-one platform built for coffee roasters. Market. Sell. Manage.",
  heroSubheadline:
    "Storefront, wholesale, marketing, roaster tools, and website builder — one platform, one login. Free to start.",
  heroCta: "Get started free",
  videoSectionTitle: "See the platform in action",
  videoSectionSubtitle: "2 minute overview",
  ctaStrip1Headline:
    "Stop stitching together Shopify, Mailchimp, and spreadsheets",
  ctaStrip1Subtitle:
    "One platform for sales, marketing, and production. Start your free trial today.",
  toolsSectionTitle: "Four products.",
  toolsSectionSubtitle: "One platform.",
  toolsSectionDescription:
    "Sales, marketing, roaster tools, and more. Each works on its own. Together they replace the stack of apps you're paying for.",
  ctaStrip2Headline: "Plans that grow with your business.",
  ctaStrip2Subtitle: "No lock-in. Cancel any time. 14-day free trial.",
  caseStudiesSectionTitle: "Roasters using the",
  caseStudiesSectionSubtitle:
    "Real roasteries. Real results. See how they sell more coffee with less overhead.",
  blogSectionTitle: "From the",
  blogSectionSubtitle:
    "Practical guides, industry insights, and business tips for working roasters.",
  partnerSectionLabel: "Partner Programme",
  partnerSectionTitle: "More orders.",
  partnerSectionSubtitle:
    "We bring the brands and the orders. You bring the craft. Fill your roaster without spending a penny on advertising.",
  partnerSteps: [
    {
      _key: "ps01",
      step: "01",
      title: "Apply",
      description:
        "Tell us about your roastery — equipment, capacity, and the profiles you roast. We verify quality and approve within 48 hours.",
      icon: "SealCheck",
    },
    {
      _key: "ps02",
      step: "02",
      title: "Match",
      description:
        "We match you with brands in your region that need your capacity. Orders land in your dashboard automatically.",
      icon: "Package",
    },
    {
      _key: "ps03",
      step: "03",
      title: "Roast & ship",
      description:
        "Roast to spec, print labels, and dispatch. We handle customer service, returns, and reorders.",
      icon: "Truck",
    },
    {
      _key: "ps04",
      step: "04",
      title: "Get paid",
      description:
        "Payouts processed weekly. Transparent rates, no hidden fees, no invoicing to chase.",
      icon: "HandCoins",
    },
  ],
};

// ── 7. FAQs — roaster-pricing ──────────────────────────────
const pricingFaqs = [
  {
    _id: "faq-pricing-1",
    _type: "faq",
    question: "What is Roaster Tools?",
    answer:
      "Roaster Tools is a suite of production tools — green bean inventory, roast log, cupping scorecards, production planner, and calculators — included with every Sales Suite plan at no extra cost.",
    category: "roaster-pricing",
    order: 1,
  },
  {
    _id: "faq-pricing-2",
    _type: "faq",
    question: "Is there a free trial?",
    answer:
      "Yes. Every plan includes a 14-day free trial with full access to all features. No credit card required to start.",
    category: "roaster-pricing",
    order: 2,
  },
  {
    _id: "faq-pricing-3",
    _type: "faq",
    question: "Is the Marketing Suite required?",
    answer:
      "No. The Marketing Suite is an optional add-on. You can use the Sales Suite and Roaster Tools without it.",
    category: "roaster-pricing",
    order: 3,
  },
  {
    _id: "faq-pricing-4",
    _type: "faq",
    question: "Can I switch plans at any time?",
    answer:
      "Yes. Upgrade, downgrade, or cancel at any time. No lock-in contracts. Changes take effect at the end of your current billing period.",
    category: "roaster-pricing",
    order: 4,
  },
  {
    _id: "faq-pricing-5",
    _type: "faq",
    question: "Do you offer annual billing?",
    answer:
      "Yes. Annual billing saves you roughly 15–16% compared to monthly pricing. Switch between monthly and annual at any time.",
    category: "roaster-pricing",
    order: 5,
  },
];

// ── 8. FAQs — roaster-features ─────────────────────────────
const featuresFaqs = [
  {
    _id: "faq-features-1",
    _type: "faq",
    question: "Are all features included on every plan?",
    answer:
      "Every plan includes the full Sales Suite, Roaster Tools, and access to the Marketplace. The Marketing Suite is an optional add-on starting at £19/mo.",
    category: "roaster-features",
    order: 1,
  },
  {
    _id: "faq-features-2",
    _type: "faq",
    question: "Can I use just the Sales Suite without the Marketing Suite?",
    answer:
      "Yes. The Sales Suite works independently. Add the Marketing Suite whenever you're ready to scale your email, social, and content marketing.",
    category: "roaster-features",
    order: 2,
  },
  {
    _id: "faq-features-3",
    _type: "faq",
    question: "What integrations are available?",
    answer:
      "Shopify, WooCommerce, Wix, and Squarespace for e-commerce. Xero and QuickBooks for accounting. Available on Pro and Scale plans.",
    category: "roaster-features",
    order: 3,
  },
  {
    _id: "faq-features-4",
    _type: "faq",
    question: "Is there a limit on team members?",
    answer:
      "Growth plans include 1 team member. Pro plans include 3. Scale plans include 10. Additional seats available on request.",
    category: "roaster-features",
    order: 4,
  },
];

// ── Run ────────────────────────────────────────────────────

async function run() {
  const tx = client.transaction();

  // Create or replace singletons
  console.log("Creating roasterFeaturesPage...");
  tx.createOrReplace(roasterFeaturesPage);

  console.log("Creating roasterPricingPage...");
  tx.createOrReplace(roasterPricingPage);

  console.log("Creating roasterPartnerProgramPage...");
  tx.createOrReplace(roasterPartnerProgramPage);

  console.log("Creating roasterProductsCarousel...");
  tx.createOrReplace(roasterProductsCarousel);

  // Patch siteSettings
  console.log("Updating siteSettings...");
  tx.patch("siteSettings", (p) => p.set(siteSettingsPatch));

  // Patch roastersPageSettings
  console.log("Updating roastersPageSettings...");
  tx.patch("roastersPageSettings", (p) => p.set(roastersPageSettingsPatch));

  // Create FAQs
  console.log("Creating pricing FAQs (5)...");
  for (const faq of pricingFaqs) {
    tx.createOrReplace(faq);
  }

  console.log("Creating features FAQs (4)...");
  for (const faq of featuresFaqs) {
    tx.createOrReplace(faq);
  }

  console.log("Committing transaction...");
  const result = await tx.commit();
  console.log(`Done. Transaction ID: ${result.transactionId}`);
  console.log(
    `Created/updated ${4 + 5 + 4} documents, patched 2 existing documents.`
  );
}

run().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
