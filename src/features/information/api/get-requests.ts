/** ページロードでDBから参加リクエストを受け取る */
'use client';
import useSWR from 'swr';

import { JoinRequest } from '@/types/join-requests.types';
import { Result } from '@/types/result.types';

export type MyTasksResponse = Result<JoinRequest[]>;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useJoinRequests = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR<MyTasksResponse>(
    `/api/get/get-requests?userId=${userId}`,
    fetcher,
  );

  return {
    joinRequests: data?.data || [],
    isLoading,
    error: error || data?.error || null,
    mutate,
  };
};
