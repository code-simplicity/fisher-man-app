import { CommonEntity, UserConstants } from '@app/common';
import { ApiProperty, IsNotEmpty, ValidatorUser } from '@app/decorator';
import { IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class VerifyCodeDto {
  @ApiProperty('邮箱验证码')
  @IsNotEmpty('邮箱验证码')
  @IsString()
  emailCode?: string;

  @ApiProperty('图灵验证码')
  @IsNotEmpty('图灵验证码')
  @IsString()
  captcha?: string;
}

/**
 * 创建用户的对象
 */
export class CreateUserDto extends VerifyCodeDto {
  @ValidatorUser.USERNAME
  @ApiProperty('用户名', { example: '摸鱼君1号' })
  @IsNotEmpty('用户名')
  @IsString()
  username?: string;

  @ValidatorUser.PASSWORD
  @ApiProperty('密码', { example: '123456' })
  @IsNotEmpty('密码')
  @Exclude() // 返回的时候过滤掉密码
  @IsString()
  password?: string;

  @ValidatorUser.EMAIL
  @ApiProperty('邮箱', { example: '468262345@qq.com' })
  @IsNotEmpty('邮箱')
  @IsString()
  email?: string;

  @ApiProperty('性别', { example: '男' })
  // @IsNotEmpty('性别')
  // @IsString()
  sex?: string;

  @ApiProperty('签名', { example: '很神秘，什么也没有' })
  // @IsNotEmpty('签名')
  // @IsString()
  sign?: string;

  @ApiProperty('手机号', { example: '1008611' })
  phone?: string;

  @ApiProperty('头像', { example: UserConstants.DEFAULT_AVATAR })
  avatar?: string;
}

/**
 * 账户登陆
 */
export class UserLoginDto {
  @ValidatorUser.USERNAME
  @ApiProperty('用户名', { example: 'admin' })
  username: string;

  @ValidatorUser.PASSWORD
  @ApiProperty('密码', { example: '123456' })
  password: string;

  @ApiProperty('图灵验证码', { example: '123456' })
  captcha: string;
}

export class RefreshTokenDto extends CreateUserDto {
  id?: string;
  salt?: string;
  tokenKey?: string;
  refreshToken?: string;
}
