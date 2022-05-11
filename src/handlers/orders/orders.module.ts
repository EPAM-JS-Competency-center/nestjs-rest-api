import { Module } from '@nestjs/common';

import {
  // SNS,
  DynamoDB,
  SQS,
} from 'aws-sdk';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import {
  // SNS_SERVICE,
  DYNAMO_DB_SERVICE,
  SQS_SERVICE,
} from '../../DI.tokens';

@Module({
  imports: [],
  controllers: [OrdersController],
  providers: [
    {
      provide: SQS_SERVICE,
      useFactory: () => {
        return new SQS({
          region: 'us-east-1',
          // region: '<region>',
        });
      },
    },
    {
      provide: DYNAMO_DB_SERVICE,
      useFactory: () => {
        return new DynamoDB({
          region: 'us-east-1',
          // region: '<region>',
        });
      },
    },
    // {
    //   provide: SNS_SERVICE,
    //   useFactory: () => {
    //     return new SNS({
    //       region: 'us-east-1',
    //       // region: '<region>',
    //     });
    //   },
    // },
    OrdersService,
  ],
})
export class OrdersModule {}
