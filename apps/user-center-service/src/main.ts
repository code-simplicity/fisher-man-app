/**
 * 用户中心的服务
 */
import { bootstrap } from '@app/tool';
import { UserCenterServiceModule } from './user-center-service.module';

// 启动服务
bootstrap(UserCenterServiceModule, {
  microservice: true,
});
