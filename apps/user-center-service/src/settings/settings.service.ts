import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSettingDto, InitUserSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Setting,
  SettingStatusEnum,
} from '@apps/user-center-service/settings/entities/setting.entity';
import { AppSettingConstants } from '@app/common';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}
  /**
   * 获取用户配置
   * @param userId userSetting
   */
  async getInitUserSetting(userSetting: InitUserSettingDto) {
    const { userId } = userSetting;
    // 判断用户id是否存在，如果不存在那就默认查询初始化数据
    if (!userId) {
      const settingInitResult = await this.settingRepository.findOne({
        where: {
          status: SettingStatusEnum.DEFAULT,
        },
      });
      if (!settingInitResult)
        throw new NotFoundException('初始化配置不存在，请管理员去维护');
      return settingInitResult;
    }
    const settingUserResult = await this.settingRepository.findOne({
      where: {
        userId: userId,
      },
    });
    if (!settingUserResult) {
      throw new NotFoundException('您还没有配置有数据哦，请去维护一份配置数据');
    }
    return settingUserResult;
  }

  /**
   * 管理员初始化数据
   */
  async initAdminSetting() {
    // 管理员设置一份初始化数据
    await this.settingRepository.save(AppSettingConstants.DEFAULT);
  }

  /**
   * 创建用户配置
   * @param createSettingDto
   */
  async createUserSetting(createSettingDto: CreateSettingDto) {
    const { userId } = createSettingDto;
    // 首先判断用户id是否存在，不存在那就是新建，存在就修改。
    const settingUserResult = await this.settingRepository.findOne({
      where: {
        userId: userId,
      },
    });
    if (!settingUserResult) {
      // 新建数据
      return await this.settingRepository.save(createSettingDto);
    }
    // 返回更新之后的数据
    return await this.settingRepository.update(
      { userId },
      {
        ...createSettingDto,
        key: userId,
      },
    );
  }
}
