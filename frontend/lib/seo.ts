import type { Metadata } from 'next';
import { site } from '@/lib/portfolio-content';

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'http://localhost:3000';

export const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

export const defaultTitle =
  'Ibrahim Abdulazeez — Senior Software Engineer & AI Engineer';

export const defaultDescription =
  'Portfolio of Ibrahim Abdulazeez — Senior Software Engineer & AI Engineer. Chat with the Digital Twin, explore projects, experience, and get in touch.';

export const siteName = site.fullName;

export const keywords = [
  'Ibrahim Abdulazeez',
  'Senior Software Engineer',
  'AI Engineer',
  'Digital Twin',
  'LLM',
  'RAG',
  'React',
  'Next.js',
  'TypeScript',
  'AWS',
  'Agent Architectures',
  'Portfolio',
  'Lagos Nigeria',
];

export const defaultOgImage = '/avatar.png';

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
};

export function absoluteUrl(path = ''): string {
  if (!path || path === '/') return siteUrl;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description,
  path = '/',
  ogImage = defaultOgImage,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = ogImage.startsWith('http') ? ogImage : absoluteUrl(ogImage);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords,
    authors: [{ name: site.fullName, url: siteUrl }],
    creator: site.fullName,
    publisher: site.fullName,
    alternates: {
      canonical: url,
    },
    icons: {
      icon: '/avatar.png',
      apple: '/avatar.png',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      title,
      description,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${site.fullName} — ${site.headline}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function getPersonJsonLd() {
  const sameAs = [site.linkedin, site.github].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.fullName,
    jobTitle: site.headline,
    url: siteUrl,
    image: absoluteUrl(defaultOgImage),
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lagos',
      addressCountry: 'NG',
    },
    sameAs,
  };
}

export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: defaultDescription,
    author: {
      '@type': 'Person',
      name: site.fullName,
    },
  };
}

export const sitemapRoutes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/projects', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.7, changeFrequency: 'yearly' as const },
];
