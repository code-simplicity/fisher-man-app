import { Entity } from 'typeorm';
import { CommonEntity } from '@app/common';
import { ApiProperty, Column, ColumnJson } from '@app/decorator';

/**
 * 角色表
 */
@Entity('uc_role')
export class Role extends CommonEntity {
  @ApiProperty('角色名称')
  @Column('角色名称', { unique: true })
  name: string;

  @ApiProperty('权限配置')
  @ColumnJson('权限配置')
  permissions: any;
}
