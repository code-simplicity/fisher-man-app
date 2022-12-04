import { DynamicModule, Module } from '@nestjs/common';
import { UploadService, UploadServiceOptions } from './upload.service';
import { UploadController } from './upload.controller';

export interface UploadModuleAsyncOptions {
  isGlobal?: boolean; // 是否全局导入
  useFactory: (
    ...args: any[]
  ) => Promise<UploadServiceOptions> | UploadServiceOptions; // 动态配置模块
  inject?: any[]; // 注入
}

/**
 * 文件上传
 */
@Module({})
export class UploadModule {
  static forRoot({
    isGlobal = false,
    useFactory,
    inject,
  }: UploadModuleAsyncOptions): DynamicModule {
    return {
      global: isGlobal,
      module: UploadModule,
      // controllers: [UploadController],
      providers: [
        {
          provide: UploadService,
          useFactory: async (...args: any[]) => {
            const options = await useFactory(...args);
            return new UploadService(options);
          },
          inject,
        },
      ],
      exports: [UploadService],
    };
  }
}
