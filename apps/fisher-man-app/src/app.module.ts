// 模块注入

import { GlobalModule } from '@app/public-modules';
import { Module } from '@nestjs/common';
import { FisherManServiceModule } from './fisher-man-service/fisher-man-service.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GlobalModule.forRoot({
      yamlFilePath: ['apps/fisher-man-app.yaml'],
      microservice: ['FISHER_MAN_SERVICE'],
      cache: true,
      upload: true,
    }),
    FisherManServiceModule,
    AuthModule,
  ],
})
export class AppModule {}
