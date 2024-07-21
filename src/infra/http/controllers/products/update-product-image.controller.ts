import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  ParseFilePipeBuilder,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { File, FileType } from '@app/helpers/file';
import { UpdateProductImage } from '@app/use-cases/products/update-product-image';
import { RecourceIdParam } from '@infra/http/dtos/recource-id-param';

import { documentation } from './products-documentation';

@Controller()
@ApiTags('Products')
@ApiBearerAuth()
export class UpdateProductImageController {
  constructor(private updateProductImage: UpdateProductImage) {}

  @Put(':id/image')
  @HttpCode(204)
  @UseInterceptors(FileInterceptor('file'))
  @ApiParam(documentation.getParam('id'))
  @ApiOperation(documentation.getEndpoint('update-product-image').operation)
  @ApiResponse(documentation.getEndpoint('update-product-image').response)
  async handle(
    @Param('id', RecourceIdParam) id: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: new RegExp(FileType.IMAGE),
        })
        .addMaxSizeValidator({
          maxSize: 100 * 1000, // 100KB
        })
        .build({
          fileIsRequired: false,
          exceptionFactory: (err) =>
            new BadRequestException({
              message: 'Invalid Body.',
              details: [
                {
                  field: 'file',
                  errors: [err],
                },
              ],
            }),
        }),
    )
    file?: File,
  ) {
    await this.updateProductImage.execute({
      id,
      file,
    });
  }
}
