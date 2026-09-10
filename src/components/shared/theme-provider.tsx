'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

/**
 * next-themes сам добавляет inline-скрипт в <head>, который выставляет
 * класс .dark/.light ДО отрисовки страницы — поэтому "вспышки" темы не будет.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
