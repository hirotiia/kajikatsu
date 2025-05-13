import { Meta, StoryObj } from '@storybook/react';

import { Button } from './index';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      default: 'default',
      options: ['default', 'login', 'destructive'],
    },
    size: {
      control: 'select',
      default: 'default',
      options: ['default', 'full', 'small', 'auto'],
    },
    rounded: {
      control: 'select',
      default: 'sm',
      options: ['sm', 'md'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'デフォルト',
    className: '',
    variant: 'default',
    size: 'default',
    rounded: 'sm',
  },
};
