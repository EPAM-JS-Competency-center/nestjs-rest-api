import { Inject, Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class UtilsService {
  private logger = new Logger(UtilsService.name);

  constructor(
    @Inject('Constants')
    private readonly constants,

    @Inject('DateService')
    private readonly dateService,
  ) {
    this.logger.log('Utility service was created');
    this.logger.log(dateService.getTimeFromStart());
  }
  average(array: number[]): number {
    const average = array.reduce((acc, item) => acc + item, 0) / array.length;

    return +average.toFixed(this.constants.PRECISION);
  }
}
