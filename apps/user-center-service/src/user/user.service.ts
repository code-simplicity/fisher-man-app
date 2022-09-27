import { UserInfoService } from './../user-info/user-info.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities';

@Injectable()
export class UserService {
  private readonly userInfoRepository: UserInfoService;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  /**
   * 创建用户
   * @param createUserDto
   * @returns
   */
  async createUser(createUserDto: CreateUserDto) {
    const { userName, email } = createUserDto;
    // 判断用户是否存在
    await this.isUserExists(userName);
    // 判断邮箱是否被注册
    await this.isEmailExists(email);
    // 判断密码是否是加密的
    // TODO:明天继续完善实体被携带到dao层的原因
    // 创建用户
    const user: any = {
      ...createUserDto,
      salt: 1,
      lev: 1,
      deleted: '1',
      status: '1',
    };
    await this.userRepository.create(user);

    return await this.userRepository.save(user);
  }

  findAll() {
    return {
      list: `This action returns all user`,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  /**
   * 用户名是否存在
   * @param username 用户名
   */
  async isUserExists(userName: string) {
    const user = await this.userRepository.findOne({
      where: {
        userName,
      },
    });
    if (user) throw new BadRequestException('用户名已经存在');
  }

  /**
   * 判断邮箱是否被注册
   * @param email 邮箱地址
   */
  async isEmailExists(email: any | number) {
    // 查找邮箱
    const result = await this.userInfoRepository.findOne(email);
    if (result) throw new BadRequestException('该邮箱已经被注册');
  }
}
