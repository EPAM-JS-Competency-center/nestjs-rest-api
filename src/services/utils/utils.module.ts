import { Module, Scope } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { START_DATE, PRECISION } from './utils.constants';

@Module({
  providers: [
    UtilsService,
    {
      provide: 'Constants',
      useValue: {
        START_DATE,
        PRECISION,
      },
    },
    {
      provide: 'DateService',
      useFactory(constants) {
        console.log('Date service was created');

        return {
          getCurrentDate() {
            return new Date();
          },
          getTimeFromStart() {
            return new Date().getTime() - constants.START_DATE;
          },
        };
      },
      inject: ['Constants'],
      scope: Scope.TRANSIENT,
    },
  ],
  exports: [UtilsService, 'DateService'],
})
export class UtilsModule {}
