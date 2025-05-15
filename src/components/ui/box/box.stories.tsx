import { Meta, StoryObj } from '@storybook/react';

import { Box } from './index';

const meta: Meta<typeof Box> = {
  component: Box,
  title: 'Ui/Box',
  tags: ['autodocs'],
  argTypes: {
    border: {
      control: 'select',
      options: ['default', 'primary'],
    },
    bg: {
      control: 'select',
      options: ['default', 'primary'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary'],
    },
    rounded: {
      control: 'select',
      options: ['default', 'none'],
    },
    mt: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'none'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    children:
      'これはダミーテキストです。この文章は見た目を確認するために使われています。実際の文章が入る前に、デザインやレイアウトを確認するための仮のテキストです。改行や行間、フォントサイズの調整に役立ちます。',
    className: '',
    border: 'default',
    bg: 'default',
    color: 'default',
    rounded: 'default',
    mt: 'md',
  },
};

export const Primary: Story = {
  args: {
    ...Default.args,
    border: 'primary',
    bg: 'primary',
    color: 'primary',
  },
};
