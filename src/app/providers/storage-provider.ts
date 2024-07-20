import { Stream } from 'stream';

import { File } from '@app/helpers/file';

export type Folder = 'product';

export const folders: Folder[] = ['product'];

export abstract class StorageProvider {
  abstract save(file: File, folder: Folder): Promise<string>;
  abstract validatePath(fileName: string, folder: Folder): Promise<boolean>;
  abstract download(fileName: string, folder: Folder): Promise<Stream>;
  abstract delete(url: string, folder: Folder): Promise<void>;
}
