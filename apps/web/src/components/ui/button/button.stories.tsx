import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button } from './index';

const meta: Meta<typeof Button> = {
  title: 'Ui/Button',
  component: Button,
  args: {
    onClick: fn(),
  },
  argTypes: {
    onClick: {
      action: 'clicked',
    },
    children: {
      control: 'text',
      description: 'ボタンのテキスト',
    },
    variant: {
      control: 'select',
      options: ['default', 'login', 'destructive'],
      description: 'ボタンのスタイル',
    },
    size: {
      control: 'select',
      options: ['default', 'full', 'small', 'auto'],
      description: 'ボタンのサイズ',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'ボタン',
    variant: 'default',
  },
};

export const Login: Story = {
  args: {
    children: 'ログイン',
    variant: 'login',
  },
};

export const Destructive: Story = {
  args: {
    children: '削除',
    variant: 'destructive',
  },
};

export const Size: Story = {
  args: {
    children: 'フルサイズボタン',
    variant: 'default',
    size: 'full',
  },
};
