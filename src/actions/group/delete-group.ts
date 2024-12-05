'use server';
// TODO:グループを削除するAPI
import { getGroup } from '@/lib/supabase/group/group';
import { createClient } from '@/lib/supabase/server';

export const deleteGroup = async (): Promise<any | null> => {
  const supabase = await createClient();
  const { group, error, user } = await getGroup();
  const ownerRoleId = process.env.GROUP_ROLE_ID_OWNER!;

  if (error) {
    return {
      type: 'error',
      status: error.code,
      message: error.message,
    };
  }

  if (!group || !user) {
    return {
      type: 'warning',
      status: '警告',
      message: '処理に必要なデータが取得できませんでした。',
    };
  }

  const groupId = group[0].group_id;

  // 脱退しようとしているユーザーのrole_idを取得
  const { data: roleData } = await supabase
    .from('user_groups')
    .select('role_id')
    .eq('group_id', groupId)
    .eq('user_id', user.id);

  if (!roleData) {
    return {
      type: 'warning',
      status: '警告',
      message: '権限が取得できませんでした。',
    };
  }

  const isOwner = roleData[0].role_id === ownerRoleId;

  const { error: groupError } = await supabase
    .from('user_groups')
    .delete()
    .eq('group_id', groupId)
    .eq('user_id', user.id);

  if (groupError) {
    return {
      type: 'error',
      status: groupError.code,
      message: groupError.message,
    };
  }

  const { count, error: countError } = await supabase
    .from('user_groups')
    .select('*', { count: 'exact', head: true })
    .eq('group_id', groupId)
    .eq('role_id', ownerRoleId);

  if (countError) {
    return {
      type: 'error',
      status: countError.code,
      message: countError.message,
    };
  }

  if (count === 0 && isOwner) {
    const { error: groupDeleteError } = await supabase
      .from('groups')
      .delete()
      .eq('id', groupId);

    if (groupDeleteError) {
      return {
        type: 'error',
        status: groupDeleteError.code,
        message: groupDeleteError.message,
      };
    }

    return {
      type: 'success',
      status: 200,
      message: 'グループを脱退しました。',
    };
  }

  return {
    type: 'success',
    status: 200,
    message: 'グループを脱退しました。',
  };
};
