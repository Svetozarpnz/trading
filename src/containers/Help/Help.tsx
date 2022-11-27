import React, { useCallback } from 'react';
import { useTranslate } from '../../common/hooks';
import { HELP_DESC_KEYS, HELP_TITLE_KEYS } from './constants';


const Help = () => {
  const helpTitleTexts = useTranslate(HELP_TITLE_KEYS);
  const helpDescriptionTexts = useTranslate(HELP_DESC_KEYS);

  return (
    <dl>
      {
        HELP_TITLE_KEYS.map((key, index) => (
          <>
            <dt key={key}>{helpTitleTexts[index]}</dt>
            <dd key={key}>{helpDescriptionTexts[index]}</dd>
          </>
        ))
      }
    </dl>
  )
};

export default Help;