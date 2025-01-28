import { Tab, TabSelectHeader, TabItem } from '@/components/ui/tab';
import { cn } from '@/utils/cn';

/**
 * ユーザーが入っているグループ内のタスクを担当者ごとに表示
 */
export const RenderAllMenbersTasks = async ({
  className,
}: {
  className?: string;
}) => {
  return (
    <Tab defaultKey="tab1" className={cn(className)}>
      <TabSelectHeader />
      <TabItem tabKey="tab1" label="tab1">
        <h2>Content for Tab 1</h2>
      </TabItem>
    </Tab>
  );
};
