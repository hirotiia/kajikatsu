import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

/**
 * 参加リクエストを拒否
 * 参加リクエストのステータスをrejectedに変更する
 */
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

  // リクエストの状態を変更
  const { error } = await supabase
    .from('join_requests')
    .update({ status: 'rejected' })
    .eq('id', requestId);

  if (error) {
    return NextResponse.json<ErrorResponse>(
      {
        message: 'リクエスト拒否の処理に失敗しました',
        type: 'error',
        errorDetails: error?.message,
      },
      { status: 401 },
    );
  }

  return NextResponse.json<SuccessResponse>(
    {
      message: 'リクエストを拒否しました。',
      type: 'success',
    },
    { status: 200 },
  );
}
