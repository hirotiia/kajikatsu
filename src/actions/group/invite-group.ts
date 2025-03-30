'use server';

import { createClient } from '@/lib/supabase/server';
import { calculateExpirationTime } from '@/utils/to-jst-string';

/**
 * ユーザーのグループIDを取得して他のユーザーを招待するinvitation_tokenを発行して、それを元にQRコードと招待リンクを生成する
 * すでにグループ内にinvitation_tokenが生成されている場合は、それを利用してQRコードと招待リンクを生成する
 */
export const inviteGroup = async (
  state: any,
  formData: FormData,
): Promise<any | null> => {
  const supabase = await createClient();
  const expiresAt = formData.get('expires_at') as string;
  const groupId = formData.get('groupId') as string;
  const userId = formData.get('userId') as string;

  const expirationTimestamp = calculateExpirationTime(expiresAt);

  // すでにユーザーのグループIDに一致するカラムが存在する場合はそれを返す。
  const { data: existingInvitation, error: existingError } = await supabase
    .from('group_invitations')
    .select('invitation_token')
    .eq('group_id', groupId)
    .single();

  let invitationToken;

  if (existingError && existingError.code === 'PGRST116') {
    // 招待が存在しない場合は新規作成
    invitationToken = crypto.randomUUID();
    const { error: createError } = await supabase
      .from('group_invitations')
      .insert({
        group_id: groupId,
        invitation_token: invitationToken,
        expires_at: expirationTimestamp,
        created_by: userId,
      });

    if (createError) {
      return {
        type: 'error',
        status: createError.code,
        message: '招待の作成に失敗しました: ' + createError.message,
        url: '',
      };
    }
  } else if (existingError) {
    // その他のエラー
    return {
      type: 'error',
      status: existingError.code,
      message: existingError.message,
      url: '',
    };
  } else {
    // 既存の招待がある場合
    invitationToken = existingInvitation.invitation_token;

    // 有効期限を更新
    const { error: updateError } = await supabase
      .from('group_invitations')
      .update({ expires_at: expirationTimestamp })
      .eq('invitation_token', invitationToken);

    if (updateError) {
      return {
        type: 'error',
        status: updateError.code,
        message: updateError.message,
        url: '',
      };
    }
  }

  if (!invitationToken) return null;

  const url = `${process.env.NEXT_PUBLIC_PROJECT_URL}/join?invitation_token=${invitationToken}&expiresAt=${expirationTimestamp}`;

  const { error: expireError } = await supabase
    .from('group_invitations')
    .update({
      expires_at: expirationTimestamp as string,
    })
    .eq('invitation_token', invitationToken);

  if (expireError) {
    return {
      type: 'error',
      status: expireError.code,
      message: expireError.message,
      url: '',
    };
  }

  return {
    type: 'success',
    status: 200,
    message: 'リンクが生成されました。',
    url: url,
  };
};
