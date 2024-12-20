'use client';

import { Tab, TabHeader, TabItem } from '@/components/ui/tab';

import { useMyTasks } from '../../api/get-my-tasks';

/**
 * グループメンバーがいない場合
 * 自身のタスクを取得する
 * グループメンバーがいる場合
 * groupInfoからグループメンバーを取得する
 * taskResultからグループごとのタスク内容を取得する
 */

export const TabUsersTask = () => {
  const { myTasks, isLoading, error } = useMyTasks();
  console.log(myTasks);

  return isLoading ? (
    <p>読み込み中です...</p>
  ) : error ? (
    <p>{error}</p>
  ) : (
    <Tab defaultKey="test1" className="mt-8">
      <TabHeader ariaLabel="タスクナビゲーション" />
      <TabItem tabKey="test1" label="対応中">
        <p className="text-base">対応中</p>
      </TabItem>
      <TabItem tabKey="test2" label="未対応">
        <p className="text-base">未対応</p>
      </TabItem>
      <TabItem tabKey="test3" label="保留">
        <p className="text-base">保留</p>
      </TabItem>
      <TabItem tabKey="test4" label="完了">
        <p className="text-base">完了</p>
      </TabItem>
    </Tab>
  );
};
