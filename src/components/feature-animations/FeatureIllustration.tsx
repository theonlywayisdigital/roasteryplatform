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
import { GreenBeanInventoryAnimation } from "./GreenBeanInventoryAnimation";
import { RoastLogAnimation } from "./RoastLogAnimation";
import { ProductionPlannerAnimation } from "./ProductionPlannerAnimation";
import { CuppingScorecardsAnimation } from "./CuppingScorecardsAnimation";
import { CalculatorsAnimation } from "./CalculatorsAnimation";
import { CertificationsAnimation } from "./CertificationsAnimation";
import { DashboardAnimation } from "./DashboardAnimation";
import { AnalyticsAnimation } from "./AnalyticsAnimation";
import { InboxAnimation } from "./InboxAnimation";
import { IntegrationsAnimation } from "./IntegrationsAnimation";
import { HelpCenterAnimation } from "./HelpCenterAnimation";
import { AIAnimation } from "./AIAnimation";

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
  "green-bean-inventory": GreenBeanInventoryAnimation,
  "inventory-tracking": GreenBeanInventoryAnimation,
  "roast-log": RoastLogAnimation,
  "production-planner": ProductionPlannerAnimation,
  "cupping-scorecards": CuppingScorecardsAnimation,
  calculators: CalculatorsAnimation,
  certifications: CertificationsAnimation,
  dashboard: DashboardAnimation,
  analytics: AnalyticsAnimation,
  inbox: InboxAnimation,
  integrations: IntegrationsAnimation,
  "help-center": HelpCenterAnimation,
  ai: AIAnimation,
};

export function FeatureIllustration({ slug }: { slug: string }) {
  const Component = animationMap[slug];
  if (!Component) return null;
  return <Component />;
}
