'use strict';

import _ from 'underscore';
import aws from 'aws-sdk';
import config from '../config';

console.log('AWS FIREHOSE EXAMPLES');

firehoseTest()
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

async function firehoseTest(){
  try {
    init();
    const firehose = new aws.Firehose();
    const list = await firehose.listDeliveryStreams().promise();
    console.log(list);

    const putRes = await firehose.putRecord({
      DeliveryStreamName: 'Events', /* required */
      Record: { /* required */
        Data: "WHAT A NICE SOMETHING!!!" /* required */
      }
    }).promise();
    console.log(putRes);
  } catch (e) {
    throw e;
  }
}
