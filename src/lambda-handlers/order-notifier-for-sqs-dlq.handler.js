const awsSdk = require('aws-sdk');

const snsClient = new awsSdk.SNS();

exports.handler = async (event) => {
  //console.log('Received event:', JSON.stringify(event, null, 2));

  return Promise.all(event.Records.map(({ messageId, body }) => {
    console.log('SQS message %s: %j', messageId, body);

    return new Promise((resolve, reject) => {
      snsClient.publish({
        // Place SNS topic's ARN here:
        TopicArn: 'arn:aws:sns:<region>:<accountId>:OrderPlaced',
        Message: `
            Hi there,
            You have unprocessed order. Please, take some action.
          `,
      }, (e, data) => {
        if (e) {
          console.error('Error publishing the message', e);
          return reject(e);
        }

        console.log('Notification is successfully sent.', data);

        resolve('success');
        // or return the message to the DLQ with
        // reject();
        // in this case message will be returned back to the queue and lambda trigger called - so you will trap in infinite loop...
      });
    });
  }))
    .then(() => `Successfully processed ${ event.Records.length } messages.`)
};
