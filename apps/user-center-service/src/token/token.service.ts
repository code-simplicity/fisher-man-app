import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { Repository } from 'typeorm';
import { Token } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from '@app/common';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly loggerService: LoggerService,
  ) {}
  create(createTokenDto: CreateTokenDto) {
    return 'This action adds a new token';
  }

  findAll() {
    return `This action returns all token`;
  }

  findOne(id: number) {
    return `This action returns a #${id} token`;
  }

  update(id: number, updateTokenDto: UpdateTokenDto) {
    return `This action updates a #${id} token`;
  }

  /**
   * 创建token
   * @param createTokenDto
   */
  async createToken(createTokenDto: CreateTokenDto) {
    // 需要添加三个值refreshToken、tokenKey、userId
    return await this.tokenRepository.save(createTokenDto);
  }

  /**
   * 删除token，通过用户id
   * @param userId
   */
  async remove(userId: string) {
    // 不管有没有成功，这里都会是删除的
    const result = await this.tokenRepository.delete({ userId });
    this.loggerService.log(result.affected, '删除，不管有没有成功');
    return { ...result };
  }
}
