import { Tab, TabSelectHeader, TabItem } from '@/components/ui/tab';
import { cn } from '@/utils/cn';

export const RenderDashboardTasks = async ({
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
