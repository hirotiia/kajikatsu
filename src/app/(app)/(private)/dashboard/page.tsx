import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box/box';
import { SecondaryHeading } from '@/components/ui/heading';
import { InfoList } from '@/components/ui/list';
import { RenderAllMenbersTasks } from '@/features/dashboard/components/render-all-members-tasks';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';
import { getUser } from '@/lib/supabase/user/user';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ダッシュボード',
  };
}

export default async function Dashbord() {
  const { user, authError } = await getUser();
  if (!user || authError) {
    redirect('/login');
  }

  const data = await fetchUserData(user.id);
  console.log('---------------------------');
  console.log(data);
  console.log('---------------------------');
  return (
    <>
      <Content>
        <p className="mb-6 text-center text-lg">
          <b>ようこそ、{data?.username ?? 'unknown user'}さん</b>
        </p>
        <SecondaryHeading>全体</SecondaryHeading>
        <RenderAllMenbersTasks className="mt-6" />
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
