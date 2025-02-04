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

    // 現在ログインしているユーザー情報を取得
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    // ログイン情報が無い場合の処理
    if (userError || !user) {
      return {
        type: 'warning',
        status: 401,
        message: 'ログインユーザーが取得できませんでした。',
      };
    }

    // ユーザーのグループ情報を取得
    const userState = await fetchUserData(user.id);

    // もしユーザーデータやグループが存在しなければ警告
    if (!userState || !userState.group) {
      return {
        type: 'warning',
        status: 400,
        message: '処理に必要なデータが取得できませんでした。',
      };
    }

    const groupId = userState.group.id;
    const isOwner = userState.group.role.name === 'admin';

    // まずはユーザーを該当グループから削除
    const { error: groupError } = await supabase
      .from('user_groups')
      .delete()
      .eq('group_id', groupId)
      .eq('user_id', user.id);

    if (groupError) {
      return {
        type: 'error',
        // Supabase エラーコードが数値でない場合もあるので、Number(...) で変換できなければ 400
        status: 400,
        message: groupError.message,
      };
    }

    // ユーザーが管理者（オーナー）だった場合、他にオーナーが残っていないかを確認
    if (isOwner) {
      // 「同じロールID（admin ロール）」を持つユーザーが何人残っているかチェック
      const { count, error: countError } = await supabase
        .from('user_groups')
        .select('*', { count: 'exact', head: true })
        .eq('group_id', groupId)
        .eq('role_id', userState.group.role.id);

      if (countError) {
        return {
          type: 'error',
          status: 400,
          message: countError.message,
        };
      }

      // 管理者が0人になっていればグループ自体を削除
      if (count === 0) {
        const { error: groupDeleteError } = await supabase
          .from('groups')
          .delete()
          .eq('id', groupId);

        if (groupDeleteError) {
          return {
            type: 'error',
            status: 400,
            message: groupDeleteError.message,
          };
        }
      }
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
