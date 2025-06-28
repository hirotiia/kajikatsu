import { tv } from 'tailwind-variants';

export const scrollShadowClassNameGenerator = tv({
  base: [
    'after:absolute after:top-0 after:z-0 after:h-full after:w-3 after:from-[rgba(0,0,0,0.2)] after:to-transparent after:transition-opacity after:duration-200 after:content-[""]',
    /* 影の領域が広すぎるとクリッカブルエリアを侵食するので無効化 */
    'after:pointer-events-none',
    '[&.fixed]:sticky [&.fixed]:after:opacity-100',
  ],
  variants: {
    showShadow: {
      true: 'after:opacity-100',
      false: 'after:opacity-0',
    },
    direction: {
      left: 'after:left-full after:bg-gradient-to-r',
      right: 'after:right-full after:bg-gradient-to-l',
    },
  },
});
