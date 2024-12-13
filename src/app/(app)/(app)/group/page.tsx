'use client';

import { LoaderCircle } from 'lucide-react';
import useSWR from 'swr';

import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { useNotifications } from '@/components/ui/notifications';
import { CreateGroup } from '@/features/pairing/components/create-group';
import { DleteGroup } from '@/features/pairing/components/delete-group';
import { InviteGroup } from '@/features/pairing/components/invite-group';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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
            <dt className="font-bold">グループ名</dt>
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
    </Content>
  );
}
