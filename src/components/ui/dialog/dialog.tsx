'use client';

import { X } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

import { Heading } from '@/components/ui/heading/index';
import { OpenerProps } from '@/hooks/use-opener';

type DialogProps = {
  children: React.ReactNode;
  opener: OpenerProps;
  id: `dialog-${string}`;
  title: string;
};

const Dialog = ({ children, opener, id, title }: DialogProps) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const { isOpen, close, open } = opener;

  useEffect(() => {
    if (isOpen) {
      dialog.current?.showModal();
      open();
    } else {
      dialog.current?.close();
      close();
    }
  }, [isOpen, open, close]);

  return (
    <dialog
      ref={dialog}
      id={id}
      aria-labelledby={`${id}-title`}
      className="bg-transparent"
    >
      <div className="rounded-lg bg-base p-4 shadow-lg">
        <div className="text-right">
          <button
            onClick={() => {
              close();
            }}
          >
            <X>close</X>
          </button>
        </div>
        <div className="mb-12 mt-3 text-center">
          <Heading id={`${id}-title`} color="secondary">
            {title}
          </Heading>
        </div>
        <div>{children}</div>
        <div className=""></div>
      </div>
    </dialog>
  );
};

export { Dialog };
