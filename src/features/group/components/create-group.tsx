'use client';

import { Plus } from 'lucide-react';
import { useActionState } from 'react';

import { createGroup } from '@/actions/group/create-group';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { FormInput } from '@/components/ui/form/form-input';
import { useNotifications } from '@/components/ui/notifications';
import { useOpener } from '@/hooks/use-opener';

type CreateGroupProps = {
  userId: string;
};

const INITIAL_STATE = {
  type: null,
  status: 0,
  message: '',
};

export const CreateGroup = ({ userId }: CreateGroupProps) => {
  const openerDialog = useOpener();
  const { addNotification } = useNotifications();

  const createGroupWithNotifications = async (
    prevState: any,
    formData: FormData,
  ) => {
    const result = await createGroup(prevState, formData);

    if (
      result.type === 'success' ||
      (result.type === 'error' && !('fieldErrors' in result))
    ) {
      if (result.message) {
        addNotification(result);
      }
      openerDialog.close();
    }

    // 結果を返す（state更新に使われる）
    return result;
  };

  const [state, formAction, isPending] = useActionState(
    createGroupWithNotifications,
    INITIAL_STATE,
  );

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
        <form action={formAction} className="grid items-center">
          <input type="hidden" name="user_id" value={userId} />
          <FormInput
            label="グループ名"
            id="group_name"
            name="group_name"
            type="text"
            layout="vertical"
            error={state.fieldErrors?.groupName ?? []}
            required
          />
          <Button disabled={isPending} className="mt-6">
            {isPending ? '作成中です...' : 'グループを作成する'}
          </Button>
        </form>
      </Dialog>
    </>
  );
};
