'use client';

import { ReactElement } from 'react';

import { Tab, TabHeader, TabItem, TabItemProps } from '@/components/ui/tab';

import { MyTasks, useMyTasks } from '../../api/get-my-tasks';

export const TabUsersTask = () => {
  const { myTasks, isLoading, error } = useMyTasks();
  const statusList = ['対応中', '未対応', '保留', '完了'];

  // ステータスごとにタスクを分類
  const tasksByStatus = statusList.reduce<Record<string, MyTasks[]>>(
    (acc, status) => {
      acc[status] = myTasks?.filter((task) => task.statusName === status) || [];
      return acc;
    },
    {},
  );

  const renderTabItems = (
    statusList: string[],
    tasksByStatus: Record<string, MyTasks[]>,
  ): ReactElement<TabItemProps>[] =>
    statusList.map(
      (status): ReactElement<TabItemProps> => (
        <TabItem key={status} tabKey={status} label={status}>
          {tasksByStatus[status]?.length > 0 ? (
            <ul>
              {tasksByStatus[status].map((task) => (
                <li key={task.id} className="text-base">
                  {task.title}
                </li>
              ))}
            </ul>
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
