import { CanActivate, DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy, JwtStrategyType } from '@app/public-modules/jwtAuth/jwt.strategy';
import { LocalStrategy, LocalStrategyType } from '@app/public-modules/jwtAuth/local.strategy';

// 接口
export interface JwtAuthModuleAsyncOptions extends LocalStrategyType, JwtStrategyType {}

/**
 * 鉴权模块
 */
@Module({})
export class JwtAuthModule {
  static forRoot({ token, pattern, picks }: JwtAuthModuleAsyncOptions): DynamicModule {
    return {
      module: JwtAuthModule,
      imports: [
        PassportModule,
        {
          ...JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
              const { secret, expiresIn } = configService.get('jwt');
              return { secret, signOptions: { expiresIn } };
            },
            inject: [ConfigService],
          }),
          global: true,
        },
      ],
      providers: [LocalStrategy({ token, pattern }), JwtStrategy({ picks })],
    };
  }
}
