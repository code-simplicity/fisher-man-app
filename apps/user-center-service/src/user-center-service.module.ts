import { GlobalModule } from '@app/public-modules';
import { Module } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { LoginModule } from './login/login.module';
import { SettingsModule } from './settings/settings.module';
import { TokenModule } from './token/token.module';
import { UserInfoModule } from './user-info/user-info.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GlobalModule.forRoot({
      yamlFilePath: ['apps/user-center-service.yaml'],
      typeorm: true,
    }),
    UserModule,
    UserInfoModule,
    TokenModule,
    SettingsModule,
    LoginModule,
    AppModule,
  ],
})
export class UserCenterServiceModule {}
