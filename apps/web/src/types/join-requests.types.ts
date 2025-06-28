export type JoinRequest = {
  id: string;
  invitation_id: string;
  user_id: string;
  requested_at: string;
  status: 'pending' | 'approved' | 'rejected';
  group_invitations: {
    group_id: string;
    groups: {
      name: string;
    };
  };
  users: {
    username: string | null;
  };
};
