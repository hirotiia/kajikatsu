'use client';

import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { createGroup } from '@/actions/group/create-group';
import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { FormInput } from '@/components/ui/form/';
import { Heading } from '@/components/ui/heading';
import { useNotifications } from '@/components/ui/notifications';
import { useOpener } from '@/hooks/use-opener';

export default function ParingPage() {
  const initialState = {
    type: '',
    status: null,
    message: '',
  };
  const [state, createGroupAction] = useFormState(createGroup, initialState);
  const openerDialog1 = useOpener();
  const openerDialog2 = useOpener();
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (state.status !== null) {
      addNotification(state);
    }
  }, [state, addNotification]);

  useEffect(() => {
    if (state.status !== null) {
      openerDialog1.close();
      openerDialog2.close();
    }

    return () => {
      state.status = null;
    };
  }, [state, openerDialog1, openerDialog2]);

  return (
    <Content bg="secondary">
      <Heading as="h1" className="mb-12 mt-4">
        ペアリング
      </Heading>

      <Box color="primary">
        <Heading as="h2" className="mb-12 mt-4" color="primary">
          グループ名
        </Heading>
        <p>グループには所属していません</p>
        <div className="text-right">
          <Button
            type="button"
            onClick={openerDialog1.open}
            aria-controls="dialog-1"
            aria-expanded={openerDialog1.isOpen}
            size="small"
            icon={<Plus />}
          >
            作成
          </Button>
          <Dialog
            opener={openerDialog1}
            title="グループを作成する"
            id="dialog-1"
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
        </div>
      </Box>

      <Button
        type="button"
        onClick={openerDialog2.open}
        aria-controls="dialog-2"
        aria-expanded={openerDialog2.isOpen}
      >
        Open Dialog
      </Button>
      <Dialog opener={openerDialog2} title="メンバーを招待する" id="dialog-2">
        <p>dialog2</p>
      </Dialog>
    </Content>
  );
}
