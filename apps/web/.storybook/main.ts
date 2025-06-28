import type { StorybookConfig } from '@storybook/experimental-nextjs-vite';
import path from 'path';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  staticDirs: ['../public'],
  stories: [
    '../src/components/ui/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/layouts/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'), // ← `@` を `apps/web/src` に解決
        },
      },
    });
  },
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/experimental-nextjs-vite',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  features: {
    experimentalRSC: true,
  },
};
export default config;
