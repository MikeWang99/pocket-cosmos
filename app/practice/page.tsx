import type { Metadata } from 'next';
import App from '@/src/App';

export const metadata: Metadata = {
  title: 'Physics Practice Library',
  description:
    'Practise physics by course, chapter, difficulty, and question type with saved progress and targeted feedback.',
  alternates: { canonical: '/practice' },
};

export default function PracticePage() {
  return <App initialTab="practice" />;
}
