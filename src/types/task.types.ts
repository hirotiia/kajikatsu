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
  id: string;
  task: {
    id: string;
    title: string;
  };
  action: {
    id: string;
    name: 'updated' | 'completed' | 'created' | 'deleted' | undefined;
  };
  changedBy: {
    id: string;
    username: string;
    avatarUrl: string | null;
  };
  changedAt: string;
  details: {
    old: EnhancedTaskDetails | null;
    new: EnhancedTaskDetails | null;
    changes: Array<{
      field: string;
      oldValue: any;
      newValue: any;
      fieldLabel: string;
    }>;
  };
};

export type EnhancedTaskDetails = {
  id: string;
  title: string;
  description: string | '';
  status: {
    id: string;
    name: string;
  };
  isDeleted: boolean;
  createdBy: {
    id: string;
    username: string;
  };
  createdAt: string;
  updatedBy: {
    id: string;
    username: string;
  };
  updatedAt: string;
  expiresAt: string | null;
  assignee: {
    id: string;
    username: string;
  } | null;
  group: {
    id: string;
    name: string;
  };
};
