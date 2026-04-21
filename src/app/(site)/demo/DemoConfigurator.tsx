"use client";

import { useState, useRef, useCallback } from "react";
import { ArrowRight } from "@phosphor-icons/react";

const PLATFORM_URL = "https://app.roasteryplatform.com";

/* ── Defaults ──────────────────────────────────────────── */

const DEFAULTS = {
  businessName: "",
  tagline: "",
  logo: "",
  primaryColour: "#1e293b",
  accentColour: "#0083dc",
  navBgColour: "#1e293b",
  navTextColour: "#ffffff",
  buttonStyle: "rounded" as "sharp" | "rounded" | "pill",
  buttonColour: "#0083dc",
  buttonTextColour: "#ffffff",
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
    <div className="rounded-xl border border-neutral-200 overflow-hidden shadow-sm bg-white">
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
              alt=""
              className="h-6 w-auto max-w-[80px] object-contain"
            />
          ) : (
            <div className="w-6 h-6 rounded bg-white/20" />
          )}
          <span className="text-sm font-semibold truncate max-w-[120px]">
            {name}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs opacity-80">
          <span>Catalogue</span>
          <span>Contact</span>
        </div>
      </div>

      {/* Hero */}
      <div
        className="px-4 py-8 text-center"
        style={{
          background: `linear-gradient(135deg, ${config.primaryColour}, ${config.accentColour})`,
        }}
      >
        <p className="text-white text-sm font-bold mb-1">{name}</p>
        {config.tagline && (
          <p className="text-white/80 text-xs mb-3">{config.tagline}</p>
        )}
        <div
          className="inline-block px-3 py-1.5 text-xs font-semibold"
          style={{
            backgroundColor: config.buttonColour,
            color: config.buttonTextColour,
            borderRadius: btnRadius,
          }}
        >
          Browse Catalogue
        </div>
      </div>

      {/* Product cards placeholder */}
      <div className="px-4 py-4 grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-md border border-neutral-200 p-2 flex flex-col gap-1"
          >
            <div className="w-full aspect-square rounded bg-neutral-100" />
            <div className="h-2 w-3/4 rounded bg-neutral-200" />
            <div className="h-2 w-1/2 rounded bg-neutral-100" />
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

              {/* Colour grid */}
              <div className="grid grid-cols-2 gap-4">
                <ColourField
                  label="Primary colour"
                  value={config.primaryColour}
                  onChange={(v) => set("primaryColour", v)}
                />
                <ColourField
                  label="Accent colour"
                  value={config.accentColour}
                  onChange={(v) => set("accentColour", v)}
                />
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

            {/* Live mini preview (desktop) */}
            <div className="hidden lg:block sticky top-28">
              <p className="text-sm font-medium text-neutral-500 mb-4 uppercase tracking-wider">
                Live preview
              </p>
              <MiniPreview config={config} />
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
