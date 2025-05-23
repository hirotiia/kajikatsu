import { SquarePen } from 'lucide-react';
import { Metadata } from 'next';

import { Content } from '@/components/layouts/content/content';
import { DrawerTrigger, Drawer } from '@/components/ui/drawer';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { config } from '@/config/config';
import { CreateTaskDrawerContent } from '@/features/todos/components/create-task-drawer-content/create-task-drawer-content';
import { SelectTabContentHasGroup } from '@/features/todos/components/tab/select-tab-content-has-group';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `おしごと｜${config.APP_NAME}`,
  };
}

export default function TodosPage() {
  return (
    <Content>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading as="h1" className="mb-0 first:mt-0 md:mb-0">
          おしごと
        </Heading>
        <Drawer name="create_task">
          <DrawerTrigger className="flex items-center justify-center gap-2 rounded-full text-sm md:text-base">
            <SquarePen className="shrink-0">おしごとを作成</SquarePen>
            新規作成
          </DrawerTrigger>
          <CreateTaskDrawerContent />
        </Drawer>
      </div>
      <Text>
        このページでは、自分が担当になっているおしごとをステータスごとに見ることができます。
      </Text>
      <SelectTabContentHasGroup />
    </Content>
  );
}
