import React, { useMemo } from 'react';
import { useSelector } from '../../components/StateManager/Context';
import { State } from '../../components/StateManager/types';
import styles from '../SelectFile/SelectFile.module.css';
import { getResultTable } from '../../utils';
import { getBrokerDataSelector } from '../../components/StateManager/selectors';
import { ETitles } from '../../common/constants/tableConfig';


const FILTERED_STOCK = 'Татнфт 3ао';
const filteredStocks: string[] = [];

const getCondition = (stockName: string) => {
  if (!filteredStocks.length) {
    return true
  }
  return filteredStocks.includes(stockName);
}

const Deals = () => {
  const data = useSelector(getBrokerDataSelector);
  const tableData = data?.filter((row) => getCondition(row[ETitles.stock]));


  const tableHeader = useMemo(() =>
    Object.keys(tableData?.[0] ?? {})?.map((title, index) => (
      <th key={index}>{title}</th>
    ))
  , [tableData]);

  const tableBody = useMemo(() => tableData?.map((row, i) => (
    <tr key="i">
      {
        Object.values(row).map((value, k) => (
          <td key={`${i}-${k}`}>
            {value}
          </td>
        ))
      }
    </tr>
  )), [tableData]);

  if(!tableData) {
    return (
      <div className={styles.wrap}>
        <div className={styles.message}>
          Нет данных по сделкам.
        </div>
      </div>
    )
  }

  return (
    <table>
      <div>Комиссия в сбере за период{data ? data?.reduce((acc, deal) => deal[ETitles.fee] + acc, 0)/7*6 : 0}</div>
      <div>Комиссия в тинькове за этот же период{data ? data?.reduce((acc, deal) => deal[ETitles.fee] + acc, 0)/7*5 : 0}</div>
      <div>Сумма за ежемесячный взнос за этот же период: 7540 </div>
      <thead>{tableHeader}</thead>
      <tbody>{tableBody}</tbody>
    </table>
  )
};

export default Deals;
