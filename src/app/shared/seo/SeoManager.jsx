import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { resolveRouteSeo } from "./routeSeo";

const META_DEFINITIONS = [
  { key: "description", attr: "name", value: "description" },
  { key: "keywords", attr: "name", value: "keywords" },
  { key: "og:type", attr: "property", value: "og:type" },
  { key: "og:title", attr: "property", value: "og:title" },
  { key: "og:description", attr: "property", value: "og:description" },
  { key: "og:url", attr: "property", value: "og:url" },
  { key: "og:image", attr: "property", value: "og:image" },
  { key: "og:image:width", attr: "property", value: "og:image:width" },
  { key: "og:image:height", attr: "property", value: "og:image:height" },
  { key: "og:image:alt", attr: "property", value: "og:image:alt" },
  { key: "og:locale", attr: "property", value: "og:locale" },
  { key: "og:site_name", attr: "property", value: "og:site_name" },
  { key: "twitter:card", attr: "name", value: "twitter:card" },
  { key: "twitter:title", attr: "name", value: "twitter:title" },
  { key: "twitter:description", attr: "name", value: "twitter:description" },
  { key: "twitter:image", attr: "name", value: "twitter:image" },
  { key: "twitter:image:alt", attr: "name", value: "twitter:image:alt" },
  { key: "twitter:creator", attr: "name", value: "twitter:creator" },
  { key: "robots", attr: "name", value: "robots" },
];

function upsertMeta(attr, attrValue, content) {
  let element = document.head.querySelector(`meta[${attr}="${attrValue}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertCanonical(href) {
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", href);
}

function upsertJsonLd(data) {
  const scriptId = "route-jsonld";
  let script = document.getElementById(scriptId);
  if (!script) {
    script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

const SeoManager = () => {
  const location = useLocation();

  useEffect(() => {
    const seo = resolveRouteSeo(location.pathname);
    const origin = window.location.origin;
    const canonicalUrl = `${origin}${location.pathname}`;
    const imageUrl = seo.image.startsWith("http")
      ? seo.image
      : `${origin}${seo.image}`;

    document.documentElement.lang = "es";
    document.title = seo.title;

    const metaValues = {
      description: seo.description,
      keywords: seo.keywords,
      "og:type": seo.type,
      "og:title": seo.title,
      "og:description": seo.description,
      "og:url": canonicalUrl,
      "og:image": imageUrl,
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:image:alt": seo.title,
      "og:locale": seo.locale,
      "og:site_name": seo.siteName,
      "twitter:card": "summary_large_image",
      "twitter:title": seo.title,
      "twitter:description": seo.description,
      "twitter:image": imageUrl,
      "twitter:image:alt": seo.title,
      "twitter:creator": seo.twitterCreator || "@itsnotjs",
      robots:
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    };

    META_DEFINITIONS.forEach(({ key, attr, value }) => {
      upsertMeta(attr, value, metaValues[key]);
    });

    upsertCanonical(canonicalUrl);

    // Structured Data más completo
    const structuredData = {
      "@context": "https://schema.org",
      "@type": seo.structuredDataType,
      name: seo.siteName,
      headline: seo.title,
      description: seo.description,
      inLanguage: "es",
      url: canonicalUrl,
      image: {
        "@type": "ImageObject",
        url: imageUrl,
        width: 1200,
        height: 630,
      },
      isPartOf: {
        "@type": "WebSite",
        name: seo.siteName,
        url: origin,
        description:
          "Herramienta completa para One Piece Trading Card Game: generador de mazos, ranking oficial y tier list",
        inLanguage: "es",
      },
      author: {
        "@type": "Person",
        name: "itsnotjs",
      },
      keywords: seo.keywords,
    };

    // Agregar información específica según el tipo de página
    if (seo.structuredDataType === "WebApplication") {
      structuredData.applicationCategory = "GameApplication";
      structuredData.operatingSystem = "Web Browser";
      structuredData.offers = {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      };
    }

    upsertJsonLd(structuredData);
  }, [location.pathname]);

  return null;
};

export default SeoManager;
