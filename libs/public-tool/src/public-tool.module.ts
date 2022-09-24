import { Module } from '@nestjs/common';
import { PublicToolService } from './public-tool.service';

@Module({
  providers: [PublicToolService],
  exports: [PublicToolService],
})
export class PublicToolModule {}
