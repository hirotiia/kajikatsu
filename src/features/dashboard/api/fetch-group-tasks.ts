import { fetchGroupMembers } from '@/lib/supabase/data/users/fetch-group-members';
import { getGroup } from '@/lib/supabase/group/get-group';

export const fetchGroupTasks = async () => {
  const { group, error } = await getGroup();

  if (!group || error) {
    throw new Error('グループに所属していません。');
  }

  const { data: groupMenbersData, error: groupMenbersError } =
    await fetchGroupMembers(group[0].group_id);

  if (!groupMenbersData || groupMenbersError) {
    throw new Error('グループ情報が取得できませんでした。');
  }

  console.log(groupMenbersData);
};
