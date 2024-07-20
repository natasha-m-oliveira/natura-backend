import { Stream } from 'stream';

import { Injectable } from '@nestjs/common';

import {
  Folder,
  StorageProvider,
  folders,
} from '@app/providers/storage-provider';

import { FileNotFound } from './errors/file-not-found';

type DownloadFileRequest = {
  folder: Folder;
  fileName: string;
};

type DownloadFileResponse = {
  stream: Stream;
};

@Injectable()
export class DownloadFile {
  constructor(private storageProvider: StorageProvider) {}

  async execute(props: DownloadFileRequest): Promise<DownloadFileResponse> {
    if (!folders.includes(props.folder)) throw new FileNotFound();

    const isValid = await this.storageProvider.validatePath(
      props.fileName,
      props.folder,
    );

    if (!isValid) throw new FileNotFound();

    const stream = await this.storageProvider.download(
      props.fileName,
      props.folder,
    );

    return { stream };
  }
}
