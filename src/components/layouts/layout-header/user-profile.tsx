'use client';
import { CircleUserRound, CircleX, LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import { DefinitionList } from '@/components/ui/list';
import { Popover } from '@/components/ui/popover';
import { RootState } from '@/stores/store';

export const UserProfile = () => {
  const userState = useSelector((state: RootState) => state.user);
  console.log(userState);

  return (
    <>
      {userState.loading ? (
        <p className="flex gap-2">
          <LoaderCircle className="animate-spin" size={30}>
            読み込み中...
          </LoaderCircle>
          <span>読み込み中</span>
        </p>
      ) : userState.data ? (
        <>
          <Popover
            position="bottom"
            content={({ close }) => (
              <div className="min-w-[300px] p-3 md:max-w-[600px]">
                <p>
                  <b>プロフィール</b>
                </p>
                <DefinitionList
                  spacing="sm"
                  items={[
                    { term: 'HTML', definition: 'HyperText Markup Language' },
                    { term: 'CSS', definition: 'Cascading Style Sheets' },
                    {
                      term: 'JavaScript',
                      definition: (
                        <DefinitionList
                          items={[
                            {
                              term: 'TypeScript',
                              definition:
                                'JavaScriptの上位互換となる型付き言語',
                            },
                          ]}
                        />
                      ),
                    },
                  ]}
                />
                <button onClick={close} className="mt-2 px-2 py-1">
                  閉じる
                </button>
              </div>
            )}
            className="flex gap-2 bg-base"
            containerClassName="right-0 before:right-[10px] before:left-auto"
          >
            {userState.data?.avatar_url ? (
              <Image alt="" src={userState.data?.avatar_url} />
            ) : (
              <CircleUserRound size="30">デフォルトアイコン</CircleUserRound>
            )}

            <span>{userState.data?.username}</span>
          </Popover>
        </>
      ) : (
        <div className="flex gap-2">
          <CircleX size={30} />
          Unknown
        </div>
      )}
    </>
  );
};
