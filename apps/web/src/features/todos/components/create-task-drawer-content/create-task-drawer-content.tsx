import { DrawerBody, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { Text } from '@/components/ui/text';
import { FormCreateTask } from '@/features/todos/components/form/form-create-task';

import { fetchGroupMembersData } from '../../api/fetch-group-members-data';

export const CreateTaskDrawerContent = async () => {
  const { error, data, joinedGroup, groupMembers } =
    await fetchGroupMembersData();

  if (error || !data) {
    return <Text>ユーザー情報の取得に失敗しました。</Text>;
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
