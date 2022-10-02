import { UserInfoService } from './../user-info/user-info.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities';
import { TransformInstanceToPlain } from 'class-transformer';
import { UserLoginDto } from '../../../fisher-man-app/src/auth/dto/auth.dto';
import { LoggerService } from '@app/common';
import { keys } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly loggerService: LoggerService,
    private readonly userInfoService: UserInfoService,
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
    await this.userInfoService.isEmailExists(email);
    // 判断通过注解自动加密
    // 需要使用到邮箱验证码
    // 包括图灵验证码
    // 创建盐值
    // 创建用户
    const user = {
      ...createUserDto,
      salt: '1',
    };
    // 用户信息
    const userResult = await this.userRepository.save(user);
    // 判断用户是否插入
    if (keys(userResult).length === 0)
      throw new BadRequestException('用户保存失败');
    // 数据进行结构
    const { id, avatar } = userResult;
    this.loggerService.log(userResult, '用户插入成功');
    // 保存用户到用户信息表
    const userInfo = {
      userId: id,
      email: email,
    };
    await this.userInfoService.createUserInfo(userInfo);
    // 保存用户到用户表
    return userResult;
  }

  /**
   * 登陆
   * @param userName 用户名
   * @param password 密码
   * @param validatorUser 验证用户
   */
  @TransformInstanceToPlain()
  async login(
    { userName, password }: UserLoginDto,
    validatorUser?: (_Entity: User) => void,
  ) {
    // @ts-ignore
    const userOne = await this.userRepository.findOne(userName);
    if (!userOne || userOne.password !== password) {
      throw new UnauthorizedException('登陆失败');
    }
    // 存在并且密码正确
    validatorUser?.(userOne);
    return userOne;
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
   * 用户是否存在
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
