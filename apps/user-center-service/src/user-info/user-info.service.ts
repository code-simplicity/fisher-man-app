import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UserInfo } from './entities';
import { result } from 'lodash';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>,
  ) {}

  /**
   * 保存用户到用户信息表
   */
  async createUserInfo(createUserInfoDto: CreateUserInfoDto) {
    return await this.userInfoRepository.save(createUserInfoDto);
  }

  /**
   * 判断邮箱是否被注册
   * @param email 邮箱
   */
  async isEmailExists(email: string) {
    const result = await this.userInfoRepository.findOne({
      where: {
        email,
      },
    });
    if (result) throw new BadRequestException('该邮箱已被注册');
  }

  /**
   * 获取用户信息
   * @param email
   */
  async getUserInfoByEmail(email: string) {
    // 通过邮箱获取用户信息
    const userInfo = await this.userInfoRepository.findOne({
      where: {
        email,
      },
    });
    if (userInfo) {
      return userInfo;
    } else {
      throw new BadRequestException('该邮箱并未注册');
    }
  }

  create(createUserInfoDto: CreateUserInfoDto) {
    return 'This action adds a new userInfo';
  }

  findAll() {
    return `This action returns all userInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userInfo`;
  }

  update(id: number, updateUserInfoDto: UpdateUserInfoDto) {
    return `This action updates a #${id} userInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} userInfo`;
  }
}
