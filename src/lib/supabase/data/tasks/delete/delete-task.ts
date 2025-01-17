import { createClient } from '@/lib/supabase/client';

/**
 * taskId の tasks レコードを is_deleted = true に更新する
 * @param taskId
 * @returns 更新後のデータ or エラー
 */
export const deleteTask = async (taskId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('tasks')
    .update({ is_deleted: true })
    .eq('id', taskId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
