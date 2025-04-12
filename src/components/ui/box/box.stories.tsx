import type { Meta, StoryObj } from '@storybook/react';

import { Box } from './box';

const meta = {
  component: Box,
  parameters: {
    layout: 'centerd',
  },
  tags: ['autodocs'],
  argTypes: {
    border: {
      control: 'select',
      options: ['default', 'primary'],
      description: 'ボーダーのスタイルを設定',
    },
    bg: {
      control: 'select',
      options: ['default', 'primary'],
      description: '背景色を設定',
    },
    color: {
      control: 'select',
      options: ['default', 'primary'],
      description: 'テキストカラーを設定',
    },
    rounded: {
      control: 'select',
      options: ['default', 'none'],
      description: '角丸の設定',
    },
    mt: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'none'],
      description: '上部マージンの設定',
    },
    children: {
      control: 'text',
      description: 'ボックス内のコンテンツ',
    },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Box Content',
  },
};

export const BorderVariants: Story = {
  args: {
    children: 'ボーダーバリエーション',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Box border="default">デフォルトのボーダー (border-foreground)</Box>
      <Box border="primary">
        プライマリのボーダー (border-primary-foreground)
      </Box>
    </div>
  ),
};

export const BackgroundVariants: Story = {
  args: {
    children: '背景色バリエーション',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Box bg="default">デフォルトの背景色 (bg-background)</Box>
      <Box bg="primary">プライマリの背景色 (bg-primary)</Box>
    </div>
  ),
};

export const TextColorVariants: Story = {
  args: {
    children: 'テキストカラーバリエーション',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Box color="default">デフォルトのテキスト色 (text-foreground)</Box>
      <Box color="primary">
        プライマリのテキスト色 (text-primary-foreground)
      </Box>
    </div>
  ),
};

export const RoundedVariants: Story = {
  args: {
    children: '角丸バリエーション',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Box rounded="default">デフォルトの角丸 (rounded-md)</Box>
      <Box rounded="none">角丸なし (rounded-none)</Box>
    </div>
  ),
};

export const MarginTopVariants: Story = {
  args: {
    children: '上マージンバリエーション',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Box mt="none">上部マージンなし (mt-0)</Box>
      <Box mt="sm">小さい上部マージン (mt-2)</Box>
      <Box mt="md">中くらいの上部マージン (mt-3)</Box>
      <Box mt="lg">大きい上部マージン (mt-4)</Box>
    </div>
  ),
};

export const Combinations: Story = {
  args: {
    children: 'コンビネーションパターン',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Box
        border="primary"
        bg="primary"
        color="primary"
        rounded="default"
        mt="none"
      >
        プライマリスタイルのボックス
      </Box>
      <Box border="default" bg="default" color="default" rounded="none" mt="lg">
        デフォルトスタイル・角丸なし・大きな上部マージン
      </Box>
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    children:
      'これは長いコンテンツの例です。ボックスコンポーネントは長いテキストでも適切に対応できます。テキストが長い場合、ボックスの幅に合わせて自動的に折り返されます。レスポンシブなパディングも適用されており、モバイルでは p-2（0.5rem）、デスクトップでは p-4（1rem）のパディングが適用されます。',
  },
};

export const MultipleChildren: Story = {
  args: {
    children: (
      <>
        <p>最初の段落</p>
        <p>二番目の段落 - 最初の子要素以外には上部マージンが適用されます</p>
        <p>三番目の段落</p>
      </>
    ),
  },
};

export const AllVariantCombinations: Story = {
  args: {
    children: 'すべてのバリアントの組み合わせパターン',
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
      }}
    >
      <Box border="default" bg="default">
        デフォルトボーダー + デフォルト背景
      </Box>
      <Box border="default" bg="primary">
        デフォルトボーダー + プライマリ背景
      </Box>
      <Box border="primary" bg="default">
        プライマリボーダー + デフォルト背景
      </Box>
      <Box border="primary" bg="primary">
        プライマリボーダー + プライマリ背景
      </Box>

      <Box rounded="default" bg="primary">
        デフォルト角丸
      </Box>
      <Box rounded="none" bg="primary">
        角丸なし
      </Box>
    </div>
  ),
};
