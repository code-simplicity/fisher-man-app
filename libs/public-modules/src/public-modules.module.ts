import { Module } from '@nestjs/common';
import { PublicModulesService } from './public-modules.service';

@Module({
  providers: [PublicModulesService],
  exports: [PublicModulesService],
})
export class PublicModulesModule {}
