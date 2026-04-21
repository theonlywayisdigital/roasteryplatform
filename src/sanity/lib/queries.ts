import { groq } from "next-sanity";

// Site Settings
export const siteSettingsQuery = groq`
  *[_id == "siteSettings"][0] {
    logo,
    tagline,
    defaultSeoTitle,
    defaultSeoDescription,
    instagramUrl,
    linkedinUrl,
    tiktokUrl,
    contactEmail,
    adminEmail,
    roasteryEmail,
    accentColour,
    ogImage
  }
`;

// Roasters Page Settings (singleton)
export const roastersPageSettingsQuery = groq`
  *[_id == "roastersPageSettings"][0] {
    heroHeadline,
    heroSubheadline,
    heroCta,
    platformHighlights,
    partnerProgramContent,
    pricingIntro,
    videoSectionTitle,
    videoSectionSubtitle,
    ctaStrip1Headline,
    ctaStrip1Subtitle,
    toolsSectionTitle,
    toolsSectionSubtitle,
    toolsSectionDescription,
    ctaStrip2Headline,
    ctaStrip2Subtitle,
    caseStudiesSectionTitle,
    caseStudiesSectionSubtitle,
    blogSectionTitle,
    blogSectionSubtitle,
    partnerSectionLabel,
    partnerSectionTitle,
    partnerSectionSubtitle,
    partnerSteps
  }
`;

// Roaster Features
export const roasterFeaturesQuery = groq`
  *[_type == "roasterFeature" && isActive == true] | order(category asc, order asc) {
    _id,
    title,
    slug,
    description,
    category,
    icon,
    screenshot,
    order
  }
`;

// Roaster Features Page (singleton)
export const roasterFeaturesPageQuery = groq`
  *[_id == "roasterFeaturesPage"][0] {
    heroHeadline,
    heroAccentText,
    heroSubheadline,
    heroCtaText,
    salesSuiteTitle,
    salesSuiteSubtitle,
    marketingSuiteTitle,
    marketingSuiteSubtitle,
    marketplaceTitle,
    marketplaceCopy,
    faqTitle,
    ctaHeadline,
    ctaDescription,
    ctaButtonText
  }
`;

// Roaster Pricing Page (singleton)
export const roasterPricingPageQuery = groq`
  *[_id == "roasterPricingPage"][0] {
    heroHeadline,
    heroSubheadline,
    faqTitle,
    ctaHeadline,
    ctaDescription,
    ctaButtonText
  }
`;

// Roaster Partner Program Page (singleton)
export const roasterPartnerProgramPageQuery = groq`
  *[_id == "roasterPartnerProgramPage"][0] {
    heroHeadline,
    heroAccentText,
    heroSubheadline,
    heroCtaText,
    stepsTitle,
    steps,
    benefitsTitle,
    benefits,
    requirementsTitle,
    requirements,
    additionalContent,
    ctaHeadline,
    ctaDescription,
    ctaButtonText
  }
`;

// Roaster Products Carousel
export const roasterProductsCarouselQuery = groq`
  *[_id == "roasterProductsCarousel"][0] {
    suites[] {
      key,
      label,
      tagline,
      description,
      features[] {
        icon,
        title,
        description,
        href
      }
    }
  }
`;

// Blog posts for roasters site
export const roasterBlogPostsQuery = groq`
  *[_type == "blogPost" && audience in ["roaster", "both"]] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    author,
    publishedAt,
    featuredImage
  }
`;

// Blog post by slug
export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    category,
    author,
    publishedAt,
    featuredImage,
    seoTitle,
    seoDescription,
    funnelStage,
    campaign,
    targetKeyword,
    ctaType,
    ctaUrl
  }
`;

// Case studies for roasters site
export const roasterCaseStudiesQuery = groq`
  *[_type == "caseStudy" && audience in ["roaster", "both"]] | order(isPlaceholder asc) {
    _id,
    brandName,
    slug,
    summary,
    logo,
    liveURL,
    isPlaceholder
  }
`;

// Case study by slug
export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    brandName,
    slug,
    summary,
    fullStory,
    logo,
    images,
    liveURL,
    isPlaceholder,
    seoTitle,
    seoDescription
  }
`;

// FAQs for roaster pricing
export const roasterFaqsQuery = groq`
  *[_type == "faq" && category == "roaster-pricing"] | order(order asc) {
    _id,
    question,
    answer
  }
`;

// FAQs for roaster features page
export const roasterFeaturesFaqsQuery = groq`
  *[_type == "faq" && category == "roaster-features"] | order(order asc) {
    _id,
    question,
    answer
  }
`;

// Roaster feature detail by slug
export const roasterFeatureDetailBySlugQuery = groq`
  *[_type == "roasterFeatureDetail" && slug.current == $slug][0] {
    slug,
    suite,
    heroDescription,
    includedNote,
    benefits,
    screenshot,
    benefitsTitle,
    ctaHeadline,
    ctaDescription,
    ctaButtonText,
    comingSoon,
    "featureTitle": feature->title,
    "featureIcon": feature->icon
  }
`;

// All feature detail slugs (for generateStaticParams)
export const allRoasterFeatureDetailSlugsQuery = groq`
  *[_type == "roasterFeatureDetail"] {
    "slug": slug.current
  }
`;
