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
import { getUser } from '@/lib/supabase/user/user';

type SuccessResponse = {
  url: string;
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

  try {
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

    // リクエストからファイルを取得
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json<ErrorResponse>(
        {
          message: 'ファイルが見つかりません。',
          type: 'error',
        },
        { status: 400 },
      );
    }

    // ファイルの検証
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif', 'svg'];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    const fileNameParts = file.name.split('.');
    const extension = fileNameParts.pop()?.toLowerCase();

    if (!extension || !allowedExtensions.includes(extension)) {
      return NextResponse.json<ErrorResponse>(
        {
          message: 'サポートされていないファイル形式です。',
          type: 'error',
        },
        { status: 400 },
      );
    }

    if (file.size > maxFileSize) {
      return NextResponse.json<ErrorResponse>(
        {
          message:
            'ファイルサイズが大きすぎます。5MB以下のファイルを選択してください。',
          type: 'error',
        },
        { status: 400 },
      );
    }

    const fileName = `${userId}.${extension}`;

    // 既存のアバターを削除（必要に応じて）
    const { data: files, error: listError } = await supabase.storage
      .from('avatars')
      .list(userId, {
        limit: 5,
      });

    if (listError) {
      console.error('Error listing files:', listError.message);
    }

    const filesToDelete = files?.map((file) => `${userId}/${file.name}`);

    if (filesToDelete && filesToDelete.length > 0) {
      const { error: deleteError } = await supabase.storage
        .from('avatars')
        .remove(filesToDelete);

      if (deleteError) {
        console.error('Error deleting files:', deleteError.message);
      }
    }

    // ファイルをアップロード
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      return NextResponse.json<ErrorResponse>(
        {
          message: 'ファイルのアップロードに失敗しました。',
          type: 'error',
          errorDetails: uploadError.message,
        },
        { status: 500 },
      );
    }

    // 公開URLを取得
    const {
      data: { publicUrl: avatar_url },
    } = supabase.storage.from('avatars').getPublicUrl(fileName);

    // キャッシュ対策
    const avatarUrlWithQuery = `${avatar_url}?t=${Date.now()}`;

    // usersテーブルのavatar_urlを更新
    const { error: updateError } = await supabase
      .from('users')
      .update({ avatar_url: avatarUrlWithQuery })
      .eq('id', userId)
      .single();

    if (updateError) {
      return NextResponse.json<ErrorResponse>(
        {
          message: 'ユーザープロフィールの更新に失敗しました。',
          type: 'error',
          errorDetails: updateError.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json<SuccessResponse>(
      {
        url: avatarUrlWithQuery,
        type: 'success',
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json<ErrorResponse>(
      {
        message: 'サーバーエラーが発生しました。',
        type: 'error',
        errorDetails: error.message,
      },
      { status: 500 },
    );
  }
}
