import { Metadata } from 'next';

import { config } from '@/config/config';
import { zen_maru_gothic } from '@/font/font';
import { cn } from '@/utils/cn';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: config.APP_NAME,
  description: '家事負荷分担アプリ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={cn(zen_maru_gothic.className, 'min-h-dvh')}>
        {children}
      </body>
    </html>
  );
}
