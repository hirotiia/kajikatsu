'use server';

import { fetchUserNameById } from '@/lib/supabase/data/users/fetch-user-name-by-id';
import { createClient } from '@/lib/supabase/server';

/**
 * グループから脱退し、必要に応じてグループ自体を削除する。
 * また、オーナーがいなくなった場合はグループ内で最古のメンバーをオーナーに昇格させる。
 */
export const deleteGroup = async (
  state: any,
  formData: FormData,
): Promise<{
  type: 'success' | 'error' | 'info' | 'warning';
  status: number;
  message: string;
} | null> => {
  try {
    const userId = formData.get('user_id');
    const groupId = formData.get('group_id');
    const roleId = formData.get('role_id');

    if (
      typeof userId !== 'string' ||
      typeof groupId !== 'string' ||
      typeof roleId !== 'string'
    ) {
      return {
        type: 'error',
        status: 400,
        message: 'ユーザー情報の取得に失敗しました。',
      };
    }

    if (!userId || !groupId || !roleId) {
      return {
        type: 'error',
        status: 400,
        message: 'ユーザー情報の取得に失敗しました。',
      };
    }

    const supabase = await createClient();

    // まずはユーザーを該当グループから削除
    const { error: groupError } = await supabase
      .from('user_groups')
      .delete()
      .eq('group_id', groupId)
      .eq('user_id', userId);

    if (groupError) {
      return {
        type: 'error',
        status: 400,
        message: groupError.message,
      };
    }

    // グループ内の残りのメンバーを古参順に取得
    const { data: remainingMembers, error: membersError } = await supabase
      .from('user_groups')
      .select('user_id, role_id, joined_at')
      .eq('group_id', groupId)
      .order('joined_at', { ascending: true });

    if (membersError) {
      return {
        type: 'error',
        status: 400,
        message:
          'グループメンバーの取得に失敗しました: ' + membersError.message,
      };
    }

    // owner権限のロールIDを取得
    const { data: ownerRole, error: ownerRoleError } = await supabase
      .from('roles')
      .select('id')
      .eq('name', 'owner')
      .single();

    if (ownerRoleError) {
      return {
        type: 'error',
        status: 400,
        message: 'オーナー権限の取得に失敗しました: ' + ownerRoleError.message,
      };
    }

    // 残りのメンバーがいない場合、グループを削除
    if (remainingMembers.length === 0) {
      const { error: deleteGroupError } = await supabase
        .from('groups')
        .delete()
        .eq('id', groupId);

      if (deleteGroupError) {
        return {
          type: 'error',
          status: 400,
          message: 'グループの削除に失敗しました: ' + deleteGroupError.message,
        };
      }

      return {
        type: 'success',
        status: 200,
        message:
          'グループを脱退し、メンバーがいなくなったためグループを削除しました。',
      };
    }

    // 残りのメンバーの中にオーナーがいるか確認
    const hasOwner = remainingMembers.some(
      (member) => member.role_id === ownerRole.id,
    );

    if (hasOwner) {
      return {
        type: 'success',
        status: 200,
        message: 'グループを脱退しました。',
      };
    }

    // オーナーがいない場合、最も古いメンバーをオーナーに昇格
    const oldestMember = remainingMembers[0];

    const { error: updateRoleError } = await supabase
      .from('user_groups')
      .update({ role_id: ownerRole.id })
      .eq('group_id', groupId)
      .eq('user_id', oldestMember.user_id);

    if (updateRoleError) {
      return {
        type: 'error',
        status: 400,
        message:
          '新しいオーナーの設定に失敗しました: ' + updateRoleError.message,
      };
    }

    const oldUserName = await fetchUserNameById(oldestMember.user_id);
    const newOwnerName = oldUserName ? oldUserName : '別のメンバー';

    return {
      type: 'success',
      status: 200,
      message: `グループを脱退しました。${newOwnerName}さんが新しいオーナーになりました。`,
    };
  } catch (err: any) {
    return {
      type: 'error',
      status: 500,
      message: err?.message ?? '不明なエラーが発生しました。',
    };
  }
};
