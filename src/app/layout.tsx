import type { Metadata } from "next";
import { Figtree, Inter } from "next/font/google";
import { ToastProvider } from "@/components/ui/Toast";
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

export const metadata: Metadata = {
  title: {
    default: "Roastery Platform — The All-in-One Platform for Coffee Roasters",
    template: "%s | Roastery Platform",
  },
  description:
    "Everything you need to sell more coffee. Storefront, wholesale, marketing, roaster tools, and website builder — one platform, one login.",
  metadataBase: new URL("https://roasteryplatform.com"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://roasteryplatform.com",
    siteName: "Roastery Platform",
    title: "Roastery Platform — The All-in-One Platform for Coffee Roasters",
    description:
      "Everything you need to sell more coffee. Storefront, wholesale, marketing, roaster tools, and website builder — one platform, one login.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roastery Platform — The All-in-One Platform for Coffee Roasters",
    description:
      "Everything you need to sell more coffee. Storefront, wholesale, marketing, roaster tools, and website builder — one platform, one login.",
  },
  icons: {
    icon: [
      {
        url: "/favicon-dark.png?v=2",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-light.png?v=2",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
