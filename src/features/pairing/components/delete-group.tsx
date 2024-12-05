import { Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { deleteGroup } from '@/actions/group/delete-group';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';
import { useOpener } from '@/hooks/use-opener';

export const DleteGroup = () => {
  const initialState = {
    type: '',
    status: null,
    message: '',
  };
  const [state, deleteGroupAction] = useFormState(deleteGroup, initialState);
  const openerDialog = useOpener();
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (state.status !== null) {
      openerDialog.close();
    }

    return () => {
      state.status = null;
    };
  }, [state, openerDialog]);

  useEffect(() => {
    if (state.status !== null) {
      addNotification(state);
    }
  }, [state, addNotification]);

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
        <p className="text-center">
          本当にグループを脱退しますか？
          <br />
          脱退した場合、グループは削除されメンバーは解散になります。
        </p>
        <form action={deleteGroupAction} className="mt-10 grid items-center">
          <Button variant="destructive">グループを脱退する</Button>
        </form>
      </Dialog>
    </>
  );
};
