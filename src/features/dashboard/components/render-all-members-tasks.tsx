import { Tab, TabSelectHeader, TabItem } from '@/components/ui/tab';
import { cn } from '@/utils/cn';

import { createGroupMenbersTask } from '../api/create-group-menbers-task';

/**
 * ユーザーが入っているグループ内のタスクを担当者ごとに表示
 */
export const RenderAllMenbersTasks = async ({
  groupId,
  className,
}: {
  groupId: string;
  className?: string;
}) => {
  createGroupMenbersTask(groupId);
  return (
    <Tab defaultKey="tab1" className={cn(className)}>
      <TabSelectHeader />
      <TabItem tabKey="tab1" label="tab1">
        <h2>Content for Tab 1</h2>
      </TabItem>
    </Tab>
  );
};
