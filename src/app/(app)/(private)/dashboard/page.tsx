import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box/box';
import { Heading } from '@/components/ui/heading';
import { List } from '@/components/ui/list';
import { Text } from '@/components/ui/text/text';
import { RenderAllMembersTasks } from '@/features/dashboard/components/render-all-members-tasks';
import { RenderRequestTasks } from '@/features/dashboard/components/render-request-tasks';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';
import { getUser } from '@/lib/supabase/user/user';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ホーム',
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
        <Heading as="h1">ホーム</Heading>
        <Text className="mb-6 text-lg">
          <b>ようこそ、{data?.username ?? 'unknown user'}さん👏</b>
        </Text>

        <Heading className="">ホームってなに？</Heading>
        <Text className="">
          「ホーム」とは、グループに入っている人が、どんなおしごとがあるのかを見たり、自分がやるべきおしごとをチェックできるページです。
        </Text>
        <Heading className="">どんなことができる？</Heading>
        <Heading as="h3">グループに入っている人</Heading>
        <Box>
          <List
            listItems={[
              {
                text: 'みんなのやることリストを見ることができるよ！',
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
                text: '「まだグループに入っていません」と出るよ。',
              },
              {
                text: 'グループに入ると、お仕事リストが見られるようになるよ！',
              },
            ]}
          />
        </Box>

        {data?.group?.id ? (
          <>
            <Heading>グループ内の未担当タスク一覧</Heading>
            <Text>まだ誰もやっていないおしごとのリストだよ！</Text>
            <Box bg="primary" className="mt-8 md:mt-4">
              <RenderRequestTasks groupId={data.group.id} />
            </Box>
            <Heading className="mt-8 md:mt-4">
              グループメンバーの担当タスク
            </Heading>
            <Text>みんなが担当しているおしごとを見ることができるよ！</Text>
            <RenderAllMembersTasks groupId={data.group.id} className="mt-6" />
          </>
        ) : (
          <>
            <Heading>ホームってなに？</Heading>
            <Text>
              「ホーム」とは、グループに入っている人が、どんなおしごとがあるのかを見たり、自分がやるべきおしごとをチェックできるページです。
            </Text>
            <Heading>どんなことができる？</Heading>
            <Heading as="h3">グループに入っている人</Heading>
            <List
              listItems={[
                {
                  text: 'みんなのやることリストを見ることができるよ！',
                },
                {
                  text: 'まだ誰もやっていないおしごとを見つけて、自分がやることもできるよ！',
                },
              ]}
            />
            <Heading as="h3">グループに入っていない人</Heading>
            <List
              listItems={[
                {
                  text: '「まだグループに入っていません」と出るよ。',
                },
                {
                  text: 'グループに入ると、お仕事リストが見られるようになるよ！',
                },
              ]}
            />
          </>
        )}
      </Content>
    </>
  );
}
