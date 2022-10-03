import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, timeout } from 'rxjs';
import { response } from 'express';

export interface LocalStrategyType {
  token: string; // 需要验证策略的服务
  pattern: string; // 鉴权的微服务接口
}

/**
 * 本地认证策略
 * @param token
 * @param pattern
 * @constructor
 */
export function LocalStrategy({ token, pattern }: LocalStrategyType) {
  @Injectable()
  class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(token) readonly client: ClientProxy) {
      super();
    }

    /**
     * 本地校验
     * @param username
     * @param password
     */
    async validate(username: string, password: string) {
      // 返回最后一个值
      const user = await lastValueFrom(
        this.client.send(pattern, { username, password }).pipe(timeout(5000)),
      );
      return user;
    }
  }

  // 返回这个类
  return class extends LocalStrategy {};
}
