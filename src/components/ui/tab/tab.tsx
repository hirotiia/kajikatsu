'use client';

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

type TabKey = string;
type TabLabel = string | JSX.Element;

type TabItemProps = {
  tabKey: TabKey;
  label: TabLabel;
  children: ReactNode;
  className?: string;
};

type TabProps = {
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[];
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
        if (
          (child.type as any).displayName === 'TabSelectHeader' ||
          (child.type as any).displayName === 'TabHeader'
        ) {
          return undefined;
        }
        if ((child.type as any).displayName !== 'TabItem') {
          throw new Error('TabItemを利用してください');
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
      <div
        className={cn(
          'w-full rounded-lg border border-muted shadow-lg bg-base overflow-hidden',
          className,
        )}
      >
        {children}
      </div>
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
      className={cn('flex border-b border-muted', className)}
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
          <li key={tabKey} className="flex-1" role="presentation">
            <button
              type="button"
              role="tab"
              aria-selected={tabKey === currentKey}
              aria-controls={`tabpanel-${tabKey}`}
              id={`tab-${tabKey}`}
              ref={refs.current[tabKey]}
              tabIndex={tabKey === currentKey ? 0 : -1}
              className={cn(
                'w-full px-4 py-2 text-center transition-colors duration-200 ease-in-out focus:outline-none',
                tabKey === currentKey
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-secondary hover:bg-primary hover:text-primary-foreground',
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

  const handleChangeTab = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentKey(event.target.value);
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor="tab-select" className="text-sm text-muted">
        <select
          id="tab-select"
          name="members"
          onChange={handleChangeTab}
          value={currentKey}
          className="w-full rounded border border-muted bg-base p-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {tabList.map(({ tabKey, label }) => (
            <option key={tabKey} value={tabKey}>
              {label}
            </option>
          ))}
        </select>
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
        'w-full p-4 bg-secondary text-secondary-foreground min-h-screen',
        className,
      )}
    >
      {children}
    </div>
  );
};

TabItem.displayName = 'TabItem';

export { Tab, TabHeader, TabSelectHeader, TabItem };
