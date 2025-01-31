'use server';

import { createServerClient } from '@supabase/ssr';
import { z } from 'zod';

import { fetchStatusId } from '@/lib/supabase/data/statuses/select/fetch-status-id';
import { fetchGroupId } from '@/lib/supabase/data/user-groups/select/fetch-group-id';
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

const TaskSchema = z.object({
  title: z.string().min(1, 'タイトルが入力されていません。'),
  status: z.string().min(1, 'ステータスを選択してください。'),
  deadline: z.string().nullable(),
  description: z.string().nullable(),
  assignment: z.string().nullable(),
});

/**
 * タスクを作成する際の入力データの型
 */
interface TaskInput {
  title: string;
  status: string;
  deadline: string | null;
  description: string | null;
  assigneeId: string | null;
}

/**
 * タスクを DB に挿入するための関数
 */
async function insertTask(
  supabase: ReturnType<typeof createServerClient>,
  {
    groupId,
    title,
    description,
    statusId,
    userId,
    deadline,
    assigneeId,
  }: {
    groupId: string | null;
    title: string;
    description: string | null;
    statusId: string;
    userId: string;
    deadline: string | null;
    assigneeId: string | null;
  },
): Promise<void> {
  const { error } = await supabase.from('tasks').insert([
    {
      group_id: groupId,
      title,
      description,
      status_id: statusId,
      is_deleted: false,
      created_by: userId,
      updated_by: userId,
      expires_at: deadline ? new Date(deadline).toISOString() : null,
      assignee_id: assigneeId,
    },
  ]);

  if (error) {
    throw new Error(`タスクの作成に失敗しました: ${error.message}`);
  }
}

export const createTask = async (
  state: any,
  formData: FormData,
): Promise<any | null> => {
  try {
    const supabase = await createClient();
    const { user } = await getUser();

    if (!user) {
      throw new Error('ユーザーが認証されていません。');
    }

    // フォームからユーザーの入力情報を取得
    const validatedFields = TaskSchema.safeParse({
      title: formData.get('title'),
      status: formData.get('status'),
      deadline: formData.get('deadline') ?? null,
      description: formData.get('description') ?? null,
      assignment: formData.get('assignment') ?? null,
    });

    if (!validatedFields.success) {
      return {
        status: null,
        formValidationStatus: {
          errors: validatedFields.error.flatten().fieldErrors,
          message: '未入力の箇所があります。タスクの作成が失敗しました。',
        },
      };
    }

    const { title, status, deadline, description, assignment } =
      validatedFields.data;

    // 最終的にDBに保存されるデータ
    const taskInput: TaskInput = {
      title,
      status,
      deadline,
      description,
      assigneeId:
        typeof assignment === 'string' && assignment.trim() !== ''
          ? assignment
          : null,
    };

    // `statuses` テーブルから `status_id` を取得
    const statusId = await fetchStatusId(supabase, taskInput.status);

    // groupId の取得
    const groupId = await fetchGroupId(supabase, user.id);

    // タスク挿入
    await insertTask(supabase, {
      groupId,
      title: taskInput.title,
      description: taskInput.description,
      statusId,
      userId: user.id,
      deadline: taskInput.deadline,
      assigneeId: taskInput.assigneeId,
    });

    return {
      type: 'success',
      status: 200,
      message: 'タスクを作成しました。',
      formValidationStatus: { errors: {}, message: null },
    };
  } catch (error: any) {
    return { type: 'error', status: 400, message: error.message };
  }
};
