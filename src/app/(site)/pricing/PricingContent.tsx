"use client";

import { useState } from "react";
import { ArrowRight, Check, X, CaretRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const PLATFORM_URL = "https://app.roasteryplatform.com";

/* ── Types ─────────────────────────────────────────────── */

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

type CellValue = string | boolean;

interface Tier {
  name: string;
  monthly: number;
  annualMonthly: number;
  description: string;
  highlighted?: boolean;
  cta: string;
  ctaHref: string;
}

interface FeatureRow {
  label: string;
  values: CellValue[];
}

interface Suite {
  key: string;
  label: string;
  subtitle: string;
  isAddOn?: boolean;
  tiers: Tier[];
  features: FeatureRow[];
}

/* ── Suite data ────────────────────────────────────────── */

const suites: Suite[] = [
  {
    key: "sales",
    label: "Sales Suite",
    subtitle: "Sell wholesale and direct-to-consumer from one dashboard",
    tiers: [
      {
        name: "Growth",
        monthly: 39,
        annualMonthly: 33,
        description: "Most roasters start here",
        cta: "Start Free Trial",
        ctaHref: `${PLATFORM_URL}/signup?plan=growth`,
      },
      {
        name: "Pro",
        monthly: 79,
        annualMonthly: 66,
        description: "More capacity, integrations",
        highlighted: true,
        cta: "Start Free Trial",
        ctaHref: `${PLATFORM_URL}/signup?plan=pro`,
      },
      {
        name: "Scale",
        monthly: 129,
        annualMonthly: 108,
        description: "High-volume roasteries",
        cta: "Start Free Trial",
        ctaHref: `${PLATFORM_URL}/signup?plan=scale`,
      },
    ],
    features: [
      { label: "Products", values: ["5", "25", "100"] },
      { label: "Orders", values: [true, true, true] },
      { label: "Wholesale Portal", values: [true, true, true] },
      { label: "Wholesale Accounts", values: ["30", "100", "500"] },
      { label: "Wholesale Orders / month", values: ["100", "250", "1,000"] },
      { label: "CRM Contacts", values: ["1,500", "5,000", "25,000"] },
      { label: "Invoices", values: [true, true, true] },
      { label: "Sales Pipeline", values: [true, true, true] },
      { label: "AI Order Extraction", values: [true, true, true] },
      { label: "Custom Email Domain", values: [true, true, true] },
      { label: "Accounting Integrations", values: [false, true, true] },
      { label: "E-commerce Integrations", values: [false, true, true] },
      { label: "Team Members", values: ["1", "3", "10"] },
    ],
  },
  {
    key: "marketing",
    label: "Marketing Suite",
    subtitle: "Email, social scheduling, content calendar & forms — grow your brand on autopilot",
    isAddOn: true,
    tiers: [
      {
        name: "Growth",
        monthly: 19,
        annualMonthly: 16,
        description: "Essential marketing tools",
        cta: "Start Free Trial",
        ctaHref: `${PLATFORM_URL}/signup?plan=growth`,
      },
      {
        name: "Pro",
        monthly: 49,
        annualMonthly: 42,
        description: "Higher limits, more forms",
        highlighted: true,
        cta: "Start Free Trial",
        ctaHref: `${PLATFORM_URL}/signup?plan=pro`,
      },
      {
        name: "Scale",
        monthly: 99,
        annualMonthly: 84,
        description: "High-volume campaigns",
        cta: "Start Free Trial",
        ctaHref: `${PLATFORM_URL}/signup?plan=scale`,
      },
    ],
    features: [
      { label: "Email Campaigns", values: [true, true, true] },
      { label: "Email Sends / month", values: ["5,000", "25,000", "50,000"] },
      { label: "Content Calendar", values: [true, true, true] },
      { label: "Social Scheduling", values: [true, true, true] },
      { label: "Embedded Forms", values: ["3", "10", "25"] },
    ],
  },
];

/* ── Helpers ────────────────────────────────────────────── */

function formatPrice(tier: Tier, annual: boolean) {
  const amount = annual ? tier.annualMonthly : tier.monthly;
  return { main: `£${amount}`, sub: annual ? "/mo billed annually" : "/month" };
}

function CellContent({ value }: { value: CellValue }) {
  if (value === true) return <Check className="text-accent mx-auto" size={24} weight="duotone" />;
  if (value === false) return <X className="text-neutral-300 mx-auto" size={20} weight="duotone" />;
  return <span className="text-sm text-neutral-700 font-medium">{value}</span>;
}

/* ── Pricing Table ─────────────────────────────────────── */

function PricingTable({
  suite,
  annual,
}: {
  suite: Suite;
  annual: boolean;
}) {
  const { tiers, features, isAddOn } = suite;

  return (
    <div>
      {isAddOn && (
        <p className="text-center text-sm text-accent font-medium mb-8">
          Add-on pricing — purchased on top of your Sales Suite plan
        </p>
      )}

      {/* Desktop table */}
      <div className="hidden lg:block overflow-visible pt-4">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-left w-[200px]" />
              {tiers.map((tier) => {
                const price = formatPrice(tier, annual);
                return (
                  <th
                    key={tier.name}
                    className={cn(
                      "p-4 pt-8 text-center min-w-[160px] relative rounded-t-2xl",
                      tier.highlighted && "bg-accent/5"
                    )}
                  >
                    {tier.highlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        <span className="bg-accent text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap shadow-sm">
                          Recommended
                        </span>
                      </div>
                    )}
                    <p className="text-lg font-bold text-neutral-900">
                      {tier.name}
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {tier.description}
                    </p>
                    <div className="mt-3">
                      <span className="text-3xl font-black text-neutral-900">
                        {isAddOn && tier.monthly > 0 ? "+" : ""}
                        {price.main}
                      </span>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {price.sub}
                      </p>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {features.map((row, idx) => (
              <tr
                key={row.label}
                className={cn(
                  "border-t border-neutral-100",
                  idx % 2 === 0 && "bg-neutral-50/50"
                )}
              >
                <td className="p-4 text-sm font-medium text-neutral-700">
                  {row.label}
                </td>
                {row.values.map((value, i) => (
                  <td
                    key={i}
                    className={cn(
                      "p-4 text-center",
                      tiers[i]?.highlighted && "bg-accent/5"
                    )}
                  >
                    <CellContent value={value} />
                  </td>
                ))}
              </tr>
            ))}
            {/* CTA row */}
            <tr className="border-t border-neutral-200">
              <td className="p-4" />
              {tiers.map((tier) => (
                <td
                  key={tier.name}
                  className={cn(
                    "p-4 text-center rounded-b-2xl",
                    tier.highlighted && "bg-accent/5"
                  )}
                >
                  <a
                    href={tier.ctaHref}
                    className={cn(
                      "inline-flex items-center justify-center px-5 py-2.5 border-2 rounded-lg text-sm font-semibold transition-colors w-full max-w-[160px]",
                      tier.highlighted
                        ? "border-accent bg-accent text-white hover:bg-transparent hover:text-accent"
                        : "border-neutral-200 bg-neutral-100 text-neutral-700 hover:bg-neutral-700 hover:border-neutral-700 hover:text-white"
                    )}
                  >
                    {tier.cta}
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden space-y-6">
        {tiers.map((tier) => {
          const price = formatPrice(tier, annual);
          return (
            <div
              key={tier.name}
              className={cn(
                "rounded-2xl border p-6",
                tier.highlighted
                  ? "border-accent shadow-lg ring-2 ring-accent/20"
                  : "border-neutral-200"
              )}
            >
              {tier.highlighted && (
                <span className="inline-block bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                  Recommended
                </span>
              )}
              <h3 className="text-xl font-bold text-neutral-900">
                {tier.name}
              </h3>
              <p className="text-sm text-neutral-500 mt-0.5">
                {tier.description}
              </p>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-black text-neutral-900">
                  {isAddOn && tier.monthly > 0 ? "+" : ""}
                  {price.main}
                </span>
                <span className="text-sm text-neutral-500 ml-1">
                  {price.sub}
                </span>
              </div>
              <div className="space-y-3 mb-6">
                {features.map((row) => {
                  const idx = tiers.indexOf(tier);
                  const value = row.values[idx];
                  return (
                    <div
                      key={row.label}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-neutral-600">{row.label}</span>
                      <span className="font-medium text-neutral-900">
                        {value === true ? (
                          <Check className="text-accent" size={20} weight="duotone" />
                        ) : value === false ? (
                          <X className="text-neutral-300" size={20} weight="duotone" />
                        ) : (
                          value
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
              <a
                href={tier.ctaHref}
                className={cn(
                  "block w-full text-center px-6 py-3 border-2 rounded-lg font-semibold transition-colors",
                  tier.highlighted
                    ? "border-accent bg-accent text-white hover:bg-transparent hover:text-accent"
                    : "border-neutral-200 bg-neutral-100 text-neutral-700 hover:bg-neutral-700 hover:border-neutral-700 hover:text-white"
                )}
              >
                {tier.cta}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Default FAQ fallback ──────────────────────────────── */

const defaultFaqs: FAQ[] = [
  {
    _id: "dfaq-1",
    question: "What is Roaster Tools?",
    answer:
      "Roaster Tools is a suite of production tools — green bean inventory, roast log, cupping scorecards, production planner, and calculators — included with every Sales Suite plan at no extra cost.",
  },
  {
    _id: "dfaq-2",
    question: "Is there a free trial?",
    answer:
      "Yes. Every plan includes a 14-day free trial with full access to all features. No credit card required to start.",
  },
  {
    _id: "dfaq-3",
    question: "Is the Marketing Suite required?",
    answer:
      "No. The Marketing Suite is an optional add-on. You can use the Sales Suite and Roaster Tools without it.",
  },
  {
    _id: "dfaq-4",
    question: "Can I switch plans at any time?",
    answer:
      "Yes. Upgrade, downgrade, or cancel at any time. No lock-in contracts. Changes take effect at the end of your current billing period.",
  },
  {
    _id: "dfaq-5",
    question: "Do you offer annual billing?",
    answer:
      "Yes. Annual billing saves you roughly 15–16% compared to monthly pricing. Switch between monthly and annual at any time.",
  },
];

/* ── Main Component ────────────────────────────────────── */

export function PricingContent({ faqs, cms }: { faqs: FAQ[]; cms?: any }) {
  const [annual, setAnnual] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const displayFaqs = faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 mb-6">
            {cms?.heroHeadline ?? "Simple, transparent"}{" "}
            <span className="text-accent">pricing.</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto">
            {cms?.heroSubheadline ?? "Sales Suite from £39/mo. Marketing Suite from £19/mo. Roaster Tools included with every plan."}
          </p>
        </div>
      </section>

      {/* ── Billing Toggle + Suite Tabs ──────────────────── */}
      <section className="pt-16 pb-4 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                !annual ? "text-neutral-900" : "text-neutral-400"
              )}
            >
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className={cn(
                "relative inline-flex h-7 w-12 items-center rounded-full transition-colors",
                annual ? "bg-accent" : "bg-neutral-300"
              )}
              aria-label="Toggle annual billing"
            >
              <span
                className={cn(
                  "inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
                  annual ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                annual ? "text-neutral-900" : "text-neutral-400"
              )}
            >
              Annual
            </span>
            {annual && (
              <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                Save ~15%
              </span>
            )}
          </div>

          {/* Suite tabs — matching ProductsCarousel style */}
          <div className="flex justify-center">
            <div className="inline-flex rounded-lg border border-neutral-200 p-1 bg-neutral-50">
              {suites.map((suite, i) => (
                <button
                  key={suite.key}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "px-6 py-2.5 text-sm font-semibold rounded-md transition-all duration-200",
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
        </div>
      </section>

      {/* ── Pricing Tables — crossfade ───────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {suites.map((suite, i) => (
              <div
                key={suite.key}
                className={cn(
                  "transition-all duration-500 ease-in-out",
                  activeIndex === i
                    ? "opacity-100 relative"
                    : "opacity-0 absolute inset-0 pointer-events-none"
                )}
              >
                <div className="text-center mb-10">
                  <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
                    {suite.label}
                  </h2>
                  <p className="mt-2 text-neutral-500 text-lg">
                    {suite.subtitle}
                  </p>
                </div>
                <PricingTable suite={suite} annual={annual} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 text-center mb-12">
              {cms?.faqTitle ?? "Frequently asked questions"}
            </h2>
            <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
              {displayFaqs.map((faq) => (
                <details key={faq._id} className="group">
                  <summary className="flex items-center justify-between cursor-pointer py-5 text-left text-lg font-semibold text-neutral-900 hover:text-accent transition-colors">
                    {faq.question}
                    <CaretRight className="text-neutral-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" size={24} weight="duotone" />
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

      {/* ── Final CTA ────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-neutral-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6">
            {cms?.ctaHeadline ?? "Start your free trial today."}
          </h2>
          <p className="text-lg text-neutral-300 max-w-xl mx-auto mb-10">
            {cms?.ctaDescription ?? "14 days free. No credit card required. Explore every feature."}
          </p>
          <a
            href={`${PLATFORM_URL}/signup`}
            className="inline-flex items-center px-8 py-4 border-2 border-accent bg-accent text-white font-semibold text-lg rounded-lg hover:bg-transparent hover:text-accent transition-colors"
          >
            {cms?.ctaButtonText ?? "Start Free Trial"}
            <ArrowRight className="ml-2" size={24} weight="duotone" />
          </a>
        </div>
      </section>
    </>
  );
}
