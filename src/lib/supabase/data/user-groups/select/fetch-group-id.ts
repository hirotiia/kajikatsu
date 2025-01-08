import { createServerClient } from '@supabase/ssr';

/**
 * ユーザーの主キーから所属グループのユーザーIDを取得する
 */
export async function fetchGroupId(
  supabase: ReturnType<typeof createServerClient>,
  userId: string,
): Promise<string | null> {
  const { data, error } = await supabase
    .from('user_groups')
    .select('group_id')
    .eq('user_id', userId)
    .single();

  if (error) {
    return null;
  }

  return data?.group_id ?? null;
}
