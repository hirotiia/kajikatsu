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
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
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
          'repeat(auto-fit, minmax(min(var(--column-min-size), 100%), 1fr))',
        'custom-layout':
          '1fr minmax(var(--viewport-min), var(--viewport-max)) 1fr',
      },
      gap: {
        'custom-gap': 'var(--gap)',
        'layout-gap': 'var(--layout-gap)',
        'custom-gutter': 'var(--gutter)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
export default config;
