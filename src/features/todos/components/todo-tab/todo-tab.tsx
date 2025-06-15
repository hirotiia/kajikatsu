import { createTRPCContext } from '@/trpc/init';
import { createCaller } from '@/trpc/routers/_app';

import { ClientTodoTable } from '../create-todo-table';

import { ClientTodoTab } from './client-todo-tab';

type HeadColId = (typeof HEAD_COLS)[number]['id'];

const HEAD_COLS = [
  {
    id: 'title',
    label: 'タイトル',
  },
  { id: 'description', label: 'メモ' },
  { id: 'status_name', label: 'ステータス' },
  { id: 'expires_at', label: '期限日' },
] as const;

export const TodoTab = async () => {
  const ctx = await createTRPCContext();
  const caller = createCaller(ctx);
  const myTasksAndGroupMembersData =
    await caller.myTasksAndGroupMembers.getMyTasksAndGroupMembers();
  const myTasks = myTasksAndGroupMembersData?.tasks ?? [];

  return (
    <>
      <ClientTodoTab
        initialTasks={myTasksAndGroupMembersData?.tasks ?? []}
        groupMembers={myTasksAndGroupMembersData?.groupMembers ?? []}
        statusList={myTasksAndGroupMembersData?.statusList ?? []}
      />
      <ClientTodoTable<HeadColId> cols={HEAD_COLS} initialData={myTasks} />
    </>
  );
};
