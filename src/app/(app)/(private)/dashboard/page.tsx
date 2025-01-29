import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box/box';
import { SecondaryHeading } from '@/components/ui/heading';
import { RenderAllMembersTasks } from '@/features/dashboard/components/render-all-members-tasks';
import { RenderRequestTasks } from '@/features/dashboard/components/render-request-tasks';
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

  return (
    <>
      <Content>
        <p className="mb-6 text-center text-lg">
          <b>ようこそ、{data?.username ?? 'unknown user'}さん</b>
        </p>

        {data?.group?.id && (
          <>
            <SecondaryHeading>グループメンバーの担当タスク</SecondaryHeading>
            <RenderAllMembersTasks groupId={data.group.id} className="mt-6" />
            <SecondaryHeading className="mt-4">
              グループ内の未担当タスク一覧
            </SecondaryHeading>
            <Box variant="secondary" className="mt-4">
              <RenderRequestTasks groupId={data.group.id} />
            </Box>
          </>
        )}
        <SecondaryHeading className="mt-4">
          最近のアクティビティ
        </SecondaryHeading>
      </Content>
    </>
  );
}
