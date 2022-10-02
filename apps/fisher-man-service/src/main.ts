import { bootstrap } from '@app/tool';
import { FisherManServiceModule } from './fisher-man-service.module';

// 启动服务
bootstrap(FisherManServiceModule, { microservice: true });
