type TableTitles = Record<string, ETitles>;

export enum ETitles {
  date = 'date',
  time = 'time',
  stock = 'stock',
  price = 'price',
  volume = 'volume',
  fee = 'fee',
  type = 'type',
}

export const TABLE_TITLES_CONFIG: TableTitles = {
  'Дата заключения' : ETitles.date,
  'Время заключения': ETitles.time,
  'Наименование ЦБ': ETitles.stock,
  'Цена**': ETitles.price,
  'Количество, шт.': ETitles.volume,
  'Комиссия Брокера': ETitles.fee,
  'Комиссия Биржи': ETitles.fee,
  'Вид': ETitles.type,
};



