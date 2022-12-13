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
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserLoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiOperation } from '@app/decorator';
import { MessagePattern } from '@nestjs/microservices';
import { UserConstants } from '@app/common';
import { User } from './entities';
import { AuthGuard } from '@nestjs/passport';
import { UserEmailDto } from '@apps/user-center-service/email/dto/user-email.dto';
import { Request, Response } from 'express';

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
  async create(@Req() request: Request, @Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(request, createUserDto);
  }

  @Post('login')
  @MessagePattern('User.login')
  @ApiBody({
    type: UserLoginDto,
  })
  @ApiOperation(`用户登录`)
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() userLoginDto: UserLoginDto,
  ) {
    return await this.userService.login(req, res, userLoginDto);
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

  @Get('init/avatar')
  @ApiOperation('获取用户初始化头像')
  initUserAvatar() {
    return this.userService.initUserAvatar();
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
