/**
 * groupIdがある場合は、task_historyテーブルからgroup_idと一致するデータを全て取得する
 * groupIdがない場合は、自分のタスク履歴を一覧で取得する
 */

import { createClient } from '@/lib/supabase/client';
import { Tables } from '@/types/supabase/database.types';

type GetTaskHistoryParams = {
  userId: string;
  groupId?: string | null;
};

export async function getTaskHistoryForClient(
  params: GetTaskHistoryParams,
): Promise<Tables<'task_history'>[]> {
  const { userId, groupId } = params;
  const supabase = createClient();

  let query = supabase
    .from('task_history')
    .select('*')
    .order('changed_at', { ascending: false });

  if (groupId) {
    // 新規作成時は old が null で new.group_id = groupId
    // 更新時は old.group_id or new.group_id のどちらかが groupId
    // 削除時は old.group_id = groupId
    query = query.or(
      `details->old->>group_id.eq.${groupId},details->new->>group_id.eq.${groupId}`,
    );
  } else {
    query = query.eq('changed_by', userId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching task history:', error);
    throw error;
  }

  return data as Tables<'task_history'>[];
}
