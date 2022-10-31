import { DefaultPaginationValues } from '../constants';

export class Pager {
  private readonly take: number;
  private readonly skip: number;

  constructor(
    pageNumber = DefaultPaginationValues.PAGE_NUMBER,
    pageSize = DefaultPaginationValues.PAGE_SIZE,
  ) {
    this.take = pageSize;
    this.skip = (pageNumber - 1) * pageSize;
  }
}
