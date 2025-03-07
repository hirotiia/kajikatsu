import { createClient } from '@/lib/supabase/client';

/**
 * 主キー (UUID) を引数に受け取り、対応するステータス名を返却する関数
 */
export async function fetchActionNameByIdClient(
  actionId: string,
): Promise<string | null> {
  const supabase = createClient();

  // クエリを実行
  const { data, error } = await supabase
    .from('actions')
    .select('action_name')
    .eq('id', actionId)
    .single();

  if (error || !data) {
    return null;
  }

  return data.action_name;
}
