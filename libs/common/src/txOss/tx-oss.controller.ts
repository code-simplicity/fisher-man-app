import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@app/decorator';
import { TxOssService, TxOssValidateDto } from '@app/common';

@ApiTags('OSS对象存储')
@Controller('oss')
export class TxOssController {
  constructor(private readonly txOssService: TxOssService) {}

  @Get('sts')
  @ApiOperation('获取临时授权（15分钟的有效期，尽量在15分钟之内获取新的授权）')
  async getAuthorizationSts() {
    return await this.txOssService.getAuthorizationSts();
  }

  @Get('put/object')
  @ApiOperation('获取OSS对象存储的上传对象')
  async getPutObject(@Query() { name, size }: TxOssValidateDto) {
    await this.txOssService.verifyFile({ name, size });
    return this.txOssService.getPutObject(name);
  }
}
