import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities';
import { JwtAuthModule } from '@app/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    JwtAuthModule.forRoot({
      token: 'USER_CENTER_SERVICE',
      pattern: 'User.login',
      picks: ['username'],
    }),
  ],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
