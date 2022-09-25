/**
 * 时间格式转换
 */
import moment from 'moment';

/**
 * 格式转化精度
 */
export enum Precision {
  Second = 'YYYY-MM-DD HH:mm:ss', // 秒
  Minute = 'YYYY-MM-DD HH:mm', // 分钟
  Hour = 'YYYY-MM-DD HH', // 小时
  Day = 'YYYY-MM-DD', // 天
  Month = 'YYYY-MM', // 月
  Year = 'YYYY', // 年
}

/**
 * 时间格式转化
 */
export const dateFormat = (value: any, template = Precision.Second) =>
  value && moment(value).format(template);
