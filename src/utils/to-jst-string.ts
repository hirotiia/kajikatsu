/**
 * 受け取った時刻文字列を日本時間 (JST) で表すローカル文字列に変換します。
 *
 * @param dateString - 変換したい時刻文字列 (ISO 8601 形式など)
 * @returns 日本時間としての時刻を表すローカル文字列
 */
export function toJstString(dateString: string): string {
  const date = new Date(dateString);

  // 引数が無効な日時文字列の場合、エラーを投げる
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string');
  }

  // 日本時間 (Asia/Tokyo) でフォーマットした文字列を返す
  return date.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
}
