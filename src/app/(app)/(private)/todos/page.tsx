import { SquarePen } from 'lucide-react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { Content } from '@/components/layouts/content/content';
import { CardsSkeleton } from '@/components/ui/card';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { Heading } from '@/components/ui/heading';
import { TabSkeleton } from '@/components/ui/tab';
import { Text } from '@/components/ui/text';
import { config } from '@/config/config';
import { SelectTabContentHasGroup } from '@/features/todos/components/tab/select-tab-content-has-group';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `おしごと｜${config.APP_NAME}`,
  };
}

export default function TodosPage() {
  const LazyCreateTaskDrawerContent = dynamic(
    () =>
      import(
        '@/features/todos/components/create-task-drawer-content/create-task-drawer-content'
      ),
  );
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
          <Suspense fallback={<Text>読み込み中です...</Text>}>
            <LazyCreateTaskDrawerContent />
          </Suspense>
        </Drawer>
      </div>
      <Text>
        このページでは、自分が担当になっているおしごとをステータスごとに見ることができます。
      </Text>
      <Suspense
        fallback={
          <TabSkeleton tabCount={4} panelHeight={326}>
            <CardsSkeleton count={2} />
          </TabSkeleton>
        }
      >
        <SelectTabContentHasGroup />
      </Suspense>
    </Content>
  );
}
