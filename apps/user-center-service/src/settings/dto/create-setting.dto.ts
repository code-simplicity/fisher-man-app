import { ApiProperty, Column } from '@app/decorator';

export class InitUserSettingDto {
  @ApiProperty('用户id', { required: false })
  userId?: string;
}

export class CreateSettingDto extends InitUserSettingDto {
  // @ApiProperty('用户标识')
  // key: string;

  @ApiProperty('用户id')
  userId: string;

  @ApiProperty('用户存储的数据，用于配置网站的独特性')
  value: any;

  @ApiProperty('多语言')
  language: string;

  @ApiProperty('主题色')
  themeColor: string;

  @ApiProperty('字体大小')
  fontSize: number;

  @ApiProperty('圆角大小')
  borderRadius: number;
}
