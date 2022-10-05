import { ApiProperty, ValidatorUser } from '@app/decorator';
import { Role } from '@apps/user-center-service/role/entities';
import { UserInfo } from '@apps/user-center-service/user-info/entities';

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
}

/**
 * 用户信息
 */
export class UserInfoDto extends UserInfo {
  @ApiProperty('角色信息')
  role: Role;
}

/**
 * 用户登录返回的信息
 */
export class LoginUserInfoDto extends UserInfoDto {
  @ApiProperty('header.Authorization="Bearer ${access_token}" 用于鉴权')
  access_token: string;
}
