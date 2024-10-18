import type { Config } from 'tailwindcss';

const config: Config = {
  content: {
    files: [
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/app/**/*.{js,ts,jsx,tsx}',
    ],
  },
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        ring: 'var(--ring)',
        base: {
          DEFAULT: 'var(--base)',
          foreground: 'var(--base-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
      },
      minWidth: {
        custom: 'min(90%, 500px)',
      },
      gridTemplateColumns: {
        'custom-layout':
          '1fr minmax(var(--viewport-min), var(--viewport-max)) 1fr',
      },
      gap: {
        'custom-gap': 'var(--screen-margin)',
      },
    },
  },
  plugins: [],
};
export default config;
