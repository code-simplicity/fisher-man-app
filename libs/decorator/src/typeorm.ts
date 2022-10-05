/**
 * typeorm自定义装饰器
 */
import { ColumnOptions, Column as ColumnSource } from 'typeorm';
import { ColumnCommonOptions } from 'typeorm/decorator/options/ColumnCommonOptions';

/**
 * 列装饰器
 * @param comment 名字
 * @param length 长度
 * @param options 配置
 * @returns
 */
export const Column = (
  comment: string,
  length?: number | ColumnOptions,
  options?: ColumnOptions,
) => {
  if (typeof length === 'number') length = { length };
  return ColumnSource({ comment, ...length, ...options });
};

/**
 * JSON格式的列装饰器
 * @param comment
 * @param options
 * @constructor
 */
export const ColumnJson = (comment: string, options?: ColumnCommonOptions) => {
  return ColumnSource('simple-json', { comment, ...options });
};
