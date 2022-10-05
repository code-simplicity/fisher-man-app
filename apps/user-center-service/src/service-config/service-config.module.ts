import { Module } from '@nestjs/common';
import { ServiceConfigService } from './service-config.service';
import { ServiceConfigController } from './service-config.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ServiceConfigController],
  providers: [ServiceConfigService, JwtService],
})
export class ServiceConfigModule {}
