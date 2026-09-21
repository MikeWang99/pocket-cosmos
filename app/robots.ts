import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/en/admin', '/zh/admin', '/api/'],
    },
    sitemap: 'https://www.pocket-cosmos.com/sitemap.xml',
  };
}
