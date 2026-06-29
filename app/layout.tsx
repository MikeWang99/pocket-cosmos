import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Pocket Cosmos | 口袋宇宙',
  description: 'Bilingual physics learning, AP Physics practice, and first-principles teaching from Pocket Cosmos.',
  icons: {
    icon: '/assets/poco-favicon.png',
    apple: '/assets/poco-logo-transparent.png',
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
