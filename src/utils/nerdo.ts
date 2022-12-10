export const isStr = (value: unknown): value is string => typeof value === 'string';
export const isNum = (value: unknown): value is number => typeof value === 'number';
export const isBool = (value: unknown): value is boolean => typeof value === 'boolean';
export const isBigInt = (value: unknown): value is bigint => typeof value === 'bigint';
export const isSymbol = (value: unknown): value is symbol => typeof value === 'symbol';
export const isNull = (value: unknown): value is null => value === null;
export const isUndefined = (value: unknown): value is undefined => value === undefined;

export const isPrimitive = (value: unknown): value is Primitive  =>
  isStr(value) ||
  isNum(value) ||
  isBool(value) ||
  isBigInt(value) ||
  isSymbol(value) ||
  isNull(value) ||
  isUndefined(value);

export const isFn = (value: unknown): value is AnyFn => typeof value === 'function';
export const isArr = (value: unknown): value is any[] => Array.isArray(value);
export const isObj = (value: unknown): value is Record<ObjKey, unknown> => Boolean(value) && !isArr(value) && typeof value === 'object';

// TODO: сделать сортировку по вложенным полям
export const sort = (arr: any[], options: { by: string, comparator: () => number}) => arr.sort((a, b ) => a - b);

// TODO: возможно нужно типизировать входные данные как объект
export const isPlainObj = (obj: unknown): obj is PlainObj =>
  isObj(obj) && Object.values(obj).every((value) => isPrimitive(value));

export const getLast = (value: unknown, options?: { separator: string; sorted: boolean}): unknown => {
  if (isStr(value)) {
    const iterable = options?.separator ? value.split(options?.separator) : value;
    return iterable[iterable.length - 1];
  }
  if (isArr(value)) {
    return value[value.length - 1];
  }
  if (isObj(value)) {
    const keys = options?.sorted ? Object.keys(value).sort() : Object.keys(value);
    const lastKey = keys[keys.length - 1] as string;
    return [lastKey, value[lastKey]];
  }
  return value
}

// types
export type ObjKey = string | number | symbol;
export type AnyObj = Record<ObjKey, unknown>;
export type AnyFn = (...args: any[]) => any;
export type Primitive = string | number | boolean | bigint | symbol | null | undefined;
export type PlainObj = Record<ObjKey, Primitive>;
