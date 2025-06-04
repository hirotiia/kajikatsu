import * as Sentry from '@sentry/nextjs';

import { FunctionReturn } from '@/types/supabase/database.types';
import { TRPCContext } from '@/types/trpc';

export type TasksAndMembers = FunctionReturn<'get_my_tasks_and_group_members'>;

export const fetchMyTasksAndGroupMembersRpc = async (
  ctx: Pick<TRPCContext, 'supabase'>,
): Promise<TasksAndMembers | null> => {
  const { supabase } = ctx;
  const { data, error } = await supabase.rpc(
    'get_my_tasks_and_group_members',
    {},
  );

  if (error) {
    Sentry.captureException(error, {
      extra: {
        location: 'fetchMyTasksAndGroupMembersRpc',
        timestamp: new Date().toISOString(),
      },
      tags: {
        function: 'get_my_tasks_and_group_members',
        severity: 'auth',
      },
    });

    throw new Error(error.message);
  }

  return data;
};
