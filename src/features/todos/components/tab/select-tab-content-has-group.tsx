import { GroupUserTab } from '@/features/todos/components/tab/group-user-tab';
import { UserTab } from '@/features/todos/components/tab/user-tab';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';

export const SelectTabContentHasGroup = async () => {
  const data = await fetchUserData();

  if (!data) {
    return <p>ユーザー情報を取得できませんでした。</p>;
  }

  const hasGroup: boolean = !!data?.group;

  return hasGroup ? (
    <GroupUserTab userId={data.userId} groupId={data.group?.id ?? ''} />
  ) : (
    <UserTab userId={data.userId} />
  );
};
