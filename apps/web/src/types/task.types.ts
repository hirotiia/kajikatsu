export type Task = {
  id: string;
  title: string;
  description: string | null;
  statusId?: string | null;
  statusName: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  expiresAt: string | null;
  assigneeId?: string | null;
};

export type TaskHistory = {
  id: string;
  task_id: string;
  action_id: string;
  changed_by: string;
  changed_at: string;
  details: {
    old: TaskDetails | null;
    new: TaskDetails | null;
  };
};

export type TaskDetails = {
  id: string;
  title: string;
  description: string | '';
  status_id: string;
  is_deleted: boolean;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  expires_at: string | null;
  assignee_id: string | null;
  group_id: string;
};

export type EnhancedTaskHistory = {
  action: {
    name: 'updated' | 'completed' | 'created' | 'deleted' | undefined;
  };
  changedBy: {
    username: string;
    avatarUrl: string | null;
  };
  changedAt: string;
  details: {
    old: EnhancedTaskDetails | null;
    new: EnhancedTaskDetails | null;
  };
};

export type EnhancedTaskDetails = {
  title: string;
  description: string | '';
  status: {
    name: string;
  };
  expiresAt: string | null;
  assignee: {
    username: string;
  } | null;
  group: {
    name: string;
  };
};
