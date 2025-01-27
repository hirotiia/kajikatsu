import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box/box';
import { SecondaryHeading } from '@/components/ui/heading';
import { InfoList } from '@/components/ui/list';
import { RenderDashboardTasks } from '@/features/dashboard/components/render-dashboard-tasks';
import { getUserProfile } from '@/lib/supabase/data/users/get-user-profile';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ダッシュボード',
  };
}

export default async function Dashbord() {
  const { data, error } = await getUserProfile();
  if (error || !data) {
    redirect('/login');
  }

  return (
    <>
      <Content>
        <p className="text-center text-lg">
          <b>ようこそ、{data.username}さん</b>
        </p>
        <SecondaryHeading>全体</SecondaryHeading>
        <RenderDashboardTasks />
        <SecondaryHeading className="mt-4">これお願い!</SecondaryHeading>
        <Box variant="secondary" className="mt-4">
          <InfoList
            items={[
              {
                date: '2024/10/24',
                expireDate: '2024/11/01',
                title: '食器洗い',
                description: '誰かお願い',
              },
              {
                date: '2024/10/23',
                expireDate: '2024/11/02',
                title: '風呂洗い',
                description: '誰かお願い',
              },
              {
                date: '2024/10/21',
                expireDate: '2024/11/03',
                title: '洗濯物干し',
                description: '今日の午前中までにお願い',
              },
            ]}
          />
        </Box>
        <SecondaryHeading className="mt-4">
          最近のアクティビティ
        </SecondaryHeading>
      </Content>
    </>
  );
}
