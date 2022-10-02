import { IsString } from 'class-validator';
import { CommonEntity } from '@app/common';

// 创建用户信息的dto
export class CreateUserInfoDto {
  @IsString()
  userId: string;

  @IsString()
  email: string;
}
