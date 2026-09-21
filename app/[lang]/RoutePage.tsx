import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import App from '@/src/App';
import { isAppLanguage, type AppLanguage, type AppTab } from '@/src/routing';
import { metadataFor } from '@/src/seo';

export async function RoutePage({
  params,
  tab,
}: {
  params: Promise<{ lang: string }>;
  tab: AppTab;
}) {
  const { lang } = await params;
  if (!isAppLanguage(lang)) notFound();
  return <App initialTab={tab} />;
}

export async function routeMetadata(
  params: Promise<{ lang: string }>,
  tab: AppTab,
): Promise<Metadata> {
  const { lang } = await params;
  if (!isAppLanguage(lang)) notFound();
  return metadataFor(tab, lang as AppLanguage);
}
