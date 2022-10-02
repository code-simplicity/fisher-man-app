import { GlobalModule } from '@app/common';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    GlobalModule.forRoot({
      yamlFilePath: ['apps/fisher-man-service.yaml'],
      typeorm: true,
    }),
  ],
})
export class FisherManServiceModule {}
