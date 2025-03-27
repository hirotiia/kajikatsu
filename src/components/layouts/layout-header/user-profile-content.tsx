import { DefinitionList } from '@/components/ui/list';
import { createClient } from '@/lib/supabase/server';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';

export const UserProfileContent = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p>ユーザー情報はありません</p>;
  }

  const data = await fetchUserData(user.id);

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
