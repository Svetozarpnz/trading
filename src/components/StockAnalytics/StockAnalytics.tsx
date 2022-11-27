import React, { FC } from 'react';
import { Sprout } from '../../common/types';
import styles from './StockAnalytics.module.css';

type Props = {
  sprouts: Sprout[];
  title: string;
}

export const StockAnalytics: FC<Props> = ({
  sprouts,
  title,
}) => {

  const openedSprouts = sprouts.filter((sprout) => !sprout.closed)

  return (
    <div className={styles.acorItem}>
      <input type="checkbox" name="chacor" id={title}/>
      <label htmlFor={title}>{title}</label>
      <div className={styles.acorBody}>
        <div>
          <ul>
            <li>{`Ростков: ${sprouts.length}`}</li>
            <li>{`Открытых ростков: ${openedSprouts.length}`}</li>
          </ul>
          <table>
            {openedSprouts.map(({start , volume, long}) => (
              <tr>
                <td className={long ? styles.green : styles.red}>
                  {start} {volume} шт.
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  )
}
