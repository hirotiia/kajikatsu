import { createClient } from '@/lib/supabase/server';

type EnhancedTaskHistory = {
  id: string;
  task: {
    id: string;
    title: string;
  };
  action: {
    id: string;
    name: string;
  };
  changedBy: {
    id: string;
    username: string;
    avatarUrl: string | null;
  };
  changedAt: string;
  details: {
    old: EnhancedTaskDetails | null;
    new: EnhancedTaskDetails | null;
    changes: Array<{
      field: string;
      oldValue: any;
      newValue: any;
      fieldLabel: string;
    }>;
  };
};

type EnhancedTaskDetails = {
  id: string;
  title: string;
  description: string | null;
  status: {
    id: string;
    name: string;
  };
  isDeleted: boolean;
  createdBy: {
    id: string;
    username: string;
  };
  createdAt: string;
  updatedBy: {
    id: string;
    username: string;
  };
  updatedAt: string;
  expiresAt: string | null;
  assignee: {
    id: string;
    username: string;
  } | null;
  group: {
    id: string;
    name: string;
  };
};

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

  // 変更点を特定
  const changes = identifyChanges(details.old, details.new);

  const enhancedTaskHistory: EnhancedTaskHistory = {
    id: taskHistoryData.id,
    task: {
      id: taskHistoryData.task_id,
      title: enhancedNew?.title || enhancedOld?.title || 'Unknown Task',
    },
    action: {
      id: taskHistoryData.action_id,
      name: actionData?.action_name || 'Unknown Action',
    },
    changedBy: {
      id: taskHistoryData.changed_by,
      username: changedByUser?.username || 'Unknown User',
      avatarUrl: changedByUser?.avatar_url || '',
    },
    changedAt: taskHistoryData.changed_at || '',
    details: {
      old: enhancedOld,
      new: enhancedNew,
      changes,
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
    .select('id, status_name')
    .eq('id', taskDetails.status_id)
    .single();

  // 作成者情報の取得
  const { data: createdByUser } = await supabase
    .from('users')
    .select('id, username')
    .eq('id', taskDetails.created_by)
    .single();

  // 更新者情報の取得
  const { data: updatedByUser } = await supabase
    .from('users')
    .select('id, username')
    .eq('id', taskDetails.updated_by)
    .single();

  // 担当者情報の取得（存在する場合）
  let assigneeData = null;
  if (taskDetails.assignee_id) {
    const { data } = await supabase
      .from('users')
      .select('id, username')
      .eq('id', taskDetails.assignee_id)
      .single();
    assigneeData = data;
  }

  // グループ情報の取得
  const { data: groupData } = await supabase
    .from('groups')
    .select('id, name')
    .eq('id', taskDetails.group_id)
    .single();

  return {
    id: taskDetails.id,
    title: taskDetails.title,
    description: taskDetails.description,
    status: {
      id: taskDetails.status_id,
      name: statusData?.status_name || 'Unknown Status',
    },
    isDeleted: taskDetails.is_deleted,
    createdBy: {
      id: taskDetails.created_by,
      username: createdByUser?.username || 'Unknown User',
    },
    createdAt: taskDetails.created_at,
    updatedBy: {
      id: taskDetails.updated_by,
      username: updatedByUser?.username || 'Unknown User',
    },
    updatedAt: taskDetails.updated_at,
    expiresAt: taskDetails.expires_at,
    assignee: assigneeData
      ? {
          id: assigneeData.id,
          username: assigneeData.username,
        }
      : null,
    group: {
      id: taskDetails.group_id,
      name: groupData?.name || 'Unknown Group',
    },
  };
}

/**
 * oldとnewの状態を比較して変更点を識別する
 */
function identifyChanges(
  oldData: any,
  newData: any,
): Array<{ field: string; oldValue: any; newValue: any; fieldLabel: string }> {
  if (!oldData || !newData) {
    return [];
  }

  const changes: Array<{
    field: string;
    oldValue: any;
    newValue: any;
    fieldLabel: string;
  }> = [];
  const fieldLabels: Record<string, string> = {
    title: 'タイトル',
    description: '説明',
    status_id: 'ステータス',
    is_deleted: '削除フラグ',
    expires_at: '期限日',
    assignee_id: '担当者',
    group_id: 'グループ',
  };

  // oldとnewの状態を比較
  Object.keys(fieldLabels).forEach((field) => {
    if (JSON.stringify(oldData[field]) !== JSON.stringify(newData[field])) {
      changes.push({
        field,
        oldValue: oldData[field],
        newValue: newData[field],
        fieldLabel: fieldLabels[field],
      });
    }
  });

  return changes;
}

/**
 * 表示用に変更をフォーマットする関数 (UIコンポーネントで使用)
 */
export function formatChangeValue(
  field: string,
  value: any,
  enhancedDetails: EnhancedTaskDetails | null,
): string {
  if (value === null) return '未設定';

  switch (field) {
    case 'status_id':
      return enhancedDetails?.status.name || '不明なステータス';
    case 'assignee_id':
      return enhancedDetails?.assignee?.username || '未割り当て';
    case 'is_deleted':
      return value ? '削除済み' : '有効';
    case 'expires_at':
      return value ? new Date(value).toLocaleDateString('ja-JP') : '期限なし';
    case 'group_id':
      return enhancedDetails?.group.name || '不明なグループ';
    default:
      return String(value);
  }
}
