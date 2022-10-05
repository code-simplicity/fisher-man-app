import { ApiProperty } from '@app/decorator';

export class findServiceConfigDto {
  @ApiProperty('模块名称')
  moduleName?: string;

  @ApiProperty('权限名称')
  actionName?: string;
}

/**
 * 返回的结果
 */
export class resultServiceConfigDto {
  @ApiProperty('服务名称')
  appName: {
    moduleName: {
      actionName: string;
    };
  };
}
