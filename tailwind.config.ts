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
      gridTemplateRows: {
        subgrid: 'subgrid',
      },
      gridTemplateColumns: {
        custom:
          'repeat(auto-fill, minmax(min(var(--column-min-size), 100%), 1fr))',
        'custom-layout':
          '1fr minmax(var(--viewport-min), var(--viewport-max)) 1fr',
      },
      gap: {
        'custom-gap': 'var(--gap)',
        'layout-gap': 'var(--layout-gap)',
        'custom-gutter': 'var(--gutter)',
      },
    },
  },
  plugins: [],
};
export default config;
