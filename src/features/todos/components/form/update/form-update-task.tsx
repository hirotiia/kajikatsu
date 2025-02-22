'use client';

import { Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { useOpener } from '@/hooks/use-opener';

import { FormEditTask } from './form-edit-task';

type FormUpdateTaskProps = {
  taskId: string;
  title: string;
  description?: string;
  expiresAt?: string;
  statusId?: string;
};

export const FormUpdateTask = ({
  taskId,
  title,
  description,
  expiresAt,
  statusId,
}: FormUpdateTaskProps) => {
  const opener = useOpener();

  return (
    <>
      <Button
        type="button"
        onClick={opener.open}
        aria-controls="dialog-edit"
        aria-expanded={opener.isOpen}
        className="rounded-md"
        size="small"
        icon={<Pencil />}
      >
        編集する
      </Button>
      <Dialog opener={opener} title="タスクを編集する" id="dialog-edit">
        <FormEditTask
          taskId={taskId}
          defaultTitle={title}
          defaultDescription={description}
          defaultExpiresAt={expiresAt}
          defaultStatusId={statusId}
          opener={opener}
        />
      </Dialog>
    </>
  );
};
