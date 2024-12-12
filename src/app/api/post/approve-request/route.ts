/** 参加リクエストを承認 */

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
  const json = await request.json();
  const { requestId } = await json;
  const editor = process.env.GROUP_ROLE_ID_EDITOR;

  if (!editor) {
    return NextResponse.json<ErrorResponse>(
      {
        message: '権限の取得に失敗しました。',
        type: 'error',
      },
      { status: 401 },
    );
  }

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

  const userId = user.id;

  // join_requestsテーブルにデータを記録
  const { error } = await supabase
    .from('join_requests')
    .update({
      status: 'approved',
      processed_at: new Date().toISOString(),
      processed_by: userId,
    })
    .eq('id', requestId);

  if (error) {
    return NextResponse.json<ErrorResponse>(
      {
        message: 'リクエスト承認処理が失敗しました',
        type: 'error',
        errorDetails: error?.message,
      },
      { status: 401 },
    );
  }

  // 参加リクエストからデータを取得
  const { data: requestData, error: requestDataError } = await supabase
    .from('join_requests')
    .select(`invitation_id,user_id`)
    .eq('id', requestId)
    .single();

  if (!requestData || requestDataError) {
    return NextResponse.json<ErrorResponse>(
      {
        message: 'グループの追加に必要な情報の取得に失敗しました。',
        type: 'error',
        errorDetails: requestDataError?.message,
      },
      { status: 401 },
    );
  }

  const requestUser_id = requestData.user_id;
  const { invitation_id } = requestData;

  // ぐるーぷ情報を取得
  const { data: groupData, error: groupDataError } = await supabase
    .from('group_invitations')
    .select('group_id')
    .eq('id', invitation_id)
    .single();

  if (!groupData || groupDataError) {
    return NextResponse.json<ErrorResponse>(
      {
        message: 'グループの追加に必要な情報の取得に失敗しました。',
        type: 'error',
        errorDetails: groupDataError?.message,
      },
      { status: 401 },
    );
  }

  const { group_id } = groupData;

  // すでにグループに参加していないか確認
  const { count, error: duplicatedGroupError } = await supabase
    .from('user_groups')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', requestUser_id);

  if (duplicatedGroupError) {
    return NextResponse.json<ErrorResponse>(
      {
        message: 'ユーザーのグループ情報を取得できませんでした。',
        type: 'error',
        errorDetails: duplicatedGroupError?.message,
      },
      { status: 401 },
    );
  }

  if (count && count > 0) {
    return NextResponse.json<ErrorResponse>(
      {
        message: 'このユーザーはすでにグループに参加しています。',
        type: 'error',
      },
      { status: 401 },
    );
  }

  // リクエストを送信したユーザーをグループに追加
  const { error: userGroupError } = await supabase.from('user_groups').insert({
    group_id: group_id,
    user_id: requestUser_id,
    role_id: editor,
  });

  if (userGroupError) {
    return NextResponse.json<ErrorResponse>(
      {
        message: 'グループの追加に失敗しました。',
        type: 'error',
        errorDetails: userGroupError?.message,
      },
      { status: 401 },
    );
  }

  return NextResponse.json<SuccessResponse>(
    {
      message: 'リクエストを承認しました。',
      type: 'success',
    },
    { status: 200 },
  );
}
