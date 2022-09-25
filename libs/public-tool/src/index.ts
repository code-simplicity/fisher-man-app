import { join } from 'path';

export * from './bootstrapTool';
export * from './typeorm';
export * from './date-format';

// 服务根目录
export const rootPath = join(__dirname, '../../../');
