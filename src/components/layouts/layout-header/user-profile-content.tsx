import { DefinitionList } from '@/components/ui/list';
import { fetchUserProfileRpc } from '@/lib/supabase/user/fetch-user-profile-rpc';

export const UserProfileContent = async () => {
  const data = await fetchUserProfileRpc();

  if (!data) {
    return <p>ユーザー情報はありません</p>;
  }

  return (
    <>
      <p className="mb-6 border-b-2 pb-2">
        <b>ユーザー情報</b>
      </p>
      <DefinitionList
        className="pl-1 md:pl-3"
        items={[
          {
            term: 'グループ名',
            definitions: [data?.group?.name ?? '未加入'],
          },
          {
            term: 'ステータス',
            definitions: [data?.group?.role.name ?? 'なし'],
          },
        ]}
      />
    </>
  );
};
