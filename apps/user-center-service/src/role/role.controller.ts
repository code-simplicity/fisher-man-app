import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto } from '../role/dto';
import { ApiProperty } from '@app/decorator';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@apps/user-center-service/user/dto/create-user.dto';

@ApiTags('角色')
@Controller('ucenter/role/')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  @ApiBody({ type: CreateRoleDto })
  @ApiProperty('创建角色')
  @ApiResponse({ status: 200, type: CreateUserDto })
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
