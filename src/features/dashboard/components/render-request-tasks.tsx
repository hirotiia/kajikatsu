import { InfoList } from '@/components/ui/list';
import { Task } from '@/types/task.types';

import { createRequestMembersTask } from '../api/create-request-members-task';

type props = {
  className?: string;
  groupId: string;
};

type InfoData = {
  date: string;
  expireDate: string;
  title: string;
  description: string;
};

export const RenderRequestTasks = async ({ className, groupId }: props) => {
  const res = await createRequestMembersTask(groupId);

  if (res.error) {
    return <p className="text-destructive-foreground">エラー: {res.error}</p>;
  }

  const members = res.data?.members ?? [];

  // 各メンバーが担当しているタスクを1つの配列にまとめる
  // => Task[] の配列としてフラット化
  const tasks: Task[] = members.flatMap((member) => member.tasks);

  // InfoData に整形
  const infoData: InfoData[] = tasks.map((task) => ({
    date: task.createdAt ?? '不明',
    expireDate: task.expiresAt ?? 'なし',
    title: task.title,
    description: task.description ?? '',
  }));

  return infoData.length === 0 ? (
    <p>お願いされているタスクはありません。</p>
  ) : (
    <InfoList items={infoData} className={className} />
  );
};
