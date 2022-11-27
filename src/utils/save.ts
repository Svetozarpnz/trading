import { BrokerData, Deal, EExportFileFormat } from '../common/types';

const createFileData = (data: Deal[] | null, format: EExportFileFormat) => {
  switch (format) {
    case EExportFileFormat.CSV:
      return createCsvContent(data);
    case EExportFileFormat.HTML:
      return createCsvContent(data);
    default:
      return createCsvContent(data);
  }
};

const createCsvContent =  (brokerData: Deal[] | null) => {
  const firstRowCollection = brokerData?.[0] ?? {};
  const rows: string[] = [
    Object.keys(firstRowCollection).join(';'),
    ...(brokerData?.map((brokerRow, index) => {
      const row = Object.values(brokerRow);

      return row.join(';')
    }) ?? [])
  ];

  return rows.join('\n')
};

export const saveFile = (data: Deal[] | null, format: EExportFileFormat = EExportFileFormat.CSV) => {
  const fileContent = createFileData(data, format);

  const blob = new Blob([fileContent], { type: 'text/plain' });
  const link = document.createElement('a');
  link.setAttribute('href', URL.createObjectURL(blob));
  link.setAttribute('download', 'сделки.csv');
  link.click();
};
