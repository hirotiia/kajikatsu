'use client';

import { LoaderCircle, Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import useSWR from 'swr';

import { createGroup } from '@/actions/group/create-group';
import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { FormInput } from '@/components/ui/form/';
import { Heading } from '@/components/ui/heading';
import { useNotifications } from '@/components/ui/notifications';
import { DleteGroup } from '@/features/pairing/components/delete-group';
import { InviteGroup } from '@/features/pairing/components/invite-group';
import { useOpener } from '@/hooks/use-opener';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ParingPage() {
  const initialState = {
    type: '',
    status: null,
    message: '',
  };

  const [state, createGroupAction] = useFormState(createGroup, initialState);
  const openerDialog1 = useOpener();
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

  useEffect(() => {
    if (state.status !== null) {
      addNotification(state);
    }
  }, [state, addNotification]);

  useEffect(() => {
    if (state.status !== null) {
      openerDialog1.close();
    }

    return () => {
      state.status = null;
    };
  }, [state, openerDialog1]);

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
          {group_members?.group_name ? (
            <>
              <InviteGroup />
              <DleteGroup />
            </>
          ) : (
            <>
              <Button
                type="button"
                onClick={openerDialog1.open}
                aria-controls="dialog-3"
                aria-expanded={openerDialog1.isOpen}
                size="small"
                icon={<Plus />}
              >
                作成
              </Button>
              <Dialog
                opener={openerDialog1}
                title="グループを作成する"
                id="dialog-3"
              >
                <form action={createGroupAction} className="grid items-center">
                  <FormInput
                    label="グループ名"
                    id="group"
                    name="group"
                    type="text"
                    className=""
                    error="グループ名を入力してください"
                    required
                  />
                  <Button>グループを作成する</Button>
                </form>
              </Dialog>
            </>
          )}
        </div>
      </Box>
    </Content>
  );
}
