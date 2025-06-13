import { ReactNode, useEffect, useRef, useState } from 'react';

const TR_SELECTOR = 'table tr';
const FIXED_LEFT_SELECTOR = '[data-fixed="left"]';
const FIXED_RIGHT_SELECTOR = '[data-fixed="right"]';

const HAS_FIXED_SELECTOR = `${TR_SELECTOR} ${FIXED_LEFT_SELECTOR},${TR_SELECTOR} ${FIXED_RIGHT_SELECTOR}`;

export const useScrollCells = (children: ReactNode) => {
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    const wrapper = tableWrapperRef.current;

    if (!wrapper) {
      return;
    }

    const handleScroll = () => {
      if (!wrapper.querySelector(HAS_FIXED_SELECTOR)) {
        return;
      }

      wrapper.querySelectorAll<HTMLElement>(TR_SELECTOR).forEach((tr) => {
        const leftCells = tr.querySelectorAll<HTMLElement>(FIXED_LEFT_SELECTOR);
        const rightCells =
          tr.querySelectorAll<HTMLElement>(FIXED_RIGHT_SELECTOR);

        console.log(leftCells, rightCells);
      });
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
