import {
  CACHE_MANAGER,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { get } from 'lodash';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

/**
 * 添加权限守卫
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, @Inject(CACHE_MANAGER) private readonly cacheManager) {}

  /**
   * 可以通过校验的
   * @param context
   */
  async canActive(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());

    // 无权限标识的接口，直接通过
    if (permissions) {
      const [role] = permissions;

      // 获取角色权限配置
      const roles = await this.cacheManager.get(`permissions-${request.user.id}`);

      if (!get(roles, role)) return false;
    }

    return true;
  }
}

/**
 * 权限校验
 */
export const JwtPermissions = () => {
  return (...arg: any[]) => {
    const decorator: any = UseGuards(AuthGuard('jwt'), PermissionsGuard);
    return ApiBearerAuth()(decorator(...arg));
  };
};

/**
 * 权限管理
 */
export const Permissions = (...permissions: string[]) => {
  return SetMetadata('permissions', permissions);
};
