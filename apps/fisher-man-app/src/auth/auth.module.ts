import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthModule } from '@app/common';
import { AuthController } from './auth.controller';

/**
 * 鉴权模块
 */
@Module({
  imports: [
    JwtAuthModule.forRoot({
      token: 'USER_CENTER_SERVICE',
      pattern: 'User.login',
      picks: ['username'],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
