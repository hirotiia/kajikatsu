'use client';

import { ReactElement } from 'react';

import { Tab, TabHeader, TabItem, TabItemProps } from '@/components/ui/tab';
import { useMyTasks } from '@/features/todos/api/get-my-tasks';
import { Tasks } from '@/features/todos/components/tasks/tasks';
import { Task } from '@/types/task.types';

export const TabUsersTask = () => {
  const { myTasks, isLoading, error } = useMyTasks();
  const statusList = ['対応中', '未対応', '保留', '完了'];

  // ステータスごとにタスクを分類
  const tasksByStatus = statusList.reduce<Record<string, Task[]>>(
    (acc, status) => {
      acc[status] = myTasks?.filter((task) => task.statusName === status) || [];
      return acc;
    },
    {},
  );

  // タスクを TaskList に渡す形式に変換
  const formatTasksForList = (tasks: Task[]) =>
    tasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description ?? undefined,
      expiresAt: task.expiresAt ?? undefined,
      statusId: task.statusId ?? undefined,
    }));

  const renderTabItems = (
    statusList: string[],
    tasksByStatus: Record<string, Task[]>,
  ): ReactElement<TabItemProps>[] =>
    statusList.map(
      (status): ReactElement<TabItemProps> => (
        <TabItem key={status} tabKey={status} label={status}>
          {tasksByStatus[status]?.length > 0 ? (
            <Tasks listItems={formatTasksForList(tasksByStatus[status])} />
          ) : (
            <p className="text-base">タスクはありません。</p>
          )}
        </TabItem>
      ),
    );

  return isLoading ? (
    <p>読み込み中です...</p>
  ) : error ? (
    <p>{error}</p>
  ) : myTasks ? (
    <Tab defaultKey="対応中" className="mt-8">
      <TabHeader ariaLabel="タスクナビゲーション" />
      {renderTabItems(statusList, tasksByStatus)}
    </Tab>
  ) : (
    <p>タスクを取得できませんでした。</p>
  );
};
