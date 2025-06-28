import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { PrivateLayout } from '@/components/layouts/private-layout';
import { config } from '@/config/config';
import { isAuthenticated } from '@/lib/supabase/user/is-authenticated';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: config.APP_NAME,
  description: '家事負荷分担アプリ”カジ活”',
};

export default async function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authGuard: boolean = await isAuthenticated();

  if (!authGuard) {
    redirect('/login');
  }
  return <PrivateLayout>{children}</PrivateLayout>;
}
