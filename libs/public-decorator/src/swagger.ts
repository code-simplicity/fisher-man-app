/**
 * swagger的装饰器
 */
import {
  ApiPropertyOptions,
  ApiProperty as ApiPropertySource,
} from '@nestjs/swagger';

/**
 * swagger的标注
 */
export const ApiProperty = (
  description: string,
  options?: ApiPropertyOptions,
) => {
  return ApiPropertySource({ description, ...options });
};
