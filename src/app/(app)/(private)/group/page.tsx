import { Metadata } from 'next';
import { Suspense } from 'react';

import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { UserInfoSkeleton } from '@/components/ui/user';
import { config } from '@/config/config';
import {
  GroupInformation,
  GroupInformationSkeleton,
} from '@/features/group/components/group-information';
import { GroupMembers } from '@/features/group/components/group-members';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `グループ｜${config.APP_NAME}`,
  };
}

export default function GroupPage() {
  return (
    <Content>
      <Heading as="h1" className="mb-6 mt-4">
        グループ
      </Heading>
      <Text>このページでは、グループの作成や管理ができます。</Text>
      <Text spacing="none">複数のグループに同時に入ることはできません。</Text>
      <Box>
        <Suspense fallback={<GroupInformationSkeleton />}>
          <GroupInformation />
        </Suspense>
      </Box>
      <Heading>メンバー</Heading>
      <Box bg="primary" className="mt-5">
        <Suspense fallback={<UserInfoSkeleton size={35} />}>
          <GroupMembers />
        </Suspense>
      </Box>
    </Content>
  );
}
