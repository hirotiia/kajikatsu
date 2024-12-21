'use client';

import useSWR from 'swr';

import { Result } from '@/types/result.types';

export type MyTasks = {
  id: string;
  title: string;
  description: string | null;
  groupName: string | null;
  statusName: string | null;
  createdBy: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  expiresAt: string | null;
};
export type MyTasksResponse = Result<MyTasks[]>;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useMyTasks = () => {
  const { data, error, isLoading } = useSWR<MyTasksResponse>(
    '/api/get/get-my-tasks',
    fetcher,
  );

  return {
    myTasks: data?.data || [],
    isLoading,
    error: error || data?.error || null,
  };
};
