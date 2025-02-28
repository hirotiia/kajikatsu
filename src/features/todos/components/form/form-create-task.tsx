'use client';

import { useActionState, useContext, useEffect, useRef } from 'react';

import { createTask } from '@/actions/task/create-task';
import { Button } from '@/components/ui/button';
import { DrawerContext } from '@/components/ui/drawer';
import {
  FormSelect,
  FormTextarea,
  FormDatePicker,
  FormInput,
} from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { GroupMember } from '@/lib/supabase/data/users/fetch-group-members';

type FormCreateTaskProps = {
  groupMembers: GroupMember[];
  userId: string;
  hasGroup: boolean;
};

export const FormCreateTask = ({
  groupMembers,
  userId,
  hasGroup,
}: FormCreateTaskProps) => {
  const initialState = {
    type: '',
    status: null,
    message: '',
    formValidationStatus: null,
  };
  const [state, createTaskAction, isPending] = useActionState(
    createTask,
    initialState,
  );
  const { addNotification } = useNotifications();
  const { setIsOpen } = useContext(DrawerContext);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status !== null) {
      addNotification(state);

      if (state.type === 'success') {
        formRef.current?.reset();
      }
      // ドロワーを閉じる
      setIsOpen(false);
    }
  }, [state, addNotification, setIsOpen]);

  return (
    <form ref={formRef} action={createTaskAction}>
      <FormInput
        label="タイトル"
        id="title"
        name="title"
        type="text"
        layout="vertical"
        className=""
        error={state.formValidationStatus?.errors?.title}
      />
      <FormSelect
        id="status"
        name="status"
        label="ステータス"
        error={state.formValidationStatus?.errors?.status}
        layout="vertical"
        className="mt-4"
        options={[
          { value: '', title: '選択してください。' },
          { value: '保留', title: '保留' },
          { value: '未対応', title: '未対応' },
          { value: '対応中', title: '対応中' },
          { value: '完了', title: '完了' },
        ]}
      />
      <FormTextarea
        label="タスクの詳細"
        id="description"
        name="description"
        preview
        layout="vertical"
        className="mt-4"
        rows={5}
      />
      {hasGroup ? (
        <FormSelect
          id="assignment"
          name="assignment"
          label="担当者"
          layout="vertical"
          className="mt-4"
          options={[
            { value: '', title: 'なし' },
            ...groupMembers.map((user) => ({
              value: user.user_id,
              title: user.username,
            })),
          ]}
        />
      ) : (
        <FormSelect
          id="assignment"
          label="担当者"
          name="assignment"
          options={[{ title: 'あなた', value: userId }]}
        />
      )}
      <FormDatePicker
        id="deadline"
        name="deadline"
        label="タスクの期限日"
        placeholder="期限日を選択"
        layout="vertical"
        className="mt-4"
      />

      <Button className="mt-10" size="full" disabled={isPending}>
        {isPending ? '作成中...' : '作成'}
      </Button>
    </form>
  );
};
