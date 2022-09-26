/**
 * 用户视图类型
 */
import { CommonEntity } from '@app/public-common';
import { ApiProperty, Column } from '@app/public-decorator';
import { sha512Transformer } from '@app/public-tool';
import { Exclude } from 'class-transformer';
import { Entity } from 'typeorm';

@Entity({ name: 'uc_user' })
export class UserEntity extends CommonEntity {
  @ApiProperty('用户名')
  @Column('用户名', 32, { type: 'varchar', unique: true })
  userName: string;

  @ApiProperty('密码')
  @Exclude()
  @Column('密码', 128, { transformer: sha512Transformer })
  password: string;

  @ApiProperty('盐值')
  @Column('盐值', 32)
  salt: string;

  @ApiProperty('等级')
  @Column('等级', 11)
  level: string;

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
  @Column('删除标识', 1)
  deleted: string;

  @ApiProperty('状态')
  @Column('状态', 10)
  status: string;
}