/**
 * 公共的实体
 */
import { dateTransformer } from '@app/public-tool';
import { ApiProperty } from '@app/public-decorator';
import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 公共模块实体
 */
export class CommonEntity {
  @ApiProperty('ID')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty('创建时间')
  @CreateDateColumn({ comment: '创建时间', transformer: dateTransformer })
  createTime: Date;

  @ApiProperty('更新时间')
  @CreateDateColumn({ comment: '更新时间', transformer: dateTransformer })
  updateTime: Date;
}
