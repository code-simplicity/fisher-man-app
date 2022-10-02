import { CommonEntity } from '@app/common';
import { ApiProperty, Column } from '@app/decorator';
import { sha512Transformer } from '@app/tool';
import { Exclude } from 'class-transformer';
import { Entity } from 'typeorm';

/**
 * 用户实体
 */
@Entity({ name: 'uc_user' })
export class User extends CommonEntity {
  @ApiProperty('用户名')
  @Column('用户名', 32, { type: 'varchar', unique: true, name: 'user_name' })
  userName: string;

  @ApiProperty('密码')
  @Exclude()
  @Column('密码', 128)
  password: string;

  @ApiProperty('盐值')
  @Column('盐值', 32)
  salt: string;

  @ApiProperty('等级')
  @Column('等级', 11, { default: '1' })
  lev: string;

  @ApiProperty('性别')
  @Column('性别', 10)
  sex: string;

  @ApiProperty('头像地址')
  @Column('头像地址', 512)
  avatar: string;

  @ApiProperty('签名')
  @Column('签名', 256)
  sign: string;

  @ApiProperty('删除标识')
  @Column('删除标识', 1, { default: '0' })
  deleted: string;

  @ApiProperty('状态')
  @Column('状态', 10, { default: '0' })
  status: string;
}
