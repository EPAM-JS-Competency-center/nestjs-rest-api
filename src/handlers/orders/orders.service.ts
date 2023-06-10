import { Inject, Injectable } from '@nestjs/common';
import * as aws from 'aws-sdk';

import { ConfigService } from '../../services/config/config.service';
import {
  // SNS_SERVICE,
  SQS_SERVICE,
  DYNAMO_DB_SERVICE,
} from '../../DI.tokens';

@Injectable()
export class OrdersService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(SQS_SERVICE) private readonly awsSQS: aws.SQS,
    // @Inject(SNS_SERVICE) private readonly awsSNS: aws.SNS,
    @Inject(DYNAMO_DB_SERVICE) private readonly dynamo: aws.DynamoDB,
  ) {
    console.log(`Current env: ${configService.appConfig.env}`);
  }

  create(orderDto): Promise<any> {
    const orderDate = Date.now();
    const orderId = Buffer.from(`${orderDate}`, 'utf-8').toString('base64');

    return new Promise<any>((resolve, reject) => {
      this.awsSQS.sendMessage(
        {
          MessageBody: JSON.stringify({
            ...orderDto,
            id: orderId,
            createdAt: orderDate,
          }),
          QueueUrl: this.configService.appConfig.sqs.ordersQueueUrl,
        },
        (err, data) => (err ? reject(err) : resolve(data)),
      );

      // You can also publish a message directly to SNS queue:
      // this.awsSNS.publish({
      //   TopicArn: this.configService.appConfig.sns.orderPlacedQueueArn,
      //   Message: JSON.stringify({ ...orderDto, date: new Date() }),
      // }, (err, resp) => (err ? reject(err) : resolve(resp));
    });
  }

  /*
    Receives a single order right out from SQS Queue
    NOTE: you should remove a message from queue within VisibilityTimeout
      otherwise it will be moved to the configured DealLetter Queue (DLQ) after defined amount of message retrievals
   */
  getOrder(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.awsSQS.receiveMessage(
        {
          QueueUrl: this.configService.appConfig.sqs.ordersQueueUrl,
          MaxNumberOfMessages: 1, // The maximum number of messages to return. Amazon SQS never returns more messages than this value (however, fewer messages might be returned). Valid values: 1 to 10. Default: 1
          VisibilityTimeout: 30, // The duration (in seconds) that the received messages are hidden from subsequent retrieve requests after being retrieved by a ReceiveMessage request.
          WaitTimeSeconds: 5, // Using the WaitTimeSeconds parameter enables long-poll support. For more information, see Amazon SQS Long Polling in the Amazon SQS Developer Guide.  Short poll is the default behavior where a weighted random set of machines is sampled on a ReceiveMessage call. Thus, only the messages on the sampled machines are returned. If the number of messages in the queue is small (fewer than 1,000), you most likely get fewer messages than you requested per ReceiveMessage call. If the number of messages in the queue is extremely small, you might not receive any messages in a particular ReceiveMessage response. If this happens, repeat the request.  For each message returned, the response includes the following:   The message body.   An MD5 digest of the message body. For information about MD5, see RFC1321.   The MessageId you received when you sent the message to the queue.   The receipt handle.   The message attributes.   An MD5 digest of the message attributes.   The receipt handle is the identifier you must provide when deleting the message. For more information, see Queue and Message Identifiers in the Amazon SQS Developer Guide. You can provide the VisibilityTimeout parameter in your request. The parameter is applied to the messages that Amazon SQS returns in the response. If you don't include the parameter, the overall visibility timeout for the queue is used for the returned messages. For more information, see Visibility Timeout in the Amazon SQS Developer Guide. A message that isn't deleted or a message whose visibility isn't extended before the visibility timeout expires counts as a failed receive. Depending on the configuration of the queue, the message might be sent to the dead-letter queue.  In the future, new attributes might be added. If you write code that calls this action, we recommend that you structure your code so that it can handle new attributes gracefully.
        },
        (err, resp) => (err ? reject(err) : resolve(resp)),
      );
    });
  }

  /*
    Retrieves orders data from DynamoDB table
   */
  getOrders() {
    return new Promise<any>((resolve, reject) => {
      this.dynamo.scan(
        {
          TableName: 'Orders',
          // Limit: 50,
        },
        (err, resp) => (err ? reject(err) : resolve(resp.Items)),
      );
    });
  }
}
