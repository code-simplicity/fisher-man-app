import { Injectable } from '@nestjs/common';

@Injectable()
export class FisherManServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
