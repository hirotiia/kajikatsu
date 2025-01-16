import { fetchStatusNameById } from '@/lib/supabase/data/statuses/select/fetch-status-name-by-id';
import { fetchUserNameById } from '@/lib/supabase/data/users/fetch-user-name-by-id';
import { fetchGroupNameById } from '@/lib/supabase/group/fetch-group-name-by-id';

type DiffObject = Record<string, { old: any; new: any }>;

/**
 * diffオブジェクトの各キーに応じて動的処理を行い、
 * 画面描画用の文字列リストを返す
 */
export async function buildDiffMessages(diff: DiffObject): Promise<string[]> {
  const messages = await Promise.all(
    Object.entries(diff).map(async ([key, val]) => {
      if (key === 'status_id') {
        const oldStatusName = val.old
          ? await fetchStatusNameById(val.old)
          : null;
        const newStatusName = val.new
          ? await fetchStatusNameById(val.new)
          : null;
        return `ステータスを「${oldStatusName ?? val.old}」から「${
          newStatusName ?? val.new
        }」に変更しました。`;
      }

      if (key === 'group_id') {
        const oldGroupName = val.old ? await fetchGroupNameById(val.old) : null;
        const newGroupName = val.new ? await fetchGroupNameById(val.new) : null;
        return `グループを「${oldGroupName ?? val.old}」から「${
          newGroupName ?? val.new
        }」に変更しました。`;
      }

      if (key === 'assignee_id') {
        const oldUserName = val.old ? await fetchUserNameById(val.old) : null;
        const newUserName = val.new ? await fetchUserNameById(val.new) : null;
        return `担当者を「${oldUserName ?? val.old}」から「${
          newUserName ?? val.new
        }」に変更しました。`;
      }

      return `タイトルを「${val.old}」から「${val.new}」に変更しました。`;
    }),
  );
  console.log(messages);

  return messages;
}
