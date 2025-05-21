import { createClient } from '@/lib/supabase/server';
import { Tables } from '@/types/supabase/database.types';

type ActionName = Tables<'actions'>['action_name'];

/** actions.id → action_name を取得して返す */
export async function fetchActionNameById(
  actionId: string,
): Promise<ActionName> {
  const supabase = await createClient();

  // クエリを実行
  const { data, error } = await supabase
    .from('actions')
    .select('action_name')
    .eq('id', actionId)
    .single();

  if (error) throw error;

  return data.action_name;
}
