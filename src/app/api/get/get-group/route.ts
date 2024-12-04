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
    .from('user_groups')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (dataError || !userData) {
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 },
    );
  }

  const { data: groupData, error: groupDataError } = await supabase
    .from('groups')
    .select('name')
    .eq('id', userData.group_id)
    .single();

  if (groupDataError || !groupData) {
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 },
    );
  }

  const { data: roleData, error: roleDataError } = await supabase
    .from('roles')
    .select('name')
    .eq('id', userData.role_id)
    .single();

  if (roleDataError || !roleData) {
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 },
    );
  }

  return NextResponse.json({ group_name: groupData.name, role: roleData.name });
}
