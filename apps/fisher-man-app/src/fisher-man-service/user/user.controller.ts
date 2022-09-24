import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

// 摸鱼君的用户模块控制层
export class FisherManServiceController {
  constructor(
    @Inject('FISHER_MAN_SERVICE') private readonly client: ClientProxy,
  ) {}
}
