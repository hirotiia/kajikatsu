import { SquarePen } from 'lucide-react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Content } from '@/components/layouts/content/content';
import {
  DrawerTrigger,
  DrawerTitle,
  DrawerBody,
  Drawer,
  DrawerContent,
} from '@/components/ui/drawer';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { config } from '@/config/config';
import { FormCreateTask } from '@/features/todos/components/form/form-create-task';
import { UserTab } from '@/features/todos/components/tab/user-tab';
import {
  GroupMember,
  fetchGroupMembers,
} from '@/lib/supabase/data/users/fetch-group-members';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';
import { getUser } from '@/lib/supabase/user/user';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `おしごと｜${config.APP_NAME}`,
  };
}

export default async function TodosPage() {
  const { user, authError } = await getUser();

  if (authError || !user) {
    redirect('/login');
  }

  let joinedGroup = false;
  let groupMembers: GroupMember[] = [];

  const data = await fetchUserData(user.id);

  if (!data) {
    return <p>ユーザー情報の取得に失敗しました。</p>;
  }

  if (data.group?.id) {
    joinedGroup = true;
    const { data: membersData } = await fetchGroupMembers(data.group.id);
    groupMembers = membersData?.group_members || [];
  }

  return (
    <Content>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading as="h1" className="mb-0 first:mt-0 md:mb-0">
          おしごと
        </Heading>
        <Drawer name="create_task">
          <DrawerTrigger className="flex items-center justify-center gap-2 rounded-full text-sm md:text-base">
            <SquarePen className="shrink-0">おしごとを作成</SquarePen>
            新規作成
          </DrawerTrigger>
          <DrawerContent>
            <DrawerTitle>新しいおしごとを作成</DrawerTitle>
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
      <Text>
        このページでは、自分が担当になっているおしごとをステータスごとに見ることができます。
      </Text>
      <UserTab userId={user.id} />
    </Content>
  );
}
