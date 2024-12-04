'use client';

import { LoaderCircle, Plus, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import useSWR from 'swr';

import { createGroup } from '@/actions/group/create-group';
import { deleteGroup } from '@/actions/group/delete-group';
import { generateGroupCode } from '@/actions/group/generate-group-code';
import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { FormInput } from '@/components/ui/form/';
import { Heading } from '@/components/ui/heading';
import { useNotifications } from '@/components/ui/notifications';
import { useOpener } from '@/hooks/use-opener';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ParingPage() {
  const initialState = {
    type: '',
    status: null,
    message: '',
  };

  const [stateOfGenerateGroupCode, generateGroupCodeAction] = useFormState(
    generateGroupCode,
    initialState,
  );
  const [stateOfDeleteState, deleteGroupAction] = useFormState(
    deleteGroup,
    initialState,
  );
  console.log(stateOfGenerateGroupCode, stateOfDeleteState);
  const [state, createGroupAction] = useFormState(createGroup, initialState);
  const openerDialog1 = useOpener();
  const openerDialog2 = useOpener();
  const openerDialog3 = useOpener();
  const openerDialog4 = useOpener();
  const { addNotification } = useNotifications();
  const { data, error, isLoading } = useSWR('/api/get/get-group', fetcher);

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
      openerDialog2.close();
      openerDialog3.close();
      openerDialog4.close();
    }

    return () => {
      state.status = null;
    };
  }, [state, openerDialog1, openerDialog2, openerDialog3, openerDialog4]);

  return (
    <Content bg="secondary">
      <Heading as="h1" className="mb-12 mt-4">
        ペアリング
      </Heading>

      <Box color="primary">
        <dl className="grid gap-4">
          <div className="">
            <dt className="font-bold">グループ名</dt>
            {isLoading ? (
              <dd>
                <LoaderCircle className="animate-spin text-primary" size={30}>
                  読み込み中...
                </LoaderCircle>
              </dd>
            ) : data?.group_name ? (
              <dd>{data.group_name}</dd>
            ) : (
              <dd>グループには所属していません。</dd>
            )}
          </div>
          <div className="">
            <dt className="font-bold">権限</dt>
            {isLoading ? (
              <dd>
                <LoaderCircle className="animate-spin text-primary" size={30}>
                  読み込み中...
                </LoaderCircle>
              </dd>
            ) : data?.role ? (
              <dd> {data.role}</dd>
            ) : (
              <dd>グループには所属していません。</dd>
            )}
          </div>
        </dl>
        <div className="text-right">
          {data?.group_name ? (
            <>
              <Button
                type="button"
                onClick={openerDialog1.open}
                aria-controls="dialog-1"
                aria-expanded={openerDialog1.isOpen}
                size="small"
                icon={<Plus />}
              >
                招待
              </Button>
              <Dialog
                opener={openerDialog1}
                title="グループに招待する"
                id="dialog-1"
              >
                <p className="text-center">
                  招待したいメンバーにグループの招待コードを共有して、
                  <br />
                  メンバーに加えましょう！
                </p>
                <form
                  action={generateGroupCodeAction}
                  className="mt-10 grid items-center"
                >
                  <Button>招待コードを取得する</Button>
                </form>
              </Dialog>
              <Button
                type="button"
                onClick={openerDialog2.open}
                aria-controls="dialog-2"
                aria-expanded={openerDialog2.isOpen}
                size="small"
                icon={<Trash2 />}
                variant="destructive"
              >
                脱退
              </Button>
              <Dialog
                opener={openerDialog2}
                title="グループを脱退する"
                id="dialog-2"
              >
                <p className="text-center">
                  本当にグループを脱退しますか？
                  <br />
                  脱退した場合、グループは削除されメンバーは解散になります。
                </p>
                <form
                  action={deleteGroupAction}
                  className="mt-10 grid items-center"
                >
                  <Button variant="destructive">グループを脱退する</Button>
                </form>
              </Dialog>
            </>
          ) : (
            <>
              <Button
                type="button"
                onClick={openerDialog3.open}
                aria-controls="dialog-3"
                aria-expanded={openerDialog3.isOpen}
                size="small"
                icon={<Plus />}
              >
                作成
              </Button>
              <Dialog
                opener={openerDialog3}
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

      <Button
        type="button"
        onClick={openerDialog4.open}
        aria-controls="dialog-4"
        aria-expanded={openerDialog4.isOpen}
      >
        Open Dialog
      </Button>
      <Dialog opener={openerDialog4} title="メンバーを招待する" id="dialog-4">
        <p>dialog4</p>
      </Dialog>
    </Content>
  );
}
