'use server';

import { createClient } from '@/lib/supabase/server';
import { getUser } from '@/lib/supabase/user/user';

export interface CreateTaskSuccess {
  type: 'success';
  status: 200;
  message: string;
}

export interface CreateTaskError {
  type: 'error';
  status: number;
  message: string;
}

export type CreateTaskResult = CreateTaskSuccess | CreateTaskError;

export const createTask = async (
  state: any,
  formData: FormData,
): Promise<any | null> => {
  try {
    console.log('createTask実行');
    const supabase = await createClient();
    const { user } = await getUser();

    if (!user) {
      throw new Error('ユーザーが認証されていません。');
    }

    const title = formData.get('title');
    const status = formData.get('status');
    const deadline = formData.get('deadline') ?? null;
    const description = formData.get('description') ?? null;
    const assignmentUser = formData.get('assignment') ?? null;

    if (typeof title !== 'string' || typeof status !== 'string') {
      throw new Error('タイトルとステータスは必須です。');
    }

    // 型フィルターをかける
    const validatedDeadline = typeof deadline === 'string' ? deadline : null;
    const validatedDescription =
      typeof description === 'string' ? description : null;
    const validatedAssignmentUser =
      typeof assignmentUser === 'string' ? assignmentUser : null;

    console.log('-----------------------------------');
    console.log(`title: ${title}`);
    console.log(`status: ${status}`);
    console.log(`description: ${validatedDescription}`);
    console.log(`deadline: ${validatedDeadline}`);
    console.log(`assignmentUser: ${validatedAssignmentUser}`);
    console.log('-----------------------------------');

    // `statuses` テーブルから `status_id` を取得
    const { data: statusData, error: statusError } = await supabase
      .from('statuses')
      .select('id')
      .eq('status_name', status)
      .single();

    if (statusError || !statusData) {
      throw new Error('無効なステータスが選択されました。');
    }

    const status_id = statusData.id;

    // ユーザーの所属しているグループを取得
    const { data: groupData, error: groupError } = await supabase
      .from('user_groups')
      .select('group_id')
      .eq('user_id', user.id)
      .single();

    if (groupError || !groupData) {
      throw new Error('グループ情報の取得に失敗しました。');
    }

    const group_id = groupData.group_id;
    console.log('------------------------------');
    console.log({
      group_id: group_id,
      title: title,
      description: validatedDescription,
      status_id: status_id,
      is_deleted: false,
      created_by: user.id,
      updated_by: user.id,
      expires_at: validatedDeadline
        ? new Date(validatedDeadline).toISOString()
        : null,
      assigned_users: validatedAssignmentUser ? validatedAssignmentUser : null,
    });
    console.log('------------------------------');

    // タスクの作成
    const { error } = await supabase.from('tasks').insert([
      {
        group_id: group_id,
        title: title,
        description: validatedDescription,
        status_id: status_id,
        is_deleted: false,
        created_by: user.id,
        updated_by: user.id,
        expires_at: validatedDeadline
          ? new Date(validatedDeadline).toISOString()
          : null,
        assignee_id: validatedAssignmentUser ? validatedAssignmentUser : null,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return {
      type: 'success',
      status: 200,
      message: 'タスクを作成しました。',
    };
  } catch (error: any) {
    return { type: 'error', status: 400, message: error.message };
  }
};
