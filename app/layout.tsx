import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://pocket-cosmos.com'),
  title: {
    default: 'Pocket Cosmos | AP Physics Learning Material and One-Stop Physics Study',
    template: '%s | Pocket Cosmos',
  },
  description:
    'Pocket Cosmos is a one-stop physics learning website with AP Physics learning material, knowledge maps, practice questions, diagrams, answer tracking, and bilingual self-study resources.',
  keywords: [
    'AP Physics Learning Material',
    'AP Physics practice',
    'AP Physics C Mechanics',
    'AP Physics C Electricity and Magnetism',
    'physics learning material',
    'physics self study',
    'Pocket Cosmos',
    '口袋寰宇',
    '物理学习',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Pocket Cosmos | AP Physics Learning Material',
    description:
      'A one-stop physics learning website with AP Physics knowledge maps, practice questions, diagrams, answer tracking, and bilingual self-study materials.',
    url: '/',
    siteName: 'Pocket Cosmos',
    images: [
      {
        url: '/assets/pocket-cosmos-og.png',
        width: 1200,
        height: 630,
        alt: 'Pocket Cosmos AP Physics learning material preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pocket Cosmos | AP Physics Learning Material',
    description:
      'One-stop AP Physics learning material, practice questions, knowledge maps, diagrams, and bilingual self-study resources.',
    images: ['/assets/pocket-cosmos-og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/assets/poco-mark.svg', type: 'image/svg+xml' },
      { url: '/assets/poco-favicon.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: '/assets/poco-apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
