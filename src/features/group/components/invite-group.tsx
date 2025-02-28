'use client';
import { Plus } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';

import { inviteGroup } from '@/actions/group/invite-group';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { FormSelect } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { useOpener } from '@/hooks/use-opener';

export const InviteGroup = () => {
  const initialState = {
    type: '',
    status: null,
    message: '',
    url: '',
  };
  const [state, inviteGroupAction, isPending] = useActionState(
    inviteGroup,
    initialState,
  );
  const openerDialog = useOpener();
  const { addNotification } = useNotifications();
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (state.status !== null) {
      addNotification(state);
      setUrl(state.url);
    }
  }, [state, addNotification]);
  return (
    <>
      <Button
        type="button"
        onClick={openerDialog.open}
        aria-controls="dialog-1"
        aria-expanded={openerDialog.isOpen}
        size="small"
        icon={<Plus />}
      >
        招待
      </Button>
      <Dialog opener={openerDialog} title="グループに招待する" id="dialog-1">
        <p className="text-center">
          招待したいメンバーにグループの招待リンクを共有して、
          <br />
          メンバーに加えましょう！
        </p>
        {url ? (
          <p className="text-center">
            <a href={url} className="underline">
              {url}
            </a>
          </p>
        ) : (
          <form action={inviteGroupAction} className="mt-10 grid items-center">
            <FormSelect
              id="expires_at"
              name="expires_at"
              label="招待リンクの有効期限"
              layout="vertical"
              options={[
                { value: '1', title: '1時間' },
                { value: '5', title: '5時間' },
                { value: '24', title: '24時間' },
              ]}
            />
            <Button size="small" className="mt-6" disabled={isPending}>
              {isPending ? '作っています...' : '招待リンクを作成する'}
            </Button>
          </form>
        )}
      </Dialog>
    </>
  );
};
