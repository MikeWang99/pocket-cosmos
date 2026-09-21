import type { Metadata } from 'next';
import App from '@/src/App';

export const metadata: Metadata = {
  title: 'Physics Homework',
  description:
    'View assigned physics questions, deadlines, and progress in the Pocket Cosmos homework workflow.',
  alternates: { canonical: '/homework' },
};

export default function HomeworkPage() {
  return <App initialTab="homework" />;
}
