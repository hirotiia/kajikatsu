'use server';

import { createClient } from '@/lib/supabase/server';

/**
 * 指定したタスクIDの担当者を「現在ログイン中のユーザー」に更新するアクション。
 * @param taskId 更新対象のタスクID
 */
export async function assignTask(taskId: string): Promise<void> {
  const supabase = await createClient();

  // 現在ログインしているユーザー情報を取得
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('ログインユーザー情報が取得できませんでした。');
  }

  // タスクの担当者を更新
  const { error: updateError } = await supabase
    .from('tasks')
    .update({ assignee_id: user.id })
    .eq('id', taskId);

  if (updateError) {
    throw new Error(`タスク担当者の更新に失敗しました: ${updateError.message}`);
  }
}
