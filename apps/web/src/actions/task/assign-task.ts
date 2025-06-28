'use server';

import { createClient } from '@/lib/supabase/server';

export interface AssignTaskSuccess {
  type: 'success';
  status: 200;
  message: string | null;
}

export interface AssignTaskError {
  type: 'error' | null;
  status: number | undefined;
  message: string | null;
}

export type AssignTaskResult = AssignTaskSuccess | AssignTaskError;
/**
 * 指定したタスクIDの担当者を「現在ログイン中のユーザー」に更新するアクション。
 * @param taskId 更新対象のタスクID
 */
export async function assignTask(
  state: any,
  formData: FormData,
): Promise<AssignTaskResult> {
  try {
    const supabase = await createClient();

    // 現在ログインしているユーザー情報を取得
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error('ログインユーザー情報が取得できませんでした。');
    }

    const taskId = formData.get('taskId');

    if (!taskId || typeof taskId !== 'string') {
      throw new Error('タスク情報が取得できませんでした。');
    }

    // タスクの担当者を更新
    const { data: updatedTask, error: updateError } = await supabase
      .from('tasks')
      .update({ assignee_id: user.id })
      .eq('id', taskId)
      .is('assignee_id', null)
      .select('*')
      .single();

    if (updateError) {
      throw new Error(
        `タスク担当者の更新に失敗しました: ${updateError.message}`,
      );
    }

    if (!updatedTask) {
      throw new Error('このタスクは既にアサインされているか、存在しません。');
    }

    return {
      type: 'success',
      status: 200,
      message: 'タスクの担当者をあなたに変更しました。',
    };
  } catch (error: any) {
    return {
      type: 'error',
      status: 500,
      message: error,
    };
  }
}
