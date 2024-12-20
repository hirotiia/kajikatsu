import { SquarePen, X } from 'lucide-react';

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

  const { data: groupData, error: groupDataError } = await getGroupData();

  return (
    <>
      <Content>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Heading as="h1">やることリスト</Heading>
          <Drawer name="create_task">
            <DrawerTrigger className="flex items-center justify-center gap-2 rounded-full">
              <SquarePen className="shrink-0">タスクを作成</SquarePen>
              新規作成
            </DrawerTrigger>
            <DrawerContent className="px-4 pt-10">
              <DrawerCloseTrigger className="text-right">
                <X size="20">close</X>
              </DrawerCloseTrigger>
              <DrawerTitle className="mt-10">新しいタスクを作成</DrawerTitle>
              <DrawerBody>
                {groupDataError ? (
                  <p>
                    <strong>{groupDataError}</strong>
                  </p>
                ) : (
                  groupData && <FormCreateTask groupInfo={groupData} />
                )}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </div>

        <TabUsersTask />
      </Content>
    </>
  );
}
