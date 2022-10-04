import { UserInfoService } from './../user-info/user-info.service';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfoModule } from '../user-info/user-info.module';
import { JwtStrategy } from '@app/common/jwtAuth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserInfoModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
