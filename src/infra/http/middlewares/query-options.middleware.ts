import { Request, Response, NextFunction } from 'express';

import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class QueryOptionsMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    req.page = this.formatPage(req);
    req.search = this.formatSearch(req);

    next();
  }

  formatPage(req: Request) {
    const validPage = {};

    if (
      !req.query?.page ||
      Array.isArray(req.query.page) ||
      typeof req.query.page !== 'object'
    )
      return validPage;

    const page = req.query.page;

    if ('offset' in page && !isNaN(+page.offset) && +page.offset >= 0)
      validPage['offset'] = +page.offset;

    if ('limit' in page && !isNaN(+page.limit) && +page.limit >= 0)
      validPage['limit'] = +page.limit;

    return validPage;
  }

  formatSearch(req: Request) {
    if (!req.query?.search) return '';

    const search = Array.isArray(req.query.search)
      ? req.query.search[0]
      : req.query.search;

    return String(search);
  }
}
