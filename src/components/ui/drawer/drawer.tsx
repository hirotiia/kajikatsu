'use client';

import { cva, VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  ElementType,
  ComponentPropsWithoutRef,
  useId,
} from 'react';

import { cn } from '@/utils/cn';

// TODO: ドロワーメニューが閉じている時に中身のコンテンツにフォーカスされてしまうので修正する
type DrawerContextType = {
  name: string;
  side: DrawerSide;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  drawerTitleId?: string;
  setDrawerTitleId: Dispatch<SetStateAction<string | undefined>>;
};

export const DrawerContext = createContext<DrawerContextType>({
  name: '',
  side: 'right',
  isOpen: false,
  setIsOpen: () => {},
  drawerTitleId: undefined,
  setDrawerTitleId: () => {},
});

type DrawerSide = 'top' | 'bottom' | 'left' | 'right';

const drawerVariants = cva(
  'fixed z-50 transition-transform duration-300 ease-in-out will-change-transform',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 -translate-y-full transform data-[state=open]:translate-y-0',
        bottom:
          'inset-x-0 bottom-0 translate-y-full transform data-[state=open]:translate-y-0',
        left: 'inset-y-0 left-0 w-full -translate-x-full transform data-[state=open]:translate-x-0 sm:max-w-sm',
        right:
          'inset-y-0 right-0 w-full translate-x-full transform data-[state=open]:translate-x-0 sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
);

interface DrawerProps {
  children: React.ReactNode;
  name: string;
  side?: DrawerSide;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const Drawer = ({
  children,
  name,
  side = 'right',
  defaultOpen = false,
  onOpenChange,
}: DrawerProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [drawerTitleId, setDrawerTitleId] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  return (
    <DrawerContext
      value={{ name, side, isOpen, setIsOpen, drawerTitleId, setDrawerTitleId }}
    >
      <div>{children}</div>
    </DrawerContext>
  );
};

interface DrawerTriggerProps {
  children: React.ReactNode;
  className?: string;
}

const DrawerTrigger = ({
  children,
  className,
  ...props
}: DrawerTriggerProps) => {
  const { name, setIsOpen, isOpen } = useContext(DrawerContext);

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={name}
      className={cn(
        'cursor-pointer text-foreground bg-background py-2 px-4 hover:bg-foreground hover:text-background transition-colors duration-300 ease-in-out',
        className,
      )}
      onClick={() => setIsOpen((prev) => !prev)}
      {...props}
    >
      {children}
    </button>
  );
};

interface DrawerHeaderTriggerProps extends ComponentPropsWithoutRef<'button'> {
  as?: ElementType;
}

const DrawerHeaderTrigger = ({
  children,
  className,
  ...props
}: DrawerHeaderTriggerProps) => {
  const { name, isOpen, setIsOpen } = useContext(DrawerContext);
  const toggleDrawer = () => setIsOpen((prev) => !prev);

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={name}
      className={cn('cursor-pointer flex items-center', className)}
      onClick={toggleDrawer}
      {...props}
    >
      <span>{children}</span>
      <span className="ml-2 inline-block">
        {isOpen ? (
          <span className="relative inline-block size-6">
            <span className="absolute inset-1/2 block h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-foreground transition-transform duration-300" />
            <span className="absolute inset-1/2 block h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-foreground transition-transform duration-300" />
          </span>
        ) : (
          <span className="relative block h-0.5 w-6 bg-foreground transition duration-300 ease-in-out before:absolute before:h-0.5 before:w-6 before:-translate-y-2 before:bg-foreground before:transition before:duration-300 before:ease-in-out after:absolute after:h-0.5 after:w-6 after:translate-y-2 after:bg-foreground after:transition after:duration-300 after:ease-in-out" />
        )}
      </span>
    </button>
  );
};

interface DrawerCloseTriggerProps extends ComponentPropsWithoutRef<'button'> {
  as?: ElementType;
}

const DrawerCloseTrigger = ({
  children,
  className,
  ...props
}: DrawerCloseTriggerProps) => {
  const { setIsOpen } = useContext(DrawerContext);
  return (
    <div className={className}>
      <button type="button" onClick={() => setIsOpen(false)} {...props}>
        {children}
      </button>
    </div>
  );
};

interface DrawerContentProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'className'>,
    VariantProps<typeof drawerVariants> {
  className?: string;
}

const DrawerContent = ({
  children,
  className,
  side,
  ...props
}: DrawerContentProps) => {
  const { name, isOpen, side: sideFromContext } = useContext(DrawerContext);
  const currentSide = side ?? sideFromContext;

  return (
    <div
      className={cn(
        'z-50 relative pl-10',
        drawerVariants({ side: currentSide }),
      )}
      id={name}
      data-state={isOpen ? 'open' : 'closed'}
      inert={!isOpen}
      {...(!isOpen && { inert: true })}
      {...props}
    >
      <div
        className={cn(
          'max-h-screen overflow-y-auto px-4 py-10 bg-background h-full',
          className,
        )}
      >
        {children}
      </div>
      <DrawerCloseTrigger className="absolute left-0 top-5">
        <X size="30">close</X>
      </DrawerCloseTrigger>
    </div>
  );
};

interface DrawerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: ElementType;
  children: React.ReactNode;
}

const DrawerTitle = ({
  as: Tag = 'h2',
  className,
  children,
  ...props
}: DrawerTitleProps) => {
  const { setDrawerTitleId } = useContext(DrawerContext);
  const titleId = useId();

  useEffect(() => {
    setDrawerTitleId(titleId);
    return () => {
      setDrawerTitleId(undefined);
    };
  }, [titleId, setDrawerTitleId]);

  return (
    <Tag
      id={titleId}
      className={cn(
        'text-lg font-semibold leading-none tracking-tight',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const DrawerBody = ({ className, ...props }: DrawerBodyProps) => {
  return (
    <div className={cn('flex-1 overflow-auto mt-8', className)} {...props} />
  );
};

export {
  Drawer,
  DrawerTrigger,
  DrawerHeaderTrigger,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerBody,
};
