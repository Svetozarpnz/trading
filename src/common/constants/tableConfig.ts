import { FileFormat } from '../types';

type TableTitles = Record<string, ETitles>;

export enum ETitles {
  id = 'id',
  date = 'date',
  time = 'time',
  stock = 'stock',
  code = 'code',
  price = 'price',
  volume = 'volume',
  fee = 'fee',
  type = 'type',
}

export const TABLE_TITLES = {
  id: 'Номер сделки',
  date: 'Дата заключения',
  time: 'Время заключения'
}

export const STANDART_HTML_TABLE_TITLES_CONFIG: TableTitles = {
  'Номер сделки' : ETitles.id,
  'Дата заключения' : ETitles.date,
  'Время заключения': ETitles.time,
  'Наименование ЦБ': ETitles.stock,
  'Код ЦБ': ETitles.code,
  'Цена**': ETitles.price,
  'Количество, шт.': ETitles.volume,
  'Комиссия Брокера': ETitles.fee,
  'Комиссия Биржи': ETitles.fee,
  'Вид': ETitles.type,
};

export const STANDART_CSV_TABLE_TITLES_CONFIG: TableTitles = {
  'Номер сделки' : ETitles.id,
  'Дата заключения' : ETitles.date,
  'Код финансового инструмента': ETitles.code,
  'Цена': ETitles.price,
  'Количество': ETitles.volume,
  'Комиссия банка': ETitles.fee,
  'Комиссия торговой системы': ETitles.fee,
  'Операция': ETitles.type,
}

export const TABLE_CONFIGS = {
  html: STANDART_HTML_TABLE_TITLES_CONFIG,
  csv: STANDART_CSV_TABLE_TITLES_CONFIG,
}

