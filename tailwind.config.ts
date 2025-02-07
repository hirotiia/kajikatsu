import type { Config } from 'tailwindcss';

const config: Config = {
  content: {
    files: ['./src/**/*.{js,ts,jsx,tsx}'],
  },
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        ring: 'var(--ring)',
        white25: 'rgba(255, 255, 255, 0.25)',
        white18: 'rgba(255, 255, 255, 0.18)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
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
      backgroundImage: {
        'custom-gradient': 'var(--gradient)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        '4xl': '4px',
      },
      borderRadius: {
        custom: '10px',
      },
    },
  },
  plugins: [],
};
export default config;
