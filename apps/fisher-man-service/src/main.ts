/*
 * @Author: bugdr
 * @Date: 2022-09-24 10:52:16
 * @LastEditors: bugdr
 * @LastEditTime: 2022-09-24 11:18:27
 * @FilePath: \fisher-man-app\apps\fisher-man-service\src\main.ts
 * @Description:
 */
import { bootstrapTool } from '@app/public-tool';
import { FisherManServiceModule } from './fisher-man-service.module';

// 启动服务
bootstrapTool(FisherManServiceModule, { microservice: true });
