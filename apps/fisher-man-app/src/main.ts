import { bootstrap } from '@app/tool';
import helmet from 'helmet';
import { AppModule } from './app.module';

bootstrap(AppModule, {
  cors: true,
  before: (app) => {
    app.use(helmet({ contentSecurityPolicy: false }));
  },
});
