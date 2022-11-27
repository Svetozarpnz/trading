import React, { useCallback, useMemo, useState } from 'react';
import styles from './Tabs.module.css';
import { ETabs, TAB_NAME_KEYS } from './constants';
import SelectFile from '../../containers/SelectFile/SelectFile';
import { useTranslate } from '../../common/hooks';
import Help from '../../containers/Help/Help';
import Deals from '../../containers/Deals/Deals';
import Analytics from '../../containers/Analytics/Analytics';

type ButtonEvent = React.SyntheticEvent<HTMLButtonElement>;

const containers = [
  <SelectFile/>,
  <Deals/>,
  <Analytics/>,
  <Help/>
];

const Tabs = () => {
  const [tab, setTab] = useState<ETabs>(ETabs.SELECT_FILES);
  const tabNames = useTranslate(TAB_NAME_KEYS);
  const FormElement = React.forwardRef

  const handleClick = useCallback((e: ButtonEvent) => {
    setTab(Number(e.currentTarget.name))
    const doc = document.getElementById('asdf')?.querySelector('asdf');
  }, [setTab]);


  const renderTabs = useMemo(
    () => TAB_NAME_KEYS.map((name, index) => {
      const isActiveTab = name === TAB_NAME_KEYS[tab];
      const buttonProps = {
        name: String(index),
        onClick: handleClick,
      };
      const tabProps = {
        key: index,
        className: styles.tab,
        ...( isActiveTab ? {} : buttonProps)
      };

      return React.createElement(
        isActiveTab ? 'div' : 'button',
        tabProps,
        tabNames[index]
        );
    }),
    [tab]
  );

  const renderContent = useMemo(() => containers[tab], [tab]);

  return (
    <>
      <nav className={styles.nav}>
        {renderTabs}
      </nav>
      {renderContent}
    </>
  )
};

export default Tabs;
