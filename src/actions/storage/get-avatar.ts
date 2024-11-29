/**
 * アバターURLを取得する関数
 * @returns string | null - アバターURL
 * @throws Error
 */

export const getAvatar = async (): Promise<string | null> => {
  const response = await fetch('api/get-avatar');

  return response.json();
};
