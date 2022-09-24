/*
 * @Author: bugdr
 * @Date: 2022-09-24 10:52:16
 * @LastEditors: bugdr
 * @LastEditTime: 2022-09-24 11:14:30
 * @FilePath: \fisher-man-app\apps\fisher-man-service\src\fisher-man-service.controller.ts
 * @Description:
 */
import { Controller, Get, Query } from '@nestjs/common';
import { FisherManServiceService } from './fisher-man-service.service';

@Controller()
export class FisherManServiceController {
  constructor(
    private readonly fisherManServiceService: FisherManServiceService,
  ) {}

  @Get('hello')
  async getHello(@Query() query: any): Promise<string> {
    return this.fisherManServiceService.getHello(query.name);
  }
}
