import { ComponentPropsWithoutRef, PropsWithChildren, useMemo } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

import { scrollShadowClassNameGenerator } from './table-scroll/styles/scroll-shadow-class-name-generator';

type Props = PropsWithChildren<{
  fixed?: 'right' | 'left';
}> &
  VariantProps<typeof classNameGenerator>;
type ThElement = Omit<ComponentPropsWithoutRef<'th'>, keyof Props | 'onClick'>;

const classNameGenerator = tv({
  base: [],
  variants: {
    align: {
      left: '',
      right: 'text-right',
    },
    vAlign: {
      middle: '',
      baseline: 'align-baseline',
      bottom: 'align-bottom',
    },
    fixed: {
      left: 'sticky left-0 z-[1]',
      right: 'sticky right-0 z-[1]',
    },
  },
  defaultVariants: {
    align: 'left',
    vAlign: 'middle',
  },
});

export const Th = ({
  children,
  className,
  align,
  vAlign,
  fixed,
  ...props
}: Props & ThElement) => {
  const actualClassName = useMemo(() => {
    const base = classNameGenerator({ className, align, vAlign });

    if (!fixed) {
      return base;
    }

    const shadow = scrollShadowClassNameGenerator({
      showShadow: false,
      direction: fixed,
    });

    return `${base} ${shadow}`;
  }, [className, align, vAlign, fixed]);
  return (
    <th {...props} className={actualClassName}>
      {children}
    </th>
  );
};
