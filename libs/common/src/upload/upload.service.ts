import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { FileLimit } from '@app/common/upload/dto/upload.dto';
import { extname } from 'path';
import { findKey } from 'lodash';
import { unlinkSync } from 'fs';

/**
 * 文件上传的配置
 */
export type UploadServiceOptions = {
  fileLimit: FileLimit;
};

/**
 * 文件上传验证的配置
 */
export type VerifyFileOptions = {
  originalname?: string; // 源文件名称
  name?: string; // 文件名称
  size: number; // 文件大小
  path?: string; // 路径
};

/**
 * 文件上传
 */
@Injectable()
export class UploadService {
  constructor(readonly options: UploadServiceOptions) {}

  /**
   * 验证文件
   * @param originalname
   * @param name
   * @param size
   * @param path
   */
  async verifyFile({
    originalname,
    name = originalname,
    size,
    path,
  }: VerifyFileOptions) {
    let error;
    if (!name) error = '请上传有效的文件';
    const suffix = extname(name).slice(1);
    const fileLimitKey = findKey(this.options.fileLimit, {
      suffixes: [suffix],
    });
    if (!fileLimitKey) error = '禁止上传该类型文件！！！';
    const fileLimit = this.options.fileLimit[fileLimitKey];
    if (size > fileLimit.maxSizeMB * 1024 * 1024)
      error = `${fileLimit.name}大小不能大于${fileLimit.maxSizeMB}MB`;
    if (error) {
      path && (await this.deleteFile(path));
      throw new UnsupportedMediaTypeException(error);
    }
  }

  /**
   * 删除文件
   * @param path
   */
  async deleteFile(path: string) {
    try {
      await unlinkSync(path);
    } catch (error) {
      return error;
    }
  }
}
