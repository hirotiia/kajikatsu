import { createClient } from '@/lib/supabase/server';

type Status = {
  id: string;
  label: string;
};
export type Statuses = Status[];

export async function fetchStatus(): Promise<Statuses> {
  const supabase = await createClient();

  const { data } = await supabase.from('statuses').select('id, status_name');

  const statuses: Statuses =
    data?.map((row) => ({
      id: row.id,
      label: row.status_name,
    })) || [];

  return statuses;
}
