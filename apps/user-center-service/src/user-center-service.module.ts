import { GlobalModule, JwtAuthModule } from '@app/common';
import { Module } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { SettingsModule } from './settings/settings.module';
import { TokenModule } from './token/token.module';
import { UserInfoModule } from './user-info/user-info.module';
import { UserModule } from './user/user.module';
import { LoginRecordModule } from './login-record/login-record.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    GlobalModule.forRoot({
      yamlFilePath: ['apps/user-center-service.yaml'],
      typeorm: true,
      cache: true,
    }),
    UserModule,
    UserInfoModule,
    RoleModule,
    TokenModule,
    SettingsModule,
    AppModule,
    LoginRecordModule,
  ],
})
export class UserCenterServiceModule {}
