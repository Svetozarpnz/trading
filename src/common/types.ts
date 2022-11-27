import { ETitles } from './constants/tableConfig';

export type BrokerRecord = Record<string, string>;
export type Deal = {
  [ETitles.date]: string;
  [ETitles.fee]: number;
  [ETitles.price]: number;
  [ETitles.stock]: string;
  [ETitles.time]: string;
  [ETitles.type]: string;
  [ETitles.volume]: number;
}
export type BrokerData = BrokerRecord[];
export type Sprout = {
  start: number;
  fee: number;
  volume: number;
  long: boolean;
  closed: boolean;
}

export enum EExportFileFormat {
  CSV = 'CSV',
  HTML = 'HTML',
}