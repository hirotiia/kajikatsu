'use client';
import { use } from 'react';

import { DrawerBody, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { FormCreateTask } from '@/features/todos/components/form/form-create-task';

import { fetchGroupMembersData } from '../../api/fetch-group-members-data';

const CreateTaskDrawerContent = () => {
  const { error, data, joinedGroup, groupMembers } = use(
    fetchGroupMembersData(),
  );

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

export default CreateTaskDrawerContent;
