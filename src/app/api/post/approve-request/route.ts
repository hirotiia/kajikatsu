/** 参加リクエストを承認 */
import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';

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

  // リクエスト body から requestId を取得
  const json = await request.json();
  const { requestId } = json;

  // editorロールのIDを Supabase から直接取得
  const { data: editorRoleData, error: editorRoleError } = await supabase
    .from('roles')
    .select('id')
    .eq('name', 'editor')
    .single();

  if (editorRoleError || !editorRoleData) {
    return NextResponse.json<ErrorResponse>(
      {
        message: '権限の取得に失敗しました。',
        type: 'error',
        errorDetails: editorRoleError?.message,
      },
      { status: 401 },
    );
  }
  const editorRoleId = editorRoleData.id;

  // ログインしているユーザー情報を取得
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json<ErrorResponse>(
      {
        message: 'ユーザー情報の取得に失敗しました。',
        type: 'error',
        errorDetails: userError?.message,
      },
      { status: 401 },
    );
  }

  // fetchUserData でユーザー（承認する人）の追加情報を取得（必要に応じて活用）
  const userState = await fetchUserData(user.id);
  if (!userState) {
    // userState が null の場合、ユーザー情報を取れなかったと判断
    return NextResponse.json<ErrorResponse>(
      {
        message: 'ユーザー情報の取得に失敗しました。（詳細データなし）',
        type: 'error',
      },
      { status: 401 },
    );
  }

  // 参加リクエストを承認状態に更新
  const { error } = await supabase
    .from('join_requests')
    .update({
      status: 'approved',
      processed_at: new Date().toISOString(),
      processed_by: user.id,
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

  // 参加リクエストから invitation_id, user_id を取得
  const { data: requestData, error: requestDataError } = await supabase
    .from('join_requests')
    .select(`invitation_id, user_id`)
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

  // 招待情報から group_id を取得
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

  // リクエストを送信したユーザーをグループに追加（role_id には "editor" を設定）
  const { error: userGroupError } = await supabase.from('user_groups').insert({
    group_id,
    user_id: requestUser_id,
    role_id: editorRoleId,
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

  // 正常終了
  return NextResponse.json<SuccessResponse>(
    {
      message: 'リクエストを承認しました。',
      type: 'success',
    },
    { status: 200 },
  );
}
