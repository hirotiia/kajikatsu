'use server';

import { createClient } from '@/lib/supabase/server';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';

/**
 * グループから脱退し、必要に応じてグループ自体を削除する。
 */
export const deleteGroup = async (): Promise<{
  type: 'success' | 'error' | 'info' | 'warning';
  status: number;
  message: string;
} | null> => {
  try {
    const supabase = await createClient();

    // ユーザーのグループ情報を取得
    const userState = await fetchUserData();

    // もしユーザーデータやグループが存在しなければ警告
    if (!userState || !userState.group) {
      return {
        type: 'warning',
        status: 400,
        message: '処理に必要なデータが取得できませんでした。',
      };
    }

    const groupId = userState.group.id;

    // まずはユーザーを該当グループから削除
    const { error: groupError } = await supabase
      .from('user_groups')
      .delete()
      .eq('group_id', groupId)
      .eq('user_id', userState.userId);

    if (groupError) {
      return {
        type: 'error',
        status: 400,
        message: groupError.message,
      };
    }

    // 正常に脱退完了
    return {
      type: 'success',
      status: 200,
      message: 'グループを脱退しました。',
    };
  } catch (err: any) {
    // 予期せぬエラー時の処理
    return {
      type: 'error',
      status: 500,
      message: err?.message ?? '不明なエラーが発生しました。',
    };
  }
};
