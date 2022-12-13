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
import { SettingsService } from './settings.service';
import { CreateSettingDto, InitUserSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation, ApiProperty } from '@app/decorator';

@ApiTags('用户配置中心')
@Controller('app/settings/')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('config')
  @ApiOperation('获取默认/用户配置')
  async getInitUserSetting(@Query() userSetting: InitUserSettingDto) {
    return await this.settingsService.getInitUserSetting(userSetting);
  }

  @Post('init/config')
  @ApiOperation('管理员初始化配置')
  async initAdminSetting() {
    return await this.settingsService.initAdminSetting();
  }

  @Post('config/user')
  @ApiOperation('用户配置数据')
  createUserSetting(@Body() createSettingDto: CreateSettingDto) {
    return this.settingsService.createUserSetting(createSettingDto);
  }
}
