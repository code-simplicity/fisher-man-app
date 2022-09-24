/*
 * @Author: bugdr
 * @Date: 2022-09-24 10:52:16
 * @LastEditors: bugdr
 * @LastEditTime: 2022-09-24 11:14:30
 * @FilePath: \fisher-man-app\apps\fisher-man-service\src\fisher-man-service.controller.ts
 * @Description:
 */
import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FisherManServiceService } from './fisher-man-service.service';

@Controller()
export class FisherManServiceController {
  constructor(
    private readonly fisherManServiceService: FisherManServiceService,
  ) {}

  @MessagePattern({ cmd: 'getHello' })
  async getHello(name: string): Promise<string> {
    return this.fisherManServiceService.getHello(name);
  }
}
