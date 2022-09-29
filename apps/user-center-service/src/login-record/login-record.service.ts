import { Injectable } from '@nestjs/common';
import { CreateLoginRecordDto } from './dto/create-login-record.dto';
import { UpdateLoginRecordDto } from './dto/update-login-record.dto';

@Injectable()
export class LoginRecordService {
  create(createLoginRecordDto: CreateLoginRecordDto) {
    return 'This action adds a new loginRecord';
  }

  findAll() {
    return `This action returns all loginRecord`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loginRecord`;
  }

  update(id: number, updateLoginRecordDto: UpdateLoginRecordDto) {
    return `This action updates a #${id} loginRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} loginRecord`;
  }
}
