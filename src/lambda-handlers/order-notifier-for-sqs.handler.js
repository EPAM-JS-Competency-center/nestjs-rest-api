const awsSdk = require('aws-sdk');

const snsClient = new awsSdk.SNS();

exports.handler = async (event) => {
  //console.log('Received event:', JSON.stringify(event, null, 2));

  return Promise.all(event.Records.map(({ messageId, body }) => {
    // console.log('SQS message %s: %j', messageId, body);
    return new Promise((resolve, reject) => {
      try {
        const {
          id,
          totalInCart,
          totalPrice,
          shipping: { email, firstName, lastName, comment },
        } = JSON.parse(body);

        snsClient.publish({
          // Place SNS topic's ARN here:
          TopicArn: 'arn:aws:sns:<region>:<accountId>:OrderPlaced',
          Message: `
            Hi there,
            You have a new order #${ id } for ${ firstName } ${ lastName }<${ email }>.
            Total: ${ totalInCart } items, $${ totalPrice }.
            Please, confirm or decline the order soon.
            ${ comment ? 'Comment to order:' + comment : '' }
          `,
        }, (e, data) => {
          if (e) {
            console.error('Error publishing the message', e);
            return reject(e);
          }

          console.log('success', data);
          resolve(data);
        });
      } catch (e) {
        console.error('Unable to parse data', e);
        reject(e);
      }
    });
  }))
    .then(() => `Successfully processed ${ event.Records.length } messages.`)
};
