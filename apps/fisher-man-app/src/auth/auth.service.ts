/**
 * 加权服务模块
 */
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
import { LoggerService } from '@app/common';
import { lastValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
import { User } from '../../../user-center-service/src/user/entities';
import { dateFormat } from '@app/tool';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { encryptPassword } from '@app/common/utils/cryptogram.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject('USER_CENTER_SERVICE') private readonly client: ClientProxy,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly loggerService: LoggerService, // @InjectRepository(User) // private readonly authRepository: Repository<User>,
  ) {}

  /**
   * 获取jwt中的token
   * @param user
   */
  async getToken(user: User) {
    const { id, username } = user;
    console.log('getToken User ==>', User);
    // 返回jwt {id: '', userName: ''}
    return this.jwtService.sign({
      [`secret-${this.configService.get('jwt.secret')}`]: id,
      username,
    });
  }

  /**
   * 登陆模块
   * @param req
   */
  async login(req: any) {
    // 获取用户信息
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

  /**
   *
   */
  // async validateUserInfo(userName: string, password: string) {
  //   // 获取用户信息
  //   const userOne = await this.authRepository
  //     .createQueryBuilder('uc_user')
  //     .addSelect('uc_user.salt')
  //     .addSelect('uc_user.password')
  //     .where('uc_user.userName = :userName', { userName })
  //     .getOne();
  //   if (!userOne) throw new NotFoundException('用户不存在');
  //   const { salt, password: dbPassword } = userOne;
  //   // 获取当前的hash密码与数据库中的进行对比
  //   const currentHashPassword = encryptPassword(password, salt);
  //   if (currentHashPassword !== dbPassword) {
  //     throw new BadRequestException('密码不正确');
  //   }
  //   return userOne;
  // }
}
