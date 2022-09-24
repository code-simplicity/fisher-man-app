import { Module } from '@nestjs/common';
import { PublicClassService } from './public-class.service';

@Module({
  providers: [PublicClassService],
  exports: [PublicClassService],
})
export class PublicClassModule {}
