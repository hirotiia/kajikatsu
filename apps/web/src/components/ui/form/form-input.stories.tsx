import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/test';

import { FormInput } from './form-input';

const meta: Meta<typeof FormInput> = {
  title: 'UI/Form',
  component: FormInput,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label for the input field',
      defaultValue: 'Input Label',
    },
    id: {
      control: 'text',
      description: 'The unique identifier for the input field',
      defaultValue: 'input-id',
    },
    name: {
      control: 'text',
      description: 'The name attribute for the input field',
      defaultValue: 'input-name',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
      description: 'The type of the input field',
      defaultValue: 'text',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the input field',
      defaultValue: '',
    },
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The layout of the form input',
      defaultValue: 'horizontal',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input field is required',
      defaultValue: false,
    },
    error: {
      control: { type: 'multi-select' },
      options: ['Error message 1', 'Error message 2', 'Error message 3'],
      description: 'An array of error messages for the input field',
      defaultValue: [],
    },
  },
};
export default meta;
type Story = StoryObj<typeof FormInput>;

export const Input: Story = {
  args: {
    label: 'ラベルテキスト',
    id: 'input-id',
    name: 'input-name',
    type: 'text',
    layout: 'horizontal',
    required: false,
  },
};

export const Testing: Story = {
  args: {
    label: 'テスト用ラベル',
    id: 'test-id',
    name: 'input-name',
    type: 'text',
    layout: 'horizontal',
    required: false,
  },
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    expect(input).toHaveTextContent('');
  },
};
