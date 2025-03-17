import { DefinitionList } from '@/components/ui/list';
import { CreateGroup } from '@/features/group/components/create-group';
import { DleteGroup } from '@/features/group/components/delete-group';
import { InviteGroup } from '@/features/group/components/invite-group';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';
import { getUser } from '@/lib/supabase/user/user';
import { UserState } from '@/types/user-state.types';

export const GroupDetails = async () => {
  const { user } = await getUser();

  if (!user) {
    return <p>ユーザー情報が取得できませんでした。</p>;
  }
  const userState: UserState | null = await fetchUserData(user.id);

  if (!userState) {
    return <h2>ユーザー情報を取得できませんでした。</h2>;
  }

  const groupName = userState.group?.name ?? null;
  return (
    <>
      <DefinitionList
        items={[
          {
            term: 'グループ名',
            definitions: [groupName ?? '未加入'],
          },
        ]}
      />
      <div className="flex gap-3">
        {groupName ? (
          <>
            <InviteGroup />
            <DleteGroup />
          </>
        ) : (
          <CreateGroup />
        )}
      </div>
    </>
  );
};
