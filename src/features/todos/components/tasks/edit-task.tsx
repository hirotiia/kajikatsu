'use client';

import { Pencil } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { useOpener } from '@/hooks/use-opener';
import { createClient } from '@/lib/supabase/client';

type EditTaskProps = {
  taskId: string;
  title: string;
  description?: string;
  expiresAt?: string;
  statusId?: string;
};

export const EditTask = ({
  taskId,
  title,
  description,
  expiresAt,
  statusId,
}: EditTaskProps) => {
  const opener = useOpener();
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description ?? '');
  const [newExpiresAt, setNewExpiresAt] = useState(expiresAt ?? '');
  const [newStatus, setNewStatus] = useState(statusId ?? '');

  const handleSave = async () => {
    // 旧値(初期値)と新値の差分
    const fieldsToUpdate: Record<string, any> = {};

    if (newTitle !== title) {
      fieldsToUpdate.title = newTitle;
    }
    if (newDescription !== description) {
      fieldsToUpdate.description = newDescription;
    }
    if (newExpiresAt !== expiresAt) {
      fieldsToUpdate.expires_at = newExpiresAt || null;
    }
    if (newStatus !== statusId) {
      fieldsToUpdate.status_id = newStatus || null;
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      opener.close();
      return;
    }

    // Supabase へ UPDATE リクエスト
    const supabase = createClient();
    const { error } = await supabase
      .from('tasks')
      .update(fieldsToUpdate)
      .eq('id', taskId);

    if (error) {
      console.error('Error updating task', error);
      alert('タスク更新でエラーが発生しました');
      return;
    }

    opener.close();
  };
  return (
    <>
      <Button
        type="button"
        onClick={opener.open}
        aria-controls="dialog-edit"
        aria-expanded={opener.isOpen}
        className="rounded-md"
        size="small"
        icon={<Pencil>編集する</Pencil>}
      >
        編集する
      </Button>
      <Dialog opener={opener} title="タスクを編集する" id="dialog-edit">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="mb-4">
            <label className="mb-1 block font-bold" htmlFor="title">
              タイトル
            </label>
            <input
              id="title"
              className="w-full border p-1"
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block font-bold" htmlFor="description">
              概要
            </label>
            <textarea
              id="description"
              className="w-full border p-1"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block font-bold" htmlFor="expires_at">
              期限日
            </label>
            <input
              id="expires_at"
              className="w-full border p-1"
              type="date"
              value={newExpiresAt}
              onChange={(e) => setNewExpiresAt(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block font-bold" htmlFor="status">
              ステータス
            </label>
            <select
              id="status"
              className="w-full border p-1"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="">選択してください</option>
              <option value="cc234b3d-1618-4874-8c7d-2d18d23a8061">
                対応中
              </option>
              <option value="3cc21ab1-0a1c-4bd4-916c-b0252eb24f51">完了</option>
              <option value="8c9ac88f-acbe-4045-ae6e-f20c5ef1c02c">保留</option>
              <option value="b9d486d8-2b60-4597-a155-0ffbe99f122b">
                未対応
              </option>
            </select>
          </div>

          <div className="mt-8 flex flex-col justify-end">
            <Button type="submit" variant="default">
              保存
            </Button>
            <Button type="button" onClick={opener.close} variant="destructive">
              キャンセル
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};
