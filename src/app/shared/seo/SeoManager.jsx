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
  { key: "og:locale", attr: "property", value: "og:locale" },
  { key: "twitter:card", attr: "name", value: "twitter:card" },
  { key: "twitter:title", attr: "name", value: "twitter:title" },
  { key: "twitter:description", attr: "name", value: "twitter:description" },
  { key: "twitter:image", attr: "name", value: "twitter:image" },
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
      "og:locale": seo.locale,
      "twitter:card": "summary_large_image",
      "twitter:title": seo.title,
      "twitter:description": seo.description,
      "twitter:image": imageUrl,
      robots: "index, follow",
    };

    META_DEFINITIONS.forEach(({ key, attr, value }) => {
      upsertMeta(attr, value, metaValues[key]);
    });

    upsertCanonical(canonicalUrl);

    upsertJsonLd({
      "@context": "https://schema.org",
      "@type": seo.structuredDataType,
      name: seo.siteName,
      headline: seo.title,
      description: seo.description,
      inLanguage: "es",
      url: canonicalUrl,
      image: imageUrl,
      isPartOf: {
        "@type": "WebSite",
        name: seo.siteName,
        url: origin,
      },
    });
  }, [location.pathname]);

  return null;
};

export default SeoManager;
