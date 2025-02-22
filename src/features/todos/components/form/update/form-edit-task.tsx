'use client';

import { useContext, useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

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
};

export function FormEditTask({
  taskId,
  defaultTitle,
  defaultDescription = '',
  defaultExpiresAt = '',
  defaultStatusId = '',
  opener,
}: EditTaskProps) {
  const [state, updateTaskAction] = useFormState(updateTask, {
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
          // 例: statusテーブルのUUIDを直接指定
          { value: 'cc234b3d-1618-4874-8c7d-2d18d23a8061', title: '対応中' },
          { value: '3cc21ab1-0a1c-4bd4-916c-b0252eb24f51', title: '完了' },
          { value: '8c9ac88f-acbe-4045-ae6e-f20c5ef1c02c', title: '保留' },
          { value: 'b9d486d8-2b60-4597-a155-0ffbe99f122b', title: '未対応' },
        ]}
      />

      <div className="mt-6 grid gap-y-2">
        <Button variant="default" type="submit">
          更新
        </Button>
        <Button variant="destructive" type="button" onClick={opener.close}>
          キャンセル
        </Button>
      </div>
    </form>
  );
}
