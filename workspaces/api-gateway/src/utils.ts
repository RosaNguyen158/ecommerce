import slugify from 'slugify';

import type { IPagyParams } from 'interface';

export interface ISlugParams {
  name: string;
  columnName: string;
}

export const convertOption = {
  camelCase: 'camelCase',
  snakeCase: 'snakeCase',
} as const;

export type TConvertOption = keyof typeof convertOption;

export const createSlug = async (
  { name, columnName }: ISlugParams,
  checkExisted,
): Promise<string> => {
  const slug = slugify(`${name.trim().slice(0, 50)}`, '-');
  const isExisted = await checkExisted(slug, columnName);
  if (isExisted) {
    return `${slug}-${new Date().getTime()}`;
  }

  return slug;
};

export const checkPageNumber = ({ page, perPage }: IPagyParams): number => {
  return (page - 1) * perPage > 0 ? (page - 1) * perPage : 0;
};

const toSnakeCase = (str: string): string => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

const toCamelCase = (str: string) => {
  return str.replace(/_(.)/g, (s, c) => c.toUpperCase());
};

const isObject = (obj: unknown): obj is object => {
  return (
    obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function'
  );
};

export const convertByOption = <T>(option: TConvertOption, obj: unknown): T => {
  if (isObject(obj)) {
    return Object.entries(obj).reduce((result, [key, value]) => {
      if (option == 'camelCase') {
        result[toCamelCase(key)] = convertByOption(option, value);
      } else {
        result[toSnakeCase(key)] = convertByOption(option, value);
      }

      return result;
    }, {}) as T;
  } else if (Array.isArray(obj)) {
    return obj.map((i) => {
      return convertByOption(option, i);
    }) as T;
  }

  return obj as T;
};

type CamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${Lowercase<T>}${Capitalize<CamelCase<U>>}`
  : S;

export type TKeysToCamelCase<T> = T extends object
  ? {
      [K in keyof T as CamelCase<K & string>]: TKeysToCamelCase<T[K]>;
    }
  : T;

export const pick = <T, K extends keyof T = keyof T, O = { [P in K]: T[P] }>(
  object: T,
  fields: Array<K>,
) => {
  return fields.reduce(
    (prev, field) => ({ ...prev, [field]: object[field] }),
    {} as O,
  );
};
