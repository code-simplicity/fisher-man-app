import { PartialType } from '@nestjs/swagger';
import { CreateLoginRecordDto } from './create-login-record.dto';

export class UpdateLoginRecordDto extends PartialType(CreateLoginRecordDto) {}
