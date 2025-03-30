import { DefinitionList } from '@/components/ui/list';
import { CreateGroup } from '@/features/group/components/create-group';
import { DleteGroup } from '@/features/group/components/delete-group';
import { InviteGroup } from '@/features/group/components/invite-group';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';

export const GroupDetails = async () => {
  const data = await fetchUserData();
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
