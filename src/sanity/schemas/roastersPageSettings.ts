import { defineType, defineField } from "sanity";

export default defineType({
  name: "roastersPageSettings",
  title: "Roasters Page Settings",
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
      name: "heroCta",
      title: "Hero CTA Text",
      type: "string",
    }),
    defineField({
      name: "platformHighlights",
      title: "Platform Highlights",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "partnerProgramContent",
      title: "Partner Program Content",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "pricingIntro",
      title: "Pricing Intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "videoSectionTitle",
      title: "Video Section Title",
      type: "string",
    }),
    defineField({
      name: "videoSectionSubtitle",
      title: "Video Section Subtitle",
      type: "string",
    }),
    defineField({
      name: "ctaStrip1Headline",
      title: "CTA Strip 1 Headline",
      type: "string",
    }),
    defineField({
      name: "ctaStrip1Subtitle",
      title: "CTA Strip 1 Subtitle",
      type: "string",
    }),
    defineField({
      name: "toolsSectionTitle",
      title: "Tools Section Title",
      type: "string",
    }),
    defineField({
      name: "toolsSectionSubtitle",
      title: "Tools Section Subtitle",
      type: "string",
    }),
    defineField({
      name: "toolsSectionDescription",
      title: "Tools Section Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ctaStrip2Headline",
      title: "CTA Strip 2 Headline",
      type: "string",
    }),
    defineField({
      name: "ctaStrip2Subtitle",
      title: "CTA Strip 2 Subtitle",
      type: "string",
    }),
    defineField({
      name: "caseStudiesSectionTitle",
      title: "Case Studies Section Title",
      type: "string",
    }),
    defineField({
      name: "caseStudiesSectionSubtitle",
      title: "Case Studies Section Subtitle",
      type: "string",
    }),
    defineField({
      name: "blogSectionTitle",
      title: "Blog Section Title",
      type: "string",
    }),
    defineField({
      name: "blogSectionSubtitle",
      title: "Blog Section Subtitle",
      type: "string",
    }),
    defineField({
      name: "partnerSectionLabel",
      title: "Partner Section Label",
      type: "string",
    }),
    defineField({
      name: "partnerSectionTitle",
      title: "Partner Section Title",
      type: "string",
    }),
    defineField({
      name: "partnerSectionSubtitle",
      title: "Partner Section Subtitle",
      type: "string",
    }),
    defineField({
      name: "partnerSteps",
      title: "Partner Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "step", title: "Step Number", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
            defineField({ name: "icon", title: "Icon", type: "string" }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Roasters Page Settings" };
    },
  },
});
