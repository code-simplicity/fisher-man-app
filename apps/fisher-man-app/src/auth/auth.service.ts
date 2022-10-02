/**
 * 加权服务模块
 */
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { LoggerService } from '@app/common';
import { lastValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
import { User } from '../../../user-center-service/src/user/entities';
import { dateFormat } from '@app/tool';

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
   * 获取jwt中的token
   * @param user
   */
  async getToken(user: User) {
    const { id, userName } = user;
    // 返回jwt {id: '', userName: ''}
    return this.jwtService.sign({
      [`secret-${this.configService.get('jwt.secret')}`]: id,
      userName,
    });
  }

  /**
   * 登陆模块
   * @param req
   */
  async login(req: any) {
    const { user, clientIp } = req;
    console.log('req ==>', req);
    // 鉴权token
    const access_token = await this.getToken(user);
    // 注入登陆id和登陆时间
    Object.assign(user, {
      login_ip: clientIp,
      login_date: dateFormat(new Date()),
    });
    // 保存登陆的信息
    await lastValueFrom(this.client.send('User.update', [(user.id, user)]));
    // 获取用户的角色
    const role = await this.getRoles(user);
    // 返回信息
    return {
      ...user,
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
