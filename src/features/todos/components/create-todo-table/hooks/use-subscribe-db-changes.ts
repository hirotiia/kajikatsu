import { useEffect } from 'react';

import { subscribeDBChanges } from '@/lib/supabase/realtime/subscribe-db-changes';
import { trpc } from '@/trpc/client';

export const useSubscribeDBChanges = () => {
  const { data, refetch, error } =
    trpc.myTasksAndGroupMembers.getMyTasksAndGroupMembers.useQuery();
  const { data: userProfile } = trpc.userProfile.getUserProfile.useQuery();
  const filter = userProfile?.group?.id
    ? `group_id=eq.${userProfile?.group?.id}`
    : `created_by=eq.${userProfile?.userId}`;

  useEffect(() => {
    const channel = subscribeDBChanges({
      schema: 'public',
      table: 'tasks',
      filter: filter,
      onChange: () => {
        refetch();
      },
    });

    return () => {
      channel.unsubscribe();
    };
  }, [filter, refetch]);

  return { data, error };
};
