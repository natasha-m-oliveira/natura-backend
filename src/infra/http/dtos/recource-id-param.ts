import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class RecourceIdParam implements PipeTransform<string, string> {
  transform(value: string) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(value))
      throw new BadRequestException({
        message: 'Invalid Param.',
        details: 'Value must be a UUID.',
      });

    return value;
  }
}
