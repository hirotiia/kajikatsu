import { getMyTasks } from '@/lib/supabase/data/tasks/select/get-my-tasks';

export async function GET() {
  const result = await getMyTasks();

  if (result.error) {
    return new Response(JSON.stringify({ error: result.error }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!result.data) {
    return new Response(
      JSON.stringify({ error: 'ユーザーが認証されていません。' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  console.log('------------------');
  console.log(result.data);
  console.log('------------------');

  return new Response(JSON.stringify({ data: result.data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
