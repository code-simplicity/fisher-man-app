import { CommonEntity } from '@app/common';
import { Entity } from 'typeorm';
import { ApiProperty, Column } from '@app/decorator';

export enum SettingStatusEnum {
  DEFAULT = '0', // 默认，当用户没有自定义的时候使用这条记录
  CUSTOMIZE = '1', // 用户自定义
}

@Entity({ name: 'uc_settings' })
export class Setting extends CommonEntity {
  @ApiProperty('用户标识')
  @Column('用户标识', 32, { type: 'varchar', unique: true, name: 'key' })
  key: string;

  @ApiProperty('用户id')
  @Column('用户id', 32, { type: 'varchar', unique: true, name: 'user_id' })
  userId: string;

  @ApiProperty('用户存储的数据，用于配置网站的独特性')
  @Column('用户存储的数据的值', '', { type: 'simple-json', name: 'value' })
  value: any;

  @ApiProperty('多语言')
  @Column('多语言配置', 128, { type: 'varchar', name: 'language' })
  language: string;

  @ApiProperty('主题色')
  @Column('主题色存储', 128, { type: 'varchar', name: 'theme_color' })
  themeColor: string;

  @ApiProperty('字体大小')
  @Column('字体大小', null, { type: 'integer', name: 'font_size', default: 14 })
  fontSize: number;

  @ApiProperty('圆角大小')
  @Column('圆角大小', null, {
    type: 'integer',
    name: 'border_radius',
    default: 4,
  })
  borderRadius: number;

  @ApiProperty('状态')
  @Column('状态', null, {
    type: 'enum',
    enum: SettingStatusEnum,
    default: SettingStatusEnum.DEFAULT,
  })
  status: string;
}
