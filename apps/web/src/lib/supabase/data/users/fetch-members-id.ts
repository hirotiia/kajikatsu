import { createClient } from '@/lib/supabase/server';

// グループ内のメンバーのidを配列で返す
export const fetchMembersId = async (groupId: string): Promise<string[]> => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('user_groups')
      .select('user_id')
      .eq('group_id', groupId);

    if (error) {
      throw new Error(`グループメンバーの取得に失敗しました: ${error.message}`);
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data.map((member) => member.user_id);
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('グループメンバー取得中に予期しないエラーが発生しました');
  }
};
