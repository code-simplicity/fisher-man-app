import { IsString } from 'class-validator';

// 创建用户信息的dto
export class CreateUserInfoDto {
  @IsString()
  userId: string;

  @IsString()
  email: string;

  phoneNum?: string;
}
