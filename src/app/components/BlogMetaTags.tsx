'use client';

import { useEffect } from 'react';

interface BlogPost {
  title: string;
  excerpt: string;
  slug: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    canonicalUrl?: string;
    openGraphImage?: string;
    twitterCard?: string;
  };
  featuredImage?: string;
  publishedAt?: string;
  author?: string;
}

interface BlogMetaTagsProps {
  post: BlogPost;
  baseUrl?: string;
}

export default function BlogMetaTags({ post, baseUrl = 'https://misscrypto.de' }: BlogMetaTagsProps) {
  useEffect(() => {
    if (!post) return;

    const {
      title,
      excerpt,
      slug,
      seo = {},
      featuredImage,
      publishedAt,
      author = 'MissCrypto'
    } = post;

    const {
      metaTitle = title,
      metaDescription = excerpt,
      keywords = [],
      canonicalUrl,
      openGraphImage,
      twitterCard = 'summary_large_image'
    } = seo;

    // Finale URLs
    const fullUrl = canonicalUrl || `${baseUrl.replace(/\/$/, '')}/newsfeed/${slug}`;
    const imageUrl = openGraphImage || featuredImage;

    // Title setzen
    document.title = `${metaTitle} | MissCrypto`;

    // Entferne vorhandene Meta-Tags
    const existingTags = document.querySelectorAll('meta[data-blog-meta]');
    existingTags.forEach(tag => tag.remove());

    // Helper function to create meta tags
    const createMetaTag = (attributes: { [key: string]: string }) => {
      const meta = document.createElement('meta');
      Object.entries(attributes).forEach(([key, value]) => {
        meta.setAttribute(key, value);
      });
      meta.setAttribute('data-blog-meta', 'true');
      document.head.appendChild(meta);
    };

    // Basic Meta Tags
    createMetaTag({
      name: 'description',
      content: metaDescription
    });

    if (keywords.length > 0) {
      createMetaTag({
        name: 'keywords',
        content: keywords.join(', ')
      });
    }

    createMetaTag({
      name: 'author',
      content: author
    });

    if (publishedAt) {
      createMetaTag({
        name: 'article:published_time',
        content: new Date(publishedAt).toISOString()
      });
    }

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = fullUrl;

    // Open Graph Tags
    createMetaTag({
      property: 'og:type',
      content: 'article'
    });

    createMetaTag({
      property: 'og:title',
      content: metaTitle
    });

    createMetaTag({
      property: 'og:description',
      content: metaDescription
    });

    createMetaTag({
      property: 'og:url',
      content: fullUrl
    });

    createMetaTag({
      property: 'og:site_name',
      content: 'MissCrypto'
    });

    if (imageUrl) {
      createMetaTag({
        property: 'og:image',
        content: imageUrl
      });

      createMetaTag({
        property: 'og:image:width',
        content: '1200'
      });

      createMetaTag({
        property: 'og:image:height',
        content: '630'
      });
    }

    // Twitter Card Tags
    createMetaTag({
      name: 'twitter:card',
      content: twitterCard
    });

    createMetaTag({
      name: 'twitter:title',
      content: metaTitle
    });

    createMetaTag({
      name: 'twitter:description',
      content: metaDescription
    });

    if (imageUrl) {
      createMetaTag({
        name: 'twitter:image',
        content: imageUrl
      });
    }

    createMetaTag({
      name: 'twitter:site',
      content: '@MissCrypto'
    });

    // Article specific tags
    if (publishedAt) {
      createMetaTag({
        property: 'article:published_time',
        content: new Date(publishedAt).toISOString()
      });
    }

    createMetaTag({
      property: 'article:author',
      content: author
    });

    if (keywords.length > 0) {
      keywords.forEach(keyword => {
        createMetaTag({
          property: 'article:tag',
          content: keyword.trim()
        });
      });
    }

    // JSON-LD Structured Data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: metaTitle,
      description: metaDescription,
      image: imageUrl ? [imageUrl] : undefined,
      datePublished: publishedAt ? new Date(publishedAt).toISOString() : undefined,
      author: {
        '@type': 'Person',
        name: author
      },
      publisher: {
        '@type': 'Organization',
        name: 'MissCrypto',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo-weiss.webp`
        }
      },
      url: fullUrl,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullUrl
      }
    };

    // Entferne vorhandenes JSON-LD
    const existingJsonLd = document.querySelector('script[data-blog-jsonld]');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    // Füge neues JSON-LD hinzu
    const jsonLdScript = document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    jsonLdScript.setAttribute('data-blog-jsonld', 'true');
    jsonLdScript.textContent = JSON.stringify(structuredData, null, 2);
    document.head.appendChild(jsonLdScript);

  }, [post, baseUrl]);

  return null; // Diese Komponente rendert nichts visuell
} 