/*
 * @Author: bugdr
 * @Date: 2022-09-24 10:52:16
 * @LastEditors: bugdr
 * @LastEditTime: 2022-09-24 10:54:30
 * @FilePath: \fisher-man-app\apps\fisher-man-service\src\main.ts
 * @Description:
 */
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FisherManServiceModule } from './fisher-man-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FisherManServiceModule,
    {
      transport: Transport.TCP,
      options: {
        port: 5001,
      },
    },
  );
  await app.listen();
  console.log('摸鱼君微服务启动成功');
}
bootstrap();
