import { promises } from 'fs';
import fs from 'fs/promises';
import path, { resolve } from 'path';

export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
}

export enum FileType {
  IMAGE = 'jpeg|jpg|png|gif',
  TEXT = 'txt|csv',
}

interface ValidateProps {
  file: File;
  type: FileType;
}

export function validate({ file, type }: ValidateProps): boolean {
  const regExp = new RegExp(type);
  return (
    regExp.test(path.extname(file.originalname).toLocaleLowerCase()) &&
    regExp.test(file.mimetype)
  );
}

export function base64Encode(file: File): Promise<string> {
  return fs.readFile(file.originalname, { encoding: 'base64' });
}

export async function readJsonFile(path: string) {
  path = resolve(__dirname, path);

  const content = await promises.readFile(path, {
    encoding: 'utf-8',
  });
  return JSON.parse(content);
}
