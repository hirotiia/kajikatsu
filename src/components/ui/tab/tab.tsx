'use client';

import { ChevronDown } from 'lucide-react';
import React, {
  ChangeEvent,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
  useState,
  KeyboardEvent,
  useRef,
  useEffect,
} from 'react';

import { cn } from '@/utils/cn';
import { invertOnHover } from '@/utils/invert-on-hover';

type TabKey = string;
type TabLabel = string | JSX.Element;

export type TabItemProps = {
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
  tabList: TabHeader[];
  registerTab: (
    tabKey: TabKey,
    ref: React.RefObject<HTMLButtonElement>,
  ) => void;
};

type TabHeader = {
  tabKey: TabKey;
  label: TabLabel;
};

const TabContext = createContext<TabContextState>({
  currentKey: '',
  setCurrentKey: () => {},
  tabList: [],
  registerTab: () => {},
});

const Tab = ({ children, defaultKey, className }: TabProps) => {
  const [currentKey, setCurrentKey] = useState(defaultKey);
  const [tabs, setTabs] = useState<TabHeader[]>([]);
  const tabRefs = useRef<Record<TabKey, React.RefObject<HTMLButtonElement>>>(
    {},
  );

  const registerTab = (
    tabKey: TabKey,
    ref: React.RefObject<HTMLButtonElement>,
  ) => {
    tabRefs.current[tabKey] = ref;
  };

  const tabList = useMemo<TabHeader[]>(() => {
    const items = React.Children.toArray(
      children,
    ) as ReactElement<TabItemProps>[];
    return items
      .map((child) => {
        if ((child.type as any).displayName === 'TabHeader') {
          return undefined;
        }
        if ((child.type as any).displayName === 'TabSelectHeader') {
          return undefined;
        }

        return { tabKey: child.props.tabKey, label: child.props.label };
      })
      .filter((tab): tab is TabHeader => tab !== undefined);
  }, [children]);

  useEffect(() => {
    setTabs(tabList);
  }, [tabList]);

  return (
    <TabContext.Provider
      value={{ currentKey, setCurrentKey, tabList: tabs, registerTab }}
    >
      <div className={cn('w-full', className)}>{children}</div>
    </TabContext.Provider>
  );
};

type TabHeaderProps = {
  className?: string;
  ariaLabel: string;
};

const TabHeader = ({ className, ariaLabel }: TabHeaderProps) => {
  const { currentKey, setCurrentKey, tabList, registerTab } =
    useContext(TabContext);
  const refs = useRef<Record<TabKey, React.RefObject<HTMLButtonElement>>>({});

  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const currentIndex = tabList.findIndex((tab) => tab.tabKey === currentKey);

    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowRight':
        newIndex = (currentIndex + 1) % tabList.length;
        event.preventDefault();
        break;
      case 'ArrowLeft':
        newIndex = (currentIndex - 1 + tabList.length) % tabList.length;
        event.preventDefault();
        break;
      case 'Home':
        newIndex = 0;
        event.preventDefault();
        break;
      case 'End':
        newIndex = tabList.length - 1;
        event.preventDefault();
        break;
      default:
        return;
    }

    const newKey = tabList[newIndex].tabKey;
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
      {tabList.map(({ tabKey, label }) => {
        if (!refs.current[tabKey]) {
          refs.current[tabKey] = React.createRef<HTMLButtonElement>();
          registerTab(tabKey, refs.current[tabKey]);
        }

        return (
          <li
            key={`${tabKey}-header`}
            className="flex-1 border-foreground [&:not(:first-child)]:border-l-2"
            role="presentation"
          >
            <button
              type="button"
              role="tab"
              aria-selected={tabKey === currentKey}
              aria-controls={`tabpanel-${tabKey}`}
              id={`tab-${tabKey}`}
              ref={refs.current[tabKey]}
              tabIndex={tabKey === currentKey ? 0 : -1}
              className={cn(
                'w-full text-sm md:text-base px-4 py-2 text-center transition-colors duration-200 ease-in-out focus:outline-none',
                tabKey === currentKey
                  ? 'bg-primary text-primary-foreground'
                  : invertOnHover('bg-primary-foreground', 'text-primary'),
              )}
              onClick={() => {
                setCurrentKey(tabKey);
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
};

const TabSelectHeader = ({ children, className }: TabSelectHeaderProps) => {
  const { currentKey, setCurrentKey, tabList } = useContext(TabContext);

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
              'pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-transform duration-300 text-foreground',
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
            {tabList.map(({ tabKey, label }) => (
              <option key={`${tabKey}-option`} value={tabKey}>
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

const TabItem = ({ children, tabKey, className }: TabItemProps) => {
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

export { Tab, TabHeader, TabSelectHeader, TabItem };
