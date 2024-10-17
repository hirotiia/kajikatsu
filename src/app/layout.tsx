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
      <body
        className={cn(
          zen_maru_gothic.className,
          'grid grid-cols-custom-layout',
        )}
      >
        <div className="col-span-3 grid grid-cols-custom-layout gap-custom-gap">
          <div className="col-start-2 grid min-h-dvh grid-rows-[auto_1fr_auto]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
