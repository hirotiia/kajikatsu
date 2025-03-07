import { createClient } from '@/lib/supabase/server';

/**
 * 主キー (UUID) を引数に受け取り、対応するステータス名を返却する関数
 */
export async function fetchStatusNameById(
  statusId: string,
): Promise<string | null> {
  const supabase = await createClient();

  // クエリを実行
  const { data, error } = await supabase
    .from('statuses')
    .select('status_name')
    .eq('id', statusId)
    .single();

  if (error || !data) {
    return null;
  }

  return data.status_name;
}
