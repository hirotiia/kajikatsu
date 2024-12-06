'use server';

import { getGroup } from '@/lib/supabase/group/group';
import { createClient } from '@/lib/supabase/server';
export const inviteGroup = async (
  state: any,
  formData: FormData,
): Promise<any | null> => {
  const supabase = await createClient();
  const { group, error, user } = await getGroup();
  const expires_at = formData.get('expires_at') as string;
  const remainingHours = parseInt(expires_at, 10) * 60 * 60 * 1000;
  const now = new Date();
  const expirationDate = new Date(now.getTime() + remainingHours);
  const expirationTimestamp = new Date(
    expirationDate.getTime() + 9 * 60 * 60 * 1000, // 時差9時間分を加算
  ).toISOString();

  if (error) {
    return {
      type: 'error',
      status: error.code,
      message: error.message,
      url: '',
    };
  }

  if (!group || !user) {
    return {
      type: 'warning',
      status: '警告',
      message: '処理に必要なデータが取得できませんでした。',
      url: '',
    };
  }

  const groupId = group[0].group_id;

  const { data: invitaionData, error: invitationDataError } = await supabase
    .from('group_invitations')
    .select('invitation_token')
    .eq('group_id', groupId)
    .single();

  if (invitationDataError) {
    return {
      type: 'error',
      status: invitationDataError.code,
      message: invitationDataError.message,
      url: '',
    };
  }

  const url = `${process.env.NEXT_PUBLIC_PROJECT_URL}/join?invitation_token=${invitaionData?.invitation_token}&expires_at=${expirationTimestamp}`;

  const { error: expireError } = await supabase
    .from('group_invitations')
    .update({
      expires_at: expirationTimestamp as string,
    })
    .eq('invitation_token', invitaionData?.invitation_token);

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
