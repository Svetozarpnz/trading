import texts from '../translate/texts.json';

type Json = typeof texts;
export type TranslateKey = keyof Json;
export type Lang = keyof Json[TranslateKey];

export const languages = Object.keys(Object.values(texts)?.[0] ?? []) as Lang[];

const translate = (lang: Lang, key: TranslateKey, insertions?: string[]) => {
  const translation = texts[key][lang];

  // вставки insertions заменяют подстроки _1, _2, _3...
  return (insertions || [])
    .reduce<string>(
      (acc, insertion, index) => translation
        .replace(`_${index + 1}`, insertion),
      translation
    )
};

export default translate;
