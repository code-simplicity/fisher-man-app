import { GlobalModule } from '@app/common';
import { Module } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { SettingsModule } from './settings/settings.module';
import { TokenModule } from './token/token.module';
import { UserInfoModule } from './user-info/user-info.module';
import { UserModule } from './user/user.module';
import { LoginRecordModule } from './login-record/login-record.module';
import { RoleModule } from './role/role.module';
import { ServiceConfigModule } from './service-config/service-config.module';
import { EmailModule } from './email/email.module';
import { UploadController } from '@app/common/upload/upload.controller';
import { TxOssController } from '@app/common/txOss/tx-oss.controller';

@Module({
  imports: [
    GlobalModule.forRoot({
      yamlFilePath: ['apps/user-center-service.yaml'],
      microservice: ['USER_CENTER_SERVICE'], // 微服务名称
      typeorm: true,
      cache: true,
      throttler: true, // 开启接口限速
      email: true,
      upload: true,
      txOSS: true,
    }),
    UserModule,
    UserInfoModule,
    RoleModule,
    TokenModule,
    SettingsModule,
    AppModule,
    LoginRecordModule,
    ServiceConfigModule,
    EmailModule,
  ],
  controllers: [UploadController, TxOssController],
})
export class UserCenterServiceModule {}
