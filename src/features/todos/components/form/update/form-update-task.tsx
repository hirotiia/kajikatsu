'use client';

import { Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { useOpener } from '@/hooks/use-opener';
import { Statuses } from '@/lib/supabase/data/statuses/select/fetch-status';

import { FormEditTask } from './form-edit-task';

type FormUpdateTaskProps = {
  taskId: string;
  title: string;
  description?: string;
  expiresAt?: string;
  statusId: string;
  statusList?: Statuses;
};

export const FormUpdateTask = ({
  taskId,
  title,
  description,
  expiresAt,
  statusId,
  statusList = [],
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
        icon={<Pencil size={20} />}
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
          statusList={statusList}
          opener={opener}
        />
      </Dialog>
    </>
  );
};
