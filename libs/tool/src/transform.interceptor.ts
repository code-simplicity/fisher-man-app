/**
 * 统一返回结果
 * 通过注入请求日志，
 * 响应参数统一返回
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { LoggerService } from '@app/common';
import { Observable } from 'rxjs';
import { TcpContext } from '@nestjs/microservices';
import { map, tap } from 'rxjs/operators';
import { toIp } from './date-format';

// 返回结果的接口
export interface Response<T> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

// 请求次数
let requestNum = 0;
// 行
const line = '-'.repeat(50);
// 时间间隔
const interval = '/'.repeat(50);

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private readonly loggerService: LoggerService) {}
  // 拦截处理
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> | Promise<Observable<Response<T>>> {
    // 获取http请求的上下文
    const ctx = context.switchToHttp();
    // 请求结果
    const req = ctx.getRequest();
    // 响应
    const res = ctx.getResponse();

    // 日志记录
    this.loggerService.log(interval, `第${++requestNum}次请求`);
    this.loggerService.log(line, '请求接收');

    let resNext = next.handle();

    if (res instanceof TcpContext) {
      // 发送tcp请求日志收集
      this.loggerService.log(res.getPattern(), 'TCP 请求');
      // 判断存在数组
      if (Object.keys(req).length) {
        if (Array.isArray(req)) {
          // 生成记录请求的参数
          req.forEach((item) => {
            this.loggerService.log(req[item], `请求参数[${item}]`);
          });
        } else {
          this.loggerService.log(req, '请求参数');
        }
      }
      // 避免返回参数导致参数序列化错误
      resNext = resNext.pipe(map((data) => data || {}));
    } else {
      const { url, clientIp, method, body } = req;
      // 日志
      this.loggerService.log(url, `${toIp(clientIp)} ${method}`);
      Object.keys(body).length && this.loggerService.log(body, '请求参数');
      // 响应参数转化为统一格式
      resNext = resNext.pipe(
        map((data) => {
          // 统一收集返回信息
          const { message } = data;
          return {
            code: res.statusCode,
            data: data,
            message: message || '请求成功',
            success: true,
          };
        }),
      );
    }
    return resNext.pipe(
      tap((res) => {
        this.loggerService.log(res, '响应结果');
        this.loggerService.log(line, '请求成功');
      }),
    );
  }
}
