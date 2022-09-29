import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

export interface LocalStrategyType {
  token: string; // token的值
  pattern: string; // 需要鉴权的微服务接口
}

/**
 * 本地认证策略
 * @param token
 * @param pattern
 * @constructor
 */
export function LocalStrategy({ token, pattern }: LocalStrategyType) {
  class LocalStragey extends PassportStrategy(Strategy) {
    constructor(@Inject(token) readonly client: ClientProxy) {
      super();
    }

    /**
     * 校验
     * @param userName
     * @param password
     */
    validate(userName: string, password: string) {
      return lastValueFrom(this.client.send(pattern, { userName, password }));
    }
  }

  // 返回这个类
  return class extends LocalStragey {};
}
