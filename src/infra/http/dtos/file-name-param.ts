import { Injectable, PipeTransform } from '@nestjs/common';

import { FileType } from '@app/helpers/file';
import { FileNotFound } from '@app/use-cases/files/errors/file-not-found';

@Injectable()
export class FileNameParam implements PipeTransform<string, string> {
  transform(value: string) {
    if (!new RegExp(/\.\w/g).test(value)) throw new FileNotFound();

    const fileType = value.split('.').pop();

    const allowedFiles = Object.values(FileType).filter((type) =>
      new RegExp(type).test(fileType),
    );

    if (!allowedFiles.length) throw new FileNotFound();

    const contentType = Object.keys(FileType)
      .filter((type) => FileType[type] === allowedFiles[0])
      .map((type) => `${type.toLowerCase()}/${fileType}`)[0];

    return `${value},${contentType}`;
  }
}
