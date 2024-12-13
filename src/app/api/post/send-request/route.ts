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

  // ユーザーがすでにグループに入っている場合、エラーを返す
  const { count } = await supabase
    .from('user_groups')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user_id);

  if (count && count > 0) {
    return NextResponse.json<ErrorResponse>({
      message: 'すでにグループに参加しています。',
      type: 'error',
    });
  }

  // 有効期限ないかどうか確認する
  const { data: result, error: resultError } = await supabase
    .from('group_invitations')
    .select('id, expires_at')
    .eq('id', invitationData.id)
    .gt('expires_at', new Date().toISOString());

  if (resultError) {
    return NextResponse.json<ErrorResponse>(
      {
        message: '有効期限の検証に失敗しました。',
        type: 'error',
        errorDetails: resultError?.message,
      },
      { status: 401 },
    );
  }

  if (result && result.length === 0) {
    return NextResponse.json<ErrorResponse>({
      message: 'このリンクは有効期限切れのリンクです。',
      type: 'error',
    });
  }
  // 重複した申請がないか確認する
  const { count: duplicateRequestCount, error: countError } = await supabase
    .from('join_requests')
    .select('*', { count: 'exact', head: true })
    .eq('invitation_id', invitationData.id)
    .eq('user_id', user_id)
    .or('status.eq.pending,status.eq.approved');

  if (countError) {
    return NextResponse.json<ErrorResponse>(
      {
        message: 'リクエストの重複確認処理が失敗しました。',
        type: 'error',
        errorDetails: countError?.message,
      },
      { status: 401 },
    );
  }

  if (duplicateRequestCount && duplicateRequestCount > 0) {
    return NextResponse.json<ErrorResponse>({
      message:
        '参加リクエストはすでに送信済みです。リクエストが承認されるまで少々お待ちください。',
      type: 'error',
    });
  }

  // 参加リクエストテーブルにカラムを追加する
  const { error: requestError } = await supabase.from('join_requests').insert({
    invitation_id: invitationData.id,
    user_id,
    status: 'pending',
  });

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

  return NextResponse.json<SuccessResponse>({
    message: 'グループのオーナーにリクエストを申請しました。',
    type: 'success',
  });
}
