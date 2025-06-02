import { DrawerTitle, DrawerBody, DrawerContent } from '@/components/ui/drawer';
import { FormCreateTask } from '@/features/todos/components/form/form-create-task';

import { fetchGroupMembersData } from '../../api/fetch-group-members-data';

export const CreateTaskDrawerContent = async () => {
  const { error, data, joinedGroup, groupMembers } =
    await fetchGroupMembersData();

  if (error || !data) {
    return <p>ユーザー情報の取得に失敗しました。</p>;
  }

  return (
    <DrawerContent>
      <DrawerTitle>新しいおしごとを作成</DrawerTitle>
      <DrawerBody>
        <FormCreateTask
          groupMembers={groupMembers}
          userId={data.userId}
          hasGroup={joinedGroup}
        />
      </DrawerBody>
    </DrawerContent>
  );
};
