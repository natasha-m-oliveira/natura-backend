import { randomBytes } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { Readable, Stream } from 'stream';

import { Injectable } from '@nestjs/common';

import { config } from '@app/config/config';
import { File } from '@app/helpers/file';
import { Folder, StorageProvider } from '@app/providers/storage-provider';

@Injectable()
export class LocalStorageProvider implements StorageProvider {
  private tempFolder = path.resolve(__dirname, '..', '..', '..', '..', '.temp');

  constructor() {}

  async save(file: File, folder: Folder): Promise<string> {
    return new Promise((resolve, reject) => {
      randomBytes(16, async (err, buf) => {
        if (err) return reject(err);

        const filename = buf.toString('hex') + path.extname(file.originalname);

        const ip = config.APP_ADDR;

        const url = `${ip}/files/${folder}/${filename}`;
        const dir = path.resolve(this.tempFolder, folder);

        if (!fs.existsSync(dir))
          await fs.promises.mkdir(dir, {
            recursive: true,
          });

        await fs.promises.writeFile(path.resolve(dir, filename), file.buffer, {
          encoding: 'utf-8',
        });

        resolve(url);
      });
    });
  }

  async validatePath(fileName: string, folder: Folder): Promise<boolean> {
    try {
      const filename = path.resolve(`${this.tempFolder}/${folder}`, fileName);
      const stat = await fs.promises.lstat(filename);
      return stat.isFile();
    } catch (error) {
      return false;
    }
  }

  async download(fieldName: string, folder: Folder): Promise<Stream> {
    const filename = path.resolve(`${this.tempFolder}/${folder}`, fieldName);
    const file = await fs.promises.readFile(filename);

    return Readable.from(file);
  }

  async delete(url: string, folder: Folder): Promise<void> {
    const fileName = url.split('/').pop();
    const file = path.resolve(`${this.tempFolder}/${folder}`, fileName);
    const isValid = await this.validatePath(fileName, folder);
    if (isValid) await fs.promises.unlink(file);
  }
}
