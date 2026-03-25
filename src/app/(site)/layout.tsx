import { RoastersNavbar } from "@/components/roasters/RoastersNavbar";
import { RoastersFooter } from "@/components/roasters/RoastersFooter";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { client, urlFor } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await client.fetch(
    siteSettingsQuery,
    {},
    { cache: "no-store" }
  );
  const logoUrl = settings?.logo
    ? urlFor(settings.logo).height(200).url()
    : null;

  return (
    <div className="theme-light overflow-x-hidden">
      <RoastersNavbar logoUrl={logoUrl} />
      <main className="min-h-screen">{children}</main>
      <RoastersFooter logoUrl={logoUrl} />
      <CookieBanner variant="light" />
    </div>
  );
}
