import { createServerClient } from '@supabase/ssr';

/**
 * statusName から statuses テーブルの status_id を取得する
 */
export async function fetchStatusId(
  supabase: ReturnType<typeof createServerClient>,
  statusName: string,
): Promise<string> {
  const { data, error } = await supabase
    .from('statuses')
    .select('id')
    .eq('status_name', statusName)
    .single();

  if (error || !data) {
    throw new Error('無効なステータスが選択されました。');
  }

  return data.id;
}
