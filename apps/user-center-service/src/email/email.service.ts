import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { UserEmailDto } from '@apps/user-center-service/email/dto/user-email.dto';
import { LoggerService, UserConstants } from '@app/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Cache } from 'cache-manager';

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
        `${userEmailDto.email}-${UserConstants.FISHER_EMAIL_KEY}`,
      );
      this.loggerService.log(emailKey, '邮箱验证码');
      if (emailKey)
        return { message: '邮箱验证码没有过期，请勿频繁发送邮箱验证码' };
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
        `${userEmailDto.email}-${UserConstants.FISHER_EMAIL_KEY}`,
        code,
        60 * 30,
      );
      return {};
    } catch (error) {
      this.loggerService.error(error, '发送邮件错误');
      return error;
    }
  }
}