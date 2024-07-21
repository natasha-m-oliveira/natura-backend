import { randomBytes } from 'crypto';
import { Connection, Schema, SchemaTypes, mongo } from 'mongoose';
import { extname } from 'path';
import { Readable, Stream } from 'stream';

import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

import { config } from '@app/config/config';
import { File } from '@app/helpers/file';
import { Folder, StorageProvider } from '@app/providers/storage-provider';

@Injectable()
export class MulterStorageProvider implements StorageProvider {
  private schema: Schema;

  constructor(@InjectConnection() private connection: Connection) {
    this.schema = new Schema({
      _id: SchemaTypes.ObjectId,
      length: SchemaTypes.Number,
      chunkSize: SchemaTypes.Number,
      uploadDate: SchemaTypes.Date,
      filename: SchemaTypes.String,
      md5: SchemaTypes.String,
      contentType: SchemaTypes.String,
    });
  }

  async save(file: File, folder: Folder): Promise<string> {
    const bucket = new mongo.GridFSBucket(this.connection.db, {
      bucketName: folder,
    });

    return new Promise((resolve, reject) => {
      randomBytes(16, (err, buf) => {
        if (err) return reject(err);

        const filename = buf.toString('hex') + extname(file.originalname);

        const uploadStream = bucket.openUploadStream(filename, {
          contentType: file.mimetype,
        });

        const ip = config.APP_ADDR;

        const url = `${ip}/files/${folder}/${uploadStream.filename}`;

        const stream = Readable.from(file.buffer);
        stream.pipe(uploadStream);

        uploadStream.on('finish', () => resolve(url));
      });
    });
  }

  async validatePath(fileName: string, folder: Folder): Promise<boolean> {
    const file = await this.find(fileName, folder);

    return !!file;
  }

  async find(fileName: string, folder: Folder): Promise<{ _id: any } | null> {
    const file = await this.connection
      .model(`${folder}.files`, this.schema)
      .exists({ filename: fileName })
      .exec();

    return file;
  }

  async download(fileName: string, folder: Folder): Promise<Stream> {
    const bucket = new mongo.GridFSBucket(this.connection.db, {
      bucketName: folder,
    });

    const stream = bucket.openDownloadStreamByName(fileName);

    return stream;
  }

  async delete(url: string, folder: Folder): Promise<void> {
    const bucket = new mongo.GridFSBucket(this.connection.db, {
      bucketName: folder,
    });

    const fileName = url.split('/').pop();
    const file = await this.find(fileName, folder);

    if (file) await bucket.delete(file._id);
  }
}
