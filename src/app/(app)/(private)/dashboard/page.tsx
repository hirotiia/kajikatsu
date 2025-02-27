import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box/box';
import { Heading } from '@/components/ui/heading';
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

        {data?.group?.id ? (
          <>
            <Heading>グループ内の未担当タスク一覧</Heading>
            <Box bg="primary" className="mt-8 md:mt-4">
              <RenderRequestTasks groupId={data.group.id} />
            </Box>
            <Heading className="mt-8 md:mt-4">
              グループメンバーの担当タスク
            </Heading>
            <RenderAllMembersTasks groupId={data.group.id} className="mt-6" />
          </>
        ) : (
          <>
            <p>現在グループに加入していません。</p>
            <p>
              グループメンバーに加入することでグループ内のタスク一覧が表示されます。
            </p>
          </>
        )}
      </Content>
    </>
  );
}
