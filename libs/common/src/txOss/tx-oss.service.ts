import { Injectable } from '@nestjs/common';
import COS, { Bucket, COSOptions, Region, Scope } from 'cos-nodejs-sdk-v5';
import * as TxCOS from 'cos-nodejs-sdk-v5';
import { UploadService, UploadServiceOptions } from '@app/common/upload';
import * as dayjs from 'dayjs';
import * as nuid from 'nuid';
import { extname } from 'path';
import { unlinkSync } from 'fs';

export type TxOssServiceOptions = UploadServiceOptions &
  COS &
  COSOptions &
  Scope & {
    Bucket: Bucket; // 存储桶
    Region: Region; // 地域
    arn: string; // 角色
    uploadPath: string; // 上传路径
  };

export interface UploadFileProps {
  size?: number; // 文件大小
  path?: string; // 路径
  originalname?: string; // 源文件名称
  filename?: string; // 现在的文件名称
  mimetype?: string; // 文件类型
  destination?: string; // 文件地址
}

/**
 * 腾讯云对象存储服务
 */
@Injectable()
export class TxOssService extends UploadService {
  oss: COS;
  cosOptions: COSOptions;
  constructor(readonly options: TxOssServiceOptions) {
    super({ fileLimit: options.fileLimit });
    const { SecretId, SecretKey, Timeout } = options;
    this.oss = new TxCOS({ SecretId, SecretKey });
  }
  async getAuthorizationSts() {}

  /**
   * 上传文件 腾讯对象存储高阶的上传，目前推荐使用这种
   * @param file
   */
  async uploadFile(file: UploadFileProps) {
    const { filename, path } = file;
    console.log('file ==>', file);
    const { Bucket, Region, uploadPath } = this.options;
    // 日期
    const day = dayjs().format('YYYY-MM-DD');
    // 对象存储的文件夹
    const folderKey = `${uploadPath}/${day}/${filename}`;
    const uploadResult: COS.UploadFileResult = await this.oss.uploadFile({
      Bucket,
      Region,
      Key: folderKey, // 文件上传对象
      FilePath: path, // 本地文件路径
      // 上传任务创建时的回调函数
      onTaskReady: (taskId) => {
        console.log(taskId, '任务上传标识');
      },
      // 任务上传进度的回调
      onProgress: (progressData) => {
        console.log(JSON.stringify(progressData), '任务上传进度');
      },
      // 任务完成或者失败的回调
      onFileFinish: (err, data, options) => {
        console.log(options.Key, +'上传' + (err ? '失败' : '成功'));
      },
    });
    // 请求码失败报错
    if (![200, 201].includes(uploadResult.statusCode)) {
      return new Error('上传错误');
    }
    // 上传成功之后删除对应的本地文件
    try {
      unlinkSync(path);
    } catch (error) {
      return error;
    }
    return {
      ETag: uploadResult.ETag,
      Location: uploadResult.Location,
      url: `https://${uploadResult.Location}`,
    };
  }

  /**
   * 获取上传的文件
   * @param filename
   */
  async getPutObject(filename: string) {
    // 存储桶 地域 上传文件路径
    const { Bucket, Region, uploadPath } = this.options;
    const day = dayjs().format('YYYY-MM-DD');
    const name = `${uploadPath}/${day}/${nuid.next() + extname(filename)}`;
    return {
      name,
      url: `https://${Bucket}.cos.${Region}.myqcloud.com/${name}`,
    };
  }
}
