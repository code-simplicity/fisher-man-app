import { PartialType } from '@nestjs/swagger';
import { ApiProperty, IsNotEmpty } from '@app/decorator';
import { IsString } from 'class-validator';

/**
 * 创建角色
 */
export class CreateRoleDto {
  @ApiProperty('角色名称', { example: '超级管理员' })
  @IsString()
  @IsNotEmpty('角色名称')
  name: string;

  @ApiProperty('权限配置', {
    example:
      '{\\"account\\":{\\"adminRole\\":{\\"query\\":true,\\"create\\":true,\\"update\\":true,\\"delete\\":true},\\"admin\\":{\\"query\\":true,\\"create\\":true,\\"update\\":true,\\"delete\\":true},\\"user\\":{\\"query\\":true,\\"create\\":true,\\"update\\":true,\\"delete\\":true}},\\"infos\\":{\\"category\\":{\\"query\\":true,\\"create\\":true,\\"update\\":true,\\"delete\\":true},\\"article\\":{\\"query\\":true,\\"create\\":true,\\"update\\":true,\\"delete\\":true},\\"maintenanceReport\\":{\\"query\\":true,\\"create\\":true,\\"update\\":true,\\"delete\\":true}}}',
  })
  @IsNotEmpty('权限配置')
  permissions: any;
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
