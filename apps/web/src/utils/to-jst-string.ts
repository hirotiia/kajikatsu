/**
 * UTC時間を日本時間(JST)に変換し、表示用の形式にフォーマットする
 *
 * @param timestamp - UTCタイムスタンプ文字列 (例: "2025-01-28T08:01:02.490806")
 * @returns {string} - 日本時間でフォーマットされた日時文字列 (例: "2025年1月28日 17:01")
 */
export const toJstString = (timestamp: string): string => {
  if (!timestamp) return '';
  const UTCTimestamp = timestamp.endsWith('Z') ? timestamp : `${timestamp}Z`;

  try {
    const utcDate = new Date(UTCTimestamp);
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
    return timestamp;
  }
};

/**
 * UTC時間を日本時間(JST)に変換し、datetime属性用のISO形式にフォーマットする
 *
 * @param timestamp - UTCタイムスタンプ文字列 (例: "2025-01-28T08:01:02.490806")
 * @returns {string} - JST時間のISO形式文字列 (例: "2025-01-28T17:01:02+09:00")
 */
export const toJstIsoString = (timestamp: string): string => {
  if (!timestamp) return '';

  const UTCTimestamp = timestamp.endsWith('Z') ? timestamp : `${timestamp}Z`;

  try {
    const utcDate = new Date(UTCTimestamp);
    const jstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);

    return jstDate.toISOString().replace('Z', '+09:00');
  } catch (error) {
    console.error('ISO日付変換エラー:', error);
    return timestamp;
  }
};

/**
 * UTC時間を日本時間(JST)に変換し、表示用の形式にフォーマットする
 *
 * @param timestamp - UTCタイムスタンプ文字列 (例: "2025-01-28T08:01:02.490806")
 * @returns {string} - 日本時間でフォーマットされた日時文字列 (例: "2025/01/28 14:30:45")
 */
export function toFormatJST(timestamp: string | Date | null): string | null {
  if (!timestamp) return null;

  try {
    let normalizedTimestamp = timestamp;
    if (
      typeof timestamp === 'string' &&
      !timestamp.endsWith('Z') &&
      !timestamp.includes('+')
    ) {
      normalizedTimestamp = `${timestamp}Z`;
    }

    const date =
      typeof normalizedTimestamp === 'string'
        ? new Date(normalizedTimestamp)
        : normalizedTimestamp;

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
  } catch (error) {
    console.error('日付変換エラー:', error);
    return typeof timestamp === 'string' ? timestamp : '';
  }
}

/**
 * 現在時刻から指定された分数後の日本時間のISO形式の日時を返す
 * @param minutes - 追加する分数
 * @returns - 日本時間のISO形式の日時文字列
 */
export function calculateExpirationTime(minutes: number | string): string {
  const MILLISECONDS_PER_MINUTE = 60 * 1000;
  const JAPAN_TIMEZONE_OFFSET = 9 * 60 * MILLISECONDS_PER_MINUTE;

  const mins = typeof minutes === 'string' ? parseInt(minutes, 10) : minutes;
  const now = new Date();
  const utcExpirationTime = now.getTime() + mins * MILLISECONDS_PER_MINUTE;
  const japanExpirationDate = new Date(
    utcExpirationTime + JAPAN_TIMEZONE_OFFSET,
  );

  return japanExpirationDate.toISOString();
}
