import { createClient } from '@/lib/supabase/server';
import { EnhancedTaskHistory, EnhancedTaskDetails } from '@/types/task.types';

export async function fetchTaskHistoryById(
  taskHistoryId: string,
): Promise<EnhancedTaskHistory | null> {
  const supabase = await createClient();

  const { data: taskHistoryData, error: taskHistoryError } = await supabase
    .from('task_history')
    .select('*')
    .eq('id', taskHistoryId)
    .single();

  if (taskHistoryError) {
    throw new Error(`タスク履歴の取得エラー: ${taskHistoryError.message}`);
  }

  if (!taskHistoryData) {
    return null;
  }

  const { data: actionData } = await supabase
    .from('actions')
    .select('id, action_name')
    .eq('id', taskHistoryData.action_id)
    .single();

  const { data: changedByUser } = await supabase
    .from('users')
    .select('id, username, avatar_url')
    .eq('id', taskHistoryData.changed_by)
    .single();

  const details = taskHistoryData.details;

  // 古い状態と新しい状態を拡張する
  const enhancedOld = details.old
    ? await enhanceTaskDetails(details.old, supabase)
    : null;
  const enhancedNew = details.new
    ? await enhanceTaskDetails(details.new, supabase)
    : null;

  let actionName = actionData?.action_name;

  if (
    actionName === 'updated' &&
    enhancedOld &&
    enhancedNew &&
    enhancedOld.status.name !== '完了' &&
    enhancedNew.status.name === '完了'
  ) {
    actionName = 'completed';
  }

  const enhancedTaskHistory: EnhancedTaskHistory = {
    action: {
      name: actionName,
    },
    changedBy: {
      username: changedByUser?.username || 'Unknown User',
      avatarUrl: changedByUser?.avatar_url || '',
    },
    changedAt: taskHistoryData.changed_at || '',
    details: {
      old: enhancedOld,
      new: enhancedNew,
    },
  };

  return enhancedTaskHistory;
}

/**
 * タスク詳細情報を拡張し、IDを人間が読みやすい情報に変換
 */
async function enhanceTaskDetails(
  taskDetails: any,
  supabase: any,
): Promise<EnhancedTaskDetails> {
  // ステータス情報の取得
  const { data: statusData } = await supabase
    .from('statuses')
    .select('status_name')
    .eq('id', taskDetails.status_id)
    .single();

  // 担当者情報の取得（存在する場合）
  let assigneeData = null;
  if (taskDetails.assignee_id) {
    const { data } = await supabase
      .from('users')
      .select('username')
      .eq('id', taskDetails.assignee_id)
      .single();
    assigneeData = data;
  }

  // グループ情報の取得
  const { data: groupData } = await supabase
    .from('groups')
    .select('name')
    .eq('id', taskDetails.group_id)
    .single();

  return {
    title: taskDetails.title,
    description: taskDetails.description ?? '',
    status: {
      name: statusData?.status_name || 'Unknown Status',
    },
    expiresAt: taskDetails.expires_at,
    assignee: assigneeData
      ? {
          username: assigneeData.username,
        }
      : null,
    group: {
      name: groupData?.name || 'Unknown Group',
    },
  };
}
