import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { DefinitionList } from '@/components/ui/list';
import { Text } from '@/components/ui/text';
import { CreateGroup } from '@/features/group/components/create-group';
import { DleteGroup } from '@/features/group/components/delete-group';
import { InviteGroup } from '@/features/group/components/invite-group';
import { RenderGroupMembers } from '@/features/group/components/render-group-members';
import { checkPendingJoinRequest } from '@/lib/supabase/data/join-requests/select/check-pending-join-request';
import { createClient } from '@/lib/supabase/server';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';
import { UserState } from '@/types/user-state.types';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'グループ',
  };
}

export default async function GroupPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  if (!user) {
    redirect('/login');
  }

  const userState: UserState | null = await fetchUserData(user.id);

  if (!userState) {
    return (
      <Content>
        <h2>ユーザー情報を取得できませんでした。</h2>
      </Content>
    );
  }

  const hasPendingRequest = await checkPendingJoinRequest(user.id);

  if (hasPendingRequest) {
    return (
      <Content>
        <h2>リクエスト申請中です。</h2>
      </Content>
    );
  }

  const groupName = userState.group?.name ?? null;
  const groupId = userState.group?.id ?? null;

  return (
    <Content>
      <Heading as="h1" className="mb-6 mt-4">
        グループ
      </Heading>
      <Text>このページでは、グループの作成や管理ができます。</Text>
      <Text spacing="none">複数のグループに同時に入ることはできません。</Text>

      <Box>
        <DefinitionList
          items={[
            {
              term: 'グループ名',
              definitions: [groupName ?? '未加入'],
            },
          ]}
        />
        <div className="text-right">
          {groupName ? (
            <>
              <InviteGroup />
              <DleteGroup />
            </>
          ) : (
            <CreateGroup />
          )}
        </div>
      </Box>

      <Heading>メンバー</Heading>
      <Box bg="primary" className="mt-5">
        {groupId ? (
          <RenderGroupMembers groupId={groupId} />
        ) : (
          <p>メンバーはいません。</p>
        )}
      </Box>
    </Content>
  );
}
