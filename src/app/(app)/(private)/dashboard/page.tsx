import { Metadata } from 'next';

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

      <DashboardContent />
    </Content>
  );
}
