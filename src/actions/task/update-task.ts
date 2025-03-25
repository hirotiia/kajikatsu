'use server';

import { createClient } from '@/lib/supabase/server';
import { updateTaskSchema } from '@/lib/zod/validation-schema';

export async function updateTask(state: any, formData: FormData): Promise<any> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('ユーザーが認証されていません。');
    }

    const parsed = updateTaskSchema.safeParse({
      taskId: formData.get('taskId'),
      title: formData.get('title'),
      description: formData.get('description') || null,
      expires_at: formData.get('expires_at') || null,
      status_id: formData.get('status') || null,
      assignment_id: formData.get('assignment') || null,
    });

    if (!parsed.success) {
      return {
        status: null,
        formValidationStatus: {
          errors: parsed.error.flatten().fieldErrors,
          message:
            '未入力または不正な入力値があります。タスクの更新が失敗しました。',
        },
      };
    }

    const { taskId, title, description, expires_at, status_id, assignment_id } =
      parsed.data;

    // SupabaseでtasksをUPDATE
    const { error } = await supabase
      .from('tasks')
      .update({
        title,
        description,
        expires_at,
        status_id,
        updated_by: user.id,
        assignee_id: assignment_id,
      })
      .eq('id', taskId);

    if (error) {
      throw new Error(error.message);
    }

    return {
      type: 'success',
      status: 200,
      message: 'タスクを更新しました。',
      formValidationStatus: { errors: {}, message: null },
    };
  } catch (error: any) {
    return {
      type: 'error',
      status: 400,
      message: error.message,
    };
  }
}
