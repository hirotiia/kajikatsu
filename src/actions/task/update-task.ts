'use server';

import { createClient } from '@/lib/supabase/server';
import { updateTaskSchema } from '@/lib/zod/validation-schema';

export async function updateTask(state: any, formData: FormData): Promise<any> {
  try {
    const supabase = await createClient();

    const parsed = updateTaskSchema.safeParse({
      userId: formData.get('userId'),
      taskId: formData.get('taskId'),
      title: formData.get('title'),
      description: formData.get('description') || null,
      expires_at: formData.get('expires_at') || null,
      status_id: formData.get('status') || null,
      assignment_id: formData.get('assignment') || null,
    });

    if (!parsed.success) {
      return {
        status: 0,
        formValidationStatus: {
          errors: parsed.error.flatten().fieldErrors,
        },
      };
    }

    const {
      userId,
      taskId,
      title,
      description,
      expires_at,
      status_id,
      assignment_id,
    } = parsed.data;

    // 入力された内容でタスクの編集
    const { error } = await supabase
      .from('tasks')
      .update({
        title,
        description,
        expires_at,
        status_id,
        updated_by: userId,
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
    };
  } catch (error: any) {
    return {
      type: 'error',
      status: 400,
      message: error.message,
    };
  }
}
