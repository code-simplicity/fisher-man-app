import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { UserEmailDto } from '@apps/user-center-service/email/dto/user-email.dto';
import { LoggerService, UserConstants } from '@app/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Cache } from 'cache-manager';
import * as SvgCaptcha from 'svg-captcha';
import * as RequestIp from 'request-ip';
import { Request, Response } from 'express';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly loggerService: LoggerService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}
  /**
   * 发送邮箱验证码
   * @param userEmailDto
   */
  async sendEmilaCode(userEmailDto: UserEmailDto) {
    // 实现邮箱的集成
    try {
      // 首先判断邮箱验证码是否过期，如果没有过期并且是存在多次请求的，提示相关警告，避免频繁发送垃圾邮件
      const emailKey = await this.cacheManager.get(
        `${UserConstants.FISHER_EMAIL_KEY}${userEmailDto.email}`,
      );
      this.loggerService.log(emailKey, '邮箱验证码');
      // 判断当前的ip是否频繁发送邮箱验证码，如果是那么就禁用掉
      // 生成六位数的随机邮箱验证码
      const code = Math.random().toString().slice(2, 8);
      const date = new Date();
      // 发送邮箱的配置
      const sendEmailOptions: ISendMailOptions = {
        to: userEmailDto.email,
        subject: userEmailDto.subject || '用户邮箱验证',
        // template: 'email.ejs', // 模板
        text: `${code}`,
        html: `
          <div class="biu-nav-email"
            style="max-width: 600px;min-width: 300px;margin: 40px auto;box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);font-size: 16px;padding: 20px;background-image: linear-gradient(to right, #46a4de 0%, #c73d7a 100%);border-radius: 5px;color: #fff;">
            <h3 style="margin-bottom: 40px;">
              Hi! 摸鱼君用户：
            </h3>
            <p style="padding-left: 20px;">
              您正在进行邮箱验证,本次请求的验证码为:
            </p>
            <p style="color: #dde2e2;padding-left: 14px;">
                <strong style="color: #ffffff;font-size: 24px;">
                    ${code}
                </strong>
                <span>(为了保障您帐号的安全性,请在30分钟内完成验证,祝您生活愉快!)</span>
            </p>
            <p style="padding-left: 20px;">
                <span>快速访问:</span>
                <a href="https://moyu.bugdr.cn" style="color:#fff" target="_blank"
                   rel="noopener noreferrer">https://moyu.bugdr.cn</a>
            </p>
            <p style="margin-top: 40px;text-align: right;">
              ${userEmailDto.sign}
            </p>
            <p style="text-align: right;">
              ${date}
            </p>
        </div>`,
        context: {
          code,
          date,
          sign: userEmailDto.sign || '系统邮件，请勿回复。',
        },
      };
      await this.mailerService.sendMail(sendEmailOptions);
      this.loggerService.log({ code, date, sendEmailOptions }, '邮箱验证码');
      // 存入缓存
      await this.cacheManager.set(
        `${UserConstants.FISHER_EMAIL_KEY}${userEmailDto.email}`,
        code,
        60 * 30,
      );
      return {
        message: '发送邮件成功',
      };
    } catch (error) {
      this.loggerService.error(error, '发送邮件错误');
      return error;
    }
  }

  /**
   * 获取图灵验证码
   */
  async getVerifyCode(req: Request, res: Response) {
    // 获取客户端ip
    const clientIp = RequestIp.getClientIp(req);
    console.log('Request clientIp ==>', clientIp);
    // 配置svg图片
    const captcha = SvgCaptcha.create({
      ...UserConstants.CAPTCHA_OPTION,
    });
    // 存入数值到缓存
    // 这里使用的是用户请求的ip地址，
    await this.cacheManager.set(
      `${UserConstants.FISHER_VERIFY_KEY}${clientIp}`,
      captcha.text,
      60 * 30,
    );
    res.setHeader('Content-Type', 'text/html');
    // //指定返回的类型
    res.type('svg');
    //给页面返回一张图片
    res.send(captcha.data);
  }
}
