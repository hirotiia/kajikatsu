import type { StorybookConfig } from '@storybook/experimental-nextjs-vite';

const config: StorybookConfig = {
  staticDirs: ['../public'],
  stories: [
    '../src/components/ui/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/layouts/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
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
