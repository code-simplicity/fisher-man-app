import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { Repository } from 'typeorm';
import { Token } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService, UserConstants } from '@app/common';
import { Request, Response } from 'express';
import { User } from '@apps/user-center-service/user/entities';
import { lastValueFrom } from 'rxjs';
import { setUpCookie } from '@app/common/utils';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import {
  CreateUserDto,
  RefreshTokenDto,
} from '@apps/user-center-service/user/dto/create-user.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly loggerService: LoggerService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}
  create(createTokenDto: CreateTokenDto) {
    return 'This action adds a new token';
  }

  findAll() {
    return `This action returns all token`;
  }

  findOne(id: number) {
    return `This action returns a #${id} token`;
  }

  update(id: number, updateTokenDto: UpdateTokenDto) {
    return `This action updates a #${id} token`;
  }

  /**
   * 创建token
   * @param createTokenDto
   */
  async saveToken(createTokenDto: CreateTokenDto) {
    // 需要添加三个值refreshToken、tokenKey、userId
    const { refreshToken } = await this.tokenRepository.save(createTokenDto);
    return refreshToken;
  }

  /**
   * 创建一个token，redis+mysql进行存储，redis中缓存时间为2小时，mysql中时间为30天
   * @param req
   * @param res
   * @param user
   */
  // TODO:编写生成token的记录
  async createUserToken(req, res, user: RefreshTokenDto) {
    const ttl = parseInt(this.configService.get('jwt.expiresIn'));
    const { username, id, salt } = user;
    const userToken = await this.getRefreshToken(user);
    console.log('userToken =====>', userToken);
    if (userToken) {
      return userToken;
    }
    // token是由盐+用户的信息，比如用户
    // 创建tokenKey tokenKey是由给定的常量加上用户的盐进行生成
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
      ttl: Number(ttl),
    });
    // 缓存完成之后将token存储到数据库中
    await this.saveToken({
      userId: id,
      tokenKey: tokenKey,
      refreshToken: refreshToken,
      appId: id,
    });
    // 设置token签发到cookie中
    setUpCookie(res, UserConstants.FISHER_COOKIE_KEY, tokenKey);
    // 保存盐到redis
    await this.cacheManager.set(UserConstants.SALT_KEY + salt, salt, {
      ttl: Number(ttl),
    });
    return refreshToken;
  }

  /**
   * 删除token，通过用户id
   * @param userId
   */
  async remove(userId: string) {
    // 不管有没有成功，这里都会是删除的
    const result = await this.tokenRepository.delete({ userId });
    this.loggerService.log(result.affected, '删除，不管有没有成功');
    return { ...result };
  }

  /**
   * 获取用户的token
   * @param userId
   */
  async getRefreshToken(refreshTokenDto: RefreshTokenDto) {
    const { id, salt } = refreshTokenDto;
    // 首先去redis查询
    const redisUserToken = await this.cacheManager.get(
      `${UserConstants.TOKEN_KEY}${salt}`,
    );
    if (redisUserToken) {
      return redisUserToken;
    }
    // 其次去token表查询
    const userTokenKey = await this.tokenRepository.findOne({
      where: {
        userId: id,
      },
    });
    // 返回token
    return userTokenKey?.refreshToken;
  }
}
