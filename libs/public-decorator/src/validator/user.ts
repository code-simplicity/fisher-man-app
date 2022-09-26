/**
 * 用户校验
 */
import { Matches } from './common';

/**
 * 账户验证
 */
export const ValidatorUser = {
  // 用户名验证
  USERNAME: Matches(
    /^[a-zA-Z\u4E00-\u9FA5][a-zA-Z0-9\u4E00-\u9FA5_-]{3,32}$/,
    '请输入复核格式要求的用户名，4-32位、字母、数字、下划线、减号、汉字',
  ),
  // 密码
  PASSWORD: Matches(
    /^[\d\w-_]{4,32}$/,
    '请输入正确的密码，4-32位、字母、数字、下划线、减号',
  ),
  EMAIL: Matches(
    /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    '邮箱格式不正确哦',
  ),
  // 手机号校验
  PHONE: Matches(
    /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
    '请输入正确格式的手机号',
  ),
};