'use client';

import { useCallback, useState } from 'react';

export type OpenerProps = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useOpener = (): OpenerProps => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { open, isOpen, close };
};
