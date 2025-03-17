import { redirect } from 'next/navigation';

import { UserTab } from '@/features/todos/components/tab/user-tab';
import { getUser } from '@/lib/supabase/user/user';

export const MyTaskTabContent = async () => {
  const { user, authError } = await getUser();

  if (authError || !user) {
    redirect('/login');
  }

  return <UserTab userId={user.id} />;
};
