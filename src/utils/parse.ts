import { SyntheticEvent } from 'react';
import { BrokerRecord, FileContent, FileFormat, ParsedBrokerData } from '../common/types';
import { getIsAvailableFileFormat } from './check';

const headerData: string[] = [];

const parsedData: ParsedBrokerData = {
  [FileFormat.CSV]: [],
  [FileFormat.HTML]: [],
}

const parseDom = (str: FileContent) => typeof str === 'string' ?
  (new DOMParser()).parseFromString(str, "text/html") : null;


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

const parseHtml = (str: FileContent, fileName: string) => {
  const document = parseDom(str);
  const table = findTableElement(document);
  fillDataFromStandartHtmlTable(table, fileName ?? '');
}

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
          ? num
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

const getFileFormat = (fileName?: string): string | null => {
  if (!fileName) {
    return null
  }

  const splitted = fileName.split('.');
  const formatText = splitted[splitted.length - 1] as string;

  return formatText.toLowerCase();
}

const parseFile = (file: File, content: FileContent) => {
  const fileFormat = getFileFormat(file?.name)
  const isAvailableFormat = getIsAvailableFileFormat(fileFormat);
  if (isAvailableFormat) {
    if (fileFormat === FileFormat.HTML) {
      parseHtml(content, file?.name ?? '')
    }
    if (fileFormat === FileFormat.CSV) {
      parseCsv(content, file?.name ?? '');
    }
  }
}

export const handleSelectFile = (e: SyntheticEvent<HTMLInputElement>) => new Promise<ParsedBrokerData>(
  (resolve) => {
    const fileList = e.currentTarget.files;
    const countOfFile = fileList?.length || 0;
    let fileOrder = 0;
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const { result } = fileReader;
      const currentFile = fileList?.[fileOrder];

      if (currentFile && result) {
        parseFile(currentFile, result);
      }

      const isLeftFile = ++fileOrder < countOfFile && currentFile
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

