import * as crypto from 'crypto';
import { BadRequestException } from '@nestjs/common';

/**
 * 生成随机盐
 */
export const makeSalt = (): string => {
  // 生成加密的强伪随机数
  return crypto.randomBytes(15).toString('base64');
};

/**
 * 使用随机盐加密密码，同时也是作为解密验证的
 * @param password
 * @param salt
 */
export const encryptPassword = (password: string, salt: string): string => {
  if (!password || !salt) throw new BadRequestException('密码/盐不能为空');
  const tempSalt = Buffer.from(salt, 'base64');
  // pbkdf2Sync(密码，盐，迭代，长度，摘要算法)
  return crypto
    .pbkdf2Sync(password, tempSalt, 100000, 64, 'sha1')
    .toString('base64');
};
