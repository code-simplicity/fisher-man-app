import { Controller, Get } from '@nestjs/common';
import { FisherManServiceService } from './fisher-man-service.service';

@Controller()
export class FisherManServiceController {
  constructor(private readonly fisherManServiceService: FisherManServiceService) {}

  @Get()
  getHello(): string {
    return this.fisherManServiceService.getHello();
  }
}
