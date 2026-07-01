'use client';

import type { ReactNode } from 'react';
import { AuthProvider } from '@/src/auth/AuthContext';
import { LanguageProvider } from '@/src/LanguageContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>{children}</AuthProvider>
    </LanguageProvider>
  );
}
