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

      const commonAction = (
        cells: HTMLElement[] | NodeListOf<HTMLElement>,
        direction: 'left' | 'right',
        visible: boolean,
      ) => {
        const action = () => {
          let position = 0;

          cells.forEach((cell) => {
            cell.classList.toggle('fixed', visible);
            cell.style[direction] = `${position}px`;
            cell.style.zIndex = '1';

            position += cell.offsetWidth;
          });
        };

        action();
      };

      wrapper.querySelectorAll<HTMLElement>(TR_SELECTOR).forEach((tr) => {
        const leftCells = tr.querySelectorAll<HTMLElement>(FIXED_LEFT_SELECTOR);
        const rightCells =
          tr.querySelectorAll<HTMLElement>(FIXED_RIGHT_SELECTOR);

        if (leftCells.length > 0) {
          commonAction(leftCells, 'left', wrapper.scrollLeft > 0);
        }
        if (rightCells.length > 0) {
          commonAction(
            rightCells,
            'right',
            wrapper.scrollLeft < wrapper.scrollWidth - wrapper.clientWidth - 1,
          );
        }
      });
    };

    wrapper.addEventListener('scroll', handleScroll);

    setShowShadow(true);
    return () => {
      wrapper.removeEventListener('scroll', handleScroll);
    };
  }, [children]);

  return { tableWrapperRef, showShadow };
};
