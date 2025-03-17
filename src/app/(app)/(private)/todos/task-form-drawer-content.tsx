import { redirect } from 'next/navigation';

import { DrawerTitle, DrawerBody, DrawerContent } from '@/components/ui/drawer';
import { FormCreateTask } from '@/features/todos/components/form/form-create-task';
import {
  GroupMember,
  fetchGroupMembers,
} from '@/lib/supabase/data/users/fetch-group-members';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';
import { getUser } from '@/lib/supabase/user/user';

export const TaskFormDrawerContent = async () => {
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
  );
};
