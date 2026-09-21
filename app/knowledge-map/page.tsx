import type { Metadata } from 'next';
import App from '@/src/App';

export const metadata: Metadata = {
  title: 'Physics Knowledge Map',
  description:
    'Explore structured AP Physics, IGCSE, A Level, IB, and competition physics learning paths, units, concepts, and exam priorities.',
  alternates: { canonical: '/knowledge-map' },
};

export default function KnowledgeMapPage() {
  return <App initialTab="curriculum" />;
}
