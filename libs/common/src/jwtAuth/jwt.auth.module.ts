import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy, JwtStrategyType } from './jwt.strategy';
import { LocalStrategy, LocalStrategyType } from './local.strategy';

// 接口
export interface JwtAuthModuleAsyncType
  extends LocalStrategyType,
    JwtStrategyType {}

/**
 * 鉴权模块
 */
@Module({})
export class JwtAuthModule {
  static forRoot({
    token,
    pattern,
    picks,
  }: JwtAuthModuleAsyncType): DynamicModule {
    return {
      module: JwtAuthModule,
      imports: [
        PassportModule,
        {
          ...JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
              const { secret, expiresIn } = configService.get('jwt');
              console.log('secret', secret);
              console.log('expiresIn', expiresIn);
              // 返回验证信息以及过期时间
              return { secret, signOptions: { expiresIn } };
            },
            inject: [ConfigService],
          }),
          global: true,
        },
      ],
      providers: [
        LocalStrategy({ token, pattern }),
        JwtStrategy({ picks }),
        JwtAuthModule,
      ],
      exports: [JwtAuthModule],
    };
  }
}
