import { Suspense } from 'react';

import { Box } from '@/components/ui/box/box';
import { Heading } from '@/components/ui/heading';
import { List } from '@/components/ui/list/list';
import { Text } from '@/components/ui/text/text';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';

import { DashboardAllMembersTasks } from './dashboard-all-members-tasks';
import { DashboardRequestTasks } from './dashboard-request-tasks';

export const DashboardContent = async () => {
  const data = await fetchUserData();

  if (!data) {
    return;
  }

  return (
    <>
      <Text className="mb-6 text-lg">
        <b>ようこそ、{data.username ?? 'unknown user'}さん👏</b>
      </Text>

      {data.group ? (
        <>
          <Heading underline underlineSize="full">
            これお願い！
          </Heading>
          <Box bg="primary">
            <Suspense fallback={<p>読み込む中です...</p>}>
              <DashboardRequestTasks groupId={data.group.id} />
            </Suspense>
          </Box>
          <Heading underline underlineSize="full">
            グループメンバーごとのおしごと
          </Heading>
          <Suspense fallback={<p>読み込み中です...</p>}>
            <DashboardAllMembersTasks
              className="mt-6"
              groupId={data.group.id}
            />
          </Suspense>
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
                  text: 'グループに入ると、お仕事リストが見られるようになるよ！',
                },
              ]}
            />
          </Box>
        </>
      )}
    </>
  );
};
