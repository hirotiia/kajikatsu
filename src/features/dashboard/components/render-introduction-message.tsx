'use client';

import { useSelector } from 'react-redux';

import { RootState } from '@/stores';
import { cn } from '@/utils/cn';

export const RenderIntorductionMessage = ({
  className,
}: {
  className?: string;
}) => {
  const userState = useSelector((state: RootState) => state.user);
  return (
    <>
      {userState.loading ? (
        <p className={cn('text-center text-lg', className)}>
          <b>読み込み中...</b>
        </p>
      ) : userState.data ? (
        <p className={cn('text-center text-lg', className)}>
          <b>{`ようこそ、${userState.data.username}さん`}</b>
        </p>
      ) : (
        <p className={cn('text-center text-lg', className)}>
          <b>{`ようこそ、Unknown Userさん`}</b>
        </p>
      )}
    </>
  );
};
