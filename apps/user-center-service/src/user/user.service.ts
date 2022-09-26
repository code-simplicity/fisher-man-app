import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  /**
   * 创建用户
   * @param createUserDto
   * @returns
   */
  async createUser(createUserDto: CreateUserDto) {
    // 判断用户是否存在
    await this.isUserExists(createUserDto.userName);
    // 判断邮箱是否被注册
    // 判断密码是否是加密的
    // TODO:明天继续完善实体被携带到dao层的原因
    // 创建用户
    const user = await this.userRepository.create(createUserDto);
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
}
