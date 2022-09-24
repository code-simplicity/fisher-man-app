import { Module } from '@nestjs/common';
import { FisherManServiceController } from './fisher-man-service.controller';
import { FisherManServiceService } from './fisher-man-service.service';

@Module({
  imports: [],
  controllers: [FisherManServiceController],
  providers: [FisherManServiceService],
})
export class FisherManServiceModule {}
