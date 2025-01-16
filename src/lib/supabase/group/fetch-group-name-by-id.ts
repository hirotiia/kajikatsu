import { createClient } from '@/lib/supabase/client';

/**
 * 主キー (UUID) を引数に受け取り、対応するステータス名を返却する関数
 */
export async function fetchGroupNameById(
  groupId: string,
): Promise<string | null> {
  const supabase = createClient();

  // クエリを実行
  const { data, error } = await supabase
    .from('groups')
    .select('name')
    .eq('id', groupId)
    .single();

  if (error || !data) {
    return null;
  }

  return data.name;
}
