import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { LoggerService, UserConstants } from '@app/common';
import { lastValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
import { dateFormat } from '@app/tool';
import { User } from '@apps/user-center-service/user/entities';
import { TokenService } from '@apps/user-center-service/token/token.service';

/**
 * 加权服务模块
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject('USER_CENTER_SERVICE') private readonly client: ClientProxy,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly loggerService: LoggerService,
  ) {}

  /**
   * 创建一个token，redis+mysql进行存储，redis中缓存时间为2小时，mysql中时间为30天
   * @param user
   * @param ttl
   */
  async createToken(user: User, ttl: number) {
    const { username, id, salt } = user;
    // 创建tokenKey
    const tokenKey = UserConstants.TOKEN_KEY + salt;
    // 创建refreshToken
    const refreshToken = await this.jwtService.signAsync(
      {
        [`secret-${this.configService.get('jwt.secret')}-${salt}`]: id,
        username,
      },
      {
        algorithm: 'HS256', // 加密算法
        expiresIn: ttl, // 有效时间
      },
    );
    // 缓存到redis
    await this.cacheManager.set(tokenKey, refreshToken, {
      ttl: ttl,
    });
    // 缓存完成之后将token存储到数据库中
    await lastValueFrom(
      this.client.send('Token.create', {
        userId: id,
        tokenKey: tokenKey,
        refreshToken: refreshToken,
      }),
    );
    return refreshToken;
  }

  /**
   * 登陆模块
   * @param req
   */
  async login(req: any) {
    // 获取用户信息
    const { user, clientIp } = req;
    const ttl = parseInt(this.configService.get('jwt.expiresIn'));
    // 登陆校验成功时候创建token
    const access_token = await this.createToken(user, ttl);
    // 然后从缓存中拿到token
    // 鉴权token

    // 注入登陆id和登陆时间
    const userInfo = Object.assign(user, {
      login_ip: clientIp,
      login_date: dateFormat(new Date()),
    });
    // 保存登陆的信息
    // await lastValueFrom(this.client.send('User.update', [(user.id, user)]));
    // 获取用户的角色
    const role = await this.getRoles(user);
    // 返回信息
    return {
      role,
      access_token,
    };
  }

  /**
   * 获取用户的角色
   * @param user
   */
  async getRoles(user: User) {
    return {};
  }

  /**
   * 获取用户信息
   * @param id
   */
  async getUserInfo(id: string) {
    // 查询角色的学习
    const user = await lastValueFrom(this.client.send('', id));

    // 查询角色信息
    const role = await this.getRoles(user);
  }
}
