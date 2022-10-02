/**
 * 日志模块
 */
import { DynamicModule, Module } from '@nestjs/common';
import { LoggerService, LoggerServiceOptionType } from './logger.service';

export interface LoggerModuleOptionsType {
  isGlobal?: boolean; // 是否开启全局的日志收集
  useFactory: (
    ...args: any[]
  ) => Promise<LoggerServiceOptionType> | LoggerServiceOptionType;
  inject?: any[];
}

@Module({})
export class LoggerModule {
  static forRoot({
    isGlobal = false,
    useFactory,
    inject,
  }: LoggerModuleOptionsType): DynamicModule {
    return {
      global: isGlobal,
      module: LoggerModule,
      // 提供注入
      providers: [
        {
          provide: LoggerService,
          useFactory: async (...args: any[]) => {
            const options = await useFactory(...args);
            return new LoggerService(options);
          },
          inject,
        },
      ],
      // 导出
      exports: [LoggerService],
    };
  }
}
