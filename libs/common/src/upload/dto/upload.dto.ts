import { ApiProperty } from '@app/decorator';

/**
 * 文件上传配置
 */
export class FileLimitItem {
  name: string; // 文件类型名称
  maxSizeMB: number; // 上传最大的尺寸
  suffixes: string[]; // 后缀名
}

/**
 * 文件上传的限制
 */
export class FileLimit {
  [key: string]: FileLimitItem;
}

/**
 * 文件上传的数据
 */
export class UploadDto {
  @ApiProperty('上传文件', { type: 'string', format: 'binary' })
  file: any;
}

/**
 * 文件上传的响应数据
 */
export class UploadResDto {
  @ApiProperty('访问地址')
  url: string;

  @ApiProperty('文件名称')
  name: string;

  @ApiProperty('文件大小')
  size: number;
}
