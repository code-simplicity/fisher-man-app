import { join } from 'path';

export * from './public-tool.module';
export * from './public-tool.service';
export * from './bootstrapTool';

// 服务根目录
export const rootPath = join(__dirname, '../../../');
