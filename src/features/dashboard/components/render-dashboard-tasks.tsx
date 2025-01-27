import { Tab, TabSelectHeader, TabItem } from '@/components/ui/tab';

export const RenderDashboardTasks = async () => {
  return (
    <Tab defaultKey="tab1">
      <TabSelectHeader />
      <TabItem key="tab1" tabKey="tab1" label="tab1">
        <h2>Content for Tab 1</h2>
      </TabItem>
      <TabItem key="tab2" tabKey="tab2" label="tab2">
        <h2>Content for Tab 2</h2>
      </TabItem>
    </Tab>
  );
};
