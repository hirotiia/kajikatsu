type ColorClass = string;

/**
 * デフォルトの背景色とテキスト色を受け取り、
 * ホバー時に色を逆転させ、アニメーションを適用するクラス名を返します。
 *
 * @param defaultBg - デフォルトの背景色クラス（例: 'bg-primary'）
 * @param defaultText - デフォルトのテキスト色クラス（例: 'text-background'）
 * @returns 生成されたクラス名の文字列
 */
export const invertOnHover = (
  defaultBg: ColorClass,
  defaultText: ColorClass,
): string => {
  return `
    ${defaultBg}
    ${defaultText}
    transition-colors
    delay-200
    duration-200
    ease-out
    hover:${defaultBg.replace('bg-', 'text-')}
    hover:${defaultText.replace('text-', 'bg-')}
  `
    .replace(/\s+/g, ' ')
    .trim();
};
