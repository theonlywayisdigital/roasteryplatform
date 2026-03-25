import { RoastersNavbar } from "@/components/roasters/RoastersNavbar";
import { RoastersFooter } from "@/components/roasters/RoastersFooter";
import { CookieBanner } from "@/components/layout/CookieBanner";
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-light overflow-x-hidden">
      <RoastersNavbar />
      <main className="min-h-screen">{children}</main>
      <RoastersFooter />
      <CookieBanner variant="light" />
    </div>
  );
}
