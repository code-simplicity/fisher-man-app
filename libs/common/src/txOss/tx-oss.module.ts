import { DynamicModule, Module } from '@nestjs/common';
import { TxOssService, TxOssServiceOptions } from './tx-oss.service';
import { TxOssController } from './tx-oss.controller';

/**
 * 对象配置的接口
 */
export interface TxOssModuleAsyncOptions {
  isGlobal?: boolean; // 是否支持全局
  useFactory: (
    ...args: any[]
  ) => Promise<TxOssServiceOptions> | TxOssServiceOptions; // 动态配置
  inject?: any[];
}

/**
 * 腾讯云对象模块
 */
@Module({})
export class TxOssModule {
  static forRoot({
    isGlobal = false,
    useFactory,
    inject,
  }: TxOssModuleAsyncOptions): DynamicModule {
    return {
      global: isGlobal,
      module: TxOssModule,
      // controllers: [TxOssController],
      providers: [
        {
          provide: TxOssService,
          useFactory: async (...args: any[]) => {
            const options = await useFactory(...args);
            return new TxOssService(options);
          },
          inject,
        },
      ],
      exports: [TxOssService],
    };
  }
}
