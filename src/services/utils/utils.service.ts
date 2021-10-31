import { Inject, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class UtilsService {
  constructor(
    @Inject('Constants')
    private readonly constants,

    @Inject('DateService')
    private readonly dateService,
  ) {
    console.log('Utility service was created');
    console.log(dateService.getTimeFromStart());
  }
  average(array: number[]): number {
    const average = array.reduce((acc, item) => acc + item, 0) / array.length;

    return +average.toFixed(this.constants.PRECISION);
  }
}
