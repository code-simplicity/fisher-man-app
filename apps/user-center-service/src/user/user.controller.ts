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
import {
  CreateUserDto,
  InitAdminDto,
  UserForgetPasswordDto,
  UserLoginDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
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
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiOperation('用户注册')
  @ApiResponse({ status: 200, type: CreateUserDto })
  async create(@Req() req: Request, @Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(req, createUserDto);
  }

  @Post('login')
  @MessagePattern('User.login')
  @ApiBody({
    type: UserLoginDto,
  })
  @ApiOperation('用户登录')
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

  @Post('forget/password')
  @ApiBody({
    type: UserForgetPasswordDto,
  })
  @ApiOperation('忘记密码')
  async forgetPassword(
    @Req() req: Request,
    @Body() forgetPasswordDto: UserForgetPasswordDto,
  ) {
    return await this.userService.forgetPassword(req, forgetPasswordDto);
  }

  @Get('init/avatar')
  @ApiOperation('获取用户初始化头像')
  async initUserAvatar() {
    return this.userService.initUserAvatar();
  }

  @Post('init/admin')
  @ApiBody({
    type: InitAdminDto,
  })
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiOperation('初始化管理员')
  @ApiResponse({ status: 200, type: InitAdminDto })
  async initAdmin(@Body() initAdminDto: InitAdminDto) {
    return await this.userService.initAdmin(initAdminDto);
  }
}
