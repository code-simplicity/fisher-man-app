import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('FISHER_MAN_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get('hello')
  getHello(@Query() query: any): Promise<string> {
    return this.client
      .send<string>({ cmd: 'getHello' }, query.name)
      .toPromise();
  }
}
