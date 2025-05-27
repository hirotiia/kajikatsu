import { createClient } from '@/lib/supabase/server';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';

type FilterOption = {
  year: number;
  month: number;
};
// TODO: 履歴データ取得と加工を行う
export const fetchTasksHistory = async (
  options: FilterOption,
): Promise<string[]> => {
  const supabase = await createClient();
  const data = await fetchUserData();

  if (!data) {
    return [];
  }

  const { data: tasks, error } = await supabase.rpc(
    'get_task_history_by_month',
    {
      p_user_id: data.userId,
      p_year: options.year,
      p_month: options.month,
    },
  );
  console.log('--------------------------------');
  console.log(data.userId);
  console.log(options);
  console.log(tasks);
  console.log(error);
  console.log('--------------------------------');

  return new Promise((resolve) => resolve(['fetchTasksHistory']));
};
