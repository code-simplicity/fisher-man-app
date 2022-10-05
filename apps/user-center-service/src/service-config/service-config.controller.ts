import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ServiceConfigService } from './service-config.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiProperty } from '@app/decorator';
import {
  findServiceConfigDto,
  resultServiceConfigDto,
} from '@apps/user-center-service/service-config/dto';

@ApiTags('摸鱼君服务配置')
@Controller('ucenter/service-config')
export class ServiceConfigController {
  constructor(private readonly serviceConfigService: ServiceConfigService) {}

  @Get()
  @ApiProperty('获取所有的服务配置')
  @ApiResponse({ status: 200, type: resultServiceConfigDto })
  findAll(@Query() request: findServiceConfigDto) {
    return this.serviceConfigService.findAll(request);
  }
}
