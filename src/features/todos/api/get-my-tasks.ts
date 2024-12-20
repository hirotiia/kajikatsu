'use client';

import useSWR from 'swr';

import { MyTasksResponse } from '@/lib/supabase/data/tasks/select/get-my-tasks';

const fetcher = (url: string) => {
  console.log('----------fetcher called with URL------------');
  console.log(`Fetcher called with URL: ${url}`);
  console.log('----------fetcher called with URL------------');

  return fetch(url).then((res) => res.json());
};

export const useMyTasks = () => {
  const { data, error, isLoading } = useSWR<MyTasksResponse>(
    '/api/get/get-my-tasks',
    fetcher,
  );

  console.log('------------error-------------');
  console.log(error);
  console.log('------------error-------------');

  console.log('------------data-------------');
  console.log(data);
  console.log('------------data-------------');

  return {
    myTasks: data,
    isLoading,
    error,
  };
};
