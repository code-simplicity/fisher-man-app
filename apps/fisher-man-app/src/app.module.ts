import { GlobalModule } from '@app/common';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UploadController } from '@app/common/upload/upload.controller';
import { TxOssController } from '@app/common/txOss/tx-oss.controller';

// 主程序模块注入
@Module({
  imports: [
    GlobalModule.forRoot({
      yamlFilePath: ['apps/fisher-man-app.yaml'],
      microservice: ['USER_CENTER_SERVICE', 'FISHER_MAN_SERVICE'], // 微服务名称
      cache: true, // 开启缓存
      upload: true,
      throttler: true, // 开启接口限速
      email: true,
      txOSS: true,
    }),
    AuthModule,
  ],
  controllers: [UploadController, TxOssController],
})
export class AppModule {}
