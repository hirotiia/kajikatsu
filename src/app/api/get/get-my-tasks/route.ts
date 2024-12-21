import { createClient } from '@/lib/supabase/server';
import { getUser } from '@/lib/supabase/user/user';
import { Result } from '@/types/result.types';

type MyTasks = {
  id: string;
  title: string;
  description: string | null;
  groupName: string | null;
  statusName: string | null;
  createdBy: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  expiresAt: string | null;
};
export type MyTasksResponse = Result<MyTasks[]>;

export const getMyTasks = async (): Promise<MyTasksResponse> => {
  const supabase = await createClient();

  try {
    const { user, authError } = await getUser();

    if (authError || !user) {
      throw new Error('ユーザーが認証されていません。');
    }

    const { data, error } = await supabase
      .from('tasks')
      .select(
        `
        id,
        title,
        description,
        is_deleted,
        created_at,
        updated_at,
        expires_at,
        groups (
          name
        ),
        statuses (
          status_name
        ),
        users!tasks_created_by_fkey (
          username
        )
      `,
      )
      .eq('created_by', user.id)
      .eq('is_deleted', false);

    if (error) {
      throw new Error('タスク一覧の取得に失敗しました。');
    }

    const formattedData =
      data?.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        groupName: task.groups?.name || null,
        statusName: task.statuses?.status_name || null,
        createdBy: task.users?.username || null,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
        expiresAt: task.expires_at,
      })) ?? [];

    return { data: formattedData, error: null };
  } catch (error) {
    let errorMessage = '予期しないエラーが発生しました。';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { data: [], error: errorMessage };
  }
};

export async function GET() {
  const result = await getMyTasks();

  if (result.error) {
    return new Response(JSON.stringify({ error: result.error }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ data: result.data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
