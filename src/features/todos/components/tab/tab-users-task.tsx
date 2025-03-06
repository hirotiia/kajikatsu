'use client';

import { ReactElement } from 'react';

import { Cards } from '@/components/ui/card';
import { Tab, TabHeader, TabItem, TabItemProps } from '@/components/ui/tab';
import { useMyTasks } from '@/features/todos/api/get-my-tasks';
import { Task } from '@/types/task.types';

import { FormDeleteTask } from '../form/form-delete-task';
import { FormUpdateTask } from '../form/update/form-update-task';

export const TabUsersTask = () => {
  const { myTasks, isLoading } = useMyTasks();
  const statusList = ['対応中', '未対応', '保留', '完了'];
  const tabData = statusList.map((status) => ({
    key: status,
    label: status,
  }));

  // ステータスごとにタスクを分類
  const tasksByStatus = statusList.reduce<Record<string, Task[]>>(
    (acc, status) => {
      acc[status] = myTasks?.filter((task) => task.statusName === status) || [];
      return acc;
    },
    {},
  );

  // タスクを TaskList に渡す形式に変換
  const formatTasksForCards = (tasks: Task[]) =>
    tasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      expiresAt: task.expiresAt,
      statusName: task.statusName,
    }));

  const renderActions = (item: {
    id: string;
    title: string;
    description?: string | null;
    expiresAt?: string | null;
    statusName?: string | null;
  }) => [
    <FormUpdateTask
      key="update"
      taskId={item.id}
      title={item.title}
      description={item.description || ''}
      expiresAt={item.expiresAt || ''}
      statusId={undefined}
    />,
    <FormDeleteTask key="delete" taskId={item.id} />,
  ];

  return (
    <Tab defaultKey="対応中" className="mt-8">
      <TabHeader ariaLabel="タスクナビゲーション" statusList={tabData} />
      {statusList.map(
        (status): ReactElement<TabItemProps> => (
          <TabItem key={status} tabKey={status} label={status}>
            {isLoading ? (
              <p>読み込み中です...</p>
            ) : tasksByStatus[status]?.length > 0 ? (
              <Cards
                items={formatTasksForCards(tasksByStatus[status]) ?? []}
                background="glassmorphism"
                renderActions={renderActions}
              />
            ) : (
              <p className="text-base">タスクはありません。</p>
            )}
          </TabItem>
        ),
      )}
    </Tab>
  );
};
