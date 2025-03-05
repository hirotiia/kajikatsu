import { PublicLayout } from '@/components/layouts/public-layout';

export const dynamic = 'force-static';

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayout>{children}</PublicLayout>;
}
