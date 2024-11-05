import { Metadata } from 'next';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { config } from '@/config/config';

export const metadata: Metadata = {
  title: config.APP_NAME,
  description: '家事負荷分担アプリ”カジ活”',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
