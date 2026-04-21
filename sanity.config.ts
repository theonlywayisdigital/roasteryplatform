import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";

const singletonTypes = new Set([
  "siteSettings",
  "roastersPageSettings",
  "roasterFeaturesPage",
  "roasterPricingPage",
  "roasterPartnerProgramPage",
  "roasterProductsCarousel",
]);

const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "roastery-platform",
  title: "Roastery Platform",

  projectId: "z97yvgto",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singletons
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.listItem()
              .title("Roasters Page Settings")
              .id("roastersPageSettings")
              .child(
                S.document()
                  .schemaType("roastersPageSettings")
                  .documentId("roastersPageSettings")
              ),
            S.listItem()
              .title("Features Page")
              .id("roasterFeaturesPage")
              .child(
                S.document()
                  .schemaType("roasterFeaturesPage")
                  .documentId("roasterFeaturesPage")
              ),
            S.listItem()
              .title("Pricing Page")
              .id("roasterPricingPage")
              .child(
                S.document()
                  .schemaType("roasterPricingPage")
                  .documentId("roasterPricingPage")
              ),
            S.listItem()
              .title("Partner Program Page")
              .id("roasterPartnerProgramPage")
              .child(
                S.document()
                  .schemaType("roasterPartnerProgramPage")
                  .documentId("roasterPartnerProgramPage")
              ),
            S.listItem()
              .title("Products Carousel")
              .id("roasterProductsCarousel")
              .child(
                S.document()
                  .schemaType("roasterProductsCarousel")
                  .documentId("roasterProductsCarousel")
              ),
            S.divider(),
            // Collections — filter out singletons
            ...S.documentTypeListItems().filter(
              (item) => !singletonTypes.has(item.getId() ?? "")
            ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) => !singletonTypes.has(schemaType)
      ),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
