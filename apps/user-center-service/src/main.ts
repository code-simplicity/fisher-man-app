/**
 * 用户中心的服务
 */
import { bootstrapTool } from '@app/public-tool';
import { UserCenterServiceModule } from './user-center-service.module';

// 启动服务
bootstrapTool(UserCenterServiceModule, { microservice: true });
