export type AppLanguage = 'en' | 'zh';
export type AppTab = 'home' | 'curriculum' | 'practice' | 'homework' | 'admin';

const TAB_SEGMENTS: Record<AppTab, string> = {
  home: '',
  curriculum: 'knowledge-map',
  practice: 'practice',
  homework: 'homework',
  admin: 'admin',
};

const SEGMENT_TABS = new Map<string, AppTab>(
  Object.entries(TAB_SEGMENTS).map(([tab, segment]) => [segment, tab as AppTab]),
);

export const isAppLanguage = (value: string | null | undefined): value is AppLanguage =>
  value === 'en' || value === 'zh';

export const normalizeAppTab = (value: string | null | undefined): AppTab =>
  value === 'curriculum' || value === 'practice' || value === 'homework' || value === 'admin'
    ? value
    : 'home';

export const buildAppPath = (tab: AppTab, language: AppLanguage) => {
  const segment = TAB_SEGMENTS[tab];
  return segment ? `/${language}/${segment}` : `/${language}`;
};

export const parseAppPath = (
  pathname: string,
  search = '',
): { language: AppLanguage | null; tab: AppTab; legacy: boolean } => {
  const parts = pathname.split('/').filter(Boolean);
  const language = isAppLanguage(parts[0]) ? parts[0] : null;

  if (language) {
    const segment = parts[1] ?? '';
    const tab = SEGMENT_TABS.get(segment) ?? 'home';
    return { language, tab, legacy: false };
  }

  const params = new URLSearchParams(search);
  const legacyTab = params.get('tab');
  if (legacyTab) {
    return { language: null, tab: normalizeAppTab(legacyTab), legacy: true };
  }

  if (pathname === '/knowledge-map') return { language: null, tab: 'curriculum', legacy: true };
  if (pathname === '/practice') return { language: null, tab: 'practice', legacy: true };
  if (pathname === '/homework') return { language: null, tab: 'homework', legacy: true };

  return { language: null, tab: 'home', legacy: pathname !== '/' };
};

export const buildTabUrl = (
  tab: AppTab,
  language: AppLanguage,
  currentSearch = '',
) => {
  const params = new URLSearchParams(currentSearch);

  params.delete('tab');
  if (tab !== 'practice') {
    params.delete('set');
    params.delete('q');
  }
  if (tab !== 'homework') {
    params.delete('assignment');
  }

  const query = params.toString();
  return `${buildAppPath(tab, language)}${query ? `?${query}` : ''}`;
};
