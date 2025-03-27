'use client';

import { ChevronDown } from 'lucide-react';
import React, {
  ChangeEvent,
  createContext,
  ReactNode,
  useContext,
  useState,
  KeyboardEvent,
  useRef,
} from 'react';

import { cn } from '@/utils/cn';

type TabKey = string;
type TabLabel = string | React.JSX.Element;

export type TabPanelProps = {
  tabKey: TabKey;
  label: TabLabel;
  children: ReactNode;
  className?: string;
};

type TabProps = {
  children: React.ReactNode;
  defaultKey: TabKey;
  className?: string;
};

type TabContextState = {
  currentKey: TabKey;
  setCurrentKey: React.Dispatch<React.SetStateAction<TabKey>>;
};

type Tab = {
  key: TabKey;
  label: TabLabel;
};

const TabContext = createContext<TabContextState>({
  currentKey: '',
  setCurrentKey: () => {},
});

const Tab = ({ children, defaultKey, className }: TabProps) => {
  const [currentKey, setCurrentKey] = useState(defaultKey);

  return (
    <TabContext value={{ currentKey, setCurrentKey }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabContext>
  );
};

type TabHeaderProps = {
  className?: string;
  ariaLabel: string;
  tabs: Tab[];
};

const TabHeader = ({ className, ariaLabel, tabs }: TabHeaderProps) => {
  const { currentKey, setCurrentKey } = useContext(TabContext);
  const refs = useRef<
    Record<TabKey, React.RefObject<HTMLButtonElement | null>>
  >({});

  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const currentIndex = tabs.findIndex(({ key }) => key === currentKey);
    if (currentIndex < 0) return;

    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowRight':
        newIndex = (currentIndex + 1) % tabs.length;
        event.preventDefault();
        break;
      case 'ArrowLeft':
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        event.preventDefault();
        break;
      case 'Home':
        newIndex = 0;
        event.preventDefault();
        break;
      case 'End':
        newIndex = tabs.length - 1;
        event.preventDefault();
        break;
      default:
        return;
    }

    const newKey = tabs[newIndex].key;
    setCurrentKey(newKey);
    refs.current[newKey]?.current?.focus();
  };

  return (
    <ul
      className={cn(
        'flex rounded-t overflow-hidden border-2 border-foreground',
        className,
      )}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
    >
      {tabs.map(({ key, label }) => {
        if (!refs.current[key]) {
          refs.current[key] = React.createRef<HTMLButtonElement>();
        }

        return (
          <li
            key={`${key}-header`}
            className="flex-1 border-foreground [&:not(:first-child)]:border-l-2"
            role="presentation"
          >
            <button
              type="button"
              role="tab"
              aria-selected={key === currentKey}
              aria-controls={`tabpanel-${key}`}
              id={`tab-${key}`}
              ref={refs.current[key]}
              tabIndex={key === currentKey ? 0 : -1}
              className={cn(
                'size-full text-sm px-4 py-2 text-center border border-transparent focus:outline-none focus:border-foreground',
                key === currentKey
                  ? 'bg-primary text-background'
                  : 'bg-primary-foreground text-primary custom-transition hover:bg-primary hover:text-primary-foreground',
              )}
              onClick={() => {
                setCurrentKey(key);
              }}
            >
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

TabHeader.displayName = 'TabHeader';

type TabSelectHeaderProps = {
  children?: React.ReactNode;
  className?: string;
  options: Tab[];
};

const TabSelectHeader = ({
  children,
  className,
  options,
}: TabSelectHeaderProps) => {
  const { currentKey, setCurrentKey } = useContext(TabContext);

  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleFocus = () => {
    // セレクトにフォーカスが当たったタイミングで矢印を上向きに
    setIsSelectOpen(true);
  };

  const handleBlur = () => {
    // 選択後またはフォーカスが外れたタイミングで矢印を下向きに戻す
    setIsSelectOpen(false);
  };

  const handleChangeTab = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentKey(event.target.value);
  };

  return (
    <div className={cn('border-2 border-foreground rounded-t', className)}>
      <label htmlFor="tab-select" className="text-sm text-muted">
        <span className="sr-only">メンバーを選択</span>
        <div className="relative">
          <ChevronDown
            className={cn(
              'pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 transition-transform duration-300 text-foreground',
              isSelectOpen ? 'rotate-180' : 'rotate-0',
            )}
          />
          <select
            id="tab-select"
            name="members"
            onChange={handleChangeTab}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={currentKey}
            className={cn(
              'appearance-none w-full py-1 px-2 text-foreground md:px-4 md:py-2 md:text-lg',
            )}
          >
            {options.map(({ key, label }) => (
              <option key={`${key}-option`} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </label>
      {children}
    </div>
  );
};

TabSelectHeader.displayName = 'TabSelectHeader';

const TabPanel = ({ children, tabKey, className }: TabPanelProps) => {
  const { currentKey } = useContext(TabContext);

  if (currentKey !== tabKey) return null;

  return (
    <div
      id={`tabpanel-${tabKey}`}
      role="tabpanel"
      aria-labelledby={`tab-${tabKey}`}
      className={cn(
        'w-full p-2 md:p-4 bg-secondary text-secondary-foreground border-foreground border-x-2 border-b-2 rounded-b',
        className,
      )}
    >
      {children}
    </div>
  );
};

export { Tab, TabHeader, TabSelectHeader, TabPanel };
