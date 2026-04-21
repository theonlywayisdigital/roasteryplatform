import { defineType, defineField } from "sanity";

export default defineType({
  name: "roasterPricingPage",
  title: "Roaster Pricing Page",
  type: "document",
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "faqTitle",
      title: "FAQ Title",
      type: "string",
    }),
    defineField({
      name: "ctaHeadline",
      title: "CTA Headline",
      type: "string",
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ctaButtonText",
      title: "CTA Button Text",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Roaster Pricing Page" };
    },
  },
});
