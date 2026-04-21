import { defineType, defineField } from "sanity";

export default defineType({
  name: "roasterFeatureDetail",
  title: "Roaster Feature Detail",
  type: "document",
  fields: [
    defineField({
      name: "feature",
      title: "Feature",
      type: "reference",
      to: [{ type: "roasterFeature" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "suite",
      title: "Suite",
      type: "string",
      options: {
        list: [
          { title: "Sales", value: "sales" },
          { title: "Marketing", value: "marketing" },
          { title: "Marketplace", value: "marketplace" },
        ],
      },
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "includedNote",
      title: "Included Note",
      type: "string",
    }),
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "benefitsTitle",
      title: "Benefits Title",
      type: "string",
    }),
    defineField({
      name: "screenshot",
      title: "Screenshot",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
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
    defineField({
      name: "comingSoon",
      title: "Coming Soon",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "feature.title",
      subtitle: "suite",
      media: "screenshot",
    },
  },
});
