import { SyntheticEvent } from 'react';
import { BrokerRecord, FileContent, FileFormat, ParsedBrokerData } from '../common/types';

const headerData: string[] = [];

const parsedData: ParsedBrokerData = {
  [FileFormat.CSV]: [],
  [FileFormat.HTML]: [],
}

const parseDom = (str: FileContent) => typeof str === 'string' ?
  (new DOMParser()).parseFromString(str, "text/html") : null;

const parseCsv = (str: FileContent, fileName: string) => {
  if (typeof str !== 'string') {
    return null
  }
  const rows = str.split('\n');
  const [headerRow = '', ...otherRows] = rows;
  const headerCsvData = headerRow.split(';').map((title) => title);

  otherRows.forEach((row) => {
    const currentDeal: BrokerRecord = {};
    const splittedRow = row.split(';');
    splittedRow.forEach((val, index) => {
      const num = val.replace(' ', '');
      const title = headerCsvData[index];
      if (title) {
        currentDeal[title] = isNaN(Number(num))
          ? str
          : num.replace('.', ',');
      }
      currentDeal.file = fileName
      currentDeal.fileFormat = FileFormat.CSV
    });
    parsedData[FileFormat.CSV].push(currentDeal);
  })

}

const findTableElement = (dom: Document | null) => {
  const elems = dom?.querySelectorAll<Element>('body>*');
  let table: Element = document.createElement('span');
  elems?.forEach((elem, index) => {
    const nextElement = elems[index + 1];
    if (elem.innerHTML.includes('Сделки купли/продажи ценных бумаг') && nextElement) {
      table = nextElement
    }
  });
  return table.tagName === 'TABLE' ? table : null;
}

const fillHeaderData = (row?: Element) => {
  const headerRow = row?.querySelectorAll('td');
  if (!headerData.length) {
    headerRow?.forEach((td) => {
      headerData.push(td.innerHTML)
    });
  }
}

const getDealDataFromRow = (row: NodeListOf<HTMLElementTagNameMap['td']>, fileName: string) => {
  const currentDeal: BrokerRecord = {};
  row.forEach((td, index) => {
    const str = td.innerHTML;
    const num = str.replace(' ', '');
    const title = headerData[index];
    if (title) {
      currentDeal[title] = isNaN(Number(num))
        ? str
        : num.replace('.', ',');
    }
  });
  currentDeal.file = fileName || '';
  currentDeal.fileFormat = FileFormat.HTML;
  return currentDeal;
}

const fillDataFromStandartHtmlTable = (table: Element | null, fileName: string) => {
  if (!table) {
    console.log('Не найдена таблица сделок в файле: ', fileName)
    return;
  }
  const dataRows = table.querySelectorAll('tr');
  fillHeaderData(dataRows?.[0]);

  const count = dataRows?.[0]?.children?.length ?? 0;
  dataRows.forEach((tr, index) => {
    const isRowContainsData = index && tr.children.length === count;
    if (isRowContainsData) {
      const currentRow = tr.querySelectorAll('td');
      const currentDeal = getDealDataFromRow(currentRow, fileName);
      parsedData[FileFormat.HTML].push(currentDeal);
    }
  });
}

const getFileFormat = (fileName?: string): FileFormat => {
  if (!fileName) {
    return FileFormat.HTML
  }

  const splitted = fileName.split('.');
  const formatText = splitted[splitted.length - 1] as string;

  return formatText.toLowerCase() as FileFormat;
}

export const handleSelectFile = (e: SyntheticEvent<HTMLInputElement>) => new Promise<ParsedBrokerData>(
  (resolve) => {
    const fileList = e.currentTarget.files;
    const fileCount = fileList?.length || 0;
    let fileOrder = 0;
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const { result } = fileReader;
      const currentFile = fileList?.[fileOrder];
      const fileFormat = getFileFormat(currentFile?.name)
      if (fileFormat === FileFormat.HTML) {
        const document = parseDom(result);
        const table = findTableElement(document);
        fillDataFromStandartHtmlTable(table, currentFile?.name ?? '');
      } else {
        parseCsv(result, currentFile?.name ?? '');
      }

      const isLeftFile = ++fileOrder < fileCount && currentFile
      if (isLeftFile) {
        fileReader.readAsText(currentFile)
      } else {
        resolve(parsedData);
      }
    }

    const nextFile = fileList?.[fileOrder];
    if (nextFile) {
      fileReader.readAsText(nextFile)
    }
  });

