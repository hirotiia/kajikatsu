export type Notification<T = 'success' | 'error' | 'info' | 'warning'> = {
  type: T;
  title: string;
  message?: string;
};
