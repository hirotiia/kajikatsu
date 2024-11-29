/**
 * APIに画像データとユーザーIDをアップロードする関数
 * @param file - アップロードする画像ファイル
 * @returns アップロード成功メッセージ
 * @throws Error - アップロード失敗時のエラー
 */

type UploadProps = {
  file: File | null;
};

export const uploadAvatar = async ({ file }: UploadProps) => {
  if (!file) {
    throw new Error('No file selected.');
  }

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/post/upload-avatar', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'アップロードに失敗しました。');
  }

  return await response.json();
};
