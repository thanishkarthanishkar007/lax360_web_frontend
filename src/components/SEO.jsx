import { useEffect } from "react";
import { SITE_CONFIG } from "../data/seoData";

const setMetaTag = (attributeName, attributeValue, content) => {
  if (!content) return;
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const setCanonicalUrl = (url) => {
  let element = document.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", url);
};

const setJsonLd = (id, data) => {
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
};

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogType = "website",
  ogImage,
  noIndex = false,
  breadcrumbs,
  servicesList,
  customSchema,
}) => {
  useEffect(() => {
    // 1. Page Title
    const finalTitle = title
      ? title.includes(SITE_CONFIG.siteName)
        ? title
        : `${title} | ${SITE_CONFIG.siteName}`
      : `${SITE_CONFIG.siteName} | AI Solutions & Modern Digital Systems`;
    document.title = finalTitle;

    // 2. Base Meta Tags
    const fullCanonical = canonical
      ? canonical.startsWith("http")
        ? canonical
        : `${SITE_CONFIG.domain}${canonical.startsWith("/") ? "" : "/"}${canonical}`
      : typeof window !== "undefined"
      ? window.location.href
      : SITE_CONFIG.domain;

    const fullImageUrl = ogImage
      ? ogImage.startsWith("http")
        ? ogImage
        : `${SITE_CONFIG.domain}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`
      : `${SITE_CONFIG.domain}${SITE_CONFIG.defaultImage}`;

    setMetaTag("name", "description", description);
    if (keywords) setMetaTag("name", "keywords", keywords);
    setMetaTag("name", "robots", noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMetaTag("name", "author", SITE_CONFIG.companyName);

    // 3. Canonical Link
    setCanonicalUrl(fullCanonical);

    // 4. Open Graph Tags
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:title", finalTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", fullCanonical);
    setMetaTag("property", "og:site_name", SITE_CONFIG.siteName);
    setMetaTag("property", "og:image", fullImageUrl);
    setMetaTag("property", "og:locale", "en_US");

    // 5. Twitter Card Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", finalTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", fullImageUrl);
    setMetaTag("name", "twitter:site", SITE_CONFIG.twitterHandle);

    // 6. Organization & LocalBusiness Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": ["Organization", "ProfessionalService"],
      name: SITE_CONFIG.companyName,
      alternateName: SITE_CONFIG.siteName,
      url: SITE_CONFIG.domain,
      logo: `${SITE_CONFIG.domain}${SITE_CONFIG.defaultImage}`,
      image: `${SITE_CONFIG.domain}${SITE_CONFIG.defaultImage}`,
      description: description || SITE_CONFIG.companyName,
      email: SITE_CONFIG.email,
      telephone: SITE_CONFIG.phoneNumbers[0],
      address: {
        "@type": "PostalAddress",
        ...SITE_CONFIG.address,
      },
      geo: {
        "@type": "GeoCoordinates",
        ...SITE_CONFIG.geo,
      },
      sameAs: SITE_CONFIG.socialLinks,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.phoneNumbers[0],
        contactType: "customer service",
        availableLanguage: ["English", "Tamil"],
      },
    };
    setJsonLd("organization-schema", organizationSchema);

    // 7. Breadcrumb Schema (if provided)
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: crumb.url.startsWith("http")
            ? crumb.url
            : `${SITE_CONFIG.domain}${crumb.url.startsWith("/") ? "" : "/"}${crumb.url}`,
        })),
      };
      setJsonLd("breadcrumb-schema", breadcrumbSchema);
    }

    // 8. Service Schema (if provided)
    if (servicesList && servicesList.length > 0) {
      const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        provider: {
          "@type": "Organization",
          name: SITE_CONFIG.companyName,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Lax360 Technology Services",
          itemListElement: servicesList.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              description: service.description,
            },
          })),
        },
      };
      setJsonLd("service-schema", serviceSchema);
    }

    // 9. Custom Page Schema (if provided)
    if (customSchema) {
      setJsonLd("custom-page-schema", customSchema);
    }
  }, [
    title,
    description,
    keywords,
    canonical,
    ogType,
    ogImage,
    noIndex,
    breadcrumbs,
    servicesList,
    customSchema,
  ]);

  return null;
};

export default SEO;
