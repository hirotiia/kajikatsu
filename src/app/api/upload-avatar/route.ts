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

export async function POST(request: Request) {
  const supabase = await createClient();

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const extension = file?.name.split('.').pop();
    const { data } = await supabase.from('users').select('id');

    const userId = data?.[0].id;

    if (!file || !userId) {
      return NextResponse.json(
        { message: 'Invalid input: file and userId are required.' },
        { status: 400 },
      );
    }

    const fileName = `${userId}.${extension}`;
    const filePath = fileName;

    // Supabase Storageにアップロード
    const { error: uploadError, data: storageData } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      return NextResponse.json(
        {
          message: `Failed to upload file: ${uploadError.message}.`,
        },
        { status: 400 },
      );
    }

    if (storageData) {
      return NextResponse.json(
        {
          message: `Success to upload your avatar image.`,
        },
        { status: 200 },
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

    console.log(publicURL);

    // usersテーブルのavatar_urlを更新
    const { error: userUpdateError } = await supabase
      .from('users')
      .update({ avatar_url: publicURL?.publicUrl })
      .eq('id', userId);

    if (userUpdateError) {
      throw new Error(
        `Failed to update avatar URL: ${userUpdateError.message}`,
      );
    }

    return NextResponse.json({ message: 'Avatar updated successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Server error occurred' },
      { status: 500 },
    );
  }
}
