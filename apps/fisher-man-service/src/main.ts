import { bootstrapTool } from '@app/public-tool';
import { FisherManServiceModule } from './fisher-man-service.module';

// 启动服务
bootstrapTool(FisherManServiceModule, { microservice: true });
