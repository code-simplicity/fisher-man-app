/*
 * @Author: bugdr
 * @Date: 2022-09-24 10:52:16
 * @LastEditors: bugdr
 * @LastEditTime: 2022-09-24 11:14:24
 * @FilePath: \fisher-man-app\apps\fisher-man-service\src\fisher-man-service.service.ts
 * @Description:
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class FisherManServiceService {
  getHello(name: string): string {
    return `Hello ${name}!`;
  }
}
