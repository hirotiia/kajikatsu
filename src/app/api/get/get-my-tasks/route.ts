import { getMyTasks } from '@/lib/supabase/data/tasks/select/get-my-tasks';

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
