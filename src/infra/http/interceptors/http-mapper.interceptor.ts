import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class HttpMapperInterceptor implements NestInterceptor {
  static isObject(input: any): boolean {
    return Object.prototype.toString.call(input) === '[object Object]';
  }

  static format(data: Record<string, any> | Record<string, any>[]) {
    if (Array.isArray(data)) return data.map(HttpMapperInterceptor.format);

    if ('props' in data) {
      const props = data['props'] ?? {};

      return Object.keys(props).reduce((acc, cur) => {
        const isObjectOrArray =
          HttpMapperInterceptor.isObject(props[cur]) ||
          Array.isArray(props[cur]);

        if (isObjectOrArray) {
          Object.assign(acc, {
            [cur]: HttpMapperInterceptor.format(props[cur]),
          });
        } else {
          Object.assign(acc, { [cur]: props[cur] });
        }

        return acc;
      }, {});
    }

    return data;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(HttpMapperInterceptor.format));
  }
}
