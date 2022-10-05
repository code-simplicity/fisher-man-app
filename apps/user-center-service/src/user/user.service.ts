import { UserInfoService } from './../user-info/user-info.service';
import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
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
import { encryptPassword, makeSalt } from '@app/common/utils/cryptogram.util';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly loggerService: LoggerService,
    private readonly userInfoService: UserInfoService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  /**
   * 创建用户, 创建的是普通用户
   * @param createUserDto
   * @returns
   */
  async createUser(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;
    // 判断用户是否存在
    await this.isUserExists(username);
    // 判断邮箱是否被注册
    await this.userInfoService.isEmailExists(email);
    // 需要使用到邮箱验证码
    // 包括图灵验证码
    // 通过bcryptjs加密库创建盐值
    const salt = makeSalt();
    // 密码进行hash
    const hashPassword = encryptPassword(password, salt);
    // 创建用户
    const user = {
      ...createUserDto,
      password: hashPassword,
      salt,
    };
    // 保存用户信息
    const userResult = await this.userRepository.save(user);
    // 判断用户是否插入
    if (keys(userResult).length === 0)
      throw new BadRequestException('用户保存失败');
    // 保存用户到用户信息表
    const userInfo = {
      userId: userResult.id,
      email: email,
    };
    await this.userInfoService.createUserInfo(userInfo);
    // 创建token，保存
    // 保存用户到用户表
    return userResult;
  }

  /**
   * 登陆
   * @param username 用户名
   * @param password 密码
   * @param validatorUser 验证用户，用户被拉黑或者没有审批通过抛出异常
   */
  @TransformInstanceToPlain()
  async login(
    { username, password }: UserLoginDto,
    validatorUser?: (_Entity: User) => void,
  ) {
    // 判断token是否存在，如果存在那就直接返回用户信息，过期就进行登录
    // 通过用户名查询到返回数据
    const userOne = await this.userRepository
      .createQueryBuilder('uc_user')
      .addSelect('uc_user.salt')
      .addSelect('uc_user.password')
      .where('uc_user.username = :username', { username })
      .getOne();
    if (!userOne) throw new NotFoundException('用户不存在');
    const { salt, password: dbPassword } = userOne;
    // 获取当前的hash密码与数据库中的进行对比
    const currentHashPassword = encryptPassword(password, salt);
    if (currentHashPassword !== dbPassword) {
      throw new BadRequestException('密码不正确');
    }
    // 生成token
    // 存在并且密码正确
    validatorUser?.(userOne);
    return userOne;
  }

  /**
   * 检查token是否过期
   */
  async checkToken() {
    // 首先从redis拿到token，redis中设置的是两个小时过期
    // const tokenKey = await this.cacheManager.get();
    // TODO：明天继续写检查token的，
  }

  findAll() {
    console.log('User.name', User.name);
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
  async isUserExists(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    if (user) throw new BadRequestException('用户名已经存在');
  }
}
