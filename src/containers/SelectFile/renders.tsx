import { fileFormats } from '../../common/constants/texts';
import styles from './SelectFile.module.css';
import React, { Fragment } from 'react';

export const renderFileFormatTexts = fileFormats.map((format, i) => {
  const formatText = `.${format.toLowerCase()}`;
  const comma = i ? ' | ' : '';

  return (
    <Fragment key={format}>
      {comma}
      <span className={styles.code}>{formatText}</span>
    </Fragment>
  )
});
