import React, { useMemo } from 'react';
import { useSelector } from '../../components/StateManager/Context';
import { State } from '../../components/StateManager/types';
import styles from '../SelectFile/SelectFile.module.css';
import { getResultTable } from '../../utils';
import { getBrokerDataSelector } from '../../components/StateManager/selectors';
import { ETitles } from '../../common/constants/tableConfig';

const FILTERED_STOCK = 'Татнфт 3ао';

const Deals = () => {
  const data = useSelector(getBrokerDataSelector);
  const tableData = data?.filter((row) => row[ETitles.stock] === FILTERED_STOCK);

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
      <thead>{tableHeader}</thead>
      <tbody>{tableBody}</tbody>
    </table>
  )
};

export default Deals;
