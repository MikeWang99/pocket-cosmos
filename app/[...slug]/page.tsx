import App from '@/src/App';

const validTabs = new Set(['curriculum', 'practice', 'homework', 'admin']);

const normalizeInitialTab = (value: string | string[] | undefined) => {
  const tab = Array.isArray(value) ? value[0] : value;
  return tab && validTabs.has(tab) ? tab : 'curriculum';
};

export default async function LegacyPathPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  return <App initialTab={normalizeInitialTab(resolvedSearchParams.tab)} />;
}
