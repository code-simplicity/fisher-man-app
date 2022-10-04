import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../../../../apps/user-center-service/src/user/entities';

/**
 * jwt工具
 */
export class JwtUtil {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 创建token
   * @param user
   * @param salt
   * @param ttl
   */
  async createToken(user: User, salt: string, ttl = '2h') {
    console.log('token ==>', salt, ttl);
    const { username, id } = user;
    return await this.jwtService.signAsync(
      {
        [`secret-${this.configService.get('jwt.secret')}`]: id,
        username,
      },
      {
        algorithm: 'HS256', // 加密算法
        expiresIn: ttl, // 有效时间
        encoding: salt, // 编码格式
      },
    );
  }
}
