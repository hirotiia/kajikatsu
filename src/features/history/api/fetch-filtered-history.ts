import { LinkListItem } from '@/components/ui/list';
// TODO: 対象の履歴データを取得してくる
/**
 * リクエストに応じた履歴データを取得する
 * 取得したデータはIDで表示されるので、わかりやすく加工する（主キーをユーザー名に置き換えるなど）
 * 履歴リストとして表示する
 * @param query 2025-5などの年月
 * @returns LinkListItem[]
 */
export const fetchFilteredHistory = async (
  query: string | undefined,
): Promise<LinkListItem[]> => {
  console.log(query);
  return [];
};
