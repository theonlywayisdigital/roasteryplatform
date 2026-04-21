"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ArrowRight, CaretDown } from "@phosphor-icons/react";

const PLATFORM_URL = "https://app.roasteryplatform.com";

/* ── Font library — matches platform src/lib/fonts.ts ──── */

interface FontOption {
  family: string;
  label: string;
  category: "sans-serif" | "serif" | "display" | "script";
}

const FONT_LIBRARY: FontOption[] = [
  // Sans-serif
  { family: "Inter", label: "Inter", category: "sans-serif" },
  { family: "Montserrat", label: "Montserrat", category: "sans-serif" },
  { family: "Raleway", label: "Raleway", category: "sans-serif" },
  { family: "Poppins", label: "Poppins", category: "sans-serif" },
  { family: "Nunito", label: "Nunito", category: "sans-serif" },
  { family: "Quicksand", label: "Quicksand", category: "sans-serif" },
  { family: "Josefin Sans", label: "Josefin Sans", category: "sans-serif" },
  { family: "Figtree", label: "Figtree", category: "sans-serif" },
  { family: "DM Sans", label: "DM Sans", category: "sans-serif" },
  { family: "Space Grotesk", label: "Space Grotesk", category: "sans-serif" },
  { family: "Outfit", label: "Outfit", category: "sans-serif" },
  { family: "Manrope", label: "Manrope", category: "sans-serif" },
  { family: "Work Sans", label: "Work Sans", category: "sans-serif" },
  // Serif
  { family: "Playfair Display", label: "Playfair Display", category: "serif" },
  { family: "Libre Baskerville", label: "Libre Baskerville", category: "serif" },
  { family: "Merriweather", label: "Merriweather", category: "serif" },
  { family: "Lora", label: "Lora", category: "serif" },
  { family: "EB Garamond", label: "EB Garamond", category: "serif" },
  { family: "Cormorant Garamond", label: "Cormorant Garamond", category: "serif" },
  { family: "Bitter", label: "Bitter", category: "serif" },
  { family: "Crimson Text", label: "Crimson Text", category: "serif" },
  { family: "DM Serif Display", label: "DM Serif Display", category: "serif" },
  { family: "Bodoni Moda", label: "Bodoni Moda", category: "serif" },
  // Display
  { family: "Oswald", label: "Oswald", category: "display" },
  { family: "Bebas Neue", label: "Bebas Neue", category: "display" },
  { family: "Anton", label: "Anton", category: "display" },
  { family: "Abril Fatface", label: "Abril Fatface", category: "display" },
  { family: "Righteous", label: "Righteous", category: "display" },
  { family: "Permanent Marker", label: "Permanent Marker", category: "display" },
  { family: "Lobster", label: "Lobster", category: "display" },
  { family: "Russo One", label: "Russo One", category: "display" },
  { family: "Fredoka", label: "Fredoka", category: "display" },
  { family: "Archivo Black", label: "Archivo Black", category: "display" },
  { family: "Secular One", label: "Secular One", category: "display" },
  { family: "Bungee", label: "Bungee", category: "display" },
  { family: "Dela Gothic One", label: "Dela Gothic One", category: "display" },
  { family: "Syne", label: "Syne", category: "display" },
  { family: "Teko", label: "Teko", category: "display" },
  { family: "Barlow Condensed", label: "Barlow Condensed", category: "display" },
  // Script
  { family: "Pacifico", label: "Pacifico", category: "script" },
  { family: "Dancing Script", label: "Dancing Script", category: "script" },
  { family: "Great Vibes", label: "Great Vibes", category: "script" },
  { family: "Sacramento", label: "Sacramento", category: "script" },
  { family: "Satisfy", label: "Satisfy", category: "script" },
  { family: "Caveat", label: "Caveat", category: "script" },
  { family: "Kaushan Script", label: "Kaushan Script", category: "script" },
  { family: "Shadows Into Light", label: "Shadows Into Light", category: "script" },
  { family: "Amatic SC", label: "Amatic SC", category: "script" },
  { family: "Courgette", label: "Courgette", category: "script" },
  { family: "Allura", label: "Allura", category: "script" },
];

const CATEGORY_LABELS: Record<string, string> = {
  "sans-serif": "Sans-Serif",
  serif: "Serif",
  display: "Display",
  script: "Script",
};

function loadGoogleFont(family: string) {
  if (typeof document === "undefined") return;
  const id = `gf-${family.replace(/\s+/g, "-")}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@400;500;600;700;800;900&display=swap`;
  document.head.appendChild(link);
}

/* ── Defaults ──────────────────────────────────────────── */

const DEFAULTS = {
  businessName: "",
  tagline: "",
  logo: "",
  headingFont: "Figtree",
  bodyFont: "Inter",
  primaryColour: "#1e293b",
  accentColour: "#0083dc",
  navBgColour: "#1e293b",
  navTextColour: "#ffffff",
  buttonStyle: "rounded" as "sharp" | "rounded" | "pill",
  buttonColour: "#0083dc",
  buttonTextColour: "#ffffff",
  pageBgColour: "#ffffff",
  pageTextColour: "#0f172a",
};

type Config = typeof DEFAULTS;

/* ── Colour picker wrapper ─────────────────────────────── */

function ColourField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-neutral-700">{label}</span>
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-lg border border-neutral-300 overflow-hidden shrink-0">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
          />
          <div
            className="w-full h-full"
            style={{ backgroundColor: value }}
          />
        </div>
        <span className="text-sm text-neutral-500 font-mono uppercase">
          {value}
        </span>
      </div>
    </label>
  );
}

/* ── Font picker ───────────────────────────────────────── */

function FontPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Preload selected font for the label preview
  useEffect(() => {
    if (value) loadGoogleFont(value);
  }, [value]);

  return (
    <div className="flex flex-col gap-1.5" ref={ref}>
      <span className="text-sm font-medium text-neutral-700">{label}</span>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
      >
        <span style={{ fontFamily: `"${value}", sans-serif` }}>
          {value || "Select font"}
        </span>
        <CaretDown
          size={14}
          weight="bold"
          className={`text-neutral-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="relative">
          <div className="absolute z-20 top-0 left-0 right-0 max-h-64 overflow-y-auto bg-white border border-neutral-200 rounded-lg shadow-lg">
            {(["sans-serif", "serif", "display", "script"] as const).map((cat) => {
              const fonts = FONT_LIBRARY.filter((f) => f.category === cat);
              return (
                <div key={cat}>
                  <div className="sticky top-0 bg-neutral-50 px-3 py-1.5 text-[10px] font-bold text-neutral-500 uppercase tracking-wider border-b border-neutral-100">
                    {CATEGORY_LABELS[cat]}
                  </div>
                  {fonts.map((font) => {
                    loadGoogleFont(font.family);
                    return (
                      <button
                        key={font.family}
                        type="button"
                        onClick={() => {
                          onChange(font.family);
                          setOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-neutral-50 transition-colors ${
                          value === font.family
                            ? "bg-accent/5 text-accent font-medium"
                            : "text-neutral-900"
                        }`}
                        style={{ fontFamily: `"${font.family}", sans-serif` }}
                      >
                        {font.label}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Segmented toggle ──────────────────────────────────── */

const BUTTON_STYLES: { value: Config["buttonStyle"]; label: string }[] = [
  { value: "sharp", label: "Sharp" },
  { value: "rounded", label: "Rounded" },
  { value: "pill", label: "Pill" },
];

function ButtonStyleToggle({
  value,
  onChange,
}: {
  value: Config["buttonStyle"];
  onChange: (v: Config["buttonStyle"]) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-neutral-700">
        Button style
      </span>
      <div className="inline-flex rounded-lg border border-neutral-300 overflow-hidden">
        {BUTTON_STYLES.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              value === opt.value
                ? "bg-neutral-900 text-white"
                : "bg-white text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Logo upload ───────────────────────────────────────── */

function LogoUpload({
  logo,
  onUpload,
  onClear,
}: {
  logo: string;
  onUpload: (b64: string) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        alert("Logo must be under 2 MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") onUpload(reader.result);
      };
      reader.readAsDataURL(file);
    },
    [onUpload]
  );

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-neutral-700">Logo</span>
      {logo ? (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo}
            alt="Logo preview"
            className="h-12 w-auto max-w-[160px] object-contain rounded border border-neutral-200 p-1"
          />
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-neutral-500 hover:text-red-600 transition-colors"
          >
            Remove
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full py-3 border-2 border-dashed border-neutral-300 rounded-lg text-sm text-neutral-500 hover:border-neutral-400 hover:text-neutral-600 transition-colors"
        >
          Click to upload (PNG, JPG, SVG)
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/svg+xml,image/webp"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}

/* ── Mini preview ──────────────────────────────────────── */

function MiniPreview({ config }: { config: Config }) {
  const btnRadius =
    config.buttonStyle === "sharp"
      ? "0px"
      : config.buttonStyle === "pill"
      ? "9999px"
      : "6px";

  const name = config.businessName || "Your Roastery";

  return (
    <div className="rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
      {/* Nav */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          backgroundColor: config.navBgColour,
          color: config.navTextColour,
        }}
      >
        <div className="flex items-center gap-2">
          {config.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={config.logo}
              alt={name}
              className="h-6 w-auto max-w-[80px] object-contain"
            />
          ) : (
            <>
              <div className="w-6 h-6 rounded bg-white/20" />
              <span
                className="text-sm font-semibold truncate max-w-[120px]"
                style={{ fontFamily: `"${config.headingFont}", sans-serif` }}
              >
                {name}
              </span>
            </>
          )}
        </div>
        <div
          className="flex items-center gap-2 text-xs opacity-80"
          style={{ fontFamily: `"${config.bodyFont}", sans-serif` }}
        >
          <span>Catalogue</span>
          <span>Contact</span>
        </div>
      </div>

      {/* Hero */}
      <div
        className="px-4 py-8 text-center bg-cover bg-center relative"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10">
          <p
            className="text-white text-sm font-bold mb-1"
            style={{ fontFamily: `"${config.headingFont}", sans-serif` }}
          >
            {name} Wholesale
          </p>
          <div className="flex items-center justify-center gap-2">
            <div
              className="inline-block px-3 py-1.5 text-xs font-semibold"
              style={{
                backgroundColor: config.buttonColour,
                color: config.buttonTextColour,
                borderRadius: btnRadius,
                fontFamily: `"${config.bodyFont}", sans-serif`,
              }}
            >
              Apply
            </div>
            <div
              className="inline-block px-3 py-1.5 text-xs font-semibold text-white border border-white/30 backdrop-blur-sm"
              style={{
                borderRadius: btnRadius,
                fontFamily: `"${config.bodyFont}", sans-serif`,
              }}
            >
              Sign In
            </div>
          </div>
        </div>
      </div>

      {/* Product cards placeholder */}
      <div
        className="px-4 py-4 grid grid-cols-2 gap-2"
        style={{ backgroundColor: config.pageBgColour }}
      >
        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded-lg border p-2 flex flex-col gap-1"
            style={{
              backgroundColor: `color-mix(in srgb, ${config.pageTextColour} 8%, transparent)`,
              borderColor: `color-mix(in srgb, ${config.pageTextColour} 15%, transparent)`,
            }}
          >
            <div
              className="w-full aspect-[4/3] rounded"
              style={{ backgroundColor: `color-mix(in srgb, ${config.pageTextColour} 5%, transparent)` }}
            />
            <div className="h-2 w-3/4 rounded" style={{ backgroundColor: `color-mix(in srgb, ${config.pageTextColour} 20%, transparent)` }} />
            <div className="h-2 w-1/2 rounded" style={{ backgroundColor: `color-mix(in srgb, ${config.pageTextColour} 12%, transparent)` }} />
            <div
              className="h-6 w-full rounded mt-1 flex items-center justify-center text-[9px] font-semibold"
              style={{
                backgroundColor: config.buttonColour,
                color: config.buttonTextColour,
                borderRadius: btnRadius,
              }}
            >
              Order
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main component ────────────────────────────────────── */

export function DemoConfigurator() {
  const [config, setConfig] = useState<Config>(DEFAULTS);

  const set = <K extends keyof Config>(key: K, value: Config[K]) =>
    setConfig((prev) => ({ ...prev, [key]: value }));

  const handlePreview = () => {
    const toSave = {
      ...config,
      businessName: config.businessName || "Your Roastery",
      primaryColour: config.navBgColour,
      accentColour: config.buttonColour,
    };
    try {
      localStorage.setItem("demo-portal-config", JSON.stringify(toSave));
    } catch {
      // localStorage might be full or unavailable
    }
    window.open("/demo/preview", "_blank");
  };

  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative flex items-center justify-center overflow-hidden bg-neutral-50">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-transparent to-white" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 lg:py-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-4 text-neutral-900">
            See your wholesale portal
            <br />
            <span className="text-accent">before you sign up.</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-xl mx-auto">
            Pick your colours, upload your logo, and preview exactly what your
            buyers will see.
          </p>
        </div>
      </section>

      {/* ── Configurator ───────────────────────────────── */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Form */}
            <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-neutral-900">
                Customise your portal
              </h2>

              {/* Business name */}
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-neutral-700">
                  Business name
                </span>
                <input
                  type="text"
                  value={config.businessName}
                  onChange={(e) => set("businessName", e.target.value)}
                  placeholder="e.g. Origin Coffee Roasters"
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow text-sm"
                />
              </label>

              {/* Tagline */}
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-neutral-700">
                  Tagline{" "}
                  <span className="text-neutral-400 font-normal">
                    (optional)
                  </span>
                </span>
                <input
                  type="text"
                  value={config.tagline}
                  onChange={(e) => set("tagline", e.target.value)}
                  placeholder="e.g. Specialty coffee, roasted fresh to order"
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow text-sm"
                />
              </label>

              {/* Logo */}
              <LogoUpload
                logo={config.logo}
                onUpload={(b64) => set("logo", b64)}
                onClear={() => set("logo", "")}
              />

              {/* Fonts */}
              <div className="grid grid-cols-2 gap-4">
                <FontPicker
                  label="Heading font"
                  value={config.headingFont}
                  onChange={(v) => set("headingFont", v)}
                />
                <FontPicker
                  label="Body font"
                  value={config.bodyFont}
                  onChange={(v) => set("bodyFont", v)}
                />
              </div>

              {/* Colour grid */}
              <div className="grid grid-cols-2 gap-4">
                <ColourField
                  label="Nav background"
                  value={config.navBgColour}
                  onChange={(v) => set("navBgColour", v)}
                />
                <ColourField
                  label="Nav text colour"
                  value={config.navTextColour}
                  onChange={(v) => set("navTextColour", v)}
                />
                <ColourField
                  label="Button colour"
                  value={config.buttonColour}
                  onChange={(v) => set("buttonColour", v)}
                />
                <ColourField
                  label="Button text colour"
                  value={config.buttonTextColour}
                  onChange={(v) => set("buttonTextColour", v)}
                />
                <ColourField
                  label="Page background"
                  value={config.pageBgColour}
                  onChange={(v) => set("pageBgColour", v)}
                />
                <ColourField
                  label="Page text colour"
                  value={config.pageTextColour}
                  onChange={(v) => set("pageTextColour", v)}
                />
              </div>

              {/* Button style */}
              <ButtonStyleToggle
                value={config.buttonStyle}
                onChange={(v) => set("buttonStyle", v)}
              />

              {/* CTA */}
              <button
                type="button"
                onClick={handlePreview}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-white font-semibold text-base rounded-lg border-2 border-accent hover:bg-transparent hover:text-accent transition-colors"
              >
                Preview My Portal
                <ArrowRight weight="bold" size={20} />
              </button>
            </div>

            {/* Live mini preview (desktop) — sticky so it follows scroll */}
            <div className="hidden lg:block sticky top-8">
              <p className="text-sm font-medium text-neutral-500 mb-4 uppercase tracking-wider">
                Live preview
              </p>
              <MiniPreview config={config} />
              <a
                href={`${PLATFORM_URL}/signup`}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-white font-semibold text-base rounded-lg border-2 border-accent hover:bg-transparent hover:text-accent transition-colors"
              >
                Start Free Trial
                <ArrowRight weight="bold" size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA strip ──────────────────────────────────── */}
      <section className="py-12 bg-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Like what you see? Your portal can be live today.
              </h2>
              <p className="text-white/80 mt-1">
                Set up in minutes, no technical skills required. 14-day free
                trial.
              </p>
            </div>
            <a
              href={`${PLATFORM_URL}/signup`}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white bg-white text-accent font-semibold text-lg rounded-lg hover:bg-transparent hover:text-white transition-colors w-full md:w-auto"
            >
              Start Free Trial
              <ArrowRight className="ml-2" weight="bold" size={24} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
