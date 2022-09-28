import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { pick } from 'lodash';

export interface JwtStrategyType {
  /**
   * 提取用户信息，每次请求都能得到
   * 不可填ID，在 this.jwtService.sign 时需要与之对应
   */
  picks: string[];
}

/**
 * 请求校验
 * @param picks
 * @constructor
 */
export function JwtStrategy({ picks }: JwtStrategyType) {
  @Injectable()
  class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: true, // 忽略过期
        secretOrKey: configService.get('jwt.secret'), // jwt秘钥
      });
    }

    /**
     * 返回验证的值
     * @param token
     */
    validate(token: any) {
      return { id: token[`secret-${this.configService.get('jwt.secret')}`], ...pick(token, picks) };
    }
  }
  return class extends JwtStrategy {};
}
