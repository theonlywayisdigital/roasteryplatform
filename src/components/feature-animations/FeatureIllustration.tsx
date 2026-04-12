"use client";

import { OrderTrackingAnimation } from "./OrderTrackingAnimation";
import { WholesaleAnimation } from "./WholesaleAnimation";
import { CRMAnimation } from "./CRMAnimation";
import { InvoiceAnimation } from "./InvoiceAnimation";
import { ProductManagementAnimation } from "./ProductManagementAnimation";

const animationMap: Record<string, React.ComponentType> = {
  "order-tracking": OrderTrackingAnimation,
  wholesale: WholesaleAnimation,
  crm: CRMAnimation,
  invoices: InvoiceAnimation,
  "product-management": ProductManagementAnimation,
};

export function FeatureIllustration({ slug }: { slug: string }) {
  const Component = animationMap[slug];
  if (!Component) return null;
  return <Component />;
}
