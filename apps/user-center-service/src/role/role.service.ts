import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { Repository } from 'typeorm';
import { Role } from '@apps/user-center-service/role/entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  async createRole(createRoleDto: CreateRoleDto) {
    // 判断角色是否唯一
    await this.isRoleNameExists(createRoleDto.name);
    // 保存角色信息
    return await this.roleRepository.save(createRoleDto);
  }

  // 判断角色name是否是唯一
  async isRoleNameExists(name: string) {
    const result = await this.roleRepository.findOne({ where: { name } });
    if (result) throw new BadRequestException('角色名已存在');
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
