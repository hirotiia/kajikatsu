import { Metadata, Viewport } from 'next';

import { config } from '@/config/config';
import '@/styles/globals.css';
import { zen_maru_gothic } from '@/font/font';
import { cn } from '@/utils/cn';

import { AppProvider } from './provider';

export const metadata: Metadata = {
  title: {
    default: config.APP_NAME,
    template: `%s | ${config.APP_NAME}`,
  },
  description: config.description,
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: config.url,
    title: config.APP_NAME,
    description: config.description,
    images: [
      {
        url: `${config.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${config.APP_NAME}のイメージ`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: config.APP_NAME,
    description: config.description,
    images: [`${config.url}/twitter-card.jpg`],
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={cn('h-full', zen_maru_gothic.className)}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
