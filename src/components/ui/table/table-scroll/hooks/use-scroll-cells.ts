import { ReactNode, useEffect, useRef, useState } from 'react';

export const useScrollCells = (children: ReactNode) => {
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    const wrapper = tableWrapperRef.current;

    if (!wrapper) {
      return;
    }

    const handleScroll = () => {
      console.log('scroll');
    };

    wrapper.addEventListener('scroll', handleScroll);

    setShowShadow(true);
    return () => {
      wrapper.removeEventListener('scroll', handleScroll);
    };
  }, [children]);

  return { tableWrapperRef, showShadow };
};
