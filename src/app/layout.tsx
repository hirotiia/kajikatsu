import { Metadata } from 'next';

import { config } from '@/config/config';
import '@/styles/globals.css';
import { zen_maru_gothic } from '@/font/font';

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
      <body className={zen_maru_gothic.className}>{children}</body>
    </html>
  );
}
