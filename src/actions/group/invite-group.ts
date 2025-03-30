'use server';

import { createClient } from '@/lib/supabase/server';
import { calculateExpirationTime } from '@/utils/to-jst-string';

type InviteGroupResponse = {
  type: 'success' | 'error' | null;
  status: number;
  message: string;
  url: string;
};

/**
 * グループへの招待リンクを生成する
 * 既存の招待がある場合は有効期限を更新し、ない場合は新規作成する
 *
 * @param state - 現在の状態
 * @param formData - フォームデータ（expires_at, groupId, userId）
 * @returns 招待リンク情報を含むレスポンス
 */
export const inviteGroup = async (
  state: any,
  formData: FormData,
): Promise<InviteGroupResponse> => {
  try {
    const supabase = await createClient();
    const expiresAt = formData.get('expires_at') as string;
    const groupId = formData.get('groupId') as string;
    const userId = formData.get('userId') as string;

    // 有効期限をISO形式で計算
    const expirationTimestamp = calculateExpirationTime(expiresAt);

    // 招待トークンを取得または作成
    const invitationToken = await getOrCreateInvitationToken({
      supabase,
      groupId,
      userId,
      expirationTimestamp,
    });

    // 招待URLを生成
    const baseUrl = process.env.NEXT_PUBLIC_PROJECT_URL;
    if (!baseUrl) {
      throw new Error('環境変数 NEXT_PUBLIC_PROJECT_URL が設定されていません');
    }

    const url = `${baseUrl}/join?invitation_token=${invitationToken}&expires_at=${expirationTimestamp}`;

    return {
      type: 'success',
      status: 200,
      message: 'リンクが生成されました。',
      url: url,
    };
  } catch (error) {
    console.error('招待リンクの生成中にエラーが発生しました:', error);

    return {
      type: 'error',
      status: 400,
      message:
        error instanceof Error
          ? error.message
          : '招待リンクの生成中に予期せぬエラーが発生しました',
      url: '',
    };
  }
};

/**
 * 既存の招待トークンを取得するか、存在しない場合は新規作成する
 */
type GetOrCreateInvitationTokenParams = {
  supabase: any;
  groupId: string;
  userId: string;
  expirationTimestamp: string;
};

async function getOrCreateInvitationToken({
  supabase,
  groupId,
  userId,
  expirationTimestamp,
}: GetOrCreateInvitationTokenParams): Promise<string> {
  try {
    // 既存の招待を検索
    const { data: existingInvitation, error: existingError } = await supabase
      .from('group_invitations')
      .select('invitation_token')
      .eq('group_id', groupId)
      .single();

    // 既存の招待がある場合
    if (existingInvitation) {
      const token = existingInvitation.invitation_token;
      await updateInvitationExpiry(supabase, token, expirationTimestamp);
      return token;
    }

    // 招待が存在しない場合は新規作成
    if (existingError && existingError.code === 'PGRST116') {
      return await createNewInvitation(
        supabase,
        groupId,
        userId,
        expirationTimestamp,
      );
    }

    // その他のエラー
    throw new Error(existingError?.message || '招待情報の取得に失敗しました');
  } catch (error) {
    console.error('招待トークンの処理中にエラーが発生しました:', error);
    throw error;
  }
}

/**
 * 新しい招待を作成する
 */
async function createNewInvitation(
  supabase: any,
  groupId: string,
  userId: string,
  expirationTimestamp: string,
): Promise<string> {
  const invitationToken = crypto.randomUUID();

  const { error: createError } = await supabase
    .from('group_invitations')
    .insert({
      group_id: groupId,
      invitation_token: invitationToken,
      expires_at: expirationTimestamp,
      created_by: userId,
    });

  if (createError) {
    throw new Error('招待の作成に失敗しました: ' + createError.message);
  }

  return invitationToken;
}

/**
 * 招待の有効期限を更新する
 */
async function updateInvitationExpiry(
  supabase: any,
  invitationToken: string,
  expirationTimestamp: string,
): Promise<void> {
  const { error: updateError } = await supabase
    .from('group_invitations')
    .update({ expires_at: expirationTimestamp })
    .eq('invitation_token', invitationToken);

  if (updateError) {
    throw new Error('有効期限の更新に失敗しました: ' + updateError.message);
  }
}
