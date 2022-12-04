import { Controller, Get, Ip, Param, Query, Req, Res } from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@app/decorator';
import { UserEmailDto } from '@apps/user-center-service/email/dto/user-email.dto';
import { Request, Response } from 'express';

@ApiTags('验证码服务')
@Controller('ucenter/')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  /**
   * 发送邮箱验证码
   */
  @Get('send/email/code')
  // @MessagePattern('User.login')
  @ApiOperation('发送邮箱验证码')
  async sendEmailCode(@Query() userEmailDto: UserEmailDto) {
    return await this.emailService.sendEmilaCode(userEmailDto);
  }

  /**
   * 获取图灵验证码
   */
  @Get('verify/code')
  @ApiOperation('获取图灵验证码')
  async getVerifyCode(@Req() request: Request, @Res() response: Response) {
    return await this.emailService.getVerifyCode(request, response);
  }
}
