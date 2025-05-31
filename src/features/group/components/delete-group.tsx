'use client';

import { Trash2 } from 'lucide-react';
import { useActionState } from 'react';
import { useDispatch } from 'react-redux';

import { deleteGroup } from '@/actions/group/delete-group';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';
import { Text } from '@/components/ui/text';
import { useOpener } from '@/hooks/use-opener';
import { AppDispatch } from '@/stores';
import { fetchAsyncUserData } from '@/stores/user/reducer';

type DleteGroupProps = {
  userId: string;
  groupId: string;
  roleId: string;
};

export const DleteGroup = ({ userId, groupId, roleId }: DleteGroupProps) => {
  const openerDialog = useOpener();
  const { addNotification } = useNotifications();
  const dispatch = useDispatch<AppDispatch>();

  const deleteGroupWithNotifications = async (
    prevState: any,
    formData: FormData,
  ) => {
    const result = await deleteGroup(prevState, formData);

    if (result !== null && result.status !== 0) {
      addNotification(result);
      openerDialog.close();

      if (result.type === 'success') {
        dispatch(fetchAsyncUserData());
      }
    }

    // 結果を返す（state更新に使われる）
    return result;
  };

  const [, formAction, isPending] = useActionState(
    deleteGroupWithNotifications,
    null,
  );

  return (
    <>
      <Button
        as="button"
        type="button"
        onClick={openerDialog.open}
        aria-controls="dialog-2"
        aria-expanded={openerDialog.isOpen}
        size="small"
        icon={<Trash2 />}
        variant="destructive"
      >
        脱退
      </Button>
      <Dialog opener={openerDialog} title="グループを脱退する" id="dialog-2">
        <Text className="text-center">
          本当にグループを脱退しますか？
          <br />
          脱退した場合、グループは削除されメンバーは解散になります。
        </Text>
        <form action={formAction} className="mt-10 grid items-center">
          <input type="hidden" name="user_id" value={userId} />
          <input type="hidden" name="group_id" value={groupId} />
          <input type="hidden" name="role_id" value={roleId} />
          <Button as="button" variant="destructive" disabled={isPending}>
            {isPending ? '脱退中です...' : 'グループを脱退する'}
          </Button>
        </form>
      </Dialog>
    </>
  );
};
