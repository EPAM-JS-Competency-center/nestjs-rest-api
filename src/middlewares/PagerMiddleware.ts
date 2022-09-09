import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { DefaultPaginationValues, PaginationKeys } from '../shared/constants';

@Injectable()
export class PagerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    req.query[PaginationKeys.PAGE_NUMBER] = (req.query[
      PaginationKeys.PAGE_NUMBER
    ] || DefaultPaginationValues.PAGE_NUMBER) as string;

    req.query[PaginationKeys.PAGE_SIZE] = (req.query[
      PaginationKeys.PAGE_SIZE
    ] || DefaultPaginationValues.PAGE_SIZE) as string;

    next();
  }
}
