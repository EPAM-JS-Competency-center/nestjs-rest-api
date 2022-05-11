const awsSdk = require('aws-sdk');

const snsClient = new awsSdk.SNS();

exports.handler = async (event) => {
  //console.log('Received event:', JSON.stringify(event, null, 2));

  return Promise.all(event.Records.map((record) => {
    return new Promise((resolve, reject) => {
      const {
        id : { S: id },
        totalInCart: { N: totalInCart },
        totalPrice: { N: totalPrice },
        shipping: { M: {
          email: { S: email },
          firstName: { S: firstName },
          lastName: { S: lastName },
          comment: { S: comment },
        },
        },
      } = record.dynamodb.NewImage;

      snsClient.publish({
        // Place SNS topic's ARN here:
        TopicArn: 'arn:aws:sns:<region>:<accpuntId>:OrderPlaced',
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

        resolve(record);
      });
    });
  }))
    .then(() => `Successfully processed ${ event.Records.length } messages.`)
};
