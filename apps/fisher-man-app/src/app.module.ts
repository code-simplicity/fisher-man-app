import { GlobalModule } from '@app/common';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

// 主程序模块注入
@Module({
  imports: [
    GlobalModule.forRoot({
      yamlFilePath: ['apps/fisher-man-app.yaml'],
      microservice: ['USER_CENTER_SERVICE', 'FISHER_MAN_SERVICE'], // 微服务名称
      cache: true, // 开启缓存
      upload: false,
    }),
    AuthModule,
  ],
})
export class AppModule {}
