import { join } from 'path';

export * from './bootstrap';
export * from './typeorm';
export * from './date-format';
export * from './http.exception.filter';
export * from './transform.interceptor';

// 服务根目录
export const rootPath = join(__dirname, '../../../');
