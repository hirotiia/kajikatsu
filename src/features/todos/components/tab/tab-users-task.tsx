'use client';

import { Tab, TabItem } from '@/components/ui/tab';

export const TabUsersTask = () => {
  return (
    <Tab defaultKey="test1">
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
