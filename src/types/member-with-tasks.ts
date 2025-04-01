import { Task } from './task.types';

export type MemberWithTasks = {
  user_id: string;
  username: string;
  avatar_url: string | null;
  role: string;
  tasks: Task[];
};
