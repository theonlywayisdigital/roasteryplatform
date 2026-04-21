/**
 * Seed Sanity with "More" suite feature documents.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> node scripts/seed-more-features.mjs
 *
 * This creates:
 *   - 6 roasterFeature documents (parent catalogue entries)
 *   - 6 roasterFeatureDetail documents (feature detail pages)
 */

import { createClient } from "@sanity/client";

const projectId = "7ptzzw40";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("Error: SANITY_WRITE_TOKEN env var is required");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

const features = [
  {
    slug: "dashboard",
    title: "Dashboard",
    icon: "squares-four",
    description:
      "Your roastery at a glance. Orders, stock, revenue and activity in one view.",
    heroDescription:
      "See everything that matters at a glance. Your dashboard brings together orders, stock levels, revenue, and recent activity so you always know the state of your roastery.",
    benefits: [
      "Real-time order count and revenue summary",
      "Stock level overview across green and roasted beans",
      "Recent activity feed — orders, invoices, dispatches",
      "Quick-access shortcuts to common tasks",
      "Customisable date range for key metrics",
      "At-a-glance view of outstanding and overdue invoices",
    ],
    order: 1,
  },
  {
    slug: "analytics",
    title: "Analytics",
    icon: "chart-line",
    description:
      "Track performance across sales, customers and marketing in one place.",
    heroDescription:
      "Understand your roastery's performance with clear, actionable analytics. Track sales trends, customer behaviour, and marketing results — all in one place.",
    benefits: [
      "Sales performance charts — revenue, orders, and average order value",
      "Customer analytics — new vs returning, lifetime value trends",
      "Product performance — best sellers, margin analysis",
      "Marketing campaign metrics — open rates, click rates, conversions",
      "Date range filtering and comparison periods",
      "Export data to CSV for your own reporting",
    ],
    order: 2,
  },
  {
    slug: "inbox",
    title: "Inbox",
    icon: "tray",
    description:
      "Receive order emails directly into Roastery Platform. Convert emails into orders with one click.",
    heroDescription:
      "Stop copying orders from emails into spreadsheets. Your Roastery Platform inbox receives order emails and lets you convert them into tracked orders with a single click.",
    benefits: [
      "Dedicated inbox for receiving order emails",
      "AI-powered email parsing extracts order details automatically",
      "One-click conversion from email to tracked order",
      "Full email thread visible alongside the order",
      "Works with any email client your customers already use",
      "No setup required for your wholesale buyers",
    ],
    order: 3,
  },
  {
    slug: "integrations",
    title: "Integrations",
    icon: "plugs",
    description:
      "Connect Shopify, WooCommerce, Wix and Squarespace. Sync products and orders automatically.",
    heroDescription:
      "Connect your existing e-commerce platform and keep everything in sync. Products, orders, and stock levels flow automatically between Roastery Platform and your online store.",
    benefits: [
      "Shopify, WooCommerce, Wix, and Squarespace supported",
      "Two-way product sync — update once, publish everywhere",
      "Automatic order import from connected stores",
      "Stock level sync to prevent overselling",
      "Simple setup wizard — connect in under 5 minutes",
      "Webhook-based for real-time updates",
    ],
    order: 4,
  },
  {
    slug: "help-center",
    title: "Help Center",
    icon: "question",
    description:
      "Embedded help documentation available inside the platform whenever your team needs it.",
    heroDescription:
      "Get answers without leaving the platform. The built-in help centre provides searchable documentation, guides, and walkthroughs for every feature.",
    benefits: [
      "Searchable knowledge base embedded in the platform",
      "Step-by-step guides for every feature",
      "Context-sensitive help — relevant articles appear where you need them",
      "Getting started walkthroughs for new team members",
      "Regularly updated with new features and tips",
      "No need to open a separate browser tab",
    ],
    order: 5,
  },
  {
    slug: "ai",
    title: "AI",
    icon: "robot",
    description:
      "AI-powered tools across the platform. Generate campaigns, write product descriptions, and convert emails into orders automatically.",
    heroDescription:
      "AI is woven throughout Roastery Platform to save you time. Generate email campaigns, write product descriptions, extract orders from emails, and get smart suggestions — all powered by AI.",
    benefits: [
      "Generate email campaign copy from a brief",
      "Write and refine product descriptions automatically",
      "AI-powered email-to-order extraction in the Inbox",
      "Smart product suggestions based on buying patterns",
      "AI credits included on every plan",
      "Works across Sales Suite, Marketing Suite, and Inbox",
    ],
    order: 6,
  },
];

async function seed() {
  const transaction = client.transaction();

  for (const f of features) {
    const featureId = `roasterFeature-more-${f.slug}`;
    const detailId = `roasterFeatureDetail-more-${f.slug}`;

    // Parent feature document
    transaction.createOrReplace({
      _id: featureId,
      _type: "roasterFeature",
      title: f.title,
      slug: { _type: "slug", current: f.slug },
      description: f.description,
      category: "more",
      icon: f.icon,
      isActive: true,
      order: f.order,
    });

    // Feature detail document
    transaction.createOrReplace({
      _id: detailId,
      _type: "roasterFeatureDetail",
      slug: { _type: "slug", current: f.slug },
      suite: "more",
      feature: { _type: "reference", _ref: featureId },
      heroDescription: f.heroDescription,
      benefits: f.benefits,
      includedNote: "Included",
    });
  }

  const result = await transaction.commit();
  console.log(`Seeded ${features.length} "More" features:`, result.documentIds?.length ?? "OK");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
