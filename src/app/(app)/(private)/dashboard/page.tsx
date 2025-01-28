import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box/box';
import { SecondaryHeading } from '@/components/ui/heading';
import { RenderAllMenbersTasks } from '@/features/dashboard/components/render-all-members-tasks';
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
            <SecondaryHeading>全体</SecondaryHeading>
            <RenderAllMenbersTasks groupId={data.group.id} className="mt-6" />
            <SecondaryHeading className="mt-4">これお願い!</SecondaryHeading>
            <Box variant="secondary" className="mt-4">
              <RenderRequestTasks />
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
