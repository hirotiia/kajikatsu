import { createClient } from '@/lib/supabase/server';

/**
 * 主キー (UUID) を引数に受け取り、対応するステータス名を返却する関数
 */
export async function fetchUserNameById(
  userId: string,
): Promise<string | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('users')
    .select('username')
    .eq('id', userId)
    .single();

  if (error || !data) {
    return null;
  }

  return data.username;
}
