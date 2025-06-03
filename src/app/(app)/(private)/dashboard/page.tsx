import { Metadata } from 'next';
import { Suspense } from 'react';

import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box';
import { CardsSkeleton } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { TabSkeleton } from '@/components/ui/tab';
import { Text } from '@/components/ui/text';
import { config } from '@/config/config';
import { AllMembersTasks } from '@/features/dashboard/components/all-members-tasks/all-members-tasks';
import { UnAssignedTasks } from '@/features/dashboard/components/un-assigned-tasks';
import {
  UserGreeting,
  UserGreetingSkelton,
} from '@/features/dashboard/components/user-greeting/index';
import { HydrateClient, trpc } from '@/trpc/server';

import { ClientGreeting } from './client-greeting';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `ホーム｜${config.APP_NAME}`,
  };
}

export default async function Dashboard() {
  void trpc.hello.prefetch({ text: 'tRPC' });

  return (
    <HydrateClient>
      <ClientGreeting />
      <Content>
        <Heading as="h1">ホーム</Heading>
        <Suspense fallback={<UserGreetingSkelton />}>
          <UserGreeting />
        </Suspense>
        <Heading underline underlineSize="full">
          これお願い！
        </Heading>
        <Text>グループ内の未担当のおしごと一覧です。</Text>
        <Box className="bg-transparent">
          <Suspense fallback={<CardsSkeleton count={1} />}>
            <UnAssignedTasks />
          </Suspense>
        </Box>
        <Heading underline underlineSize="full">
          グループメンバーごとのおしごと
        </Heading>
        <Suspense
          fallback={
            <TabSkeleton tabCount={4} panelHeight={300}>
              <CardsSkeleton count={2} />
            </TabSkeleton>
          }
        >
          <AllMembersTasks />
        </Suspense>
      </Content>
    </HydrateClient>
  );
}
