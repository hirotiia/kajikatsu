import { Table, TableScroll, Td, Th } from '@/components/ui/table';
import { createTRPCContext } from '@/trpc/init';
import { createCaller } from '@/trpc/routers/_app';

import { ClientTodoTab } from './client-todo-tab';

// type Row = {
//   id: string;
//   title: string;
//   description: string;
//   statusName: string;
//   expiresAt: string;
// };
export const TodoTab = async () => {
  const ctx = await createTRPCContext();
  const caller = createCaller(ctx);
  const myTasksAndGroupMembersData =
    await caller.myTasksAndGroupMembers.getMyTasksAndGroupMembers();
  const myTasks = myTasksAndGroupMembersData?.tasks ?? [];

  console.log('-------------------');
  console.log(myTasks);
  console.log('-------------------');

  const headCols = [
    {
      id: 'title',
      label: 'タイトル',
    },
    { id: 'description', label: 'メモ' },
    { id: 'status_name', label: 'ステータス' },
    { id: 'expires_at', label: '期限日' },
  ] as const;

  return (
    <>
      <ClientTodoTab
        initialTasks={myTasksAndGroupMembersData?.tasks ?? []}
        groupMembers={myTasksAndGroupMembersData?.groupMembers ?? []}
        statusList={myTasksAndGroupMembersData?.statusList ?? []}
      />
      <TableScroll className="mt-3">
        <Table rounded>
          <thead>
            <tr>
              {headCols.map((col, i) => (
                <Th key={col.id} fixed={i === 0 ? 'left' : undefined}>
                  {col.label}
                </Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {myTasks.map((task) => (
              <tr key={task.id}>
                {headCols.map((col, id) => (
                  <Td key={col.id} fixed={id === 0 ? 'left' : undefined}>
                    {task[col.id]}
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </TableScroll>
    </>
  );
};
