import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@app/decorator';
import { LoginUserInfoDto, UserInfoDto, UserLoginDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

/**
 * 鉴权控制器
 */
@ApiTags('鉴权模块')
@Controller('auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: UserLoginDto })
  @ApiResponse({ status: 200, type: LoginUserInfoDto })
  @ApiOperation('用户登陆')
  login(@Req() req) {
    return this.authService.login(req);
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
