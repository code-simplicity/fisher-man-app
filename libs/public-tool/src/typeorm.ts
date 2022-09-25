/**
 * 数据库orm的设置
 */
import { sha512 } from 'js-sha512';
import { ValueTransformer } from 'typeorm';
import { dateFormat } from './date-format';

/**
 * 默认转化方法
 * @param value
 * @returns
 */
const toOrFrom = (value: any) => value;

/**
 * 生成转化对象
 * @param param
 * @returns
 */
export const createTransformer = ({
  to = toOrFrom,
  from = toOrFrom,
}: Partial<ValueTransformer>) => ({ to, from });

/**
 * 创建时间转换
 */
export const dateTransformer = createTransformer({ from: dateFormat });

/**
 * sha512 密码转化
 */
export const sha512Transformer = createTransformer({ to: sha512 });
