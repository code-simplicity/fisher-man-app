import { bootstrapTool } from '@app/public-tool';
import helmet from 'helmet';
import { AppModule } from './app.module';

bootstrapTool(AppModule, {
  cors: true,
  before: (app) => {
    app.use(helmet({ contentSecurityPolicy: false }));
  },
});
