import translate, { TranslateKey, Lang, languages } from '../utils/translate';
import React, { useLayoutEffect, useState } from 'react';


export function useTranslate(keys: TranslateKey, insert?:string[]): string;
export function useTranslate(keys: TranslateKey[], insert?:string[]): string[];
export function useTranslate(keys: TranslateKey | TranslateKey[], insert?: string[]): string | string[] {
  // TODO Здесь будет реализовано получения языка из интерфейса
  const lang = languages[0] as Lang;

  const translateFn = (key: TranslateKey) => translate(lang, key, insert);

  return Array.isArray(keys) ? keys.map(translateFn) : translateFn(keys);
}

const useDidMount = (cb: (...args: any[]) => any) => {
  const isFirst = React.useRef(true);
  const alwaysNew = React.useRef(true);
  alwaysNew.current = !alwaysNew.current;

  useLayoutEffect(() => {
    if (!isFirst.current) {
      cb();
    }

    isFirst.current = false;
  }, [alwaysNew.current])
};

const useDidUpdate = (cb: any) => {
  const isFirst = React.useRef(true);
  const alwaysNew = React.useRef(true);
  alwaysNew.current = !alwaysNew.current;

  useLayoutEffect(() => {
    if (!isFirst.current) {
      cb();
    }

    isFirst.current = false;
  })
};

const useMyRef = (initialValue: any) => {
  const [state] = useState({ current: initialValue });
  return state;
};
