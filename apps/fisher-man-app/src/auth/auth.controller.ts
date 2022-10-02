import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@app/decorator';

/**
 * 鉴权控制器
 */
@ApiTags('鉴权模块')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiBody({ type: '' })
  @ApiResponse({ status: 200 })
  @ApiOperation('用户登陆')
  login(@Req() req) {
    return this.authService.login(req);
  }
}
