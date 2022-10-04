import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';
import { DeleteTokenDto } from './dto';
import { ApiOperation } from '@app/decorator';

@ApiTags('用户token')
@Controller('token/')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokenService.create(createTokenDto);
  }

  @Get()
  findAll() {
    return this.tokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tokenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTokenDto: UpdateTokenDto) {
    return this.tokenService.update(+id, updateTokenDto);
  }

  @Delete(':userId')
  @MessagePattern('Token.remove')
  @ApiOperation(`删除token`)
  remove(@Param('userId') userId: string) {
    return this.tokenService.remove(userId);
  }
}
