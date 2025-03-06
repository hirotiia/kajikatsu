import { redirect } from 'next/navigation';

import { fetchTaskHistory } from '@/lib/supabase/data/task-history/select/fetch-task-history';
import { createClient } from '@/lib/supabase/server';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';

type HistoryList = {
  className?: string;
};

// type HistoryData = {
//   id: string;
//   userName: string;
//   avatar: string;
//   action: string;
//   taskDiff: string | React.JSX.Element;
// };

export const HistoryList = async ({ className }: HistoryList) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id ?? null;
  if (!userId) {
    redirect('/login');
  }
  const userData = await fetchUserData(userId);

  if (!userData?.group?.id) {
    redirect('/login');
  }

  const data = await fetchTaskHistory({ userId, groupId: userData?.group?.id });
  console.log(data);
  return (
    <div className={className}>
      <div className=""></div>
    </div>
  );
};
