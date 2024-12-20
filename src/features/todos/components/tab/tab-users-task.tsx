'use client';

import { Tab, TabHeader, TabItem } from '@/components/ui/tab';

/**
 * グループメンバーがいない場合
 * 自身のタスクを取得する
 * グループメンバーがいる場合
 * groupInfoからグループメンバーを取得する
 * taskResultからグループごとのタスク内容を取得する
 */

export const TabUsersTask = () => {
  return (
    <Tab defaultKey="test1">
      <TabHeader />
      <TabItem tabKey="test1" label="test1">
        <p className="text-base">test1</p>
      </TabItem>
      <TabItem tabKey="test2" label="test2">
        <p className="text-base">test2</p>
      </TabItem>
      <TabItem tabKey="test3" label="test3">
        <p className="text-base">test3</p>
      </TabItem>
    </Tab>
  );
};
