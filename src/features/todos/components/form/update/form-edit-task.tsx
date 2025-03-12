'use client';

import { FormEvent, startTransition, useActionState, useEffect } from 'react';

import { updateTask } from '@/actions/task/update-task';
import { Button } from '@/components/ui/button';
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

  useEffect(() => {
    if (state.type === 'success' || state.type === 'error') {
      addNotification(state);
      opener.close();
    }
  }, [state, addNotification, opener, state.type]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get('title')?.toString() ?? '';
    const description = formData.get('description')?.toString() ?? '';
    const expiresAt = formData.get('expires_at')?.toString() ?? '';
    const statusId = formData.get('status')?.toString() ?? '';

    const isChanged =
      title !== defaultTitle ||
      description !== defaultDescription ||
      expiresAt !== defaultExpiresAt ||
      statusId !== defaultStatusId;

    if (!isChanged) {
      addNotification({
        type: 'info',
        status: 200,
        message: '変更がありません。',
      });

      opener.close();
      return;
    }

    startTransition(() => {
      updateTaskAction(formData);
    });
  };

  const renderFormFields = () => (
    <>
      <input type="hidden" name="taskId" value={taskId} />

      <FormInput
        label="タイトル"
        id="title"
        name="title"
        type="text"
        defaultValue={defaultTitle}
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
    </>
  );

  const renderButtons = () => (
    <div className="mt-6 grid gap-y-2">
      <Button variant="default" disabled={isPending}>
        {isPending ? '更新中です...' : '更新'}
      </Button>
      <Button variant="destructive" type="button" onClick={opener.close}>
        キャンセル
      </Button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      {renderFormFields()}
      {renderButtons()}
    </form>
  );
}
