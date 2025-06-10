import { Table, TableScroll } from '@/components/ui/table';
import { createTRPCContext } from '@/trpc/init';
import { createCaller } from '@/trpc/routers/_app';

import { ClientTodoTab } from './client-todo-tab';

type Row = {
  id: string;
  title: string;
  description: string;
  statusName: string;
  expiresAt: string;
};
export const TodoTab = async () => {
  const ctx = await createTRPCContext();
  const caller = createCaller(ctx);
  const myTasksAndGroupMembersData =
    await caller.myTasksAndGroupMembers.getMyTasksAndGroupMembers();
  const myTasks = myTasksAndGroupMembersData?.tasks ?? [];

  const headCols = [
    {
      id: 'title',
      label: 'タイトル',
    },
    { id: 'description', label: 'メモ' },
    { id: 'statusName', label: 'ステータス' },
    { id: 'expiresAt', label: '期限日' },
  ] as const;

  const rows = myTasks.map((task) => {
    return {
      id: task.id,
      title: task.title,
      description: task.description ?? '',
      statusName: task.status_name,
      expiresAt: task.expires_at ?? '',
    };
  });

  return (
    <>
      <ClientTodoTab
        initialTasks={myTasksAndGroupMembersData?.tasks ?? []}
        groupMembers={myTasksAndGroupMembersData?.groupMembers ?? []}
        statusList={myTasksAndGroupMembersData?.statusList ?? []}
      />
      <TableScroll>
        <Table<Row> rows={rows} headCols={headCols} />
      </TableScroll>
    </>
  );
};
