'use strict';

import _ from 'underscore';
import aws from 'aws-sdk';
import config from '../config';

console.log('AWS SQS EXAMPLE CONSUMER');
console.log(config);

sqsConsumer()
.then((res) => {
  console.log('FIN', res);
})
.catch((err) => {
  console.log(err);
  console.log(err.stack);
});

function init(){
  aws.config.update(_.defaults(
    {
      "region": "eu-west-1",
      "signatureVersion": "v4"
    },
    config.aws.users.tester
  ));
}

async function sqsConsumer(){
  try {
    init();
    const sqs = new aws.SQS();
    const res = await sqs.createQueue({
      "QueueName": "TestQ"
    }).promise();
    console.log(res.QueueUrl);

    do {
      console.log('NEW TRY');
      const mesRes = await sqs.receiveMessage({
        "QueueUrl": res.QueueUrl,
        "WaitTimeSeconds": 5
      }).promise();
      // console.log(mesRes);
      if(mesRes.Messages && _.isArray(mesRes.Messages)){
        console.log(mesRes);
        for (let i = 0; i < mesRes.Messages.length; i++) {
          const msg = mesRes.Messages[i];
          console.log('CONSUMED: ID', msg.MessageId, 'BODY:', msg.Body);

          const delRes = await sqs.deleteMessage({
            "QueueUrl": res.QueueUrl,
            "ReceiptHandle": msg.ReceiptHandle
          }).promise();
          console.log(delRes);
        }
      }
    } while (true);
  } catch (e) {
    throw e;
  }
}
