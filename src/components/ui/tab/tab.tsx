'use client';

import React, {
  ChangeEvent,
  createContext,
  ReactElement,
  useContext,
  useMemo,
  useState,
} from 'react';

import { cn } from '@/utils/cn';

type TabKey = string;
type TabLabel = string | JSX.Element;

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

const Tab = ({ children, defaultKey, className }: TabProps) => {
  const [currentKey, setCurrentKey] = useState(defaultKey);
  const changeTabHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentKey(event.target.value);
  };

  const tabList = useMemo<TabHeader[]>((): TabHeader[] => {
    const tabListArray: TabHeader[] = [];

    if (Array.isArray(children)) {
      children.forEach((child) => {
        if (child.type !== TabItem) throw Error('TabItemを利用してください');
        tabListArray.push({
          tabKey: child.props.tabKey,
          label: child.props.label,
        });
      });
    } else if (children.type === TabItem) {
      tabListArray.push({
        tabKey: children.props.tabKey,
        label: children.props.label,
      });
    } else {
      throw Error('TabItemを利用してください');
    }
    return tabListArray;
  }, [children]);

  return (
    <TabContext.Provider value={{ currentKey }}>
      <div className={cn('', className)}>
        <div className="">
          <label>
            <select name="members" onChange={changeTabHandler}>
              {tabList.map(({ tabKey, label }) => (
                <option key={tabKey} value={tabKey}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          さんの家事タスク一覧
        </div>
      </div>
      {children}
    </TabContext.Provider>
  );
};

type TabItemProps = {
  tabKey: TabKey;
  label: TabLabel;
  children: React.ReactNode;
  className?: string;
};

const TabItem = ({ children, tabKey, className }: TabItemProps): any => {
  const { currentKey } = useContext(TabContext);

  return currentKey === tabKey ? (
    <div className={cn('w-full bg-black', className)}>{children}</div>
  ) : null;
};

TabItem.displayName = 'TabItem';

export { Tab, TabItem };
