import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/shared/theme-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'SolenChat — семейный мессенджер',
  description: 'Приватное пространство для общения вашей семьи',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F7FB' },
    { media: '(prefers-color-scheme: dark)', color: '#0E1621' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="min-h-dvh antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
