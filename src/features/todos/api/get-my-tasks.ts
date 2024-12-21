'use client';

import useSWR from 'swr';

import { MyTasksResponse } from '@/lib/supabase/data/tasks/select/get-my-tasks';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useMyTasks = () => {
  const { data, error, isLoading } = useSWR<MyTasksResponse>(
    '/api/get/get-my-tasks',
    fetcher,
  );

  return {
    myTasks: data,
    isLoading,
    error,
  };
};
