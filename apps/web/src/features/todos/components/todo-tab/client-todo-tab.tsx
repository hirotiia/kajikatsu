'use client';

import { ReactElement, useState } from 'react';

import { Cards } from '@/components/ui/card';
import { Tab, TabHeader, TabPanel, TabPanelProps } from '@/components/ui/tab';
import { FunctionReturn } from '@/types/supabase/database.types';
import { cn } from '@/utils/cn';

type MyTasksAndGroupMembers = FunctionReturn<'get_my_tasks_and_group_members'>;
type MyTasks = MyTasksAndGroupMembers['tasks'];
type GroupMembers = NonNullable<MyTasksAndGroupMembers['groupMembers']>;
type StatusList = NonNullable<MyTasksAndGroupMembers['statusList']>;

type ClientTodoTabProps = {
  initialTasks: MyTasks;
  groupMembers: GroupMembers;
  statusList: StatusList;
  className?: string;
};

export const ClientTodoTab = ({
  initialTasks,
  groupMembers,
  statusList,
  className,
}: ClientTodoTabProps) => {
  const [tasks, setTasks] = useState<MyTasks>(initialTasks);

  const sortedTasksByStatus = statusList.reduce<Record<string, MyTasks>>(
    (acc, status) => {
      acc[status.id] = tasks.filter((t) => t.status_id === status.id);
      return acc;
    },
    {},
  );

  console.log(groupMembers, setTasks);

  return (
    <Tab defaultKey={statusList[0]?.id} className={cn('mt-3', className)}>
      <TabHeader
        ariaLabel="あなたのおしごと一覧"
        tabs={statusList.map(({ id, name }) => ({
          key: id,
          label: `${name}(${sortedTasksByStatus[id]?.length ?? 0})`,
        }))}
      />
      {statusList.map(({ id, name }): ReactElement<TabPanelProps> => {
        const tasksInThisStatus = sortedTasksByStatus[id] ?? [];
        return (
          <TabPanel key={id} tabKey={id} label={name}>
            {tasksInThisStatus.length > 0 ? (
              <Cards
                items={tasksInThisStatus.map((task) => ({
                  id: task.id,
                  title: task.title,
                  description: task.description,
                  statusId: task.status_id ?? undefined,
                  statusName: task.status_name ?? null,
                  expiresAt: task.expires_at ?? null,
                }))}
                align="end"
              />
            ) : (
              <p className="text-base">タスクはありません。</p>
            )}
          </TabPanel>
        );
      })}
    </Tab>
  );
};
