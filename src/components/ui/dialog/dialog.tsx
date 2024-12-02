'use client';

import { Plus } from 'lucide-react';
import React, {
  useContext,
  useState,
  createContext,
  SetStateAction,
  Dispatch,
  useRef,
} from 'react';

import { cn } from '@/utils/cn';

type DialogContextType = {
  isOpen: boolean;
  openDialog: Dispatch<SetStateAction<boolean>>;
  closeDialog: Dispatch<SetStateAction<boolean>>;
};

type DialogProps = {
  children: React.ReactNode;
};
type DialogContentProps = {
  children: React.ReactNode;
};
type DialogTriggerProps = {
  children: React.ReactNode;
  className?: string;
};

const DialogContext = createContext<DialogContextType>({
  isOpen: false,
  openDialog: () => {},
  closeDialog: () => {},
});
const Dialog = ({ children }: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => {
    setIsOpen(true);
  };
  const closeDialog = () => {
    setIsOpen(false);
  };
  return (
    <DialogContext.Provider value={{ isOpen, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

const DialogContent = ({ children }: DialogContentProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { isOpen, openDialog, closeDialog } = useContext(DialogContext);
  console.log(isOpen);
  console.log(openDialog);
  console.log(closeDialog);
  return (
    <dialog className="" ref={dialogRef}>
      {children}
    </dialog>
  );
};

const DialogTrriger = ({ children, className }: DialogTriggerProps) => {
  return (
    <button
      type="button"
      className={cn('flex gap-4 items-center justify-center', className)}
    >
      <Plus />
      {children}
    </button>
  );
};
export { Dialog, DialogContent, DialogTrriger };
