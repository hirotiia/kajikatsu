import { createClient } from '@/lib/supabase/client';
import { Result } from '@/types/result.types';

type TaskDeleteStatus = {
  alreadyDeleted: boolean;
};

/**
 * taskId の tasks レコードを is_deleted = true に更新する
 * 戻り値は Result<TaskDeleteStatus>
 */
export const deleteTask = async (
  taskId: string,
): Promise<Result<TaskDeleteStatus>> => {
  const supabase = createClient();

  const { data: existingTask, error: fetchError } = await supabase
    .from('tasks')
    .select('id, is_deleted')
    .eq('id', taskId)
    .single();

  if (fetchError) {
    return { data: null, error: fetchError.message };
  }

  if (!existingTask) {
    return { data: null, error: '指定のタスクが存在しません。' };
  }

  if (existingTask.is_deleted) {
    return { data: { alreadyDeleted: true }, error: null };
  }

  const { error: updateError } = await supabase
    .from('tasks')
    .update({ is_deleted: true })
    .eq('id', taskId)
    .single();

  if (updateError) {
    return { data: null, error: updateError.message };
  }

  return { data: { alreadyDeleted: false }, error: null };
};
