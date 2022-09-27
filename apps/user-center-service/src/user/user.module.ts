import { UserInfoService } from './../user-info/user-info.service';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfoModule } from '../user-info/user-info.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserInfoModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
