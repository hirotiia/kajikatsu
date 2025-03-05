import { Metadata } from 'next';

import { PublicLayout } from '@/components/layouts/public-layout';
import { config } from '@/config/config';

export const metadata: Metadata = {
  title: config.APP_NAME,
  description: '家事負荷分担アプリ”カジ活”',
};

export const dynamic = 'force-static';

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayout>{children}</PublicLayout>;
}
