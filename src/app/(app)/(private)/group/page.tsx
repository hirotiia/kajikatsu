import { redirect } from 'next/navigation';

import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { CreateGroup } from '@/features/group/components/create-group';
import { DleteGroup } from '@/features/group/components/delete-group';
import { InviteGroup } from '@/features/group/components/invite-group';
import { RenderGroupMembers } from '@/features/group/components/render-group-members';
import { createClient } from '@/lib/supabase/server';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';
import { UserState } from '@/types/user-state.types';

export default async function GroupPage() {
  const supabase = await createClient();
  const { data: userResult } = await supabase.auth.getUser();
  const user = userResult?.user;

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

  const groupName = userState.group?.name ?? null;
  const groupId = userState.group?.id ?? null;

  return (
    <Content>
      <Heading as="h1" className="mb-6 mt-4">
        グループ
      </Heading>

      <Box>
        <dl className="grid gap-4">
          <div>
            <dt className="mb-4 font-bold">グループ名</dt>
            <dd>{groupName ?? '未加入'}</dd>
          </div>
        </dl>
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

      <Heading className="mt-10">メンバー</Heading>
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
