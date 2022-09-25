import { GlobalModule } from '@app/public-modules';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserInfoModule } from './user-info/user-info.module';
import { TokenModule } from './token/token.module';
import { SettingsModule } from './settings/settings.module';
import { LoginModule } from './login/login.module';
import { AppModule } from './app/app.module';

@Module({
  imports: [
    GlobalModule.forRoot({
      yamlFilePath: ['apps/fisher-man-service.yaml'],
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
export class FisherManServiceModule {}
