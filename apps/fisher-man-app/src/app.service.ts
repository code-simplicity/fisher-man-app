/*
 * @Author: bugdr
 * @Date: 2022-09-24 10:41:07
 * @LastEditors: bugdr
 * @LastEditTime: 2022-09-24 11:25:25
 * @FilePath: \fisher-man-app\apps\fisher-man-app\src\app.service.ts
 * @Description:
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
