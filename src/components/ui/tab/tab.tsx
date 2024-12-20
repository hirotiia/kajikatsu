'use client';

import React, {
  ChangeEvent,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
  useState,
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
};

type TabHeader = {
  tabKey: TabKey;
  label: TabLabel;
};

const TabContext = createContext<TabContextState>({
  currentKey: '',
  setCurrentKey: () => {},
  tabList: [],
});

const Tab = ({ children, defaultKey, className }: TabProps) => {
  const [currentKey, setCurrentKey] = useState(defaultKey);
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

  return (
    <TabContext.Provider value={{ currentKey, setCurrentKey, tabList }}>
      <div
        className={cn(
          'w-full rounded-lg border border-muted shadow-lg',
          className,
        )}
      >
        {children}
      </div>
    </TabContext.Provider>
  );
};

const TabHeader = ({ className }: { className?: string }) => {
  const { currentKey, setCurrentKey, tabList } = useContext(TabContext);

  return (
    <ul className={cn('flex gap-4 border-b-1 border-muted pb-2', className)}>
      {tabList.map(({ tabKey, label }) => {
        return (
          <li className="" key={tabKey}>
            <button
              type="button"
              className={cn(
                'px-4 py-2 rounded-lg',
                tabKey === currentKey
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-base',
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
      <label className="text-sm text-muted">
        <select
          name="members"
          onChange={handleChangeTab}
          value={currentKey}
          className="rounded border border-muted bg-base p-2 text-foreground"
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
    <div className={cn('w-full p-4 bg-base-foreground text-base', className)}>
      {children}
    </div>
  );
};

TabItem.displayName = 'TabItem';

export { Tab, TabHeader, TabSelectHeader, TabItem };
