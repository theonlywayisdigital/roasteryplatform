import { defineType, defineField } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Guides", value: "guides" },
          { title: "Business", value: "business" },
          { title: "Coffee", value: "coffee" },
          { title: "Industry", value: "industry" },
        ],
      },
    }),
    defineField({
      name: "audience",
      title: "Audience",
      type: "string",
      options: {
        list: [
          { title: "Roaster", value: "roaster" },
          { title: "Consumer", value: "consumer" },
          { title: "Both", value: "both" },
        ],
      },
      initialValue: "roaster",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
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
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "funnelStage",
      title: "Funnel Stage",
      type: "string",
      options: {
        list: [
          { title: "Top of Funnel", value: "tofu" },
          { title: "Middle of Funnel", value: "mofu" },
          { title: "Bottom of Funnel", value: "bofu" },
        ],
      },
    }),
    defineField({
      name: "campaign",
      title: "Campaign",
      type: "string",
    }),
    defineField({
      name: "targetKeyword",
      title: "Target Keyword",
      type: "string",
    }),
    defineField({
      name: "ctaType",
      title: "CTA Type",
      type: "string",
    }),
    defineField({
      name: "ctaUrl",
      title: "CTA URL",
      type: "string",
    }),
  ],
  orderings: [
    {
      title: "Published Date, Newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "featuredImage",
    },
  },
});
