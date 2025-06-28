import { notification } from './reducer';

export const { add, remove } = notification.actions;
export const { reducer } = notification;
export type { NotificationType } from '@/types/notification/notification.types';
