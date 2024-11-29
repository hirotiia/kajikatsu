import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      { error: 'User not authenticated' },
      { status: 401 },
    );
  }

  const { data: userData, error: dataError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (dataError || !userData) {
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 },
    );
  }

  return NextResponse.json(userData);
}
