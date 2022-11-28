import React, { useCallback } from 'react';
import { getResultTable, handleSelectFile, saveFile } from '../../utils';
import styles from './SelectFile.module.css';
import { useDispatch, useSelector } from '../../components/StateManager/Context';
import { FileFormat,  } from '../../common/types';
import { useTranslate } from '../../common/hooks';
import { State } from '../../components/StateManager/types';
import { PARSE } from '../../components/StateManager/actions';
import { renderFileFormatTexts } from './renders';


const SelectFile = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: State) => state.broker.data);
  const offerSelectText = useTranslate('selectFiles.offerselect');

  const handleSelect = async (e: React.SyntheticEvent<HTMLInputElement>) => {
    const dataFromFile = await handleSelectFile(e);

    dispatch({type: PARSE.parse, value: getResultTable(dataFromFile)});
  };

  const handleSaveFile = useCallback(
    () => {
      saveFile(data, FileFormat.CSV);
    },
    [data]
  );

  return (
    <div className={styles.wrap}>
      <div className={styles.message}>
        {offerSelectText} {renderFileFormatTexts}
      </div>
      <div className={styles.fileInput}>
        <input type="file" multiple onChange={handleSelect} accept=".html, .csv"/>
      </div>
      <div className={styles.saveBlock}>
        {
          data && data.length && (
            <button onClick={handleSaveFile}>Выгрузить в CSV</button>
          )
        }
      </div>
    </div>
  )
};

export default SelectFile;
