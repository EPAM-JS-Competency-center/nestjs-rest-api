const awsSdk = require('aws-sdk');

const dynamoDB = new awsSdk.DynamoDB.DocumentClient();
const sqs = new awsSdk.SQS;

const TableName = 'Orders';

exports.handler = async (event) => {
  //console.log('Received event:', JSON.stringify(event, null, 2));

  return Promise.all(event.Records.map(({ messageId, receiptHandle, body }) => {
    // console.log('SQS message %s, %s: %j', messageId, receiptHandle, body);
    return new Promise((resolve, reject) => {
      try {
        const orderData = JSON.parse(body);
        console.log(orderData);
        const { id: orderId } = orderData;

        dynamoDB.query({
          TableName,
          Limit: 1,
          KeyConditionExpression: "#orderID = :id",
          ExpressionAttributeNames: {
            '#orderID': 'id',
          },
          ExpressionAttributeValues: {
            ':id': orderId,
          },
        }, (err, data) => {
          if (err) {
            console.error(err);

            return reject(err);
          }

          if (data.Items.length) {
            console.log(data);
            return resolve(`Order with ID ${ orderId } has been already written`);
          }

          dynamoDB.put({
            TableName,
            Item: orderData,
          }, (err, data) => {
            if (err) {
              console.error(err);

              return reject('Unable to write data to DynamoDb table', err);
            }

            // console.log(data);
            resolve(data);
            // To remove the message from queue when it's being processed or if it is no longer needed:
            // sqs.deleteMessage({
            //   // QueueUrl: '',
            //   QueueUrl: 'https://sqs.<region>.amazonaws.com/<account>/OrdersQueue',
            //   ReceiptHandle: receiptHandle,
            // },
            //   (err, resp) => err ? reject(err) : resolve(resp)
            // );
            // However, SQS lambda integration automatically removes the message from a queue when it returns a successful response.
            // To put the message back to the queue we need reject() some value at the end of workflow.
          });
        });
      } catch (e) {
        console.error('Unable to parse data', e);
        reject(e);
      }
    });
  }))
    .then(() => `Successfully processed ${ event.Records.length } messages.`)
};
