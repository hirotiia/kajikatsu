'use client';

import { Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { useOpener } from '@/hooks/use-opener';
import { Statuses } from '@/lib/supabase/data/statuses/select/fetch-status';
import { GroupMember } from '@/lib/supabase/data/users/fetch-group-members-client';

import { FormEditTask } from './form-edit-task';

type FormUpdateTaskProps = {
  userId?: string;
  taskId: string;
  title: string;
  description?: string;
  expiresAt?: string;
  statusId: string;
  statusList?: Statuses;
  groupMembers?: GroupMember[] | null;
};

export const FormUpdateTask = ({
  userId,
  taskId,
  title,
  description,
  expiresAt,
  statusId,
  statusList = [],
  groupMembers,
}: FormUpdateTaskProps) => {
  const opener = useOpener();

  return (
    <>
      <Button
        aria-label="編集する"
        as="button"
        type="button"
        onClick={opener.open}
        aria-controls="dialog-edit"
        aria-expanded={opener.isOpen}
        className="grid place-content-center rounded-md md:size-[50px]"
        size="full"
      >
        <Pencil size={20} />
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
          defaultUserId={userId ?? ''}
          groupMembers={groupMembers ?? null}
        />
      </Dialog>
    </>
  );
};
