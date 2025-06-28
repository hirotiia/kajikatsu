export type NotificationType = {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning' | null;
  status: number | undefined;
  message?: string | null;
};
