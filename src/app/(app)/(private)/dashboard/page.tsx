import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box/box';
import { Heading } from '@/components/ui/heading';
import { List } from '@/components/ui/list/list';
import { Text } from '@/components/ui/text/text';
import {
  createRequestMembersTask,
  RequestMembersTasks,
} from '@/features/dashboard/api/create-request-members-task';
import { RenderAllMembersTasks } from '@/features/dashboard/components/render-all-members-tasks';
import { RenderRequestTasks } from '@/features/dashboard/components/render-request-tasks';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';
import { getUser } from '@/lib/supabase/user/user';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ホーム',
  };
}

export default async function Dashboard() {
  const { user, authError } = await getUser();
  if (!user || authError) {
    redirect('/login');
  }

  const data = await fetchUserData(user.id);
  const hasGroup = Boolean(data?.group?.id);

  let initialRequestTasks: RequestMembersTasks = { members: [] };
  if (hasGroup && data?.group?.id) {
    initialRequestTasks = await createRequestMembersTask(data.group.id);
  }

  return (
    <Content>
      <Heading as="h1">ホーム</Heading>
      <Text className="mb-6 text-lg">
        <b>ようこそ、{data?.username ?? 'unknown user'}さん👏</b>
      </Text>

      {hasGroup && data?.group?.id ? (
        <>
          <Heading>これお願い！</Heading>

          <Box bg="primary">
            <RenderRequestTasks
              groupId={data.group.id}
              initialData={initialRequestTasks}
            />
          </Box>

          <Heading>グループメンバーごとのタスク</Heading>

          <RenderAllMembersTasks groupId={data?.group?.id} className="mt-6" />
        </>
      ) : (
        <>
          <Heading>ホームってなに？</Heading>
          <Text>
            「ホーム」とは、グループに入っている人が、どんなおしごとがあるのかを
            見たり、自分がやるべきおしごとをチェックできるページです。
          </Text>

          <Heading>どんなことができる？</Heading>

          <Heading as="h3">グループに入っている人</Heading>
          <Box>
            <List
              listItems={[
                {
                  text: 'みんなのやることリストを見ることができます！',
                },
                {
                  text: 'まだ誰もやっていないおしごとを見つけて、自分がやることもできるよ！',
                },
              ]}
            />
          </Box>

          <Heading as="h3">グループに入っていない人</Heading>
          <Box>
            <List
              listItems={[
                {
                  text: '「まだグループに入っていません」と出ます。',
                },
                {
                  text: 'グループに入ると、お仕事リストが見られるようになるよ！',
                },
              ]}
            />
          </Box>
        </>
      )}
    </Content>
  );
}
