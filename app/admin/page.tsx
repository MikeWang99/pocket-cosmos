import type { Metadata } from 'next';
import App from '@/src/App';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
  alternates: { canonical: '/admin' },
};

export default function AdminPage() {
  return <App initialTab="admin" />;
}
