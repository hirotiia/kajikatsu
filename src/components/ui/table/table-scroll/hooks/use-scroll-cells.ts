import { ReactNode, useEffect, useRef, useState } from 'react';

export const useScrollCells = (children: ReactNode) => {
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    const wrapper = tableWrapperRef.current;

    if (!wrapper) {
      return;
    }

    setShowShadow(true);
  }, [children]);

  return { tableWrapperRef, showShadow };
};
