import { Metadata } from 'next';

import { AppLayout } from '@/components/layouts/app-layout';
import { config } from '@/config/config';

export const metadata: Metadata = {
  title: config.APP_NAME,
  description: '家事負荷分担アプリ”カジ活”',
};

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
