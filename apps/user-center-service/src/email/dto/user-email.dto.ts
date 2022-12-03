import { ApiProperty, IsNotEmpty, ValidatorUser } from '@app/decorator';
import { IsString } from 'class-validator';

/**
 * 邮箱的实体
 */
export class UserEmailDto {
  @ValidatorUser.EMAIL
  @ApiProperty('邮箱', { example: '468262345@qq.com' })
  @IsNotEmpty('邮箱')
  @IsString()
  email: string;

  @ApiProperty('描述', { example: '用户注册' })
  subject?: string;

  @ApiProperty('签名', { example: '签名' })
  sign?: string;
}
