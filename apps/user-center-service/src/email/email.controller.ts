import { Controller, Get, Param, Query } from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@app/decorator';
import { UserEmailDto } from '@apps/user-center-service/email/dto/user-email.dto';

@ApiTags('邮箱服务')
@Controller('ucenter/email/')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  /**
   * 发送邮箱验证码
   */
  @Get('send/email')
  // @MessagePattern('User.login')
  @ApiOperation('发送邮箱验证码')
  async sendEmailCode(@Query() userEmailDto: UserEmailDto) {
    return await this.emailService.sendEmilaCode(userEmailDto);
  }
}
