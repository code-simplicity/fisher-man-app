import { ApiProperty, IsNotEmpty } from '@app/decorator';
import { IsString } from 'class-validator';

/**
 * 创建token的数据对象
 */
export class CreateTokenDto {
  @ApiProperty('用户id', { example: '1' })
  @IsNotEmpty('用户id')
  @IsString()
  userId: string;

  @ApiProperty('刷新的token', { example: '1211122' })
  @IsNotEmpty('刷新的token')
  @IsString()
  refreshToken: string;

  @ApiProperty('token的Key', { example: '1211122' })
  @IsNotEmpty('token的Key')
  @IsString()
  tokenKey: string;
}
