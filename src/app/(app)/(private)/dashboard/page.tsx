import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box/box';
import { Heading } from '@/components/ui/heading';
import { List } from '@/components/ui/list/list';
import { Text } from '@/components/ui/text/text';
import { RenderAllMembersTasks } from '@/features/dashboard/components/render-all-members-tasks';
import { RenderRequestTasks } from '@/features/dashboard/components/render-request-tasks';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';
import { getUser } from '@/lib/supabase/user/user';

/** ページメタデータ（タイトルなど） */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ホーム',
  };
}

export default async function Dashboard() {
  // ユーザー情報を取得
  const { user, authError } = await getUser();
  if (!user || authError) {
    redirect('/login');
  }

  // ユーザーの詳細データを取得
  const data = await fetchUserData(user.id);

  // グループID が存在するかどうかで表示を分ける
  const hasGroup = Boolean(data?.group?.id);

  return (
    <Content>
      <Heading as="h1">ホーム</Heading>
      <Text className="mb-6 text-lg">
        <b>ようこそ、{data?.username ?? 'unknown user'}さん👏</b>
      </Text>

      {hasGroup ? (
        <GroupTasksSection groupId={data?.group?.id} />
      ) : (
        <NoGroupSection />
      )}
    </Content>
  );
}

/**
 * グループ参加時に表示するセクション
 */
function GroupTasksSection({ groupId }: { groupId: string | undefined }) {
  if (!groupId) {
    return;
  }
  return (
    <>
      <Heading>グループ内の未担当タスク一覧</Heading>
      <Text>
        グループ内でお願いされているタスクです！
        <br />
        余裕があれば代わりにお仕事を手伝ってあげよう！
      </Text>

      <Box bg="primary" className="mt-8 md:mt-4">
        <RenderRequestTasks groupId={groupId} />
      </Box>

      <Heading>グループメンバーの担当タスク</Heading>
      <Text>みんなが担当しているおしごとを見ることができます！</Text>

      <RenderAllMembersTasks groupId={groupId} className="mt-6" />
    </>
  );
}

/**
 * グループ未加入時に表示するセクション
 */
function NoGroupSection() {
  return (
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
  );
}
