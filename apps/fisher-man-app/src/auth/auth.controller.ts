import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@app/decorator';
import { LoginUserInfoDto, UserInfoDto, UserLoginDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '@apps/user-center-service/user/entities';

/**
 * 鉴权控制器
 */
@ApiTags('鉴权模块')
@Controller('auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local')) // 本地校验，然后登陆接口，然后将返回的用户信息存在Req上
  @ApiBody({ type: UserLoginDto })
  @ApiResponse({ status: 200, type: LoginUserInfoDto })
  @ApiOperation('用户登陆')
  login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    user: User,
  ) {
    return this.authService.login(req, res, user);
  }

  @Get('user/info')
  @ApiBearerAuth() // 鉴权
  @UseGuards(AuthGuard('jwt')) // 路由守卫
  @ApiResponse({ status: 200, type: UserInfoDto })
  @ApiOperation('获取用户信息')
  getUserInfo(@Req() req) {
    return this.authService.getUserInfo(req.user.id);
  }
}
