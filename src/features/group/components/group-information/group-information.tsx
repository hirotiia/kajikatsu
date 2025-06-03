import { DefinitionList } from '@/components/ui/list';
import { CreateGroup } from '@/features/group/components/create-group';
import { DleteGroup } from '@/features/group/components/delete-group';
import { InviteGroup } from '@/features/group/components/invite-group';
import { fetchUserProfileRpc } from '@/lib/supabase/user/fetch-user-profile-rpc';

export const GroupInformation = async () => {
  const data = await fetchUserProfileRpc();

  if (!data) {
    throw new Error('ユーザー情報の取得に失敗しました。');
  }

  return (
    <>
      <DefinitionList
        items={[
          {
            term: 'グループ名',
            definitions: [data.group?.name ?? '未加入'],
          },
        ]}
      />
      <div className="mt-6 flex gap-3">
        {data.group ? (
          <>
            <InviteGroup userId={data.userId} groupId={data.group.id} />
            <DleteGroup
              userId={data.userId}
              groupId={data.group.id}
              roleId={data.group.role.id}
            />
          </>
        ) : (
          <>
            <CreateGroup userId={data.userId} />
          </>
        )}
      </div>
    </>
  );
};
