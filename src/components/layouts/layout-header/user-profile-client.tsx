'use client';

import { CircleX, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '@/actions/auth/auth';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { UserInfo } from '@/components/ui/user';
import { AppDispatch, RootState } from '@/stores/store';
import { fetchAsyncUserData } from '@/stores/user/reducer';
import { cn } from '@/utils/cn';
import { invertOnHover } from '@/utils/invert-on-hover';

type UserProfileClientProps = {
  content: React.ReactNode;
};

export const UserProfileClient = ({ content }: UserProfileClientProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const userState = useSelector((state: RootState) => state.user);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchAsyncUserData());
  }, [dispatch]);

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut();
      router.push('/login');
    });
  };

  return (
    <>
      {userState.loading ? (
        <Text className="flex items-center gap-2" spacing="none">
          <LoaderCircle className="animate-spin" size={30}>
            読み込み中...
          </LoaderCircle>
          <span>読み込み中</span>
        </Text>
      ) : userState.data ? (
        <>
          <Popover
            position="bottom"
            content={({ close }) => (
              <>
                <div className="min-w-[300px] p-3 md:max-w-[600px]">
                  {content}
                  <Button
                    as="button"
                    variant="destructive"
                    onClick={handleSignOut}
                    disabled={isPending}
                    size="full"
                    rounded="md"
                    className="mt-6"
                  >
                    {isPending ? 'Signing out...' : 'Sign out'}
                  </Button>
                </div>
                <button
                  onClick={close}
                  type="button"
                  className={cn(
                    'w-full rounded-b border-t-2 border-base-foreground py-2',
                    invertOnHover('bg-background', 'text-foreground'),
                  )}
                >
                  <div className="flex items-center justify-center gap-1">
                    <CircleX size={20} />
                    <span className="text-sm">閉じる</span>
                  </div>
                </button>
              </>
            )}
            className={cn(
              'flex gap-2 text-sm items-center max-w-[200px]',
              invertOnHover('bg-background', 'text-foreground'),
            )}
            containerClassName="right-0 before:right-[10px] before:left-auto"
          >
            <UserInfo
              avatarUrl={userState.data?.avatar_url}
              username={userState.data?.username}
              size={30}
              textMaxWidthClass="overflow-hidden whitespace-nowrap text-ellipsis max-w-[100px]"
            />
          </Popover>
        </>
      ) : (
        <div className="flex items-center gap-2">
          <CircleX size={30} />
          Unknown
        </div>
      )}
    </>
  );
};
