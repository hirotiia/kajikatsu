import { NextResponse } from 'next/server';

import { getMyTasks } from '@/lib/supabase/data/tasks/select/get-my-tasks';

export async function GET() {
  const result = await getMyTasks();

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  if (!result.data) {
    return NextResponse.json(
      { error: 'ユーザーが認証されていません。' },
      { status: 401 },
    );
  }

  console.log('------------------');
  console.log(result.data);
  console.log('------------------');

  return NextResponse.json({ data: result.data }, { status: 200 });
}
