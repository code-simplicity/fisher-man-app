/**
 * 摸鱼君微服务模块
 */
import { Module } from '@nestjs/common';
import { FisherManServiceController } from './user/user.controller';

@Module({
  controllers: [FisherManServiceController],
})
export class FisherManServiceModule {}
