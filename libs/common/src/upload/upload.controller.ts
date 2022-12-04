import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UploadService } from '@app/common';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ApiOperation } from '@app/decorator';
import { UploadDto, UploadResDto } from '@app/common/upload/dto/upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { TxOssService } from '@app/common';
import { Express } from 'express';

@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
  // 上传文件的地址
  uploadHost: string;
  constructor(
    private readonly uploadService: UploadService,
    private readonly configService: ConfigService,
    private readonly txOssService: TxOssService,
  ) {
    this.uploadHost = this.configService.get('uploadHost');
  }

  @Post('file')
  @ApiOperation('上传文件到服务器')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadDto })
  @ApiResponse({ status: 201, type: UploadResDto })
  @UseInterceptors(FileInterceptor('file'))
  async uploadServer(@UploadedFile() file) {
    // 首先验证文件是否存在
    await this.uploadService.verifyFile(file);
    return await this.txOssService.uploadFile(file);
    // const url = this.uploadHost + file.path.split('fisherUploads')[1];
    // return { url };
  }
}
