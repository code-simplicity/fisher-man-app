import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
