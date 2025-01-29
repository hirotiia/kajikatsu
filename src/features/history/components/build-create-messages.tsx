import { DefinitionListItem, DefinitionList } from '@/components/ui/list';

export function buildCreatedMessage(newTask: any): string | JSX.Element {
  if (!newTask) return 'タスク情報がありません。';

  // 定義リストのデータ項目を作成
  const items: DefinitionListItem[] = [
    { term: 'タイトル', definition: newTask.title || '未定義' },
    { term: '内容', definition: newTask.description || '未定義' },
  ];

  return (
    <div className="space-y-2 text-sm">
      <p>
        <b>【作成されたタスク】</b>
      </p>
      <DefinitionList items={items} spacing="md" />
    </div>
  );
}
