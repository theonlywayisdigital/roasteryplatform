"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";

/* ── Types & defaults ──────────────────────────────────── */

interface PortalConfig {
  businessName: string;
  tagline: string;
  logo: string;
  primaryColour: string;
  accentColour: string;
  navBgColour: string;
  navTextColour: string;
  buttonStyle: "sharp" | "rounded" | "pill";
  buttonColour: string;
  buttonTextColour: string;
}

const DEFAULTS: PortalConfig = {
  businessName: "Your Roastery",
  tagline: "Specialty coffee, roasted fresh to order",
  logo: "",
  primaryColour: "#1e293b",
  accentColour: "#0083dc",
  navBgColour: "#1e293b",
  navTextColour: "#ffffff",
  buttonStyle: "rounded",
  buttonColour: "#0083dc",
  buttonTextColour: "#ffffff",
};

const PLATFORM_URL = "https://app.roasteryplatform.com";
const HERO_IMAGE = "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600";

/* ── Utility — copied from platform: src/app/s/[slug]/_components/utils.ts ── */

function isLightColour(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}

/* ── Demo product data ─────────────────────────────────── */

const DEMO_PRODUCTS = [
  {
    id: "demo-1",
    name: "Ethiopia Yirgacheffe Natural",
    description: "Stone fruit, blueberry, dark chocolate",
    unit: "1kg",
    price: 11.5,
    minimumWholesaleQuantity: 1,
  },
  {
    id: "demo-2",
    name: "Guatemala Huehuetenango",
    description: "Brown sugar, almond, citrus zest",
    unit: "1kg",
    price: 10.5,
    minimumWholesaleQuantity: 1,
  },
  {
    id: "demo-3",
    name: "House Blend No.1",
    description: "Smooth, balanced, chocolatey",
    unit: "1kg",
    price: 9.5,
    minimumWholesaleQuantity: 1,
  },
  {
    id: "demo-4",
    name: "Kenya AA Kirinyaga",
    description: "Blackcurrant, tomato, winey finish",
    unit: "500g",
    price: 13.0,
    minimumWholesaleQuantity: 1,
  },
  {
    id: "demo-5",
    name: "Colombia Huila Washed",
    description: "Caramel, red apple, soft citrus",
    unit: "1kg",
    price: 10.0,
    minimumWholesaleQuantity: 1,
  },
  {
    id: "demo-6",
    name: "Espresso Blend Dark",
    description: "Dark chocolate, hazelnut, molasses",
    unit: "1kg",
    price: 9.0,
    minimumWholesaleQuantity: 1,
  },
];

/* ── Social icon SVGs — copied from platform: SocialIcons.tsx ── */

const socialIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
};

/* ── Footer colour helpers — copied from platform: Footer.tsx ── */

const mutedText = "color-mix(in srgb, var(--sf-nav-text) 60%, transparent)";
const veryMutedText = "color-mix(in srgb, var(--sf-nav-text) 40%, transparent)";
const dividerColour = "color-mix(in srgb, var(--sf-nav-text) 10%, transparent)";

/* ── Page component ────────────────────────────────────── */

export default function DemoPreviewPage() {
  const [config, setConfig] = useState<PortalConfig | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("demo-portal-config");
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PortalConfig>;
        setConfig({ ...DEFAULTS, ...parsed });
      } else {
        setConfig(DEFAULTS);
      }
    } catch {
      setConfig(DEFAULTS);
    }
  }, []);

  /* Measure header height for spacer — matches Header.tsx */
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const observer = new ResizeObserver(([entry]) => {
      setHeaderHeight(entry.contentRect.height);
    });
    setHeaderHeight(header.offsetHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  /* Scroll detection — matches Header.tsx IntersectionObserver */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
      </div>
    );
  }

  /* ── Derived values — matches layout.tsx logic ────────── */

  const btnRadiusMap: Record<string, string> = { sharp: "0px", rounded: "6px", pill: "9999px" };
  const btnRadius = btnRadiusMap[config.buttonStyle] ?? "6px";
  const accentText = isLightColour(config.accentColour) ? "#1e293b" : "#ffffff";
  const accent = config.accentColour;
  const primary = config.primaryColour;

  const cssVars = {
    "--sf-primary": primary,
    "--sf-accent": accent,
    "--sf-accent-text": accentText,
    "--sf-nav-bg": config.navBgColour,
    "--sf-nav-text": config.navTextColour,
    "--sf-btn-colour": config.buttonColour,
    "--sf-btn-text": config.buttonTextColour,
    "--sf-btn-radius": btnRadius,
    "--sf-bg": "#ffffff",
    "--sf-text": "#0f172a",
    backgroundColor: "#ffffff",
    color: "#0f172a",
  } as React.CSSProperties;

  const logoSizePx = 120; // "medium" default

  const navLinks = [
    { label: "Catalogue", href: "#catalogue" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div style={cssVars}>
      {/* ── Floating demo banner ───────────────────────── */}
      <div className="sticky top-0 z-[60] bg-neutral-900/90 backdrop-blur-sm text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between text-sm">
          <p className="text-neutral-300">
            This is a preview of your wholesale portal
          </p>
          <a
            href={`${PLATFORM_URL}/signup`}
            className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-amber-400 transition-colors"
          >
            Start Free Trial
            <ArrowRight weight="bold" size={16} />
          </a>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          HEADER — copied from platform: src/app/s/[slug]/_components/Header.tsx
      ═══════════════════════════════════════════════════ */}

      {/* Sentinel for scroll detection (transparent mode) */}
      <div ref={sentinelRef} className="absolute top-0 left-0 w-full h-1" />

      <header
        ref={headerRef}
        className="fixed top-[41px] left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "var(--sf-nav-bg)" : "transparent",
          backdropFilter: scrolled ? "none" : "blur(8px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative flex items-center justify-between py-3 md:py-4">
            {/* Mobile: Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2"
              style={{ color: "var(--sf-nav-text)" }}
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Logo / Name */}
            <div className="flex items-center gap-2.5">
              {config.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={config.logo}
                  alt={config.businessName}
                  style={{ height: logoSizePx }}
                  className="w-auto"
                />
              ) : (
                <span
                  className="text-lg font-bold"
                  style={{ color: "var(--sf-nav-text)" }}
                >
                  {config.businessName}
                </span>
              )}
            </div>

            {/* Desktop Nav — absolutely positioned to stay truly centred */}
            <nav className="hidden md:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    const el = document.getElementById(link.href.slice(1));
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-3.5 py-2 text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
                  style={{ color: "var(--sf-nav-text)", opacity: 0.85 }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right side: Sign In */}
            <div className="flex items-center gap-1.5">
              <button
                className="hidden md:inline-flex items-center px-3.5 py-1.5 text-xs font-semibold border transition-colors"
                style={{
                  borderColor: accent,
                  color: accent,
                  borderRadius: "var(--sf-btn-radius)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = accent;
                  e.currentTarget.style.color = accentText;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = accent;
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from being hidden behind the fixed header */}
      {headerHeight > 0 && <div style={{ height: headerHeight }} />}

      {/* ── Mobile Menu — copied from platform: MobileMenu.tsx ── */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <div
            className="fixed top-0 left-0 z-50 h-full w-72 shadow-xl flex flex-col"
            style={{ backgroundColor: "var(--sf-nav-bg)" }}
          >
            <div className="flex items-center justify-end p-4">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 opacity-70 hover:opacity-100"
                style={{ color: "var(--sf-nav-text)" }}
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex-1 px-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const el = document.getElementById(link.href.slice(1));
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="block w-full text-left px-4 py-3 opacity-80 hover:opacity-100 hover:bg-white/10 rounded-lg text-base font-medium transition-colors"
                  style={{ color: "var(--sf-nav-text)" }}
                >
                  {link.label}
                </button>
              ))}
              <button
                className="block mx-4 mt-3 px-4 py-3 text-center text-sm font-semibold rounded-lg border transition-colors w-[calc(100%-2rem)]"
                style={{
                  borderColor: accent,
                  color: accent,
                }}
              >
                Sign In
              </button>
            </nav>
            {/* Social links */}
            <div className="px-8 py-6 border-t border-white/10">
              <div className="flex items-center gap-4">
                {(["instagram", "facebook", "tiktok"] as const).map((type) => (
                  <span
                    key={type}
                    className="text-white/60 hover:text-white transition-colors cursor-default"
                  >
                    {socialIcons[type]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ═══════════════════════════════════════════════════
          HERO — copied from platform: src/app/s/[slug]/_components/HeroSection.tsx
      ═══════════════════════════════════════════════════ */}

      <section className="relative w-full min-h-[80vh] md:min-h-screen flex items-end overflow-hidden">
        {/* Background — hero image */}
        <div
          className="absolute inset-0 bg-cover bg-center md:bg-fixed"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-16 pt-32 md:pb-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 max-w-3xl"
              style={{ fontFamily: "var(--sf-font)" }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              {config.businessName}
            </motion.h1>

            {config.tagline && (
              <motion.p
                className="text-lg md:text-xl lg:text-2xl text-white/85 mb-8 max-w-xl"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                {config.tagline}
              </motion.p>
            )}

            <motion.div
              className="flex flex-wrap gap-3"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => {
                  const el = document.getElementById("catalogue");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  backgroundColor: "var(--sf-btn-colour)",
                  color: "var(--sf-btn-text)",
                  borderRadius: "var(--sf-btn-radius)",
                }}
                className="px-7 py-3.5 font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Browse Catalogue
              </button>
              <button
                className="px-7 py-3.5 font-semibold text-sm bg-white/15 text-white hover:bg-white/25 transition-colors backdrop-blur-sm border border-white/20"
                style={{ borderRadius: "var(--sf-btn-radius)" }}
              >
                Apply for Account
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CATALOGUE — copied from platform: StorefrontWholesaleCatalogue.tsx
      ═══════════════════════════════════════════════════ */}

      <section id="catalogue" className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        {/* Wholesale badge — matches catalogue component */}
        <div className="flex gap-2 mb-6">
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: `${accent}15`, color: accent }}
          >
            Wholesale
          </span>
          <span
            className="text-xs"
            style={{ color: "color-mix(in srgb, var(--sf-text) 55%, transparent)" }}
          >
            Net 30 days
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {DEMO_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="rounded-xl border overflow-hidden"
              style={{
                backgroundColor: "color-mix(in srgb, var(--sf-text) 8%, transparent)",
                borderColor: "color-mix(in srgb, var(--sf-text) 15%, transparent)",
              }}
            >
              {/* Image placeholder — matches Package icon fallback */}
              <div
                className="aspect-square flex items-center justify-center"
                style={{ backgroundColor: "color-mix(in srgb, var(--sf-text) 5%, transparent)" }}
              >
                <svg
                  className="w-12 h-12 opacity-30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>

              {/* Product info — matches catalogue Link > div structure */}
              <div className="px-4 pt-4">
                <h3 className="font-semibold mb-1" style={{ color: "var(--sf-text)" }}>
                  {product.name}
                </h3>
                <p
                  className="text-sm mb-3 line-clamp-2"
                  style={{ color: "color-mix(in srgb, var(--sf-text) 55%, transparent)" }}
                >
                  {product.description}
                </p>
              </div>

              {/* Price + CTA — matches non-variant layout */}
              <div className="px-4 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-lg font-bold" style={{ color: "var(--sf-text)" }}>
                      {`\u00a3${product.price.toFixed(2)}`}
                    </span>
                    <span
                      className="text-sm ml-1"
                      style={{ color: "color-mix(in srgb, var(--sf-text) 55%, transparent)" }}
                    >
                      {`/ ${product.unit}`}
                    </span>
                  </div>
                  {product.minimumWholesaleQuantity > 0 && (
                    <span
                      className="text-xs"
                      style={{ color: "color-mix(in srgb, var(--sf-text) 55%, transparent)" }}
                    >
                      {`Min ${product.minimumWholesaleQuantity}kg`}
                    </span>
                  )}
                </div>

                {/* Stock badge */}
                <div className="mb-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    In Stock
                  </span>
                </div>

                {/* Add to Order button */}
                <button
                  style={{ backgroundColor: accent, color: accentText }}
                  className="w-full py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
                >
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FOOTER — copied from platform: src/app/s/[slug]/_components/Footer.tsx
      ═══════════════════════════════════════════════════ */}

      <footer id="contact" style={{ backgroundColor: "var(--sf-nav-bg)", color: "var(--sf-nav-text)" }}>
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                {config.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={config.logo}
                    alt={config.businessName}
                    style={{ height: logoSizePx }}
                    className="w-auto"
                  />
                ) : (
                  <span
                    className="text-xl font-bold"
                    style={{ color: "var(--sf-nav-text)" }}
                  >
                    {config.businessName}
                  </span>
                )}
              </div>
              {config.tagline && (
                <p className="text-sm max-w-xs mb-5" style={{ color: mutedText }}>
                  {config.tagline}
                </p>
              )}
              {/* Social icons */}
              <div className="flex items-center gap-3">
                {(["instagram", "facebook", "tiktok"] as const).map((type) => (
                  <span
                    key={type}
                    className="opacity-50 hover:opacity-100 transition-colors cursor-default"
                    style={{ color: "var(--sf-nav-text)" }}
                  >
                    {socialIcons[type]}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation column */}
            <div>
              <h4
                className="font-semibold text-sm uppercase tracking-wider mb-4"
                style={{ color: "var(--sf-nav-text)" }}
              >
                Wholesale
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <span
                    className="text-sm transition-opacity hover:opacity-100 cursor-default"
                    style={{ color: mutedText }}
                  >
                    Catalogue
                  </span>
                </li>
                <li>
                  <span
                    className="text-sm transition-opacity hover:opacity-100 cursor-default"
                    style={{ color: mutedText }}
                  >
                    Apply for Account
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact column */}
            <div>
              <h4
                className="font-semibold text-sm uppercase tracking-wider mb-4"
                style={{ color: "var(--sf-nav-text)" }}
              >
                Contact
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <span
                    className="text-sm transition-opacity hover:opacity-100 cursor-default"
                    style={{ color: mutedText }}
                  >
                    Get in Touch
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div
            className="mt-10 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderColor: dividerColour }}
          >
            <p className="text-xs" style={{ color: veryMutedText }}>
              &copy; {new Date().getFullYear()} {config.businessName}. All rights reserved.
            </p>
            <p className="text-xs" style={{ color: veryMutedText }}>
              Powered by{" "}
              <a
                href="https://roasteryplatform.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-opacity hover:opacity-100"
                style={{ color: mutedText }}
              >
                Roastery Platform
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
