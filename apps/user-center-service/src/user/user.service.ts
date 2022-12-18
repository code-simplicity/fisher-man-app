import { UserInfoService } from './../user-info/user-info.service';
import {
  BadRequestException,
  Body,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateUserDto,
  UserForgetPasswordDto,
  UserLoginDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities';
import { TransformInstanceToPlain } from 'class-transformer';
import { LoggerService, UserConstants } from '@app/common';
import { keys } from 'lodash';
import { encryptPassword, makeSalt } from '@app/common/utils/cryptogram.util';
import { Cache } from 'cache-manager';
import { UserEmailDto } from '@apps/user-center-service/email/dto/user-email.dto';
import { TokenService } from '@apps/user-center-service/token/token.service';
import * as RequestIp from 'request-ip';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly loggerService: LoggerService,
    private readonly userInfoService: UserInfoService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 创建用户, 创建的是普通用户
   * @param createUserDto
   * @returns
   */
  async createUser(req: Request, createUserDto: CreateUserDto) {
    const { username, email, password, emailCode, captcha } = createUserDto;
    // 获取客户端ip
    const clientIp = RequestIp.getClientIp(req);
    // 判断用户是否存在
    await this.isUserExists(username);
    // 判断邮箱是否被注册
    await this.userInfoService.isEmailExists(email);
    // 需要使用到邮箱验证码
    await this.isEmailCodeExists(email, emailCode);
    // 验证图灵验证码是否正确
    const captchaCacheKey: string = await this.cacheManager.get(
      `${UserConstants.FISHER_VERIFY_KEY}${clientIp}`,
    );
    // 统一进行验证码的字符串大小写化
    if (captcha.toLowerCase() !== captchaCacheKey.toLowerCase()) {
      throw new BadRequestException('图灵验证码不正确，请检查并重试！！！');
    }
    // 通过bcryptjs加密库创建盐值
    const salt = makeSalt();
    // 密码进行hash
    const hashPassword = encryptPassword(password, salt);
    // 创建用户
    const user = {
      ...createUserDto,
      password: hashPassword,
      salt,
    };

    // 保存用户信息
    const userResult = await this.userRepository.save(user);
    // 判断用户是否插入
    if (keys(userResult).length === 0)
      throw new BadRequestException('用户保存失败');
    // 保存用户到用户信息表
    const userInfo = {
      userId: userResult.id,
      email: email,
    };
    await this.userInfoService.createUserInfo(userInfo);
    // 删除邮箱验证码
    await this.cacheManager.del(`${UserConstants.FISHER_EMAIL_KEY}${email}`);
    // 删除图灵验证码
    await this.cacheManager.del(
      `${UserConstants.FISHER_VERIFY_KEY}${clientIp}`,
    );
    // 返回信息
    return {
      id: userResult.id,
      username: userResult.username,
      email: userResult.email,
      phone: userResult.phone,
      avatar: userResult.avatar,
      lev: userResult.lev,
      status: userResult.status,
      createTime: userResult.createTime,
      updateTime: userResult.updateTime,
    };
  }

  /**
   * 登陆
   * @param username 用户名
   * @param password 密码
   * @param validatorUser 验证用户，用户被拉黑或者没有审批通过抛出异常
   */
  // TODO:实现登录签发
  @TransformInstanceToPlain()
  async login(
    req: Request,
    res: Response,
    { username, password, captcha }: UserLoginDto,
  ) {
    // 获取客户端ip
    const clientIp = RequestIp.getClientIp(req);
    // 通过用户名查询到返回数据
    const userOne = await this.userRepository
      .createQueryBuilder('uc_user')
      .addSelect('uc_user.salt')
      .addSelect('uc_user.password')
      .where('uc_user.username = :username', { username })
      .getOne();
    if (!userOne) throw new NotFoundException('用户不存在');
    if (userOne.status !== '1') {
      throw new UnauthorizedException(
        `${UserConstants.USER_STATE[userOne.status]}`,
      );
    }
    const { salt, password: dbPassword } = userOne;
    // 获取当前的hash密码与数据库中的进行对比
    const currentHashPassword = encryptPassword(password, salt);
    if (currentHashPassword !== dbPassword) {
      throw new BadRequestException('密码不正确');
    }
    const fisherVerifyKey: string = await this.cacheManager.get(
      `${UserConstants.FISHER_VERIFY_KEY}${clientIp}`,
    );
    if (fisherVerifyKey?.toLowerCase() !== captcha?.toLowerCase()) {
      throw new BadRequestException('图灵验证码不正确');
    }
    // 获取token
    const refreshToken = await this.tokenService.getRefreshToken(userOne);
    // 创建一个token，当token不存在的时候
    if (!refreshToken) {
      await this.tokenService.createUserToken(req, res, userOne);
    } else {
      // token存在直接返回token，验证登录
      return refreshToken;
    }
    // 更新图灵验证码
    // 判断token是否存在，如果存在那就直接返回用户信息，过期就进行登录
    return userOne;
  }

  /**
   * 检查token是否过期
   */
  async checkToken() {
    // 首先从redis拿到token，redis中设置的是两个小时过期
    // const tokenKey = await this.cacheManager.get();
    // TODO：明天继续写检查token的，
  }

  /**
   * 获取初始化头像
   */
  async initUserAvatar() {
    const avatar = UserConstants.DEFAULT_AVATAR;
    if (avatar) {
      return {
        avatarUrl: avatar,
      };
    }
  }

  async forgetPassword(req: Request, forgetPasswordDto: UserForgetPasswordDto) {
    // 获取客户端ip
    const clientIp = RequestIp.getClientIp(req);
    const { password, confirmPassword, captcha, email, emailCode } =
      forgetPasswordDto;
    // 第一步先校验两次输入的密码是否相同
    if (password !== confirmPassword) {
      throw new BadRequestException('两次输入的密码不一致！！！');
    }
    // 通过bcryptjs加密库创建盐值，并且替换掉老的用户的盐
    const salt = makeSalt();
    // 密码进行hash
    const hashPassword = encryptPassword(password, salt);
    // 从redis中获取图灵验证码
    const fisherVerifyKey: string = await this.cacheManager.get(
      `${UserConstants.FISHER_VERIFY_KEY}${clientIp}`,
    );
    if (fisherVerifyKey?.toLowerCase() !== captcha?.toLowerCase()) {
      throw new BadRequestException('图灵验证码不正确');
    }
    // 验证邮箱验证码
    await this.isEmailCodeExists(email, emailCode);
    // 先去用户表查一下用户是否注册，没有注册返回
    const { userId } = await this.userInfoService.getUserInfoByEmail(email);
    // 修改密码
    const result = await this.userRepository.update(
      { id: userId },
      {
        password: hashPassword,
        salt,
      },
    );
    // 不管更新成功没有，都删除图灵验证码和邮箱验证码
    // 删除邮箱验证码
    await this.cacheManager.del(`${UserConstants.FISHER_EMAIL_KEY}${email}`);
    // 删除图灵验证码
    await this.cacheManager.del(
      `${UserConstants.FISHER_VERIFY_KEY}${clientIp}`,
    );
    return result;
  }

  findAll() {
    console.log('User.name', User.name);
    return {
      list: `This action returns all user`,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  /**
   * 用户是否存在
   * @param username 用户名
   */
  async isUserExists(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    if (user) throw new BadRequestException('用户名已经存在');
  }

  /**
   * 验证邮箱验证码是否过期
   * @param email
   * @param emailCode
   */
  async isEmailCodeExists(email: string, emailCode: string) {
    const result: string = await this.cacheManager.get(
      `${UserConstants.FISHER_EMAIL_KEY}${email}`,
    );
    if (!result)
      throw new BadRequestException('没有收到邮箱验证码，请重新发送');
    if (emailCode !== result) throw new BadRequestException('邮箱验证码不正确');
  }
}
