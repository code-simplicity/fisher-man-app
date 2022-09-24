// 模块注入

import { GlobalModule } from '@app/public-modules';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GlobalModule.forRoot({
      yamlFilePath: ['/config/apps/fisher-man-app.yaml'],
      microservice: ['FISHER_MAN_SERVICE'],
      cache: true,
      upload: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
