import { practiceSets } from '../data/practiceSets';
import { buildAppPath, parseAppPath } from '../routing';

export const PUBLIC_SAMPLE_SET_ID = 'ap1-unit-1-kinematics-question-bank';
export const PUBLIC_SAMPLE_LIMIT = 5;

export const readPracticeSelectionFromUrl = () => {
  if (typeof window === 'undefined') {
    return { setId: PUBLIC_SAMPLE_SET_ID, questionId: null as string | null };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    setId: params.get('set') || PUBLIC_SAMPLE_SET_ID,
    questionId: params.get('q') || params.get('question'),
  };
};

export const getSafePracticeSelection = (setId: string, questionId: string | null) => {
  const set = practiceSets.find((item) => item.id === setId) ?? practiceSets[0];
  const index = questionId ? set.steps.findIndex((step) => step.id === questionId) : 0;

  return {
    setId: set.id,
    index: index >= 0 ? index : 0,
  };
};

export const updatePracticeUrl = (
  setId: string,
  questionId: string,
  mode: 'push' | 'replace' = 'push',
) => {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  const route = parseAppPath(url.pathname, url.search);
  url.pathname = buildAppPath('practice', route.language ?? 'en');
  url.hash = '';
  url.searchParams.delete('tab');
  url.searchParams.set('set', setId);
  url.searchParams.set('q', questionId);
  const nextUrl = `${url.pathname}${url.search}`;
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  if (nextUrl !== currentUrl) {
    window.history[mode === 'replace' ? 'replaceState' : 'pushState']({}, '', nextUrl);
  }
};

export const buildPracticeShareUrl = (setId: string, questionId: string) => {
  if (typeof window === 'undefined') return '';

  const route = parseAppPath(window.location.pathname, window.location.search);
  const url = new URL(buildAppPath('practice', route.language ?? 'en'), window.location.origin);
  url.searchParams.set('set', setId);
  url.searchParams.set('q', questionId);
  return url.toString();
};

export const copyTextToClipboard = async (value: string) => {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Fall through for browsers that expose Clipboard API but deny permission.
    }
  }

  const textArea = document.createElement('textarea');
  textArea.value = value;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
};
