import { ApiProperty } from '@app/decorator';

/**
 * 对象存储验证
 */
export class TxOssValidateDto {
  @ApiProperty('文件名')
  name: string;

  @ApiProperty('文件大小')
  size: number;
}

/**
 * 对象存储上传的属性
 */
export class OSSPutObjectDto {
  @ApiProperty('OSS对象名称')
  name: string;
}
