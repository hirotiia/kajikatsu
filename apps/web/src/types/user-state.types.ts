export type RoleData = {
  id: string;
  name: 'viewer' | 'editor' | 'admin';
};
export type GroupData = {
  id: string;
  name: string;
  role: RoleData;
};

export type UserState = {
  userId: string;
  username: string;
  avatar_url: string | null;
  group: GroupData | null;
};
