import App from '@/src/App';

const validTabs = new Set(['home', 'curriculum', 'practice', 'homework', 'admin']);

const normalizeInitialTab = (value: string | string[] | undefined) => {
  const tab = Array.isArray(value) ? value[0] : value;
  return tab && validTabs.has(tab) ? tab : 'home';
};

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  return <App initialTab={normalizeInitialTab(resolvedSearchParams.tab)} />;
}
