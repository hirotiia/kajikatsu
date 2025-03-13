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
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    /**
     * backdrop部分（dialog自体）がクリックされたかどうか判定
     */
    const handleBackdropClick = (e: MouseEvent) => {
      if (e.target === dialogElement) {
        close();
      }
    };
    dialogElement.addEventListener('click', handleBackdropClick);

    /**
     * ブラウザが Esc キーや外側クリックでダイアログを閉じたら
     * React 側の isOpen (opener.close) と同期する
     */
    const handleClose = () => {
      close();
    };
    dialogElement.addEventListener('close', handleClose);

    if (isOpen && !dialogElement.open) {
      dialogElement.showModal();
      open();
    } else if (!isOpen && dialogElement.open) {
      dialogElement.close();
      close();
    }

    return () => {
      dialogElement.removeEventListener('click', handleBackdropClick);
      dialogElement.removeEventListener('close', handleClose);
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
        <div className="mb-12 mt-3">
          <Heading id={`${id}-title`}>{title}</Heading>
        </div>
        <div>{children}</div>
      </div>
    </dialog>
  );
}
