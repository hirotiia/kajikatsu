'use client';

import { ComponentPropsWithRef } from 'react';

import { useScrollCells } from './hooks/use-scroll-cells';
import { scrollShadowClassNameGenerator } from './styles/scroll-shadow-class-name-generator';

export const TableScroll = ({
  children,
  className,
  ...props
}: ComponentPropsWithRef<'div'>) => {
  const { tableWrapperRef, showShadow } = useScrollCells(children);
  return (
    <div className={scrollShadowClassNameGenerator({ showShadow, className })}>
      <div {...props} ref={tableWrapperRef} className="">
        {children}
      </div>
    </div>
  );
};
