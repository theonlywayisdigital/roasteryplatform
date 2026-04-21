import type { Metadata } from "next";
import { Figtree, Inter } from "next/font/google";
import { ToastProvider } from "@/components/ui/Toast";
import { client, urlFor } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const FALLBACK_TITLE =
  "Roastery Platform — The All-in-One Platform for Coffee Roasters";
const FALLBACK_DESCRIPTION =
  "Everything you need to sell more coffee. Wholesale, marketing, roaster tools — one platform, one login.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client
    .fetch(siteSettingsQuery)
    .catch(() => null);

  const title = settings?.defaultSeoTitle || FALLBACK_TITLE;
  const description = settings?.defaultSeoDescription || FALLBACK_DESCRIPTION;
  const ogImageUrl = settings?.ogImage
    ? urlFor(settings.ogImage).width(1200).height(630).url()
    : undefined;

  return {
    title: {
      default: title,
      template: "%s | Roastery Platform",
    },
    description,
    metadataBase: new URL("https://roasteryplatform.com"),
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: "https://roasteryplatform.com",
      siteName: "Roastery Platform",
      title,
      description,
      ...(ogImageUrl && {
        images: [{ url: ogImageUrl, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
    icons: {
      icon: [
        {
          url: "/favicon-dark.png?v=3",
          media: "(prefers-color-scheme: light)",
        },
        {
          url: "/favicon-light.png?v=3",
          media: "(prefers-color-scheme: dark)",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
