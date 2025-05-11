import { Meta, StoryObj } from '@storybook/react';

import { Box } from './index';

const meta: Meta<typeof Box> = {
  component: Box,
  title: 'Box',
  tags: ['autodocs'],
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
