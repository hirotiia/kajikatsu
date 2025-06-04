/* eslint-disable check-file/filename-naming-convention */

import { createCallerFactory, createTRPCRouter } from '../init';

import { myTasksAndGroupMembersRouter } from './supabase/rpc/my-tasks-and-group-members';
import { targetHistoryRouter } from './supabase/rpc/target-history';
import { userProfileRouter } from './supabase/rpc/user-profile';

export const appRouter = createTRPCRouter({
  targetHistory: targetHistoryRouter,
  userProfile: userProfileRouter,
  myTasksAndGroupMembers: myTasksAndGroupMembersRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
