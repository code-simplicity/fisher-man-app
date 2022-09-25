import { ApiProperty, IsNotEmpty, ValidatorUser } from '@app/public-decorator';

/**
 * 创建用户的对象
 */
export class CreateUserDto {
  @ValidatorUser.USERNAME
  @ApiProperty('用户名', { example: '摸鱼1号' })
  @IsNotEmpty('用户名不可以为空')
  userName: string;

  @ValidatorUser.PASSWORD
  @ApiProperty('密码', { example: '123456' })
  @IsNotEmpty('密码不可以为空')
  password: string;

  @ValidatorUser.EMAIL
  @ApiProperty('邮箱', { example: '468262345@qq.com' })
  @IsNotEmpty('邮箱不可以为空')
  email: string;

  @ApiProperty('手机号', { required: false })
  phone: string;

  @ApiProperty('头像', { required: false })
  avatar: string;
}
