'use client';
import { Plus } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { useActionState, useState } from 'react';

import { inviteGroup } from '@/actions/group/invite-group';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { FormSelect } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Text } from '@/components/ui/text';
import { useOpener } from '@/hooks/use-opener';

type InviteGroupProps = {
  userId: string;
  groupId: string;
};

const INITIAL_STATE = {
  type: null,
  status: 0,
  message: '',
  url: '',
};

export const InviteGroup = ({ userId, groupId }: InviteGroupProps) => {
  const openerDialog = useOpener();
  const { addNotification } = useNotifications();
  const [url, setUrl] = useState(INITIAL_STATE.url);

  const handleInviteGroupAction = async (
    prevState: any,
    formData: FormData,
  ) => {
    const result = await inviteGroup(prevState, formData);

    if (result.status !== 0) {
      addNotification(result);

      if (result.type === 'success') {
        setUrl(result.url);
      }
    }

    return result;
  };
  const [, inviteGroupAction, isPending] = useActionState(
    handleInviteGroupAction,
    INITIAL_STATE,
  );

  return (
    <>
      <Button
        as="button"
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
        <Text className="text-center">
          招待リンクの有効期限を選択して招待URLを作成します。
          <br />
          生成後はQRコードが表示されるので、共有したいメンバーに読み取ってもらいましょう。
        </Text>
        {url ? (
          <div className="mt-5 text-center">
            <Text>
              以下のQRコードを読み取ると、グループへの参加手続きができます。
            </Text>
            <Text>
              <QRCodeCanvas value={url} size={200} className="m-auto" />
            </Text>
            <Text className="break-all">
              直接URLを共有する場合はこちら: <br />
              <a href={url} className="text-primary underline">
                {url}
              </a>
            </Text>
          </div>
        ) : (
          <form action={inviteGroupAction} className="mt-10 grid items-center">
            <input type="hidden" name="user_id" value={userId} />
            <input type="hidden" name="group_id" value={groupId} />
            <FormSelect
              id="expires_at"
              name="expires_at"
              label="招待リンクの有効期限"
              layout="vertical"
              required
              options={[
                { value: '60', title: '1時間' },
                { value: '300', title: '5時間' },
                { value: '1440', title: '24時間' },
              ]}
            />
            <Button as="button" className="mx-auto mt-6" disabled={isPending}>
              {isPending ? '少々お待ちください...' : 'QRコードで招待する'}
            </Button>
          </form>
        )}
      </Dialog>
    </>
  );
};
