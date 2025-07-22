import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title = "Binary Baseline - Automated Binary Options Trading Platform",
  description = "Professional automated binary options trading platform with MT5 to Pocket Option integration. Advanced trading indicators, proven strategies, and real-time performance analytics.",
  keywords = [
    "binary options trading",
    "automated trading",
    "MT5 to Pocket Option",
    "trading indicators",
    "trading strategies",
    "binary options bot",
    "forex trading automation",
    "MetaTrader 5",
    "Pocket Option bot",
    "trading performance analytics"
  ],
  canonical,
  ogImage = "/api/og-image",
  ogType = "website",
  structuredData
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    updateMetaTag('description', description);

    // Update keywords
    updateMetaTag('keywords', keywords.join(', '));

    // Update canonical URL
    if (canonical) {
      updateLinkTag('canonical', canonical);
    }

    // Update Open Graph tags
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:type', ogType, 'property');
    updateMetaTag('og:url', window.location.href, 'property');

    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Add structured data
    if (structuredData) {
      updateStructuredData(structuredData);
    }

    // Default structured data for the organization
    const organizationData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Binary Baseline",
      "description": description,
      "url": window.location.origin,
      "applicationCategory": "FinanceApplication",
      "offers": {
        "@type": "Offer",
        "price": "29.99",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "author": {
        "@type": "Organization",
        "name": "Binary Baseline",
        "url": window.location.origin
      },
      "operatingSystem": "Windows, macOS, Linux",
      "softwareVersion": "2.0",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "247",
        "bestRating": "5",
        "worstRating": "1"
      }
    };

    updateStructuredData(organizationData);

  }, [title, description, keywords, canonical, ogImage, ogType, structuredData]);

  return null;
};

function updateMetaTag(name: string, content: string, attribute: string = 'name') {
  let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.content = content;
}

function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  
  element.href = href;
}

function updateStructuredData(data: object) {
  const id = 'structured-data';
  let element = document.getElementById(id) as HTMLScriptElement | null;
  
  if (!element) {
    element = document.createElement('script') as HTMLScriptElement;
    element.id = id;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }
  
  element.textContent = JSON.stringify(data);
}

export default SEO;