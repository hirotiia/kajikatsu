import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      reporter: ['text', 'html'],
      exclude: [
        '**/*.d.ts',
        '**/*.stories.*',
        '**/__tests__/**',
        '**/node_modules/**',
        '**/coverage/**',
        '**/dist/**',
        '**/public/**',
        '**/.next/**',
        '**/*.types.ts',
        '**/types/**',
      ],
    },
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    setupFiles: [path.resolve(dirname, './src/test/setup.ts')],
  },
  esbuild: {
    jsx: 'automatic',
  },
});
