'use client';

import { useActionState, useContext, useEffect, useRef } from 'react';

import { updateTask } from '@/actions/task/update-task';
import { Button } from '@/components/ui/button';
import { DrawerContext } from '@/components/ui/drawer';
import {
  FormInput,
  FormTextarea,
  FormSelect,
  FormDatePicker,
} from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Statuses } from '@/lib/supabase/data/statuses/select/fetch-status';

/**
 * 編集フォームに必要な初期値
 */
type EditTaskProps = {
  taskId: string;
  defaultTitle: string;
  defaultDescription?: string;
  defaultExpiresAt?: string;
  defaultStatusId?: string;
  opener: { close: () => void; isOpen: boolean };
  statusList: Statuses;
};

export function FormEditTask({
  taskId,
  defaultTitle,
  defaultDescription = '',
  defaultExpiresAt = '',
  defaultStatusId = '',
  opener,
  statusList,
}: EditTaskProps) {
  const [state, updateTaskAction, isPending] = useActionState(updateTask, {
    type: '',
    status: null,
    message: '',
    formValidationStatus: null,
  });

  const { addNotification } = useNotifications();
  const { setIsOpen } = useContext(DrawerContext);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // サーバーアクションからのレスポンスを受け取り通知やドロワーを閉じる処理
    if (state.status !== null) {
      addNotification(state);
      if (state.type === 'success') {
        formRef.current?.reset(); // フォームをリセット
      }
      opener.close();
    }
  }, [state, addNotification, setIsOpen, opener]);

  return (
    <form ref={formRef} action={updateTaskAction}>
      <input type="hidden" name="taskId" value={taskId} />

      <FormInput
        label="タイトル"
        id="title"
        name="title"
        type="text"
        defaultValue={defaultTitle}
        className=""
        layout="vertical"
        error={state.formValidationStatus?.errors?.title}
      />

      <FormTextarea
        label="タスクの詳細"
        id="description"
        name="description"
        layout="vertical"
        className="mt-4"
        rows={5}
        defaultValue={defaultDescription}
        error={state.formValidationStatus?.errors?.description}
      />

      <FormDatePicker
        id="expires_at"
        name="expires_at"
        label="タスクの期限日"
        layout="vertical"
        className="mt-4"
        value={defaultExpiresAt ? new Date(defaultExpiresAt) : undefined}
      />

      <FormSelect
        id="status"
        name="status"
        label="ステータス"
        layout="vertical"
        className="mt-4"
        defaultValue={defaultStatusId}
        error={state.formValidationStatus?.errors?.status}
        options={[
          { value: '', title: '選択してください' },
          ...statusList.map(({ id, label }) => ({
            value: id,
            title: label,
          })),
        ]}
      />

      <div className="mt-6 grid gap-y-2">
        <Button variant="default" disabled={isPending}>
          {isPending ? '更新中です...' : '更新'}
        </Button>
        <Button variant="destructive" type="button" onClick={opener.close}>
          キャンセル
        </Button>
      </div>
    </form>
  );
}
