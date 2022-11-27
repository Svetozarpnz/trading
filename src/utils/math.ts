type Numstr = number | string;
const MLN = 1_000_000;


const checkIsString = (val: Numstr): val is string => typeof val === 'string';

export const toNumber = (str: string) =>
Number(str.replace(',', '.'));


export const sum = (val1: Numstr, val2: Numstr): number => {
  const newVal1 = checkIsString(val1) ? toNumber(val1) : val1;
  const newVal2 = checkIsString(val2) ? toNumber(val2) : val2;

  return (newVal1 * MLN + newVal2 * MLN)/MLN;
}
