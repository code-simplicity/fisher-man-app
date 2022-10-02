import { ApiProperty, ValidatorUser } from '@app/decorator';
import { UserInfo } from '../../../../user-center-service/src/user-info/entities';

/**
 * 账户登陆
 */
export class UserLoginDto {
  @ValidatorUser.USERNAME
  @ApiProperty('用户名', { example: 'admin' })
  userName: string;

  @ValidatorUser.PASSWORD
  @ApiProperty('密码', { example: '123456' })
  password: string;
}

/**
 * 用户信息
 */
export class UserInfoDto extends UserInfo {
  @ApiProperty('角色信息')
  role: [];
}

/**
 * 用户登录返回的信息
 */
export class LoginUserInfoDto extends UserInfoDto {
  @ApiProperty('header.Authorization="Bearer ${access_token}" 用于鉴权')
  access_token: string;
}
