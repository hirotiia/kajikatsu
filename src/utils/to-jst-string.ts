/**
 * UTC時間を日本時間(JST)に変換し、表示用の形式にフォーマットする
 *
 * @param utcDateString - UTCタイムスタンプ文字列 (例: "2025-01-28T08:01:02.490806")
 * @returns {string} - 日本時間でフォーマットされた日時文字列 (例: "2025年1月28日 17:01")
 */
export const toJstString = (utcDateString: string): string => {
  if (!utcDateString) return '';

  try {
    const utcDate = new Date(utcDateString);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };

    // 日本時間形式に変換 (例: "2025年1月28日 17:01")
    return new Intl.DateTimeFormat('ja-JP', options).format(utcDate);
  } catch (error) {
    console.error('日付変換エラー:', error);
    return utcDateString;
  }
};

/**
 * UTC時間を日本時間(JST)に変換し、datetime属性用のISO形式にフォーマットする
 *
 * @param utcDateString - UTCタイムスタンプ文字列 (例: "2025-01-28T08:01:02.490806")
 * @returns {string} - JST時間のISO形式文字列 (例: "2025-01-28T17:01:02+09:00")
 */
export const toJstIsoString = (utcDateString: string): string => {
  if (!utcDateString) return '';

  try {
    // UTCタイムスタンプをDate型に変換
    const utcDate = new Date(utcDateString);

    // JST時間に9時間を加算
    const jstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);

    // ISO文字列に変換して、UTCのZをJSTの+09:00に置き換え
    return jstDate.toISOString().replace('Z', '+09:00');
  } catch (error) {
    console.error('ISO日付変換エラー:', error);
    return utcDateString; // エラー時は元の文字列を返す
  }
};

/**
 * タイムスタンプを日本時間の文字列に変換する
 * 形式: 2023/05/20 14:30:45
 */
/**
 * UTC時間を日本時間(JST)に変換し、表示用の形式にフォーマットする
 *
 * @param utcDateString - UTCタイムスタンプ文字列 (例: "2025-01-28T08:01:02.490806")
 * @returns {string} - 日本時間でフォーマットされた日時文字列 (例: "2025/01/28 14:30:45")
 */
export function toFormatJST(timestamp: string | Date | null): string {
  if (!timestamp) return '';

  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;

  return date.toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}
