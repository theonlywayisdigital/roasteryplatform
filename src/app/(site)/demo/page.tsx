import { Metadata } from "next";
import { DemoConfigurator } from "./DemoConfigurator";

export const metadata: Metadata = {
  title: "Demo — Preview Your Wholesale Portal",
  description:
    "See your branded wholesale portal before you sign up. Customise colours, upload your logo, and preview the buyer experience in seconds.",
  openGraph: {
    title: "Demo — Preview Your Wholesale Portal",
    description:
      "See your branded wholesale portal before you sign up. Customise colours, upload your logo, and preview the buyer experience in seconds.",
  },
};

export default function DemoPage() {
  return <DemoConfigurator />;
}
