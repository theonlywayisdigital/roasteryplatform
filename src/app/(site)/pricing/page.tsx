import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { roasterFaqsQuery, roasterPricingPageQuery } from "@/sanity/lib/queries";
import { PricingContent } from "./PricingContent";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Pricing — Affordable Coffee Roastery Software from £39/mo",
  description:
    "Simple, transparent pricing for independent coffee roasters. Sales Suite from £39/mo, Marketing Suite from £19/mo. Roaster tools included. 14-day free trial, no credit card required.",
  openGraph: {
    title: "Pricing — Affordable Coffee Roastery Software from £39/mo",
    description: "Simple, transparent pricing for independent coffee roasters. Sales Suite from £39/mo, Marketing Suite from £19/mo. 14-day free trial.",
  },
};

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

export default async function PricingPage() {
  const [faqs, cms] = await Promise.all([
    client.fetch<FAQ[]>(roasterFaqsQuery).catch(() => []),
    client.fetch(roasterPricingPageQuery).catch(() => null),
  ]);

  return <PricingContent faqs={faqs} cms={cms} />;
}
