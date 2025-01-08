'use client';

import { useContext, useEffect } from 'react';
import { useFormState } from 'react-dom';

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
import { GroupMember } from '@/lib/supabase/data/users/get-group-members';

import { SelectUsers } from '../select/select-users';

type FormCreateTaskProps = {
  groupMembers: GroupMember[];
  joinedGroup: boolean;
};

export const FormCreateTask = ({
  groupMembers,
  joinedGroup,
}: FormCreateTaskProps) => {
  const initialState = {
    type: '',
    status: null,
    message: '',
  };
  const [state, createTaskAction] = useFormState(createTask, initialState);
  const { addNotification } = useNotifications();
  const { setIsOpen } = useContext(DrawerContext);

  useEffect(() => {
    console.log('--------------');
    console.log(state);
    console.log('--------------');
    if (state.status !== null) {
      addNotification(state);
      // ドロワーを閉じる
      setIsOpen(false);
    }
  }, [state, addNotification, setIsOpen]);

  return (
    <form action={createTaskAction}>
      <FormInput
        label="タイトル"
        id="title"
        name="title"
        type="text"
        layout="vertical"
        className=""
        error="タイトルが入力されていません"
        required
      />
      <FormSelect
        id="status"
        name="status"
        label="ステータス"
        error="タスクのステータスを選択してください。"
        layout="vertical"
        className="mt-4"
        options={[
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
        layout="vertical"
        className="mt-4"
      />
      {joinedGroup && (
        <SelectUsers
          users={groupMembers}
          id="assignment"
          label="担当者"
          name="assignment"
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

      <Button className="mt-10" size="full">
        作成
      </Button>
    </form>
  );
};
