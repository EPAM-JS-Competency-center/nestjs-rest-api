import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { DefaultPaginationValues, PaginationKeys } from '../shared/constants';

@Injectable()
export class PagerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    req.query[PaginationKeys.LAST_READ_ITEM_ID] = (req.query[
      PaginationKeys.LAST_READ_ITEM_ID
    ] || DefaultPaginationValues.LAST_READ_ITEM_ID) as string;

    req.query[PaginationKeys.PAGE_SIZE] = (req.query[
      PaginationKeys.PAGE_SIZE
    ] || DefaultPaginationValues.PAGE_SIZE) as string;

    next();
  }
}
