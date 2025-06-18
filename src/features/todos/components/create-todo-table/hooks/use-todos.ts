'use client';

import { useEffect, useState } from 'react';

import { subscribeDBChanges } from '@/lib/supabase/realtime/subscribe-db-changes';
import { trpc } from '@/trpc/client';

export const useTodos = <T extends string>(
  initialData: Array<
    Record<T, React.ReactNode> & { id: string } & { [key: string]: unknown }
  >,
) => {
  const [todos, setTodos] = useState(initialData);
  const { data: userProfile } = trpc.userProfile.getUserProfile.useQuery();
  const { data, refetch, error } =
    trpc.myTasksAndGroupMembers.getMyTasksAndGroupMembers.useQuery(undefined, {
      enabled: !!userProfile,
    });
  const filter = userProfile?.group?.id
    ? `group_id=eq.${userProfile?.group?.id}`
    : `created_by=eq.${userProfile?.userId}`;

  useEffect(() => {
    const tasks = data?.tasks ?? [];
    console.log(tasks, setTodos);
    // if (!isEqual(tasks, todos)) {
    //   setTodos(tasks);
    // }
  }, [data?.tasks, todos]);

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

  return { todos, error };
};
