import { Metadata } from 'next';

import { BaseAppLayout } from '@/components/layouts/base-app-layout';
import { config } from '@/config/config';

export const metadata: Metadata = {
  title: config.APP_NAME,
  description: '家事負荷分担アプリ”カジ活”',
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <BaseAppLayout>{children}</BaseAppLayout>;
}
