/**
 * swagger的装饰器
 */
import {
  ApiPropertyOptions,
  ApiProperty as ApiPropertySource,
  ApiOperationOptions,
  ApiOperation as ApiOperationSource,
} from '@nestjs/swagger';

/**
 * swagger的标注
 * @param description 描述
 * @param options 配置
 * @returns
 */
export const ApiProperty = (
  description: string,
  options?: ApiPropertyOptions,
) => {
  return ApiPropertySource({ description, ...options });
};

/**
 * swagger 路由标注
 * @param summary 路由标题
 * @param options 配置
 * @returns
 */
export const ApiOperation = (
  summary: string,
  options?: ApiOperationOptions,
) => {
  return ApiOperationSource({ summary, ...options });
};
