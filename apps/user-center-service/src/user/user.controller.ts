import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@app/decorator';
import { UserLoginDto } from '../../../fisher-man-app/src/auth/dto/auth.dto';
import { MessagePattern } from '@nestjs/microservices';
import { UserConstants } from '@app/common';
import { User } from './entities';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('用户中心')
@Controller('ucenter/user/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiBody({
    type: CreateUserDto,
  })
  // @ApiConsumes('application/json', 'multipart/form-data')
  @ApiOperation('用户注册')
  @ApiResponse({ status: 200, type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Post('login')
  @MessagePattern('User.login')
  @ApiBody({
    type: UserLoginDto,
  })
  @ApiOperation(`用户登录`)
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.userService.login(userLoginDto, (userOne: User) => {
      // 判断用户的状态，用户失效返回具体的状态值
      if (userOne.status !== '1') {
        throw new UnauthorizedException(
          `${UserConstants.USER_STATE[userOne.status]}`,
        );
      }
    });
  }

  /**
   * 检查token是否过期
   */
  @Get('check/token')
  @ApiOperation(`检查用户token`)
  async checkToken() {
    return await this.userService.checkToken();
  }

  @Get()
  @ApiBearerAuth() // 鉴权
  @UseGuards(AuthGuard('jwt')) // 路由守卫
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
