import { redirect } from 'next/navigation';
import { buildAppPath, normalizeAppTab } from '@/src/routing';

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = searchParams ? await searchParams : {};
  const rawTab = Array.isArray(params.tab) ? params.tab[0] : params.tab;
  const tab = normalizeAppTab(rawTab ?? null);

  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (key === 'tab' || value == null) return;
    const first = Array.isArray(value) ? value[0] : value;
    if (first) query.set(key, first);
  });

  const path = buildAppPath(tab, 'en');
  const suffix = query.toString();
  redirect(suffix ? `${path}?${suffix}` : path);
}
