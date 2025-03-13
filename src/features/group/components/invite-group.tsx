'use client';
import { Plus } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { useActionState, useEffect, useState } from 'react';

import { inviteGroup } from '@/actions/group/invite-group';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { FormSelect } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { useOpener } from '@/hooks/use-opener';

const INITIAL_STATE = {
  type: null,
  status: undefined,
  message: null,
  url: '',
};

export const InviteGroup = () => {
  const openerDialog = useOpener();
  const { addNotification } = useNotifications();
  const [url, setUrl] = useState('');
  const [state, inviteGroupAction, isPending] = useActionState(
    inviteGroup,
    INITIAL_STATE,
  );

  useEffect(() => {
    if (state.status !== undefined) {
      addNotification(state);

      if (state.type === 'success') {
        setUrl(state.url);
      }
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
          招待リンクの有効期限を選択して招待URLを作成します。
          <br />
          生成後はQRコードが表示されるので、共有したいメンバーに読み取ってもらいましょう。
        </p>
        {url ? (
          <div className="mt-5 text-center">
            <p className="mt-5">
              以下のQRコードを読み取ると、グループへの参加手続きができます。
            </p>
            <div className="mt-5">
              <QRCodeCanvas value={url} size={200} className="m-auto" />
            </div>
            <p className="mt-5 break-all text-sm">
              直接URLを共有する場合はこちら: <br />
              <a href={url} className="text-primary underline">
                {url}
              </a>
            </p>
          </div>
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
