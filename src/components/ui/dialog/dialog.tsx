'use client';

import { X } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

import { Heading } from '@/components/ui/heading';
import { OpenerProps } from '@/hooks/use-opener';

type DialogProps = {
  children: React.ReactNode;
  opener: OpenerProps;
  id: `dialog-${string}`;
  title: string;
};

export function Dialog({ children, opener, id, title }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { isOpen, open, close } = opener;

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;

    /**
     * ブラウザが Esc キーや外側クリックでダイアログを閉じたら
     * React 側の isOpen (opener.close) と同期する
     */
    const handleClose = () => {
      close();
    };
    dlg.addEventListener('close', handleClose);

    if (isOpen && !dlg.open) {
      dlg.showModal();
      open();
    } else if (!isOpen && dlg.open) {
      dlg.close();
      close();
    }

    return () => {
      dlg.removeEventListener('close', handleClose);
    };
  }, [isOpen, open, close]);

  return (
    <dialog
      ref={dialogRef}
      id={id}
      aria-labelledby={`${id}-title`}
      className="bg-transparent"
    >
      <div className="min-w-[200px] overflow-x-hidden rounded-lg bg-background p-4 shadow-lg md:min-w-[350px]">
        <div className="text-right">
          <button onClick={close}>
            <X />
          </button>
        </div>
        <div className="mb-12 mt-3 text-center">
          <Heading id={`${id}-title`} color="secondary">
            {title}
          </Heading>
        </div>
        <div>{children}</div>
      </div>
    </dialog>
  );
}
