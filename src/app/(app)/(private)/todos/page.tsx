import { SquarePen } from 'lucide-react';

import { Content } from '@/components/layouts/content/content';
import {
  DrawerTrigger,
  DrawerTitle,
  DrawerBody,
  Drawer,
  DrawerContent,
} from '@/components/ui/drawer';
import { Heading } from '@/components/ui/heading';
import { FormCreateTask } from '@/features/todos/components/form/form-create-task';
import { TabUsersTask } from '@/features/todos/components/tab/tab-users-task';
import {
  GroupMember,
  fetchGroupMembers,
} from '@/lib/supabase/data/users/fetch-group-members';
import { getUserData } from '@/lib/supabase/data/users/get-user-data';
import { getUser } from '@/lib/supabase/user/user';

export default async function TodosPage() {
  const { user, authError } = await getUser();
  let joinedGroup = false;
  let groupMembers: GroupMember[] = [];

  if (authError || !user) {
    return (
      <Content>
        <Heading as="h1">認証エラー</Heading>
        <p>ユーザー情報を取得できませんでした。</p>
      </Content>
    );
  }

  const data = await getUserData(user.id);

  if (!data) {
    return <p>ユーザー情報の取得に失敗しました。</p>;
  }

  const { groupId } = data;

  if (groupId) {
    joinedGroup = true;
    const { data: membersData } = await fetchGroupMembers(groupId);
    groupMembers = membersData?.group_members || [];
  }

  return (
    <>
      <Content>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Heading as="h1">やることリスト</Heading>
          <Drawer name="create_task">
            <DrawerTrigger className="flex items-center justify-center gap-2 rounded-full text-sm md:text-base">
              <SquarePen className="shrink-0">タスクを作成</SquarePen>
              新規作成
            </DrawerTrigger>
            <DrawerContent>
              <DrawerTitle>新しいタスクを作成</DrawerTitle>
              <DrawerBody>
                <FormCreateTask
                  groupMembers={groupMembers}
                  userId={user.id}
                  hasGroup={joinedGroup}
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </div>

        <TabUsersTask />
      </Content>
    </>
  );
}
