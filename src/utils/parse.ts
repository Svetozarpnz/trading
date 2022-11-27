import { SyntheticEvent } from 'react';
import { BrokerData, BrokerRecord } from '../common/types';

const data: BrokerData  = [];
const headerData: string[] = [];

const parseDom = (str: string | ArrayBuffer | null) => typeof str === 'string' ?
  (new DOMParser()).parseFromString(str, "text/html") : null;

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
  return currentDeal;
}

const fillDataFromTable = (table: Element | null, fileName: string) => {
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
      data.push(currentDeal);
    }
  });
}

export const handleSelectFile = (e: SyntheticEvent<HTMLInputElement>) => new Promise<BrokerData>(
  (resolve) => {
    const fileList = e.currentTarget.files;
    const fileCount = fileList?.length || 0;
    let fileOrder = 0;
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const { result } = fileReader;
      const document = parseDom(result);
      const table = findTableElement(document);
      const currentFile = fileList?.[fileOrder];
      fillDataFromTable(table, currentFile?.name ?? '');

      const isLeftFile = ++fileOrder < fileCount && currentFile
      if (isLeftFile) {
        fileReader.readAsText(currentFile)
      } else {
        resolve(data);
      }
    }

    const nextFile = fileList?.[fileOrder];
    if (nextFile) {
      fileReader.readAsText(nextFile)
    }
  });

