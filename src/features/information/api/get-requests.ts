/** ログアウトしたユーザーようにページロードでDBから参加リクエストを受け取る */
'use client';
import useSWR from 'swr';

import { JoinRequest } from '@/types/join-requests.types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useJoinRequests = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR<JoinRequest[]>(
    `/api/get/get-requests?userId=${userId}`,
    fetcher,
  );

  return {
    joinRequests: data || [],
    isLoading,
    error,
    mutate,
  };
};
