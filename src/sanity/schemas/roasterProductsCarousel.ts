import { defineType, defineField } from "sanity";

export default defineType({
  name: "roasterProductsCarousel",
  title: "Roaster Products Carousel",
  type: "document",
  fields: [
    defineField({
      name: "suites",
      title: "Suites",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "key", title: "Key", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "tagline", title: "Tagline", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
            defineField({
              name: "features",
              title: "Features",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "icon", title: "Icon", type: "string" }),
                    defineField({ name: "title", title: "Title", type: "string" }),
                    defineField({ name: "description", title: "Description", type: "text" }),
                    defineField({ name: "href", title: "Link", type: "string" }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Roaster Products Carousel" };
    },
  },
});
