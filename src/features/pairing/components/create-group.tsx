import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { createGroup } from '@/actions/group/create-group';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { FormInput } from '@/components/ui/form/form-input';
import { useNotifications } from '@/components/ui/notifications';
import { useOpener } from '@/hooks/use-opener';

export const CreateGroup = () => {
  const initialState = {
    type: '',
    status: null,
    message: '',
  };
  const openerDialog = useOpener();
  const [state, createGroupAction] = useFormState(createGroup, initialState);
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (state.status !== null) {
      addNotification(state);
    }
  }, [state, addNotification]);

  useEffect(() => {
    if (state.status !== null) {
      openerDialog.close();
    }

    return () => {
      state.status = null;
    };
  }, [state, openerDialog]);
  return (
    <>
      <Button
        type="button"
        onClick={openerDialog.open}
        aria-controls="dialog-3"
        aria-expanded={openerDialog.isOpen}
        size="small"
        icon={<Plus />}
      >
        作成
      </Button>
      <Dialog opener={openerDialog} title="グループを作成する" id="dialog-3">
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
  );
};
