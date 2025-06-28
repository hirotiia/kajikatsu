import { Meta, StoryObj } from '@storybook/react';

import { Notification } from './index';

const meta: Meta<typeof Notification> = {
  title: 'Ui/Notifications',
  component: Notification,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<typeof Notification>;

export const Info: Story = {
  args: {
    notificationData: {
      id: '1',
      type: 'info',
      status: 200,
      message: 'This is info notification',
    },
    deleteNotification: (id) => alert(`Dismissing Notification with id: ${id}`),
  },
};

export const Success: Story = {
  args: {
    notificationData: {
      id: '1',
      type: 'success',
      status: 200,
      message: 'This is success notification',
    },
    deleteNotification: (id) => alert(`Dismissing Notification with id: ${id}`),
  },
};

export const Warning: Story = {
  args: {
    notificationData: {
      id: '1',
      type: 'warning',
      status: 200,
      message: 'This is warning notification',
    },
    deleteNotification: (id) => alert(`Dismissing Notification with id: ${id}`),
  },
};

export const Error: Story = {
  args: {
    notificationData: {
      id: '1',
      type: 'error',
      status: 400,
      message: 'This is error notification',
    },
    deleteNotification: (id) => alert(`Dismissing Notification with id: ${id}`),
  },
};
