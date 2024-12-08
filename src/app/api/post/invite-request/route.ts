/**
 * グループトークンと有効期限を元にグループ申請を送る
 */

import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';
import { getUser } from '@/lib/supabase/user/user';

type SuccessResponse = {
  message: string;
  type: 'success';
};

type ErrorResponse = {
  message: string;
  type: 'error';
  errorDetails?: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;

export async function POST(
  request: Request,
): Promise<NextResponse<ApiResponse>> {
  const supabase = await createClient();
  const jsonData = await request.json();
  const invitation_token = jsonData.invitation_token as string | null;
  const expires_at = jsonData.expires_at as string | null;

  // ユーザー情報を取得
  const { user, authError } = await getUser();

  if (authError || !user) {
    return NextResponse.json<ErrorResponse>(
      {
        message: 'ユーザー情報の取得に失敗しました。',
        type: 'error',
        errorDetails: authError?.message,
      },
      { status: 401 },
    );
  }

  const user_id = user.id;

  if (!invitation_token || !expires_at) {
    return NextResponse.json<ErrorResponse>(
      {
        message: 'グループの申請に必要なデータが取得できませんでした。',
        type: 'error',
      },
      { status: 400 },
    );
  }

  // トークンに一致するグループを探す
  const { data: invitationData, error } = await supabase
    .from('group_invitations')
    .select('id')
    .eq('invitation_token', invitation_token)
    .single();

  if (error) {
    return NextResponse.json<ErrorResponse>(
      {
        message: 'グループの取得に失敗しました。',
        type: 'error',
        errorDetails: error?.message,
      },
      { status: 401 },
    );
  }

  // グループにすでに入っているユーザーではないか確認する

  // 有効期限ないかどうか確認する

  // 重複した申請がないか確認する

  // 参加リクエストテーブルにカラムを追加する
  const { data: requestData, error: requestError } = await supabase
    .from('join_requests')
    .insert({
      invitation_id: invitationData.id,
      user_id,
      status: 'pending',
    });

  console.log('--------------------------');
  console.log(invitationData.id, user_id);
  console.log('--------------------------');
  console.log(requestData, requestError);

  if (requestError) {
    return NextResponse.json<ErrorResponse>(
      {
        message: 'リクエストの送信に失敗しました。',
        type: 'error',
        errorDetails: requestError?.message,
      },
      { status: 401 },
    );
  }

  console.log('---------------------');
  console.log('成功！！！');
  console.log('---------------------');

  return NextResponse.json<SuccessResponse>({
    message: 'グループのオーナーにリクエストを申請しました。',
    type: 'success',
  });
}
