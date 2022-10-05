import { Injectable } from '@nestjs/common';
import { findServiceConfigDto } from '@apps/user-center-service/service-config/dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ServiceConfigService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 获取所有的服务配置
   * @param request
   */
  findAll(request: findServiceConfigDto) {
    // 查询服务配置 actions为权限集合 apps为服务
    const { actions, apps } = this.configService.get('permission');
    // 通过权限名称和服务名称查询
    const permissionAction: any = {};
    // 允许访问的模块
    const permission: any = {};
    // 权限集默认都是false
    for (let action of actions) {
      permissionAction[action] = false;
    }
    for (let [key, app] of Object.entries<any>(apps)) {
      permission[key] = {};
      for (let module of app) {
        permission[key][module] = permissionAction;
      }
    }
    return permission;
  }
}
