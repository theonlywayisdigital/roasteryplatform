import { defineType, defineField } from "sanity";

export default defineType({
  name: "roasterFeaturesPage",
  title: "Roaster Features Page",
  type: "document",
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
    }),
    defineField({
      name: "heroAccentText",
      title: "Hero Accent Text",
      type: "string",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroCtaText",
      title: "Hero CTA Text",
      type: "string",
    }),
    defineField({
      name: "salesSuiteTitle",
      title: "Sales Suite Title",
      type: "string",
    }),
    defineField({
      name: "salesSuiteSubtitle",
      title: "Sales Suite Subtitle",
      type: "string",
    }),
    defineField({
      name: "marketingSuiteTitle",
      title: "Marketing Suite Title",
      type: "string",
    }),
    defineField({
      name: "marketingSuiteSubtitle",
      title: "Marketing Suite Subtitle",
      type: "string",
    }),
    defineField({
      name: "marketplaceTitle",
      title: "Marketplace Title",
      type: "string",
    }),
    defineField({
      name: "marketplaceCopy",
      title: "Marketplace Copy",
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
      return { title: "Roaster Features Page" };
    },
  },
});
