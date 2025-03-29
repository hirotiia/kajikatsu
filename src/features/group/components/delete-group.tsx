'use client';

import { Trash2 } from 'lucide-react';
import { useActionState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { deleteGroup } from '@/actions/group/delete-group';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';
import { Text } from '@/components/ui/text';
import { useOpener } from '@/hooks/use-opener';
import { AppDispatch } from '@/stores';
import { fetchAsyncUserData } from '@/stores/user/reducer';

export const DleteGroup = () => {
  const [state, deleteGroupAction, isPending] = useActionState(
    deleteGroup,
    null,
  );
  const openerDialog = useOpener();
  const { addNotification } = useNotifications();
  const dispatch = useDispatch<AppDispatch>();
  const processedRef = useRef(false);

  useEffect(() => {
    if (state === null || processedRef.current) return;

    if (state.status !== 0) {
      addNotification(state);
      openerDialog.close();

      if (state.type === 'success') {
        dispatch(fetchAsyncUserData());
      }

      processedRef.current = true;
    }

    return () => {
      processedRef.current = false;
    };
  }, [state, dispatch, openerDialog, addNotification]);

  return (
    <>
      <Button
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
        <form action={deleteGroupAction} className="mt-10 grid items-center">
          <Button variant="destructive" disabled={isPending}>
            {isPending ? '脱退中です...' : 'グループを脱退する'}
          </Button>
        </form>
      </Dialog>
    </>
  );
};
