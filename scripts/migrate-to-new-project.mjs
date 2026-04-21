/**
 * Migrate all content from old Sanity project (z97yvgto) to new project (7ptzzw40).
 *
 * 1. Downloads all image assets from old project CDN
 * 2. Uploads them to new project
 * 3. Rewrites asset references in documents
 * 4. Creates all documents in new project
 * 5. Creates missing singletons with fallback content
 * 6. Creates FAQ documents for roaster-pricing and roaster-features
 *
 * Usage:
 *   node scripts/migrate-to-new-project.mjs
 */

import { createClient } from "@sanity/client";
import https from "https";
import http from "http";

const OLD_PROJECT_ID = "z97yvgto";
const NEW_PROJECT_ID = "7ptzzw40";
const DATASET = "production";
const NEW_TOKEN = "skZ7YyHdQFkSiVuUZpycTkfi5fMxT3et5ZSMzr1h8mYxUIviu9PMHVkb3EdijRZM63EDoCVCngKNuK8Nj5cM8OSToiEjlXzAXI0SGgEU8eRuDnhVHgFMxkTXlT4K09BhhQMxczQ4aZmUAaDbiTQfbQbGKPhrWhDmxycLuLvd2EWWG10Vf7Yz";

const oldClient = createClient({
  projectId: OLD_PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
});

const newClient = createClient({
  projectId: NEW_PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: NEW_TOKEN,
});

// ── Helpers ────────────────────────────────────────────────

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    client.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

// ── Step 1: Export content from old project ────────────────

async function exportOldContent() {
  console.log("Exporting content from old project...");

  const KEEP_TYPES = new Set([
    "blogPost", "caseStudy", "roasterFeature", "roasterFeatureDetail",
    "roastersPageSettings", "siteSettings", "faq",
  ]);
  const SKIP_FIELDS = new Set(["_createdAt", "_updatedAt", "_rev", "_system"]);

  const allDocs = await oldClient.fetch("*");
  const contentDocs = allDocs
    .filter((d) => KEEP_TYPES.has(d._type))
    .map((d) => {
      const clean = {};
      for (const [k, v] of Object.entries(d)) {
        if (!SKIP_FIELDS.has(k)) clean[k] = v;
      }
      return clean;
    });

  const imageAssets = allDocs
    .filter((d) => d._type === "sanity.imageAsset")
    .map((d) => ({ _id: d._id, url: d.url, mimeType: d.mimeType, originalFilename: d.originalFilename }));

  console.log(`  Content documents: ${contentDocs.length}`);
  console.log(`  Image assets: ${imageAssets.length}`);

  return { contentDocs, imageAssets };
}

// ── Step 2: Migrate image assets ───────────────────────────

async function migrateAssets(imageAssets) {
  console.log(`\nMigrating ${imageAssets.length} image assets...`);

  // Map: old asset ref (e.g. "image-abc123-800x600-png") -> new asset ref
  const assetMap = new Map();
  let success = 0;
  let failed = 0;

  for (const asset of imageAssets) {
    try {
      const buf = await fetchBuffer(asset.url);
      const filename = asset.originalFilename || "image";
      const contentType = asset.mimeType || "image/png";

      const uploaded = await newClient.assets.upload("image", buf, {
        filename,
        contentType,
      });

      // Old ref format: "image-{hash}-{dimensions}-{ext}"
      // The _id from Sanity is like "image-abc123-800x600-png"
      // Refs in documents use the same format
      const oldRef = asset._id;
      const newRef = uploaded._id;
      assetMap.set(oldRef, newRef);

      success++;
      if (success % 10 === 0) {
        console.log(`  Uploaded ${success}/${imageAssets.length}...`);
      }
    } catch (err) {
      console.error(`  Failed to migrate asset ${asset._id}: ${err.message}`);
      failed++;
    }
  }

  console.log(`  Done: ${success} uploaded, ${failed} failed`);
  return assetMap;
}

// ── Step 3: Rewrite asset references in documents ──────────

function rewriteRefs(obj, assetMap) {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map((item) => rewriteRefs(item, assetMap));
  if (typeof obj !== "object") return obj;

  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key === "_ref" && typeof value === "string" && assetMap.has(value)) {
      result[key] = assetMap.get(value);
    } else {
      result[key] = rewriteRefs(value, assetMap);
    }
  }
  return result;
}

// ── Step 4: New singleton and FAQ content ──────────────────

function getNewDocuments() {
  return [
    // roasterFeaturesPage
    {
      _id: "roasterFeaturesPage",
      _type: "roasterFeaturesPage",
      heroHeadline: "Powerful tools for",
      heroAccentText: "modern roasters",
      heroSubheadline: "Everything you need to sell, market, and grow your coffee brand online — all included on every plan.",
      heroCtaText: "Get Started Free",
      salesSuiteTitle: "Sales Suite",
      salesSuiteSubtitle: "From £39/mo",
      marketingSuiteTitle: "Marketing Suite",
      marketingSuiteSubtitle: "From £19/mo — add-on",
      faqTitle: "Frequently Asked Questions",
      ctaHeadline: "Start selling coffee online today",
      ctaDescription: "Create your account and explore the platform. No credit card required.",
      ctaButtonText: "Get Started Free",
    },
    // roasterPricingPage
    {
      _id: "roasterPricingPage",
      _type: "roasterPricingPage",
      heroHeadline: "Simple, transparent",
      heroSubheadline: "Sales Suite from £39/mo. Marketing Suite from £19/mo. Roaster Tools included with every plan.",
      faqTitle: "Frequently asked questions",
      ctaHeadline: "Start your free trial today.",
      ctaDescription: "14 days free. No credit card required. Explore every feature.",
      ctaButtonText: "Start Free Trial",
    },
    // roasterPartnerProgramPage
    {
      _id: "roasterPartnerProgramPage",
      _type: "roasterPartnerProgramPage",
      heroHeadline: "More orders.",
      heroAccentText: "No marketing.",
      heroSubheadline: "We bring the brands and the orders. You bring the craft. Fill your roaster without spending a penny on advertising.",
      heroCtaText: "Apply Now",
      stepsTitle: "How it works",
      steps: [
        { _key: "step01", step: "01", title: "Apply", description: "Tell us about your roastery — equipment, capacity, profiles you roast, and certifications. We review and respond within 48 hours." },
        { _key: "step02", step: "02", title: "Get matched", description: "We match you with brands in your region that need your capacity and roast style. You choose which orders to accept." },
        { _key: "step03", step: "03", title: "Roast & ship", description: "Roast to spec, apply the brand's label, and dispatch. We handle customer service, returns, and reorders." },
        { _key: "step04", step: "04", title: "Get paid", description: "Payouts processed weekly into your bank account. Transparent rates, no invoicing to chase, no hidden fees." },
      ],
      benefitsTitle: "What you get",
      benefits: [
        { _key: "ben01", icon: "TrendUp", title: "Fill your spare capacity", description: "Turn downtime into revenue. We send orders that match your capacity — you roast when you have time, not when you have to." },
        { _key: "ben02", icon: "ShieldCheck", title: "Zero marketing spend", description: "We handle customer acquisition, brand building, and advertising. You never need to spend a penny on marketing to get orders." },
        { _key: "ben03", icon: "Package", title: "Simple fulfilment", description: "Orders arrive in your dashboard. Roast, label, dispatch. We handle customer service, returns, and reorders." },
        { _key: "ben04", icon: "Lightning", title: "Weekly payouts", description: "Transparent rates published upfront. Payouts every week, directly to your bank. No invoicing, no chasing, no delays." },
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
      ctaDescription: "Apply today. We review applications within 48 hours. No upfront costs, no risk.",
      ctaButtonText: "Apply Now",
    },
    // roasterProductsCarousel
    {
      _id: "roasterProductsCarousel",
      _type: "roasterProductsCarousel",
      suites: [
        {
          _key: "sales", key: "sales", label: "Sales Suite",
          tagline: "Sell wholesale and direct — from one dashboard",
          description: "Manage your products, track every order, handle wholesale accounts, send invoices, and get paid automatically. From £39/mo.",
          features: [
            { _key: "s-f1", icon: "clipboard-list", title: "Order Tracking", description: "Track every order from placement to delivery with real-time status updates.", href: "/features/order-tracking" },
            { _key: "s-f2", icon: "shopping-cart", title: "Wholesale", description: "Manage wholesale accounts, custom pricing tiers, and repeat orders.", href: "/features/wholesale" },
            { _key: "s-f3", icon: "receipt", title: "Invoices", description: "Generate and send professional invoices. Track payments and export for your accountant.", href: "/features/invoices" },
          ],
        },
        {
          _key: "marketing", key: "marketing", label: "Marketing Suite",
          tagline: "Grow your brand on autopilot",
          description: "Email campaigns, social scheduling, content calendar, and embedded forms. From £19/mo.",
          features: [
            { _key: "m-f1", icon: "mail", title: "Email Campaigns", description: "Design beautiful emails that drive repeat orders. Segmentation and analytics built in.", href: "/features/email-campaigns" },
            { _key: "m-f2", icon: "share2", title: "Social Scheduling", description: "Plan, create, and schedule social media posts across Instagram, Facebook, and LinkedIn.", href: "/features/social-scheduling" },
          ],
        },
        {
          _key: "roaster-tools", key: "roaster-tools", label: "Roaster Tools",
          tagline: "The tools your roastery actually needs",
          description: "Green bean inventory, roast logging, cupping scorecards, and calculators — built for working roasters. Included with Sales Suite.",
          features: [
            { _key: "rt-f1", icon: "leaf", title: "Green Bean Inventory", description: "Track every bag of green coffee from arrival to roast. Origins, suppliers, and stock levels.", href: "/features/roaster-tools" },
            { _key: "rt-f2", icon: "fire", title: "Roast Log", description: "Record profiles, temperatures, development times, and batch notes.", href: "/features/roaster-tools" },
            { _key: "rt-f3", icon: "star", title: "Cupping Scorecards", description: "SCA-aligned scoring. Compare batches across origins, profiles, and dates.", href: "/features/roaster-tools" },
            { _key: "rt-f4", icon: "calculator", title: "Calculators", description: "Roast loss, brew ratio, and cost-per-cup. The maths without the spreadsheet.", href: "/features/roaster-tools" },
          ],
        },
        {
          _key: "more", key: "more", label: "More",
          tagline: "Everything else your roastery needs",
          description: "Dashboard, analytics, inbox, integrations, help centre, and AI-powered tools. Included with every plan.",
          features: [
            { _key: "mo-f1", icon: "squares-four", title: "Dashboard", description: "Orders, stock, revenue and activity at a glance.", href: "/features/dashboard" },
            { _key: "mo-f2", icon: "tray", title: "Inbox", description: "Convert order emails into tracked orders with one click.", href: "/features/inbox" },
            { _key: "mo-f3", icon: "plugs", title: "Integrations", description: "Shopify, WooCommerce, Wix and Squarespace — sync automatically.", href: "/features/integrations" },
            { _key: "mo-f4", icon: "robot", title: "AI", description: "Generate campaigns, write descriptions, and extract orders automatically.", href: "/features/ai" },
          ],
        },
      ],
    },
    // Pricing FAQs
    { _id: "faq-pricing-1", _type: "faq", question: "What is Roaster Tools?", answer: "Roaster Tools is a suite of production tools — green bean inventory, roast log, cupping scorecards, production planner, and calculators — included with every Sales Suite plan at no extra cost.", category: "roaster-pricing", order: 1 },
    { _id: "faq-pricing-2", _type: "faq", question: "Is there a free trial?", answer: "Yes. Every plan includes a 14-day free trial with full access to all features. No credit card required to start.", category: "roaster-pricing", order: 2 },
    { _id: "faq-pricing-3", _type: "faq", question: "Is the Marketing Suite required?", answer: "No. The Marketing Suite is an optional add-on. You can use the Sales Suite and Roaster Tools without it.", category: "roaster-pricing", order: 3 },
    { _id: "faq-pricing-4", _type: "faq", question: "Can I switch plans at any time?", answer: "Yes. Upgrade, downgrade, or cancel at any time. No lock-in contracts. Changes take effect at the end of your current billing period.", category: "roaster-pricing", order: 4 },
    { _id: "faq-pricing-5", _type: "faq", question: "Do you offer annual billing?", answer: "Yes. Annual billing saves you roughly 15–16% compared to monthly pricing. Switch between monthly and annual at any time.", category: "roaster-pricing", order: 5 },
    // Features FAQs
    { _id: "faq-features-1", _type: "faq", question: "Are all features included on every plan?", answer: "Every plan includes the full Sales Suite, Roaster Tools, and access to the Marketplace. The Marketing Suite is an optional add-on starting at £19/mo.", category: "roaster-features", order: 1 },
    { _id: "faq-features-2", _type: "faq", question: "Can I use just the Sales Suite without the Marketing Suite?", answer: "Yes. The Sales Suite works independently. Add the Marketing Suite whenever you're ready to scale your email, social, and content marketing.", category: "roaster-features", order: 2 },
    { _id: "faq-features-3", _type: "faq", question: "What integrations are available?", answer: "Shopify, WooCommerce, Wix, and Squarespace for e-commerce. Xero and QuickBooks for accounting. Available on Pro and Scale plans.", category: "roaster-features", order: 3 },
    { _id: "faq-features-4", _type: "faq", question: "Is there a limit on team members?", answer: "Growth plans include 1 team member. Pro plans include 3. Scale plans include 10. Additional seats available on request.", category: "roaster-features", order: 4 },
  ];
}

// ── Step 5: Patch existing singletons ──────────────────────

function getSiteSettingsOverrides() {
  return {
    tagline: "The all-in-one platform for coffee roasters. Sales, marketing, and roaster tools.",
    defaultSeoTitle: "Roastery Platform — The All-in-One Platform for Coffee Roasters",
    defaultSeoDescription: "Everything you need to sell more coffee. Wholesale, marketing, roaster tools — one platform, one login.",
  };
}

function getRoastersPageSettingsOverrides() {
  return {
    heroHeadline: "The all-in-one platform built for coffee roasters. Market. Sell. Manage.",
    heroSubheadline: "Storefront, wholesale, marketing, roaster tools, and website builder — one platform, one login. Free to start.",
    heroCta: "Get started free",
    videoSectionTitle: "See the platform in action",
    videoSectionSubtitle: "2 minute overview",
    ctaStrip1Headline: "Stop stitching together Shopify, Mailchimp, and spreadsheets",
    ctaStrip1Subtitle: "One platform for sales, marketing, and production. Start your free trial today.",
    toolsSectionTitle: "Four products.",
    toolsSectionSubtitle: "One platform.",
    toolsSectionDescription: "Sales, marketing, roaster tools, and more. Each works on its own. Together they replace the stack of apps you're paying for.",
    ctaStrip2Headline: "Plans that grow with your business.",
    ctaStrip2Subtitle: "No lock-in. Cancel any time. 14-day free trial.",
    caseStudiesSectionTitle: "Roasters using the",
    caseStudiesSectionSubtitle: "Real roasteries. Real results. See how they sell more coffee with less overhead.",
    blogSectionTitle: "From the",
    blogSectionSubtitle: "Practical guides, industry insights, and business tips for working roasters.",
    partnerSectionLabel: "Partner Programme",
    partnerSectionTitle: "More orders.",
    partnerSectionSubtitle: "We bring the brands and the orders. You bring the craft. Fill your roaster without spending a penny on advertising.",
    partnerSteps: [
      { _key: "ps01", step: "01", title: "Apply", description: "Tell us about your roastery — equipment, capacity, and the profiles you roast. We verify quality and approve within 48 hours.", icon: "SealCheck" },
      { _key: "ps02", step: "02", title: "Match", description: "We match you with brands in your region that need your capacity. Orders land in your dashboard automatically.", icon: "Package" },
      { _key: "ps03", step: "03", title: "Roast & ship", description: "Roast to spec, print labels, and dispatch. We handle customer service, returns, and reorders.", icon: "Truck" },
      { _key: "ps04", step: "04", title: "Get paid", description: "Payouts processed weekly. Transparent rates, no hidden fees, no invoicing to chase.", icon: "HandCoins" },
    ],
  };
}

// ── Main ───────────────────────────────────────────────────

async function run() {
  // Step 1: Export from old project
  const { contentDocs, imageAssets } = await exportOldContent();

  // Step 2: Migrate images
  const assetMap = await migrateAssets(imageAssets);

  // Step 3: Rewrite refs in content docs
  console.log("\nRewriting asset references...");
  const rewrittenDocs = contentDocs.map((doc) => rewriteRefs(doc, assetMap));

  // Step 4: Apply overrides to siteSettings and roastersPageSettings
  const siteOverrides = getSiteSettingsOverrides();
  const pageOverrides = getRoastersPageSettingsOverrides();

  for (const doc of rewrittenDocs) {
    if (doc._id === "siteSettings") {
      Object.assign(doc, siteOverrides);
    }
    if (doc._id === "roastersPageSettings") {
      Object.assign(doc, pageOverrides);
    }
  }

  // Step 5: Add new documents
  const newDocs = getNewDocuments();

  // Step 6: Write everything to new project
  const allDocs = [...rewrittenDocs, ...newDocs];
  console.log(`\nWriting ${allDocs.length} documents to new project...`);

  // Batch in groups of 50 (Sanity transaction limit)
  const BATCH_SIZE = 50;
  for (let i = 0; i < allDocs.length; i += BATCH_SIZE) {
    const batch = allDocs.slice(i, i + BATCH_SIZE);
    const tx = newClient.transaction();
    for (const doc of batch) {
      tx.createOrReplace(doc);
    }
    await tx.commit();
    console.log(`  Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} documents committed`);
  }

  console.log("\n✅ Migration complete!");
  console.log(`  New project ID: ${NEW_PROJECT_ID}`);
  console.log(`  Dataset: ${DATASET}`);
  console.log(`  Total documents: ${allDocs.length}`);
  console.log(`  Image assets migrated: ${assetMap.size}`);
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
