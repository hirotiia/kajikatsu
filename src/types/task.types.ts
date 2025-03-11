export type Task = {
  id: string;
  title: string;
  description: string | null;
  statusId?: string | null;
  statusName: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  expiresAt: string | null;
};
