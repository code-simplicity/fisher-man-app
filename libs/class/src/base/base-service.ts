import { Request, Response } from 'express';
import { CONTEXT, RequestContext } from '@nestjs/microservices';
import { Inject, Injectable, Scope } from '@nestjs/common';
/**
 * 服务类集成
 */
@Injectable()
export class BaseService {
  constructor(@Inject(CONTEXT) private readonly ctx?: RequestContext) {}
  /**
   * 获取request
   * @param request
   * @protected
   */
  public getRequest(): Request {
    const request = this.ctx.getContext().getRequest();
    return request;
  }

  /**
   * 获取response
   * @param response
   * @protected
   */
  public getResponse(): Response {
    console.log('this.ctx ==>', this.ctx);
    const response = this.ctx.getContext().getResponse();
    return response;
  }
}
