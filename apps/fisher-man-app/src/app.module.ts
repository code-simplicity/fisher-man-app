// 模块注入

import { GlobalModule } from '@app/public-modules';
import { Module } from '@nestjs/common';
import { UserCenterServiceModule } from 'apps/user-center-service/src';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GlobalModule.forRoot({
      yamlFilePath: ['apps/fisher-man-app.yaml'],
      microservice: ['FISHER_MAN_SERVICE', 'USER_CENTER_SERVICE'],
      cache: true,
      upload: true,
    }),
    AuthModule,
    UserCenterServiceModule,
  ],
})
export class AppModule {}
