'use client';

import { useSelector } from 'react-redux';

import { RootState } from '@/stores';

export const RenderIntorductionMessage = () => {
  const userState = useSelector((state: RootState) => state.user);
  return (
    <>
      {userState.loading ? (
        <p className="text-center text-lg">
          <b>読み込み中...</b>
        </p>
      ) : userState.data ? (
        <p className="text-center text-lg">
          <b>{`ようこそ、${userState.data.username}さん`}</b>
        </p>
      ) : (
        <p className="text-center text-lg">
          <b>{`ようこそ、Unknown Userさん`}</b>
        </p>
      )}
    </>
  );
};
