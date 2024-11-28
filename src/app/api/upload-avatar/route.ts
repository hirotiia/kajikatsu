/**
 * 初回アップロード
 *
 * ユーザーが画像を選択。
 * ファイル名にuuidやタイムスタンプを含めてアップロード。
 * storage.objectsのownerを現在のユーザーIDで更新。
 * アップロードされた画像のURLを生成し、public.users.avatar_urlに保存。
 */

/**
 * 二回目以降のアップロード
 *
 * ユーザーが新しい画像を選択。
 * 古い画像の削除（必要に応じて）。
 * 新しい画像をアップロード。
 * 新しい画像のファイル名に応じてstorage.objectsのownerを更新。
 * 新しい画像URLをpublic.users.avatar_urlに保存。
 */

import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

type ApiResponse =
  | {
      message: string | undefined;
      type: 'success';
      avatar_url: string;
    }
  | {
      message: string | undefined;
      type: 'error';
      error?: string;
    };

export async function POST(
  request: Request,
): Promise<NextResponse<ApiResponse>> {
  const supabase = await createClient();

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const extension = file?.name.split('.').pop();
    const { data, error, status } = await supabase.from('users').select('id');

    const userId = data?.[0].id;

    if (!file || !userId) {
      return NextResponse.json<ApiResponse>(
        {
          message: error?.message,
          type: 'error',
        },
        { status: status },
      );
    }

    const fileName = `${userId}.${extension}`;
    const filePath = fileName;

    // Supabase Storageにアップロード
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      return NextResponse.json<ApiResponse>(
        {
          message: uploadError.message,
          type: 'error',
        },
        { status: 400 },
      );
    }

    // 公開URLを取得
    const { data: publicURL } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath, {
        transform: {
          resize: 'cover',
        },
      });

    const { publicUrl: avatar_url } = publicURL;

    // usersテーブルのavatar_urlを更新
    const { error: userUpdateError, status: userUpdateStatus } = await supabase
      .from('users')
      .update({ avatar_url })
      .eq('id', userId);

    if (userUpdateError) {
      return NextResponse.json<ApiResponse>(
        {
          message: userUpdateError.message,
          type: 'error',
        },
        { status: userUpdateStatus },
      );
    }

    return NextResponse.json({
      message: 'アバターのアップが完了しました',
      type: 'success',
      avatar_url,
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        message: error.message,
        type: 'error',
      },
      { status: 500 },
    );
  }
}
