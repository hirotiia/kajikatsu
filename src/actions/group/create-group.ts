'use server';

import { createClient } from '@/lib/supabase/server';

export const createGroup = async (
  state: any,
  formData: FormData,
): Promise<any | null> => {
  const supabase = await createClient();
  const groupData = {
    name: formData.get('group') as string,
  };

  const { error } = await supabase.from('groups').insert([groupData]);
  console.log(error);
};
