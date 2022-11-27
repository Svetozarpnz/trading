import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '../../components/StateManager/Context';
import styles from '../SelectFile/SelectFile.module.css';
import { getAnalytics, getResultTable } from '../../utils';
import { getAnalyticsSelector, getBrokerDataSelector } from '../../components/StateManager/selectors';
import { SET_ANALYTICS } from '../../components/StateManager/actions';
import StockAnalytic from '../../components/StockAnalytics';

const Analytics = () => {
  const dispatch = useDispatch();
  const analytics = useSelector(getAnalyticsSelector);
  const brokerData = useSelector(getBrokerDataSelector);
  const hasAnalytics = !!analytics.length;

  useEffect(() => {
    if (/*!hasAnalytics &&*/ brokerData) {
      const newAnalytics = getAnalytics(brokerData);
      dispatch({ type: SET_ANALYTICS, value: newAnalytics })
    }
  }, [])

  if(!hasAnalytics) {
    return (
      <div className={styles.wrap}>
        <div className={styles.message}>
          Нет данных для анализа.
        </div>
      </div>
    )
  }

  return (
    <div className={styles.accordeon}>
      {
        analytics.map(({ sprouts, name }) => (
          <StockAnalytic sprouts={sprouts} title={name}/>
        ))
      }
    </div>
  )
};

export default Analytics;
