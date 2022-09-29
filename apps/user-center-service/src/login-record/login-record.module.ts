import { Module } from '@nestjs/common';
import { LoginRecordService } from './login-record.service';
import { LoginRecordController } from './login-record.controller';

@Module({
  controllers: [LoginRecordController],
  providers: [LoginRecordService],
})
export class LoginRecordModule {}
