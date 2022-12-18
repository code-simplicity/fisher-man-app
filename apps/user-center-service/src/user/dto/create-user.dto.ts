import { CommonEntity, UserConstants } from '@app/common';
import { ApiProperty, IsNotEmpty, ValidatorUser } from '@app/decorator';
import { IsEmail, IsString } from 'class-validator';

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
  @ApiProperty('用户名', { example: '摸鱼君1号' })
  @ValidatorUser.USERNAME
  @IsNotEmpty('用户名')
  @IsString()
  username?: string;

  @ApiProperty('密码', { example: '123456' })
  @ValidatorUser.PASSWORD
  @IsNotEmpty('密码')
  @IsString()
  password?: string;

  @ApiProperty('邮箱', { example: '468262345@qq.com' })
  @ValidatorUser.EMAIL
  @IsNotEmpty('邮箱')
  @IsString()
  email?: string;

  @ApiProperty('性别', { example: '男' })
  sex?: string;

  @ApiProperty('签名', { example: '很神秘，什么也没有' })
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

export class UserForgetPasswordDto {
  @ApiProperty('密码', { example: '123456' })
  @ValidatorUser.PASSWORD
  @IsNotEmpty('密码')
  password: string;

  @ApiProperty('二次确认密码', { example: '123456' })
  @ValidatorUser.PASSWORD
  @IsNotEmpty('二次确认')
  confirmPassword: string;

  @ApiProperty('图灵验证码', { example: '123456' })
  @IsNotEmpty('图灵验证码')
  captcha: string;

  @ApiProperty('邮箱', { example: 'dupyi0912@gmail.com' })
  @IsNotEmpty('邮箱')
  @IsEmail(
    {},
    {
      message: '邮箱格式不正确哦',
    },
  )
  email: string;

  @ApiProperty('邮箱验证码', { example: '123456' })
  @IsNotEmpty('邮箱验证码')
  emailCode: string;
}

/**
 * 初始化管理员dto
 */
export class InitAdminDto {
  @ApiProperty('用户名', { example: 'admin' })
  @ValidatorUser.USERNAME
  @IsNotEmpty('用户名')
  @IsString()
  username?: string;

  @ApiProperty('密码', { example: 'admin' })
  @ValidatorUser.PASSWORD
  @IsNotEmpty('密码')
  @IsString()
  password?: string;

  @ApiProperty('邮箱', { example: '468262345@qq.com' })
  @ValidatorUser.EMAIL
  @IsNotEmpty('邮箱')
  @IsString()
  email?: string;

  @ApiProperty('性别', { example: '男' })
  sex?: string;

  @ApiProperty('签名', { example: '很神秘，什么也没有' })
  sign?: string;

  @ApiProperty('手机号', { example: '1008611' })
  phone?: string;

  @ApiProperty('头像', { example: UserConstants.DEFAULT_AVATAR })
  avatar?: string;
}
