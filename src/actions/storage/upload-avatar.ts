/**
 * APIに画像データとユーザーIDをアップロードする関数
 * @param file - アップロードする画像ファイル
 * @param userId - ユーザーのID
 * @returns アップロード成功メッセージ
 * @throws Error - アップロード失敗時のエラー
 */

type UploadProps = {
  file: File | null;
  userId: string;
};

export const uploadAvatar = async ({ file, userId }: UploadProps) => {
  if (!file) {
    throw new Error('No file selected.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', userId);

  const response = await fetch('/api/upload-avatar', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'アップロードに失敗しました。');
  }

  const result = await response.json();
  return result.message || 'アップロードが成功しました。';
};
