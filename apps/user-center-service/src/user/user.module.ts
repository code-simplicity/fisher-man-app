import { UserInfoService } from './../user-info/user-info.service';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfoModule } from '../user-info/user-info.module';
import { JwtStrategy } from '@app/common/jwtAuth/jwt.strategy';
import { TokenModule } from '@apps/user-center-service/token/token.module';
import { JwtAuthModule } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserInfoModule, TokenModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
