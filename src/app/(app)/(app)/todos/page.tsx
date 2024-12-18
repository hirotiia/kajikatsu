import { X } from 'lucide-react';

import { Content } from '@/components/layouts/content/content';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerCloseTrigger,
  DrawerTitle,
  DrawerBody,
} from '@/components/ui/drawer';
import { Heading } from '@/components/ui/heading';
import { FormCreateTask } from '@/features/todos/components/form/form-create-task';
import { TabUsersTask } from '@/features/todos/components/tab/tab-users-task';
import { getTasks } from '@/lib/supabase/data/tasks/get-tasks';
import { getGroupData } from '@/lib/supabase/data/users/get-group-data';
import { getUser } from '@/lib/supabase/user/user';

export default async function TodosPage() {
  const { user, authError } = await getUser();

  if (authError || !user) {
    return (
      <Content bg="secondary">
        <Heading as="h1">認証エラー</Heading>
        <p>ユーザー情報を取得できませんでした。</p>
      </Content>
    );
  }

  const groupInfo = await getGroupData(user.id);
  const groupTasks = await getTasks();
  console.log(groupTasks);
  return (
    <>
      <TabUsersTask />
      <Content bg="secondary">
        <Heading as="h1">やることリスト</Heading>

        <Drawer name="create_task">
          <DrawerTrigger className="flex h-10 w-12 items-center justify-center">
            タスクを作成する
          </DrawerTrigger>
          <DrawerContent className="px-4 pt-10">
            <DrawerCloseTrigger className="text-right">
              <X size="20">close</X>
            </DrawerCloseTrigger>
            <DrawerTitle className="mt-10">新しいタスクを作成</DrawerTitle>
            <DrawerBody>
              <FormCreateTask groupInfo={groupInfo} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Content>
    </>
  );
}
