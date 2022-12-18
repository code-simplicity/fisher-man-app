import { CommonEntity, UserConstants } from '@app/common';
import { ApiProperty, Column } from '@app/decorator';
import { Exclude } from 'class-transformer';
import { Entity } from 'typeorm';

/**
 * 用户实体
 */
@Entity({ name: 'uc_user' })
export class User extends CommonEntity {
  @ApiProperty('用户名')
  @Column('用户名', 32, { type: 'varchar', unique: true, name: 'user_name' })
  username: string;

  @ApiProperty('密码')
  @Exclude() // 返回的时候过滤掉密码
  @Column('密码', 128)
  password: string;

  @ApiProperty('盐值')
  @Exclude() // 返回的时候过滤掉盐
  @Column('盐值', 32)
  salt: string;

  @ApiProperty('等级')
  @Column('等级', 11, { default: '1' })
  lev: string;

  @ApiProperty('性别')
  @Column('性别', null, {
    type: 'enum',
    enum: UserConstants.USER_SEX,
    default: UserConstants.USER_SEX.UNKNOWN, // 默认未知
  })
  sex: string;

  @ApiProperty('头像地址')
  @Column('头像地址', 512, {
    default: UserConstants.DEFAULT_AVATAR,
  })
  avatar: string;

  @ApiProperty('签名')
  @Column('签名', 256, {
    nullable: true,
  })
  sign: string;

  @ApiProperty('删除标识')
  @Column('删除标识', null, {
    type: 'enum',
    enum: UserConstants.USER_DELETED,
    default: UserConstants.USER_DELETED.UNDELETE, // 默认未删除
  })
  deleted: number;

  @ApiProperty('状态')
  @Column('状态', null, {
    type: 'enum',
    enum: UserConstants.USER_STATE_ENUM,
    default: UserConstants.USER_STATE_ENUM.NOT_ACTIVATE, // 默认未激活
  })
  status: number;
}
