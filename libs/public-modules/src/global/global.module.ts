/**
 * 全局模块配置
 */
import { ClientsModule } from '@nestjs/microservices';
import {
  HttpExceptionFilter,
  rootPath,
  TransformInterceptor,
} from '@app/public-tool';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { existsSync, readFileSync } from 'fs';
import { load } from 'js-yaml';
import { cloneDeepWith, merge } from 'lodash';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { LoggerModule } from '../logger';
import { TypeOrmModule } from '@nestjs/typeorm';

export interface GlobalModuleOptions {
  yamlFilePath?: string[]; // 配置文件的路径
  microservice?: string[]; // 开启微服务的模块
  typeorm?: boolean; // 开启orm连接配置
  upload?: boolean; // 开启文件上传
  cache?: boolean; // 开启缓存
  txOSS?: boolean; // 开启腾讯云对象存储
}

/**
 * 全局模块
 */
@Module({})
export class GlobalModule {
  // 全局模块初始话， 加载动态模块
  static forRoot(options: GlobalModuleOptions): DynamicModule {
    const {
      yamlFilePath = [],
      microservice,
      typeorm,
      upload,
      cache,
      txOSS,
    } = options || {};

    // 导入动态模块
    const imports: DynamicModule['imports'] = [
      // 配置模块
      ConfigModule.forRoot({
        isGlobal: true,
        cache: true,
        load: [
          () => {
            let configs: any = {};
            const configPath = [
              'application.dev.yaml',
              'application.prod.yaml',
              'config.file.yaml',
              'config.tx.yaml',
              `${process.env.NODE_ENV || 'development'}.yaml`,
              ...yamlFilePath,
            ];
            for (const path of configPath) {
              try {
                // 读取并解析配置文件
                const filePath = join(rootPath, 'config', path);
                if (existsSync(filePath))
                  configs = merge(
                    configs,
                    load(readFileSync(filePath, 'utf8')),
                  );
              } catch (err) {
                console.log('err', err);
              }
            }
            // 递归将null转为字符串
            configs = cloneDeepWith(configs, (value) => {
              if (value === null) return '';
            });
            return configs;
          },
        ],
      }),

      // 日志模块
      LoggerModule.forRoot({
        isGlobal: true,
        useFactory: (configService: ConfigService) => {
          const path = configService.get('logsPath');
          //  返回文件
          return { filename: join(rootPath, `logs/${path}/${path}.log`) };
        },
        inject: [ConfigService],
      }),
    ];

    // 开启微服务模块
    if (microservice) {
      // 注册微服务模块到根应用程序中
      imports.push({
        ...ClientsModule.registerAsync(
          microservice.map((name) => ({
            name,
            useFactory: (configService: ConfigService) => {
              const microserviceClient = configService.get(
                `microserviceClients.${name}`,
              );
              return microserviceClient;
            },
            inject: [ConfigService],
          })),
        ),
        global: true,
      });
    }

    // 配置orm数据库
    if (typeorm) {
      imports.push(
        TypeOrmModule.forRootAsync({
          useFactory: (configService: ConfigService) => {
            // 获取数据库的连接，开启自动加载实体
            const { mysql } = configService.get('db');
            return { ...mysql, autoLoadEntities: true };
          },
          inject: [ConfigService],
        }),
      );
    }

    return {
      module: GlobalModule,
      imports,
      providers: [
        // 全局管道验证
        {
          provide: APP_PIPE,
          useValue: new ValidationPipe({ transform: true }),
        },
        // 异常过滤器
        {
          provide: APP_FILTER,
          useClass: HttpExceptionFilter,
        },
        // 响应参数转化拦截器
        { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
      ],
    };
  }
}
