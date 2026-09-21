import type { MetadataRoute } from 'next';
import { buildAppPath, type AppLanguage, type AppTab } from '@/src/routing';

const SITE = 'https://www.pocket-cosmos.com';
const PUBLIC_TABS: AppTab[] = ['home', 'curriculum', 'practice', 'homework'];
const LANGUAGES: AppLanguage[] = ['en', 'zh'];

export default function sitemap(): MetadataRoute.Sitemap {
  return LANGUAGES.flatMap((language) =>
    PUBLIC_TABS.map((tab) => ({
      url: `${SITE}${buildAppPath(tab, language)}`,
      lastModified: new Date(),
      changeFrequency: tab === 'home' ? 'weekly' : 'daily',
      priority: tab === 'home' ? 1 : 0.85,
      alternates: {
        languages: {
          en: `${SITE}${buildAppPath(tab, 'en')}`,
          zh: `${SITE}${buildAppPath(tab, 'zh')}`,
        },
      },
    })),
  );
}
