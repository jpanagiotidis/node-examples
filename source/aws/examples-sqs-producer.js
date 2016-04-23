'use strict';

import _ from 'underscore';
import aws from 'aws-sdk';
import Chance from 'chance';
import config from '../config';
import { sleep } from '../utils';

console.log('AWS SQS EXAMPLE PRODUCER');
console.log(config);

sqsProducer()
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

async function sqsProducer(){
  try {
    init();
    const sqs = new aws.SQS();
    const chance = new Chance();
    const res = await sqs.createQueue({
      "QueueName": "TestQ"
    }).promise();
    console.log(res.QueueUrl);

    let counter = 0;
    do {
      const mesRes = await sqs.sendMessage({
        "MessageBody": `${++counter}: ${chance.sentence()}`,
        "QueueUrl": res.QueueUrl
      }).promise();
      console.log(mesRes);
      await sleep(1000);
    } while (true);
  } catch (e) {
    throw e;
  }
}
