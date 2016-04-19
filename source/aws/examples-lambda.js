'use strict';

import _ from 'underscore';
import aws from 'aws-sdk';
import config from '../config';

console.log('AWS LAMBDA EXAMPLES');
console.log(config);

lambdaTests()
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
    config.aws.users.admin
  ));
}

async function lambdaTests(){
  try {
    init();
    const lambda = new aws.Lambda();
    const list = await lambda.listFunctions().promise();
    console.log(list);
    const res = await lambda.invoke({
      "FunctionName": "fetch-url",
      "Payload": JSON.stringify({
        "url": "http://www.cnn.com"
      })
    }).promise();
    console.log(new Buffer(res.Payload, 'base64').toString('utf8'));
  } catch (e) {
    throw e;
  }
}
