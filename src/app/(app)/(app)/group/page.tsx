'use client';

import { CircleUserRound, LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import useSWR from 'swr';

import { GroupResponse } from '@/app/api/get/get-group/route';
import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { useNotifications } from '@/components/ui/notifications';
import { CreateGroup } from '@/features/pairing/components/create-group';
import { DleteGroup } from '@/features/pairing/components/delete-group';
import { InviteGroup } from '@/features/pairing/components/invite-group';

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json() as Promise<GroupResponse>);

export default function ParingPage() {
  const { addNotification } = useNotifications();
  const { data, error, isLoading } = useSWR('/api/get/get-group', fetcher);

  const group_members = data?.group_members || [];
  const group_name = data?.group_name;

  if (error) {
    addNotification({
      type: 'error',
      status: error.code,
      message: error.message,
    });
  }

  return (
    <Content bg="secondary">
      <Heading as="h1" className="mb-12 mt-4">
        グループ
      </Heading>

      <Box color="primary">
        <dl className="grid gap-4">
          <div className="">
            <dt className="mb-4 font-bold">グループ名</dt>
            <dd>
              {isLoading || !data ? (
                <LoaderCircle className="animate-spin text-primary" size={30}>
                  読み込み中...
                </LoaderCircle>
              ) : group_members.length > 0 ? (
                group_name
              ) : (
                '未加入'
              )}
            </dd>
          </div>
        </dl>
        <div className="text-right">
          {group_name ? (
            <>
              <InviteGroup />
              <DleteGroup />
            </>
          ) : (
            <CreateGroup />
          )}
        </div>
      </Box>

      <Box color="primary" className="mt-10">
        <dl className="grid gap-4">
          <div className="">
            <dt className="mb-4 font-bold">メンバー</dt>
            {isLoading || !group_members ? (
              <dd>
                <LoaderCircle className="animate-spin text-primary" size={30}>
                  読み込み中...
                </LoaderCircle>
              </dd>
            ) : (
              <div className="grid gap-y-4">
                {group_members.map((member) => (
                  <dd key={member.username}>
                    <div className="flex gap-4">
                      {member.avatar_url ? (
                        <Image
                          src={member.avatar_url}
                          alt="ユーザーのアバター"
                          width="30"
                          height="30"
                          className="shrink-0"
                        />
                      ) : (
                        <CircleUserRound
                          className="shrink-0 text-primary"
                          size={30}
                        >
                          デフォルトのアバター
                        </CircleUserRound>
                      )}
                      <div className="">
                        <p>
                          <b>{member.username}</b>
                        </p>
                        <p>{member.role}</p>
                      </div>
                    </div>
                  </dd>
                ))}
              </div>
            )}
          </div>
        </dl>
      </Box>
    </Content>
  );
}
