"use client";

import { OrderTrackingAnimation } from "./OrderTrackingAnimation";
import { WholesaleAnimation } from "./WholesaleAnimation";
import { CRMAnimation } from "./CRMAnimation";
import { InvoiceAnimation } from "./InvoiceAnimation";
import { ProductManagementAnimation } from "./ProductManagementAnimation";
import { EmailCampaignsAnimation } from "./EmailCampaignsAnimation";
import { SocialSchedulingAnimation } from "./SocialSchedulingAnimation";
import { ContentCalendarAnimation } from "./ContentCalendarAnimation";
import { EmbeddedFormsAnimation } from "./EmbeddedFormsAnimation";

const animationMap: Record<string, React.ComponentType> = {
  "order-tracking": OrderTrackingAnimation,
  wholesale: WholesaleAnimation,
  crm: CRMAnimation,
  invoices: InvoiceAnimation,
  "product-management": ProductManagementAnimation,
  "email-campaigns": EmailCampaignsAnimation,
  "social-scheduling": SocialSchedulingAnimation,
  "content-calendar": ContentCalendarAnimation,
  "embedded-forms": EmbeddedFormsAnimation,
};

export function FeatureIllustration({ slug }: { slug: string }) {
  const Component = animationMap[slug];
  if (!Component) return null;
  return <Component />;
}
