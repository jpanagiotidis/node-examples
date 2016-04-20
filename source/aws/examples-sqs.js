'use strict';

import _ from 'underscore';
import aws from 'aws-sdk';
import Chance from 'chance';
import config from '../config';
import { sleep } from '../utils';

console.log('AWS SQS EXAMPLE PRODUCER');
console.log(config);

// sqsProducer()
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

async function sqsProducer(){
  try {
    init();
    const sqs = new aws.SQS();
    const chance = new Chance();
    const res = await sqs.createQueue({
      "QueueName": "TestQ"
    }).promise();
    console.log(res.QueueUrl);

    do {
      const mesRes = await sqs.sendMessage({
        "MessageBody": "ASDASDASD",
        "QueueUrl": res.QueueUrl
      }).promise();
      console.log(mesRes);
    } while (true);
    // const queueURL = await sqs.getQueueUrl({
    //   "QueueName": "TestQ"
    // }).promise();
    // console.log(queueURL.QueueUrl);
  } catch (e) {
    throw e;
  }
}

async function sqsConsumer(){
  try {
    init();
    const sqs = new aws.SQS();
    const res = await sqs.createQueue({
      "QueueName": "TestQ"
    }).promise();
    console.log(res.QueueUrl);

    const mesRes = await sqs.receiveMessage({
      "QueueUrl": res.QueueUrl
    }).promise();
    console.log(mesRes);
  } catch (e) {
    throw e;
  }
}
