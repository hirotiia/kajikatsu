'use client';

import { Dialog } from '@/components/ui/dialog';
import { useOpener } from '@/hooks/use-opener';

export const UserProfile = () => {
  const openerDialog = useOpener();
  return (
    <>
      <button
        type="button"
        onClick={openerDialog.open}
        aria-controls="dialog-3"
        aria-expanded={openerDialog.isOpen}
      >
        ボタントリガー
      </button>
      <Dialog opener={openerDialog} title="プロフィール" id="dialog-3">
        コンテンツ
      </Dialog>
    </>
  );
};
