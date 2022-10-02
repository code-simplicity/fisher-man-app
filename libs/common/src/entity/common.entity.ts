/**
 * 公共的实体
 */
import { dateTransformer } from '@app/tool';
import { ApiProperty } from '@app/decorator';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * 公共模块实体
 */
export class CommonEntity {
  @ApiProperty('ID')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty('创建时间')
  @CreateDateColumn({
    comment: '创建时间',
    transformer: dateTransformer,
    name: 'create_time',
  })
  createTime: Date;

  @ApiProperty('更新时间')
  @UpdateDateColumn({
    comment: '更新时间',
    transformer: dateTransformer,
    name: 'update_time',
  })
  updateTime: Date;
}
