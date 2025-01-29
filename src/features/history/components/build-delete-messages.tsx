import { DefinitionListItem, DefinitionList } from '@/components/ui/list';

export function buildDeletedMessage(oldTask: any): string | JSX.Element {
  if (!oldTask) return '削除されたタスク情報がありません。';

  // 例: 重要項目だけ取り出して DefinitionList 用の配列に整形
  const items: DefinitionListItem[] = [
    { term: 'タイトル', definition: oldTask.title || '未定義' },
    { term: '内容', definition: oldTask.description || '未定義' },
  ];

  return (
    <div className="space-y-2 text-sm">
      <p>
        <b>【削除されたタスク】</b>
      </p>
      <DefinitionList items={items} spacing="md" />
    </div>
  );
}
