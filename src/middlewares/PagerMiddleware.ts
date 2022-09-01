import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class PagerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    req.query.lastReadItemId = req.query.lastReadItemId || null;
    req.query.pageSize = req.query.pageSize || '15';
    next();
  }
}
