'use client';

import type { ReactNode } from 'react';
import { LanguageProvider } from '@/src/LanguageContext';

export function Providers({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
