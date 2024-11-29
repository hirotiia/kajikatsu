/**
 * usersテーブルからavatar_urlを取得するAPI
 * @returns string | null - アバターURL
 * @throws Error - エラー発生時のエラーメッセージ
 */

import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

type ApiResponse = {
  avatar_url: string | null;
};

export async function GET(): Promise<NextResponse<ApiResponse>> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ avatar_url: null }, { status: 401 });
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('avatar_url')
    .eq('id', user.id)
    .single();

  if (userError || !userData) {
    return NextResponse.json({ avatar_url: null }, { status: 404 });
  }

  return NextResponse.json(
    { avatar_url: userData.avatar_url },
    { status: 200 },
  );
}
