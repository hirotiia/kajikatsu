import { Metadata } from 'next';
import { Suspense } from 'react';

import { Content } from '@/components/layouts/content/content';
import { Heading } from '@/components/ui/heading';
import { config } from '@/config/config';

import { DashboardContent } from './dashboard-content';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `ホーム｜${config.APP_NAME}`,
  };
}

export default function Dashboard() {
  return (
    <Content>
      <Heading as="h1">ホーム</Heading>
      <Suspense fallback={<p>読み込み中...</p>}>
        <DashboardContent />
      </Suspense>
    </Content>
  );
}
