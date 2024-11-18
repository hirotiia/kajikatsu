'use client';

/**
 * 通知コンポーネントの状態をグローバルで管理し、外部から通知コンポーネントを作成または削除する機能を提供する
 * @returns notificaitons 現在表示するすべての通知コンポーネントの配列
 * @returns addNotification notifications配列にデータを格納
 * @returns deleteNotification 対象のidを持つコンポーネントを非表示にして、notificationsから削除する
 */

import { nanoid } from 'nanoid';
import { useReducer } from 'react';

type Notification = {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
};

type State = Notification[];

type Action =
  | { type: 'add'; payload: Notification }
  | { type: 'delete'; payload: string };

export type NotificationsStore = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  deleteNotification: (id: string) => void;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];

    case 'delete':
      return state.filter((notification) => notification.id !== action.payload);

    default:
      throw new Error('Unhandled action type');
  }
};

export const useNotifications = (): NotificationsStore => {
  const [state, dispatch] = useReducer(reducer, []);
  const addNotification = (notification: Omit<Notification, 'id'>) => {
    dispatch({
      type: 'add',
      payload: { id: nanoid(), ...notification },
    });
  };
  const deleteNotification = (id: string) => {
    dispatch({
      type: 'delete',
      payload: id,
    });
  };

  return { notifications: state, addNotification, deleteNotification };
};
