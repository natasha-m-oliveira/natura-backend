import { Response as Res } from 'express';

import { Controller, Get, Param, Response } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Folder } from '@app/providers/storage-provider';
import { DownloadFile } from '@app/use-cases/files/download-file';
import { FileNameParam } from '@infra/http/dtos/file-name-param';

@Controller()
@ApiTags('Files')
@ApiBearerAuth()
export class DownloadFileController {
  constructor(private downloadFile: DownloadFile) {}

  @Get(':folder/:filename')
  async handle(
    @Param('folder') folder: Folder,
    @Param('filename', FileNameParam) filename: string,
    @Response() res: Res,
  ) {
    const [fileName, contentType] = filename.split(',');

    const { stream } = await this.downloadFile.execute({
      fileName,
      folder,
    });

    res.setHeader('Content-Type', contentType);

    stream.pipe(res);
  }
}
