import { createClient } from '@/lib/supabase/server';

type GroupReaquestData = {
  token: string;
  userId: string;
};

/**
 * グループへの参加リクエストを処理する関数
 *
 * 概要:
 * - 招待トークンの有効性を確認
 * - 同一ユーザーからの重複リクエストをチェック
 * - 有効なリクエストの場合は参加リクエストを登録
 *
 * 処理フロー:
 * 1. 招待トークンに一致するグループ招待情報を取得
 * 2. 既存の参加リクエスト（pending または approved）をチェック
 * 3. 重複がなければ新しい参加リクエストを作成
 * 4. 各ステップの結果に基づいたメッセージを返却
 *
 * @param groupReaquestData - リクエストデータ（招待トークンとユーザーID）
 * @returns 処理結果を表すメッセージ
 */
export const requestGroupMember = async (
  groupReaquestData: GroupReaquestData,
): Promise<string> => {
  try {
    const supabase = await createClient();
    const { token, userId } = groupReaquestData;

    // トークンに一致するグループを探す
    const { data: invitationColumn, error: invitationColumnError } =
      await supabase
        .from('group_invitations')
        .select('id')
        .eq('invitation_token', token)
        .single();

    if (!invitationColumn || invitationColumnError) {
      return invitationColumnError.message;
    }

    // このユーザーがすでにグループに申請を送っているかどうか確認する
    const { count: duplicateRequestCount, error: countError } = await supabase
      .from('join_requests')
      .select('*', { count: 'exact', head: true })
      .eq('invitation_id', invitationColumn.id)
      .eq('user_id', userId)
      .or('status.eq.pending,status.eq.approved');

    if (countError) {
      return 'リクエストの重複確認処理が失敗しました。';
    }

    if (duplicateRequestCount && duplicateRequestCount > 0) {
      return 'このグループにはすでにリエクエストを申請しています。申請完了まで少々お待ちください';
    }

    // 参加リクエストテーブルにカラムを追加する
    const { error: requestError } = await supabase
      .from('join_requests')
      .insert({
        invitation_id: invitationColumn.id,
        user_id: userId,
        status: 'pending',
      });

    if (requestError) {
      return 'リクエストの作成に失敗しました。';
    }

    return 'グループのオーナーにリクエストを申請しました。';
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : '不明なエラーが発生しました。';
    return errorMessage;
  }
};
