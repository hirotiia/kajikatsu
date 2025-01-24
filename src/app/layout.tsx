import { Metadata } from 'next';

import { config } from '@/config/config';
import '@/styles/globals.css';
import { zen_maru_gothic } from '@/font/font';
import { createClient } from '@/lib/supabase/server';

import { AppProvider } from './provider';

export const metadata: Metadata = {
  title: config.APP_NAME,
  description: '家事負荷分担アプリ',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id ?? null;

  return (
    <html lang="ja">
      <body className={zen_maru_gothic.className}>
        <AppProvider userId={userId}>{children}</AppProvider>
      </body>
    </html>
  );
}
