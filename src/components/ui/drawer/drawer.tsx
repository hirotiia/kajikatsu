import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { cn } from '@/utils/cn';

type DrawerContextType = {
  name: string;
  state: [boolean, Dispatch<SetStateAction<boolean>>];
};

const DrawerContext = createContext<DrawerContextType>({
  name: '',
  state: [false, () => {}],
});

/**
 * Drawer: 状態を管理
 * DrawerTrigger: ボタンを押下するとDrawerContentを表示非表示制御するコンポーネントを２つ受け取り、開閉の時に表示を切り替える
 * DrawerContent: DrawerTriggerに制御されるコンテンツ、左右前後で位置指定もできる
 * DrawerCloseTrigger: ボタンを押下すると閉じる
 */
// const drawerVariants = cva(
//   'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
//   {
//     variants: {
//       side: {
//         top: 'inset-x-0 top-0 border-b',
//         bottom: 'inset-x-0 bottom-0 border-t',
//         left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
//         right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
//       },
//     },
//     defaultVariants: {
//       side: 'right',
//     },
//   },
// );

const Drawer = ({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight + 'px';
      contentRef.current.style.setProperty(
        '--accordion-content-height',
        contentHeight,
      );
    }
  }, [isOpen]);

  return (
    <DrawerContext.Provider value={{ name, state: [isOpen, setIsOpen] }}>
      <div ref={contentRef}>{children}</div>
    </DrawerContext.Provider>
  );
};

const DrawerTrigger = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  const {
    name,
    state: [isOpen, setIsOpen],
  } = useContext(DrawerContext);
  const toggleAccordion = () => setIsOpen((prev) => !prev);
  return (
    <button
      type="button"
      aria-expanded={'false'}
      className={cn('block', className)}
      aria-controls={name}
      onClick={toggleAccordion}
    >
      <span>{children}</span>
      {isOpen ? (
        <span className="relative inline-block size-6 before:absolute before:left-1/2 before:top-1/2 before:block before:h-0.5 before:w-6 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-45 before:bg-foreground before:transition-transform before:duration-300 after:absolute after:left-1/2 after:top-1/2 after:block after:h-0.5 after:w-6 after:-translate-x-1/2 after:-translate-y-1/2 after:-rotate-45 after:bg-foreground after:transition-transform after:duration-300"></span>
      ) : (
        <span
          className={
            'relative block h-0.5 w-6 bg-foreground transition duration-300 ease-in-out before:absolute before:h-0.5 before:w-6 before:-translate-y-2 before:bg-foreground before:transition before:duration-300 before:ease-in-out after:absolute after:h-0.5 after:w-6 after:translate-y-2 after:bg-foreground after:transition after:duration-300 after:ease-in-out'
          }
        ></span>
      )}
    </button>
  );
};

const DrawerContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  const {
    name,
    state: [isOpen],
  } = useContext(DrawerContext);
  return (
    <div
      id={name}
      className={cn(
        'block',
        isOpen ? 'block animate-accordion-down' : 'hidden animate-accordion-up',
        className,
      )}
    >
      {children}
    </div>
  );
};

export { Drawer, DrawerTrigger, DrawerContent };
