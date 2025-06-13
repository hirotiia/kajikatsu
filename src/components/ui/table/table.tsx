import { ComponentProps, Fragment, PropsWithChildren, useMemo } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

import { cn } from '@/utils/cn';

import { TableScroll } from './table-scroll/table-scroll';

type TableProps = VariantProps<typeof classNameGenerator> &
  ComponentProps<'table'>;

const classNameGenerator = tv({
  slots: {
    wrapper: 'overflow-auto',
    table: [
      'w-full border-collapse',
      'caption-bottom',
      'bg-muted',
      '[&_:is(th,td)]:p-3',
      '[&_:is(th,td)]:min-w-[100px] [&_:is(th,td)]:md:min-w-[150px]',
      '[&_:is(td)]:bg-background [&_:is(th)]:bg-muted',
      'text-sm',
      '[&_tbody]:bg-background',
    ],
  },
  variants: {
    borderType: {
      vertical: {},
      horizontal: {},
      both: {},
      outer: {
        table: 'border border-solid border-foreground',
      },
      all: {
        table: 'border border-solid border-foreground',
      },
    },
    borderStyle: {
      solid: {
        table: '[&_:is(th,td)]:border-solid',
      },
      dotted: {
        table: '[&_:is(th,td)]:border-dotted',
      },
      dashed: {
        table: '[&_:is(th,td)]:border-dashed',
      },
    },
    rounded: {
      true: {},
    },
    layout: {
      auto: {},
      fixed: {
        table: 'table-fixed',
      },
    },
    fixedHead: {
      true: {
        table:
          '[&_tbody]:relative [&_tbody]:z-10 [&_thead]:sticky [&_thead]:start-0 [&_thead]:top-0 [&_thead]:z-[2]',
      },
    },
  },
  compoundVariants: [
    {
      borderType: ['outer', 'all'],
      rounded: true,
      className: {
        table: 'border-none',
        wrapper: 'border-shorthand',
      },
    },
    {
      borderType: ['vertical', 'both', 'all'],
      className: {
        table: [
          '[&_:is(th:not(:first-child),td:not(:first-child))]:border-l',
          '[&_:is(th:not(:first-child),td:not(:first-child))]:border-l-default',
        ],
      },
    },
    {
      borderType: ['horizontal', 'both', 'all'],
      className: {
        table: [
          [
            '[&:has(thead)_tr:not(:where(thead_tr))_:is(th,td)]:border-t',
            '[&:has(thead)_tr:not(:where(thead_tr))_:is(th,td)]:border-t-default',
          ],
          [
            '[&:not(:has(thead))_tr:not(:first-of-type)_:is(th,td)]:border-t',
            '[&:not(:has(thead))_tr:not(:first-of-type)_:is(th,td)]:border-t-default',
          ],
        ],
      },
    },
  ],
  defaultVariants: {
    borderType: 'horizontal',
    borderStyle: 'solid',
    layout: 'auto',
    fixedHead: false,
  },
});

export const Table = ({
  rounded,
  borderStyle,
  borderType,
  layout,
  fixedHead,
  className,
  ...rest
}: TableProps) => {
  const classNames = useMemo(() => {
    const { table, wrapper } = classNameGenerator({
      borderType,
      borderStyle,
      fixedHead,
      layout,
      rounded,
      className,
    });
    return { table: table({ className }), wrapper: wrapper() };
  }, [borderType, borderStyle, className, fixedHead, layout, rounded]);
  const [Wrapper, wrapperProps] = useMemo(
    () =>
      rounded
        ? [RoundedWrapper, { className: classNames.wrapper }]
        : [Fragment],
    [rounded, classNames.wrapper],
  );

  return (
    <Wrapper {...wrapperProps}>
      <table {...rest} className={classNames.table} />
    </Wrapper>
  );
};

const RoundedWrapper = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <div className={cn('overflow-hidden rounded-md', className)}>
    <TableScroll>{children}</TableScroll>
  </div>
);
