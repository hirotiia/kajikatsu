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
};

type TabHeader = {
  tabKey: TabKey;
  label: TabLabel;
};

const TabContext = createContext<TabContextState>({
  currentKey: '',
});

const TabItem = ({ children, tabKey, className }: TabItemProps) => {
  const { currentKey } = useContext(TabContext);

  if (currentKey !== tabKey) return null;

  return <div className={cn('w-full bg-black', className)}>{children}</div>;
};
TabItem.displayName = 'TabItem';

const Tab = ({ children, defaultKey, className }: TabProps) => {
  const [currentKey, setCurrentKey] = useState(defaultKey);

  const handleChangeTab = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentKey(event.target.value);
  };

  const tabList = useMemo<TabHeader[]>(() => {
    const items = React.Children.toArray(
      children,
    ) as ReactElement<TabItemProps>[];
    return items.map((child) => {
      if ((child.type as any).displayName !== 'TabItem') {
        throw new Error('TabItemを利用してください');
      }
      return { tabKey: child.props.tabKey, label: child.props.label };
    });
  }, [children]);

  return (
    <TabContext.Provider value={{ currentKey }}>
      <div className={cn('', className)}>
        <div className="">
          <label>
            <select
              name="members"
              onChange={handleChangeTab}
              value={currentKey}
            >
              {tabList.map(({ tabKey, label }) => (
                <option key={tabKey} value={tabKey}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          さんの家事タスク一覧
        </div>
        {children}
      </div>
    </TabContext.Provider>
  );
};

export { Tab, TabItem };
