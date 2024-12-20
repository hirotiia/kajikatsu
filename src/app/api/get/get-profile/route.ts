import { NextResponse } from 'next/server';

import { getUserProfile } from '@/lib/supabase/data/users/get-user-profile';

export async function GET() {
  const result = await getUserProfile();

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  if (!result.data) {
    return NextResponse.json(
      { error: 'ユーザーが認証されていません。' },
      { status: 401 },
    );
  }

  return NextResponse.json({ data: result.data }, { status: 200 });
}
