/**
 * 通用的验证规则
 */
import {
  ValidationOptions,
  IsNotEmpty as IsNotEmptySource,
  Matches as MatchesSource,
} from 'class-validator';

/**
 * 验证器-验证是否输入
 * @param message 消息
 * @param options 配置
 * @returns
 */
export const IsNotEmpty = (message: string, options?: ValidationOptions) => {
  return IsNotEmptySource({ message: `请输入${message}`, ...options });
};

/**
 * 正则校验函数
 * @param pattern 正则表达式
 * @param message 消息体
 * @param options 配置
 */
export const Matches = (
  pattern: RegExp,
  message: string,
  options?: ValidationOptions,
) => {
  return MatchesSource(pattern, { message, ...options });
};
