import { ApiProperty, IsNotEmpty } from '@app/decorator';
import { IsString } from 'class-validator';

/**
 * 删除用户的实体
 */
export class DeleteTokenDto {
  @ApiProperty('id', { example: '1211122' })
  @IsString()
  id?: string;

  @ApiProperty('用户id', { example: '1' })
  @IsNotEmpty('用户id')
  @IsString()
  userId: string;
}
