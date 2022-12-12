import { BrokerData, BrokerRecord, Deal, FileFormat, ParsedBrokerData, Sprout } from '../common/types';
import {
  ETitles,
} from '../common/constants/tableConfig';
import { sum, toNumber } from './math';

const idHeaderText = ETitles.id;
const testStock = 'Распадская';
const enum EDealTypes {
  BUY = 'Покупка',
  SELL = 'Продажа'
}

const removeDuplicate = (data: Deal[]) => {
  const idsSet = new Set();
  return data.filter((row) => {
    const id = row[idHeaderText]
    if (!idsSet.has(id)) {
      idsSet.add(id);

      return true;
    }
    return false;
  });
}

const checkHasKey = (key: ETitles): key is keyof Deal => [ETitles.date, ETitles.fee, ETitles.price, ETitles.stock, ETitles.time, ETitles.type, ETitles.volume].includes(key);

export const transformTable = (tableData: BrokerData, tableConfig: Record<string, ETitles>, ) => {
  const titlesForNumber = [ETitles.fee, ETitles.price, ETitles.volume];
  const getNewRow = (row: Record<string, string>) =>
    Object.keys(tableConfig).reduce(
      (newRow, title) => {
        const transformedKey = tableConfig[title]!;
        const isNumber = titlesForNumber.includes(transformedKey);
        const stringValue = row[title] ?? '';
        const value = isNumber ? toNumber(stringValue) : stringValue;
        const hasKey = checkHasKey(transformedKey) && newRow.hasOwnProperty(transformedKey);
        // суммируем значения для полей, которые в конфиге указаны одинаково
        const summedValue = hasKey ? sum(newRow[transformedKey], value) : value;

        return { ...newRow, [transformedKey]: summedValue }
      },
      {} as Deal
    );

  return tableData?.map(getNewRow);
};

const sortByDate = (tableData: Deal[]) => tableData.sort((a, b) => {
  const [dA, mA, yA] = a[ETitles.date].split('.');
  const dateA = `${yA}-${mA}-${dA}T${a[ETitles.time]}`;
  const [dB, mB, yB] = b[ETitles.date].split('.');
  const dateB = `${yB}-${mB}-${dB}T${b[ETitles.time]}`;

  return (new Date(dateA)).getTime() - (new Date(dateB)).getTime()
})

export const getResultTable = (parsed: ParsedBrokerData) => {
  const uniqueDeals = removeDuplicate(Object.values(parsed).flat());
  const sortedByDate = sortByDate(uniqueDeals);

  return sortedByDate
}
type IndexedSprout = Sprout & { index: number};

const findSproutsForClose = (sprouts: Sprout[], row: Deal): IndexedSprout[] | null => {
  if (!sprouts.length) {
    return null;
  }
  const { type , price, fee, volume } = row;
  const isLongDeal = type === EDealTypes.BUY;

  const other = sprouts.reduce<IndexedSprout[]>((acc, sprout, i) => {
    if(isLongDeal === sprout.long || sprout.closed) {
      return acc
    }
    // стартоваря цена должна измениться на комиссию одной акции в ростке и сделки
    const summandFee = sum(fee / volume, sprout.fee / sprout.volume);

    const minimumPrice = sprout.start + summandFee;
    const maximumPrice = sprout.start - summandFee;

    const isRelevantSprout = isLongDeal ?
      price < maximumPrice :
      price > minimumPrice;

    if(isRelevantSprout) {
      return [
        ...acc,
        {
          ...sprout,
          index: i
        }
      ]
    }
    return acc;
  },[])

  return other.length ? other.sort((a, b) => {
    const ascendingOrder = isLongDeal ? 1 : -1;
    return (a.start - b.start) * ascendingOrder;
  }) : null;
};

const checkIsOpened = ({ closed }: { closed: boolean }) => !closed;

const getSameSprout = (sprouts: Sprout[], row: Deal): IndexedSprout | null => {
  const isLongDeal = row[ETitles.type] === EDealTypes.BUY;
  const { price } = row;

  const sameSproutIndex = sprouts.findIndex((sprout) => {
    const isOpen = !sprout.closed;
    const isSameType = isLongDeal === sprout.long;
    const isSamePrice = price === sprout.start;

    return isSameType && isOpen && isSamePrice
  });

  return sameSproutIndex >= 0 ? {
    ...sprouts[sameSproutIndex] as Sprout,
    index: sameSproutIndex,
  } : null
};

const getSprouts = (deals: Deal[], key?: string) =>
  deals.reduce<Sprout[]>(
    (acc, row) => {
      const { price, volume, type, fee } = row;

      const sameSprout = getSameSprout(acc, row);

      if (sameSprout) {
        (acc[sameSprout.index] as Sprout).volume += volume;

        return acc;
      }


      if (price === 271) {
        debugger;
      }

      const sprouts = findSproutsForClose(acc, row);
      const long = type === EDealTypes.BUY;
      if (key === testStock) {
        console.log('----------------------');
        console.log('сделка: ',  price, long ? ' ↑ ' : ' ↓ ', volume, 'шт.');
        console.log('открытые ростки: ', acc.filter(checkIsOpened));
        console.log('подходящие ростки: ', sprouts);
      }


      if (!sprouts) {
        //добавляем росток
        if (key === testStock) {
          console.log('добавляем росток: ', price, long ? ' ↑' : ' ↓');
        }
        return [
          ...acc,
          {
            start: price,
            fee,
            volume,
            long,
            closed: false,
          }
        ]
      }

      //если есть ростки
      let remainVolume = volume;
      //проверяем какие из списка ростков можно закрыть
      sprouts.forEach(
        (sprout) => {
          const sproutInResult = (acc[sprout.index] as Sprout);
          if (remainVolume <= 0) {
            // если объём сделки израсходован, пропускаем оставшиеся ростки
            return;
          }
          if (remainVolume > 0) {
            // уменьшаем оставшийся объём сделки на объём ростка
            remainVolume -= sprout.volume;
          }
          if (remainVolume >= 0) {
            // закрываем росток если объём сделки покрывает его размеры
            if (key === testStock) {
              console.log('закрываем росток: ', sprout.start, sprout.long ? ' ↑' : ' ↓')
            }
            sproutInResult.closed = true;
          }
          if (remainVolume < 0) {
            // если росток больше объёмов сделки, то при её уменьшении получается отрицательная разница
            if (key === testStock) {
              console.log('изменяем росток: ', sprout.start, sprout.long ? ' ↑ ' : ' ↓ ', 'с ', (acc[sprout.index] as Sprout).volume, ' на ', -remainVolume, ' шт.');
            }
            // комиссию уменьшаем в пропорции с числом акций для правильных расчетов в дальнейшем
            sproutInResult.fee /= sproutInResult.volume * (-remainVolume);
            // записываем разницу как остаток объема у ростка
            sproutInResult.volume = -remainVolume;
          }
        }
      );

      //если не весь объём сделки ушёл на закрытие ростков
      if(remainVolume > 0) {
        // добавляем росток на оставшийся объём
        if (key === testStock) {
          console.log('добавляем росток: ', price, long ? ' ↑' : ' ↓')
        }
        return [
          ...acc,
          {
            start: price,
            volume: remainVolume,
            fee: fee / volume * remainVolume,
            long,
            closed: false,
          }
        ]
      }
      return acc;
    },
    []
  )

export const getAnalytics = (data: Deal[]) => {
  const stockSet = new Set();
  const stockCollection = data.reduce<Record<string, Deal[]>>((acc, row) => {
    const stock = row[ETitles.stock];
    if (!stockSet.has(stock)) {
      stockSet.add(stock);
      return {...acc, [stock]: [row]}
    }
    return {
      ...acc,
      [stock]: [
        ...acc[stock] as Deal[],
        row,
      ]
    }
  }, {});

  return Object.keys(stockCollection).reduce(
    (acc, key) => [
      ...acc,
      {
        name: key,
        sprouts: getSprouts(stockCollection[key] as Deal[], key),
      }
    ],
    []
  )
}

