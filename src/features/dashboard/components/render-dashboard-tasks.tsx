import { Tab, TabSelectHeader, TabItem } from '@/components/ui/tab';

export const RenderDashboardTasks = async () => {
  return (
    <Tab defaultKey="tab1">
      <TabSelectHeader />
      <TabItem tabKey="tab1" label="tab1">
        <h2>Content for Tab 1</h2>
      </TabItem>
    </Tab>
  );
};
