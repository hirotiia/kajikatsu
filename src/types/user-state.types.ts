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
  id: string;
  username: string;
  avatar_url: string | null;
  group: GroupData | null;
};
