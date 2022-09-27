import { User } from '@app/public-common';
import { ApiProperty, IsNotEmpty, ValidatorUser } from '@app/public-decorator';
import { IsString } from 'class-validator';

/**
 * 创建用户的对象
 */
export class CreateUserDto {
  @ValidatorUser.USERNAME
  @ApiProperty('用户名', { example: '摸鱼君1号' })
  @IsNotEmpty('用户名')
  @IsString()
  userName: string;

  @ValidatorUser.PASSWORD
  @ApiProperty('密码', { example: '123456' })
  @IsNotEmpty('密码')
  @IsString()
  password: string;

  @ValidatorUser.EMAIL
  @ApiProperty('邮箱', { example: '468262345@qq.com' })
  @IsNotEmpty('邮箱')
  @IsString()
  email: string;

  @ApiProperty('性别', { example: '男' })
  @IsNotEmpty('性别')
  @IsString()
  sex: string;

  @ApiProperty('签名', { example: '很神秘，什么也没有' })
  @IsNotEmpty('签名')
  @IsString()
  sign: string;

  @ApiProperty('手机号', { example: '1008611' })
  phone?: string;

  @ApiProperty('头像', { example: User.DEFAULT_AVATAR })
  avatar?: string;
}
