import { DefinitionListItem } from '@/components/ui/list';
import { EnhancedTaskHistory, EnhancedTaskDetails } from '@/types/task.types';
import { toJstString } from '@/utils/to-jst-string';

/**
 * タスク履歴の変更内容をDefinitionListに表示するためのデータに変換する
 * @param taskHistory タスク履歴データ
 * @param isOld 変更前のデータかどうか
 * @returns DefinitionListに表示するための項目配列
 */
export function formatTaskHistoryForDefinitionList(
  taskHistory: EnhancedTaskHistory,
  isOld: boolean = false,
): DefinitionListItem[] {
  const items: DefinitionListItem[] = [];

  // アクション情報
  items.push({
    term: 'アクション',
    definitions: [formatActionName(taskHistory.action.name)],
  });

  // 変更者情報
  items.push({
    term: '変更者',
    definitions: [taskHistory.changedBy.username],
  });

  // 変更日時
  items.push({
    term: '変更日時',
    definitions: [toJstString(taskHistory.changedAt)],
  });

  // アクションタイプに応じたタスク詳細の表示
  const taskDetails = isOld ? taskHistory.details.old : taskHistory.details.new;

  if (taskDetails) {
    // タスク詳細の項目を追加
    const detailItems = formatTaskDetailsForDefinitionList(taskDetails);
    items.push(...detailItems);
  }

  return items;
}

/**
 * タスク詳細をDefinitionListに表示するためのデータに変換する
 * @param taskDetails タスク詳細データ
 * @returns DefinitionListに表示するための項目配列
 */
export function formatTaskDetailsForDefinitionList(
  taskDetails: EnhancedTaskDetails,
): DefinitionListItem[] {
  const items: DefinitionListItem[] = [];

  // タイトル
  items.push({
    term: 'タイトル',
    definitions: [taskDetails.title || 'なし'],
  });

  // 説明（改行を保持するために JSX.Element を使用）
  items.push({
    term: '説明',
    definitions: [
      <span key="description" style={{ whiteSpace: 'pre-wrap' }}>
        {taskDetails.description || 'なし'}
      </span>,
    ],
  });

  // ステータス
  items.push({
    term: 'ステータス',
    definitions: [taskDetails.status.name],
  });

  // 期限日
  items.push({
    term: '期限',
    definitions: [
      taskDetails.expiresAt ? toJstString(taskDetails.expiresAt) : '期限なし',
    ],
  });

  // 担当者
  items.push({
    term: '担当者',
    definitions: [taskDetails.assignee?.username || '未割り当て'],
  });

  // グループ
  items.push({
    term: 'グループ',
    definitions: [taskDetails.group.name],
  });

  return items;
}

/**
 * アクション名を日本語表示に変換する
 */
function formatActionName(
  actionName: 'updated' | 'completed' | 'created' | 'deleted' | undefined,
): string {
  switch (actionName) {
    case 'updated':
      return '更新';
    case 'completed':
      return '完了';
    case 'created':
      return '作成';
    case 'deleted':
      return '削除';
    default:
      return 'その他';
  }
}

/**
 * 変更前後の情報を比較して表示するための項目を生成する
 * @param taskHistory タスク履歴データ
 * @returns 比較表示用の定義リスト項目配列
 */
export function formatTaskHistoryComparisonForDefinitionList(
  taskHistory: EnhancedTaskHistory,
): {
  beforeItems: DefinitionListItem[];
  afterItems: DefinitionListItem[];
} {
  // アクションが updated でない場合は通常の表示を使用
  if (taskHistory.action.name !== 'updated') {
    return {
      beforeItems: [],
      afterItems: formatTaskHistoryForDefinitionList(taskHistory),
    };
  }

  const oldDetails = taskHistory.details.old;
  const newDetails = taskHistory.details.new;

  // 共通のフィールド定義
  const fields = [
    { key: 'title', label: 'タイトル' },
    { key: 'description', label: '説明', multiline: true },
    {
      key: 'status',
      label: 'ステータス',
      getValue: (d: EnhancedTaskDetails) => d.status.name,
    },
    {
      key: 'expiresAt',
      label: '期限',
      getValue: (d: EnhancedTaskDetails) =>
        d.expiresAt ? toJstString(d.expiresAt) : '期限なし',
    },
    {
      key: 'assignee',
      label: '担当者',
      getValue: (d: EnhancedTaskDetails) =>
        d.assignee?.username || '未割り当て',
    },
    {
      key: 'group',
      label: 'グループ',
      getValue: (d: EnhancedTaskDetails) => d.group.name,
    },
  ];

  const beforeItems: DefinitionListItem[] = [];
  const afterItems: DefinitionListItem[] = [];

  // 変更前後の項目を生成
  for (const field of fields) {
    if (!oldDetails || !newDetails) continue;

    const getValue = field.getValue || ((d: any) => d[field.key] || 'なし');

    const oldValue = getValue(oldDetails);
    const newValue = getValue(newDetails);

    // 値が変更されたかどうかを確認
    const hasChanged = oldValue !== newValue;

    // 変更前の値
    beforeItems.push({
      term: field.label,
      definitions: [
        field.multiline ? (
          <span
            key={field.key}
            className={hasChanged ? 'text-red-500 line-through' : ''}
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {oldValue}
          </span>
        ) : (
          <span
            key={field.key}
            className={hasChanged ? 'text-red-500 line-through' : ''}
          >
            {oldValue}
          </span>
        ),
      ],
    });

    // 変更後の値
    afterItems.push({
      term: field.label,
      definitions: [
        field.multiline ? (
          <span
            key={field.key}
            className={hasChanged ? 'text-green-600' : ''}
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {newValue}
          </span>
        ) : (
          <span key={field.key} className={hasChanged ? 'text-green-600' : ''}>
            {newValue}
          </span>
        ),
      ],
    });
  }

  return { beforeItems, afterItems };
}
