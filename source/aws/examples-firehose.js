'use strict';

import _ from 'underscore';
import aws from 'aws-sdk';
import Chance from 'chance';
import config from '../config';
import {sleep} from '../utils'

console.log('AWS FIREHOSE EXAMPLES');

firehosePut()
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

async function firehoseList(){
  try {
    init();
    const firehose = new aws.Firehose();
    const chance = new Chance();
    const list = await firehose.listDeliveryStreams().promise();
    console.log(list);
  } catch (e) {
    throw e;
  }
}

async function firehosePut(){
  try {
    init();
    const firehose = new aws.Firehose();
    const chance = new Chance();

    do {
      const data = {
        "name": chance.name()
        // "event_id": chance.name(),
        // "entity_id": chance.name(),
        // "client_id": chance.name()
      };

      let putRes;
      putRes = await firehose.putRecord({
        DeliveryStreamName: 'Events', /* required */
        Record: { /* required */
          Data: JSON.stringify(data)+"\n"
        }
      }).promise();
      console.log(putRes);
      await sleep(10000);
    } while (true);
  } catch (e) {
    throw e;
  }
}
