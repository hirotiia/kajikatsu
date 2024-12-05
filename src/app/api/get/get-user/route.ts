import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';
import { getUser } from '@/lib/supabase/user/user';

export async function GET() {
  const supabase = await createClient();
  const { user, authError } = await getUser();

  if (authError || !user) {
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
